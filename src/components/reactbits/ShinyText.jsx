import React from 'react'

export default function ShinyText({
  text,
  children,
  color = '#FFFFFF',
  shineColor = '#FF7722',
  speed = 4.5,
  className = '',
}) {
  const content = children ?? text

  return (
    <span
      className={`relative inline-block font-inherit bg-clip-text text-transparent bg-no-repeat bg-[length:250%_100%] animate-shine ${className}`}
      style={{
        backgroundImage: `linear-gradient(110deg, ${color} 30%, ${shineColor} 50%, ${color} 70%)`,
        animationDuration: `${speed}s`,
      }}
    >
      {content}
    </span>
  )
}

