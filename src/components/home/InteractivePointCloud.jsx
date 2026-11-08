import React, { useRef, useEffect } from 'react'

export function InteractivePointCloud({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = canvas.parentElement.clientWidth)
    let height = (canvas.height = canvas.parentElement.clientHeight)

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180, // Torch illumination radius
      isActive: false,
    }

    const particles = []

    // Generate dense dither point-cloud for the 2 figures and the ridge
    const initPointCloud = () => {
      particles.length = 0
      const count = Math.min(Math.floor((width * height) / 380), 2800)
      const centerX = width / 2
      const centerY = height * 0.48

      for (let i = 0; i < count; i++) {
        let x, y, size = 1.2, isCore = false
        const roll = Math.random()

        if (roll < 0.26) {
          // Left Figure (Shadow silhouette)
          const t = Math.random()
          const bodyY = centerY - 95 + t * 155
          const bodyX = centerX - 135 + (Math.random() - 0.5) * 36 + t * 38
          x = bodyX
          y = bodyY
          size = Math.random() > 0.8 ? 1.8 : 1.2
        } else if (roll < 0.52) {
          // Right Figure (Shadow silhouette)
          const t = Math.random()
          const bodyY = centerY - 90 + t * 155
          const bodyX = centerX + 135 + (Math.random() - 0.5) * 38 - t * 42
          x = bodyX
          y = bodyY
          size = Math.random() > 0.8 ? 1.8 : 1.2
        } else if (roll < 0.68) {
          // Central touch point (Warm star glow)
          const angle = Math.random() * Math.PI * 2
          const rad = Math.pow(Math.random(), 2) * 50
          x = centerX + Math.cos(angle) * rad
          y = centerY - 15 + Math.sin(angle) * rad
          size = Math.random() > 0.5 ? 2.2 : 1.4
          isCore = true
        } else if (roll < 0.88) {
          // Cosmic Ridge / Ground line
          const spreadX = (Math.random() - 0.5) * (width * 0.82)
          const curveY = centerY + 65 + Math.sin(spreadX * 0.005) * 18 + Math.pow(spreadX / (width * 0.4), 2) * 28
          x = centerX + spreadX + (Math.random() - 0.5) * 25
          y = curveY + (Math.random() - 0.5) * 30
          size = Math.random() > 0.85 ? 1.6 : 1
        } else {
          // Ambient background starlight dust
          x = Math.random() * width
          y = Math.random() * height
          size = Math.random() > 0.9 ? 1.4 : 0.8
        }

        particles.push({
          x,
          y,
          size,
          isCore,
          // Base idle state: very dim/dark silhouette
          baseAlpha: isCore ? 0.25 : 0.08,
          currentAlpha: isCore ? 0.25 : 0.08,
          // Target illumination alpha when cursor hovers
          activeAlpha: isCore ? 1.0 : 0.95,
        })
      }
    }

    initPointCloud()

    const handleResize = () => {
      if (!canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
      initPointCloud()
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.isActive = true
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
      mouse.isActive = false
    }

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Torch illumination calculation
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        let targetAlpha = p.baseAlpha

        // When mouse is near: illuminate the figure from dark to radiant bright
        if (mouse.isActive && dist < mouse.radius) {
          const intensity = 1 - (dist / mouse.radius)
          // Smooth power curve for cinematic light falloff
          const lightGlow = Math.pow(intensity, 1.4)
          targetAlpha = p.baseAlpha + (p.activeAlpha - p.baseAlpha) * lightGlow
        }

        // Smoothly fade in/out
        p.currentAlpha += (targetAlpha - p.currentAlpha) * 0.12

        // Determine particle color (white or amber-orange glow near core)
        if (p.isCore) {
          ctx.fillStyle = `rgba(255, 130, 40, ${p.currentAlpha})`
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.currentAlpha})`
        }

        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size)
      }

      // Draw subtle ambient torch light halo under cursor
      if (mouse.isActive) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius)
        gradient.addColorStop(0, 'rgba(255, 120, 30, 0.08)')
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.03)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full block cursor-crosshair select-none ${className}`}
    />
  )
}
