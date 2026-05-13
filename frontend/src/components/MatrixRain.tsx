import { useEffect, useRef } from 'react'

const chars = 'CARGO404$C404BNB01_ROUTE_NOT_FOUND_█▓▒░🚚'

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    const fontSize = 14
    let columns = Math.floor(width / fontSize)
    let drops = Array.from({ length: columns }, () => Math.floor(Math.random() * height / fontSize))

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      columns = Math.floor(width / fontSize)
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * height / fontSize))
    }

    resize()
    window.addEventListener('resize', resize)

    const id = window.setInterval(() => {
      ctx.fillStyle = 'rgba(5, 8, 6, 0.12)'
      ctx.fillRect(0, 0, width, height)
      ctx.font = `${fontSize}px JetBrains Mono, monospace`
      ctx.fillStyle = 'rgba(0, 255, 102, 0.55)'

      for (let i = 0; i < drops.length; i += 1) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0
        drops[i] += 1
      }
    }, 55)

    return () => {
      window.clearInterval(id)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />
}
