import React, { useState, useEffect, useRef, useCallback } from 'react'

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@$!%*&',
  className = '',
  parentClassName = '',
  encryptedClassName = 'text-[#FF5500]',
  animateOn = 'hover', // 'hover' | 'view'
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef(null)

  const triggerAnimation = useCallback(() => {
    setIsAnimating(true)

    let iteration = 0
    const chars = text.split('')
    const totalLength = chars.length
    const pool = characters.split('')

    const interval = setInterval(() => {
      iteration++

      setDisplayText(() => {
        return chars
          .map((char, index) => {
            if (char === ' ') return ' '

            let shouldReveal = false
            if (sequential) {
              if (revealDirection === 'start') {
                shouldReveal = index < (iteration / maxIterations) * totalLength
              } else {
                shouldReveal = index > totalLength - (iteration / maxIterations) * totalLength
              }
            } else {
              shouldReveal = Math.random() < iteration / maxIterations
            }

            if (shouldReveal || iteration >= maxIterations) {
              return char
            }

            return pool[Math.floor(Math.random() * pool.length)]
          })
          .join('')
      })

      if (iteration >= maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setIsAnimating(false)
      }
    }, speed)
  }, [text, speed, maxIterations, sequential, revealDirection, characters])

  // Trigger on view using IntersectionObserver
  useEffect(() => {
    if (animateOn !== 'view') return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          triggerAnimation()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animateOn, triggerAnimation])

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (animateOn === 'hover') {
      triggerAnimation()
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block select-none cursor-default ${parentClassName}`}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={isAnimating && isHovered ? encryptedClassName : className}>
        {displayText}
      </span>
    </span>
  )
}
