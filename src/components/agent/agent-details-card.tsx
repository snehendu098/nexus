import Link from "next/link"
import { MessageSquare } from "lucide-react"
import { AgentDescription } from "./agent-description"
import { InstructionsEditor } from "./instructions-editor"

interface AgentDetailsCardProps {
  agentName: string
  agentId: string
  description: string
  instructions: string
  onSaveInstructions: (instructions: string) => void
}

export function AgentDetailsCard({
  agentName,
  agentId,
  description,
  instructions,
  onSaveInstructions,
}: AgentDetailsCardProps) {
  return (
    <div className="lg:col-span-7">
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-800/50 overflow-hidden hover:border-green-500/30 transition-all duration-500 hover:shadow-[0_0_25px_rgba(74,250,154,0.15)]">
        <div className="p-6 border-b border-gray-800/50">
          <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
            About {agentName}
          </h2>
        </div>

        <div className="p-6 space-y-8">
          {/* Agent Description */}
          <AgentDescription description={description} />

          {/* Agent Instructions */}
          <InstructionsEditor instructions={instructions} onSaveInstructions={onSaveInstructions} />
        </div>

        <div className="p-5 border-t border-gray-800/50 bg-gray-900/40">
          <p className="text-xs text-gray-500">
            Agent information is provided for informational purposes only. Nexus makes no representation as to the
            accuracy of the information.
          </p>
        </div>
      </div>

      {/* Action Buttons with premium styling */}
      <div className="mt-8 flex justify-end">
        <Link href={`/agent/${agentId}/chat`}>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-400 text-black font-medium hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center gap-2 transform hover:translate-y-[-2px]">
            <MessageSquare size={18} />
            <span>Chat with Agent</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

