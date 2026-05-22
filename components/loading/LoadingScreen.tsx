'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Vertex shader ────────────────────────────────────────────────────────────
const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

// ── Fragment shader — liquid metal (paper.design preset) ──────────────────
// Params: colorBack=#000000  colorTint=#616161  shape=diamond
//         repetition=1.46  softness=0.15  shiftRed=−0.22  shiftBlue=−0.20
//         distortion=0.41  contour=0.31  angle=42°  speed=1.04  scale=0.44
const FRAG = `
precision highp float;
uniform float u_t;
uniform vec2  u_res;

// Gradient hash — maps 2D integer cell to random 2D gradient
vec2 ghash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}

// Smooth gradient noise
float gnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(ghash(i),             f            ),
        dot(ghash(i + vec2(1,0)), f - vec2(1,0)), u.x),
    mix(dot(ghash(i + vec2(0,1)), f - vec2(0,1)),
        dot(ghash(i + vec2(1,1)), f - vec2(1,1)), u.x),
    u.y);
}

// Fractal brownian motion — 6 octaves
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 M = mat2(1.6, 1.2, -1.2, 1.6); // lacunarity ~2, slight rotation
  for (int i = 0; i < 6; i++) { v += a * gnoise(p); p = M * p; a *= 0.5; }
  return v;
}

// Domain-warped metallic sample
float metallic(vec2 p, float t) {
  // Diamond shape (abs L1 norm modulates pattern)
  float dia = abs(p.x) + abs(p.y);

  // Layer 1 warp
  vec2 q = vec2(
    fbm(p                         + t * 0.162),
    fbm(p + vec2(5.2, 1.3)        + t * 0.074)
  );

  // Layer 2 warp (warped by q, repetition=1.46)
  vec2 r = vec2(
    fbm(p + 1.46 * q + vec2(1.7, 9.2) + t * 0.056),
    fbm(p + 1.46 * q + vec2(8.3, 2.8) + t * 0.033)
  );

  // Final noise, diamond-modulated by distortion=0.41
  float f = fbm(p + 1.46 * r + dia * 0.041);

  return clamp(f * 0.5 + 0.5 + 0.41 * length(r) * 0.45, 0.0, 1.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy / u_res) * 2.0 - 1.0;
  uv.x *= u_res.x / u_res.y;

  // Rotate 42° + scale 0.44
  float ang = 0.73304; // 42.0 * PI/180
  mat2 R = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
  vec2 p = R * uv * 1.54; // 0.44 * 3.5 zoom

  float t = u_t * 1.04; // speed

  // Chromatic aberration: shiftRed=−0.22, shiftBlue=−0.20
  vec2 aR = R * vec2(-0.22, 0.0) * 0.013;
  vec2 aB = R * vec2(-0.20, 0.0) * 0.013;

  float mR = metallic(p + aR, t);
  float mG = metallic(p,      t);
  float mB = metallic(p + aB, t);

  // #616161 = vec3(0.38) — silver-gray tint
  vec3 tint = vec3(0.38);

  // Metallic color: black → tint → white, softness=0.15
  vec3 col;
  col.r = mix(tint.r, 1.0, pow(mR, 1.6)) * smoothstep(0.0, 0.15, mR);
  col.g = mix(tint.g, 1.0, pow(mG, 1.6)) * smoothstep(0.0, 0.15, mG);
  col.b = mix(tint.b, 1.0, pow(mB, 1.6)) * smoothstep(0.0, 0.15, mB);

  // Contour lines, contour=0.31
  float ct = pow(1.0 - abs(fract(mG / 0.31) * 2.0 - 1.0), 5.0);
  col += ct * 0.18;

  gl_FragColor = vec4(col, 1.0);
}
`

// ── WebGL canvas clipped to the Cosmico logo shape ────────────────────────
function LiquidMetalLogo({ size = 120 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    canvas.width  = size * dpr
    canvas.height = size * dpr

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER,   VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]),
      gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uT   = gl.getUniformLocation(prog, 'u_t')
    const uRes = gl.getUniformLocation(prog, 'u_res')
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uRes, canvas.width, canvas.height)

    const t0 = performance.now()
    const render = () => {
      gl.uniform1f(uT, (performance.now() - t0) * 0.001)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      rafRef.current = requestAnimationFrame(render)
    }
    render()

    return () => cancelAnimationFrame(rafRef.current)
  }, [size])

  // SVG logo paths are in a 30×30 viewBox — scale to canvas CSS size
  const s = size / 30

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Hidden SVG defines the clip path using the logo paths */}
      <svg
        width={0}
        height={0}
        aria-hidden
        style={{ position: 'absolute', overflow: 'visible', pointerEvents: 'none' }}
      >
        <defs>
          <clipPath id="cosmico-logo-clip" clipPathUnits="userSpaceOnUse">
            <g transform={`scale(${s})`}>
              <path d="M8.68667 14.9977C8.68667 11.5524 11.4682 8.75162 14.8858 8.75162V5.83398C9.86326 5.83398 5.79102 9.93714 5.79102 14.9977C5.79102 20.0584 9.86326 24.1615 14.8858 24.1615V21.2439C11.4664 21.2439 8.68667 18.4412 8.68667 14.9977Z" />
              <path d="M21.0878 15.0001C21.0878 11.5509 18.3118 8.75391 14.8887 8.75391V21.2481C18.3118 21.2481 21.0878 18.4511 21.0878 15.002V15.0001Z" />
              <path d="M2.89565 14.9991C2.89565 8.32695 8.26421 2.91763 14.8861 2.91763V0C6.67796 0 0 6.72865 0 14.9991C0 23.2695 6.67796 29.9981 14.8861 29.9981V27.0805C8.26421 27.0805 2.89378 21.6712 2.89378 14.9972L2.89565 14.9991Z" />
            </g>
          </clipPath>
        </defs>
      </svg>

      <canvas
        ref={canvasRef}
        style={{
          width: size,
          height: size,
          display: 'block',
          clipPath: 'url(#cosmico-logo-clip)',
        }}
      />
    </div>
  )
}

// ── Loading screen ────────────────────────────────────────────────────────
interface LoadingScreenProps {
  show: boolean
  onComplete: () => void
}

export function LoadingScreen({ show, onComplete }: LoadingScreenProps) {
  useEffect(() => {
    if (!show) return
    const t = setTimeout(onComplete, 3800)
    return () => clearTimeout(t)
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: '#000000' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.75, ease: 'easeInOut' } }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <LiquidMetalLogo size={120} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
