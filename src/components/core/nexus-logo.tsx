"use client"

import { useEffect, useRef } from "react"

export function NexusLogo() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const letters = "Nexus".split("")
    container.innerHTML = ""

    letters.forEach((letter, i) => {
      const span = document.createElement("span")
      span.textContent = letter
      span.className = "inline-block transition-all duration-700 opacity-0 translate-y-8 filter blur-sm"
      span.style.animationDelay = `${i * 150}ms`
      span.style.animationFillMode = "forwards"

      // Add animation class after a small delay
      setTimeout(
        () => {
          span.classList.remove("opacity-0", "translate-y-8", "blur-sm")
          span.classList.add("opacity-100", "translate-y-0", "blur-0")
        },
        100 + i * 150,
      )

      container.appendChild(span)
    })

    // Add hover effect to each letter
    const spans = container.querySelectorAll("span")
    spans.forEach((span) => {
      span.addEventListener("mouseover", () => {
        span.classList.add("text-green-300", "scale-110")
      })
      span.addEventListener("mouseout", () => {
        span.classList.remove("text-green-300", "scale-110")
      })
    })
  }, [])

  return (
    <div className="relative">
      <h1 ref={containerRef} className="text-7xl md:text-8xl font-bold tracking-wider text-green-400">
        Nexus
      </h1>
      <div className="absolute -inset-4 bg-green-400/20 rounded-full blur-3xl -z-10"></div>
    </div>
  )
}

