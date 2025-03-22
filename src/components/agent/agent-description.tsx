interface AgentDescriptionProps {
  description: string
}

export function AgentDescription({ description }: AgentDescriptionProps) {
  return (
    <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/30">
      <h3 className="text-md font-medium mb-3 text-white/90">Description</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  )
}

