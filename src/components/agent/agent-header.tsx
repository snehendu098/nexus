import Link from "next/link";
import { ArrowLeft, MessageSquare, Settings } from "lucide-react";
import { NexusAvatar } from "@/components/core/nexus-avatar";

interface AgentHeaderProps {
  agentName: string;
  agentId: string;
}

export function AgentHeader({ agentName, agentId }: AgentHeaderProps) {
  return (
    <div className="flex items-center mb-10 bg-gray-900/40 backdrop-blur-md p-4 rounded-2xl border border-gray-800/50 shadow-lg">
      <Link
        href="/"
        className="mr-4 p-2 rounded-full bg-gray-800/70 hover:bg-gray-700/70 transition-colors group"
      >
        <ArrowLeft
          size={20}
          className="text-gray-400 group-hover:text-green-400 transition-colors"
        />
      </Link>

      <div className="flex items-center">
        <div className="relative">
          <NexusAvatar size="medium" />
          <div className="absolute -inset-1 bg-green-400/20 rounded-full blur-md -z-10 opacity-70"></div>
        </div>
        <div className="ml-3">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
            {agentName}
          </h1>
          <p className="text-xs text-gray-400">Agent ID: {agentId}</p>
        </div>
      </div>

      <div className="ml-auto flex space-x-3">
        <Link
          href={`/agent/${agentId}/chat`}
          className="p-2.5 rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 hover:from-gray-700/90 hover:to-gray-800/90 border border-gray-700/50 transition-all duration-300 group shadow-lg"
        >
          <MessageSquare
            size={18}
            className="text-green-400 group-hover:scale-110 transition-transform duration-300"
          />
        </Link>
        <button className="p-2.5 rounded-xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 hover:from-gray-700/90 hover:to-gray-800/90 border border-gray-700/50 transition-all duration-300 group shadow-lg">
          <Settings
            size={18}
            className="text-gray-400 group-hover:text-green-400 group-hover:scale-110 transition-all duration-300"
          />
        </button>
      </div>
    </div>
  );
}
