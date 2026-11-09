import React, { useRef, useEffect } from 'react'
import rawParticleData from '../../data/particleMesh.json'

// Aspect ratio of the original hero artwork (1024x571)
const ARTWORK_WIDTH = 1024
const ARTWORK_HEIGHT = 571
const ARTWORK_RATIO = ARTWORK_WIDTH / ARTWORK_HEIGHT

export function InteractivePointCloud({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId = null
    let isVisible = true
    let width = 0
    let height = 0
    let dpr = 1

    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      radius: 22, // Pinpoint fine interaction zone (shrunk down from 80)
      active: false
    }

    let prevMouseX = -2000
    let prevMouseY = -2000
    let mouseVx = 0
    let mouseVy = 0

    const count = rawParticleData.length
    const xArr = new Float32Array(count)
    const yArr = new Float32Array(count)
    const baseXArr = new Float32Array(count)
    const baseYArr = new Float32Array(count)
    const vxArr = new Float32Array(count)
    const vyArr = new Float32Array(count)
    const sizeArr = new Float32Array(count)
    const typeArr = new Uint8Array(count)

    // Position all 7,173 particles precisely matching the artwork layout
    const updateParticlePositions = () => {
      const isDesktop = width >= 768
      const focusX = isDesktop ? 0.62 : 0.50
      const focusY = isDesktop ? 0.44 : 0.52

      const containerRatio = width / height
      let renderW, renderH, offsetX, offsetY

      if (containerRatio > ARTWORK_RATIO) {
        renderW = width
        renderH = width / ARTWORK_RATIO
        offsetX = 0
        offsetY = (height - renderH) * focusY
      } else {
        renderH = height
        renderW = height * ARTWORK_RATIO
        offsetX = (width - renderW) * focusX
        offsetY = (height - renderH) * focusY
      }

      for (let i = 0; i < count; i++) {
        const [nx, ny, type] = rawParticleData[i]
        const bx = offsetX + nx * renderW
        const by = offsetY + ny * renderH

        baseXArr[i] = bx
        baseYArr[i] = by

        // If first run, set particle directly at base
        if (xArr[i] === 0 && yArr[i] === 0) {
          xArr[i] = bx
          yArr[i] = by
        }

        typeArr[i] = type

        if (type === 1) {
          // Central glowing spark
          sizeArr[i] = 2.4 + Math.random() * 1.6
        } else if (type === 0) {
          // Humanoid figures: crisp stipple grey dots
          sizeArr[i] = 1.6 + Math.random() * 1.2
        } else {
          // Ground dune stipples
          sizeArr[i] = 1.3 + Math.random() * 0.9
        }
      }
    }

    const handleResize = () => {
      if (!canvas.parentElement) return
      const rect = canvas.parentElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      updateParticlePositions()
    }

    handleResize()

    // Pointer Tracking
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.targetX = e.clientX - rect.left
      mouse.targetY = e.clientY - rect.top
      mouse.active = true
    }

    const handlePointerLeave = () => {
      mouse.targetX = -2000
      mouse.targetY = -2000
      mouse.active = false
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    canvas.addEventListener('pointerleave', handlePointerLeave)

    // Touch support for mobile devices
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const rect = canvas.getBoundingClientRect()
        mouse.targetX = e.touches[0].clientX - rect.left
        mouse.targetY = e.touches[0].clientY - rect.top
        mouse.active = true
      }
    }

    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('touchend', handlePointerLeave)

    // Modern Web Guidance: Pause loop when scrolled off-screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting
        if (isVisible && !animationFrameId) {
          render()
        }
      })
    }, { rootMargin: '100px' })

    observer.observe(canvas)

    const resizeObserver = new ResizeObserver(() => {
      handleResize()
    })
    resizeObserver.observe(canvas.parentElement)

    // 60-120 FPS Physics & Render Loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = null
        return
      }

      ctx.clearRect(0, 0, width, height)

      // Smooth mouse coordinate & velocity interpolation for wind physics
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.28
        mouse.y += (mouse.targetY - mouse.y) * 0.28
        if (prevMouseX > -1000) {
          mouseVx = mouse.x - prevMouseX
          mouseVy = mouse.y - prevMouseY
        }
        prevMouseX = mouse.x
        prevMouseY = mouse.y
      } else {
        mouse.x = -2000
        mouse.y = -2000
        prevMouseX = -2000
        prevMouseY = -2000
        mouseVx = 0
        mouseVy = 0
      }

      const time = performance.now() * 0.001
      const mActive = mouse.active && mouse.x > 0
      const mx = mouse.x
      const my = mouse.y
      const mRadius = mouse.radius
      const mRadiusSq = mRadius * mRadius

      // Physics update and point drawing
      for (let i = 0; i < count; i++) {
        let x = xArr[i]
        let y = yArr[i]
        let vx = vxArr[i]
        let vy = vyArr[i]
        const bx = baseXArr[i]
        const by = baseYArr[i]
        const type = typeArr[i]

        // 1. Cursor Wind Gust ("Ri7 dyal souri") - Tiny pinpoint radius, directional wind stream
        if (mActive) {
          const dx = mx - x
          const dy = my - y
          const distSq = dx * dx + dy * dy

          if (distSq < mRadiusSq && distSq > 0.05) {
            const dist = Math.sqrt(distSq)
            const influence = Math.pow(1 - dist / mRadius, 1.2)

            // Direct wind blowing along cursor travel direction ("ri7")
            vx += mouseVx * influence * 0.45
            vy += mouseVy * influence * 0.45

            // Organic wind flutter (swaying like grains of dust caught in a breeze)
            const flutter = Math.sin(time * 6.0 + i * 0.4) * 0.35 * influence
            vx += flutter
            vy += flutter * 0.6

            // Subtle gentle deflection without creating a circular crater/hole
            const softNudge = influence * 0.4
            vx -= (dx / dist) * softNudge
            vy -= (dy / dist) * softNudge
          }
        }

        // 2. Ambient Continuous Breeze ("Nsim d ri7" - natural atmospheric wind wave)
        const windWave = Math.sin(time * 1.5 + by * 0.015 + bx * 0.01)
        const ambientWindX = (Math.cos(time * 0.9 + by * 0.008) * 0.5 + 0.35) * (0.35 + windWave * 0.25)
        const ambientWindY = Math.sin(time * 1.2 + bx * 0.008) * 0.25

        vx += ambientWindX * 0.045
        vy += ambientWindY * 0.035

        // 3. Weightless Airborne Floating & Soft Return
        vx += (bx - x) * 0.024
        vy += (by - y) * 0.024

        // Silky Air Friction (allows particles to drift and coast like dust in the wind)
        vx *= 0.935
        vy *= 0.935

        x += vx
        y += vy

        xArr[i] = x
        yArr[i] = y
        vxArr[i] = vx
        vyArr[i] = vy

        // 3. Render Particle with Dynamic Color & Brightness
        const distFromBase = Math.hypot(x - bx, y - by)
        const isMoved = distFromBase > 1.2
        const sz = sizeArr[i]

        if (type === 1) {
          // Central Touch Spark: Radiant Amber / Gold
          const sparkAlpha = Math.min(1, 0.8 + distFromBase * 0.06)
          ctx.fillStyle = `rgba(255, ${Math.floor(135 + Math.random() * 65)}, 0, ${sparkAlpha})`
          ctx.fillRect(x - sz * 0.5, y - sz * 0.5, sz * 1.4, sz * 1.4)
        } else if (type === 0) {
          // Humanoid Figures: The Grey Points (Always Crisp Silvery Grey Dots)
          if (isMoved) {
            // Gentle luminous silver-white when moving in the wind (NO orange circle)
            ctx.fillStyle = 'rgba(242, 246, 255, 0.95)'
          } else {
            // Natural resting stipple grey dots
            ctx.fillStyle = 'rgba(215, 222, 235, 0.85)'
          }
          ctx.fillRect(x - sz * 0.5, y - sz * 0.5, sz, sz)
        } else {
          // Cosmic Dune: Fine Slate Grey Points
          if (isMoved) {
            ctx.fillStyle = 'rgba(200, 214, 232, 0.85)'
          } else {
            ctx.fillStyle = 'rgba(155, 170, 195, 0.65)'
          }
          ctx.fillRect(x - sz * 0.5, y - sz * 0.5, sz, sz)
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      window.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handlePointerLeave)
      observer.disconnect()
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
