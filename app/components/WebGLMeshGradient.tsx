import { useEffect, useRef, useState } from "react"
import { useTheme } from "~/contexts/ThemeContext"
import hexToRgb from "~/utilities/hexToRgb"

export default function WebGLMeshGradient(props: React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement> & { appear: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const { accent } = useTheme()
  const [rgb, setRgb] = useState<number[]>(hexToRgb(accent).map(c => c/255))

  useEffect(() => {
    setRgb(hexToRgb(accent).map(c => c/255))
  }, [accent])

  useEffect(() => {
    if (!canvas.current) return

    let gl = canvas.current.getContext('webgl')
    if (!gl) return

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0,
        -1.0,
        1.0,
        -1.0,
        -1.0,
        1.0,
        -1.0,
        1.0,
        1.0,
        -1.0,
        1.0,
        1.0
      ]),
      gl.STATIC_DRAW
    )

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    if (!vertexShader) return

    gl.shaderSource(vertexShader, `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0, 1);
      }
    `)
    gl.compileShader(vertexShader)

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    if (!fragmentShader) return
    gl.shaderSource(fragmentShader, `
      precision mediump float;

      uniform vec2 u_size;
      uniform vec3 u_color;
      uniform float u_time;

      const vec3 luma = vec3(0.2126, 0.7152, 0.0722);

      float f(in vec2 p) {
        return sin(p.x + sin(p.y + u_time * 0.1)) * sin(p.y * p.x * 0.1 + u_time * 0.2);
      }

      vec2 field(in vec2 p) {
        vec2 ep = vec2(0.05, 0.0);
        vec2 rz = vec2(0);
        for(int i = 0; i < 7; i++) {
          float t0 = f(p);
          float t1 = f(p + ep.xy);
          float t2 = f(p + ep.yx);
          vec2 g = vec2((t1 - t0), (t2 - t0)) / ep.xx;
          vec2 t = vec2(-g.y, g.x);
          p += 0.9*t + g*0.3;
          rz= t;
        }
          
        return rz;
      }

      void main() {
        vec2 p = gl_FragCoord.xy / u_size - 0.5;
        p.x *= u_size.x/u_size.y;
        p *= 3.0;
      
        vec2 fld = field(p);
        vec3 col = sin(u_color+fld.x-fld.y);
      
      
        gl_FragColor = vec4(col, 1.0);
      }
    `)
    gl.compileShader(fragmentShader)

    const program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    const sizeLocation = gl.getUniformLocation(program, 'u_size')
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const colorLocation = gl.getUniformLocation(program, 'u_color')

    gl.uniform3fv(colorLocation, rgb)

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const seed = Math.floor(Math.random() * 1000)

    function render() {
      if (!gl || !canvas.current) return
      gl.uniform1f(timeLocation, seed + performance.now() * 0.0005)
      gl.uniform3fv(colorLocation, rgb)
      gl.uniform2f(sizeLocation, canvas.current.width, canvas.current.height)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      window.requestAnimationFrame(render)
    }

    render()

    props.appear?.()

    return () => {
      gl?.deleteProgram(program)
      gl?.deleteShader(fragmentShader)
      gl?.deleteShader(vertexShader)
      gl = null
    }
  }, [canvas])

  return (
    <canvas ref={canvas} {...props} />
  )
}

