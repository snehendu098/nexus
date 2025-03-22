"use client"

interface NexusAvatarProps {
  size?: "small" | "medium" | "large"
}

export function NexusAvatar({ size = "medium" }: NexusAvatarProps) {
  // Determine dimensions based on size prop
  const getDimensions = () => {
    switch (size) {
      case "small":
        return {
          width: 24,
          height: 24,
          fontSize: 12,
          glowSize: "10px",
        }
      case "large":
        return {
          width: 80,
          height: 80,
          fontSize: 40,
          glowSize: "30px",
        }
      case "medium":
      default:
        return {
          width: 40,
          height: 40,
          fontSize: 20,
          glowSize: "15px",
        }
    }
  }

  const { width, height, fontSize, glowSize } = getDimensions()

  return (
    <div
      className="relative flex items-center justify-center rounded-full bg-green-400"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        boxShadow: `0 0 ${glowSize} rgba(74, 250, 154, 0.3)`,
      }}
    >
      <span className="font-bold text-black" style={{ fontSize: `${fontSize}px` }}>
        N
      </span>
    </div>
  )
}

