import { useEffect, useRef } from 'react'

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const mouse = { x: -1000, y: -1000 }

    interface Particle {
      x: number
      y: number
      baseX: number
      baseY: number
      vx: number
      vy: number
      size: number
      color: string
    }

    let particles: Particle[] = []

    const colors = [
      'rgba(255,255,255,0.7)',
      'rgba(255,255,255,0.4)',
      'rgba(255,255,255,0.35)',
      'rgba(255,255,255,0.25)',
      'rgba(255,255,255,0.5)',
    ]

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    const init = () => {
      particles = []
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 4000), 220)
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    const handleMouse = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('mouseleave', handleLeave)

    resize()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        // Mouse interaction — push particles away
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          const force = (200 - dist) / 200
          p.x -= dx * force * 0.02
          p.y -= dy * force * 0.02
        }

        // Drift
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        p.x = Math.max(0, Math.min(canvas.width, p.x))
        p.y = Math.max(0, Math.min(canvas.height, p.y))

        // Draw node
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            const alpha = (1 - dist / 180) * 0.15
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw triangles for denser areas
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d1 = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (d1 > 120) continue
          for (let k = j + 1; k < particles.length; k++) {
            const d2 = Math.hypot(particles[j].x - particles[k].x, particles[j].y - particles[k].y)
            const d3 = Math.hypot(particles[i].x - particles[k].x, particles[i].y - particles[k].y)
            if (d2 < 120 && d3 < 120) {
              const avgDist = (d1 + d2 + d3) / 3
              const alpha = (1 - avgDist / 120) * 0.03
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.lineTo(particles[k].x, particles[k].y)
              ctx.closePath()
              ctx.fillStyle = `rgba(255,255,255,${alpha})`
              ctx.fill()
            }
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  )
}
