import { Wallet, PenToolIcon as Tool } from "lucide-react"

interface StatsCardsProps {
  funds: string
  toolsCount: number
}

export function StatsCards({ funds, toolsCount }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Total Funds */}
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-800/50 p-6 hover:border-green-500/30 transition-all duration-500 hover:shadow-[0_0_25px_rgba(74,250,154,0.15)] group">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-500/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-500">
            <Wallet size={18} className="text-green-400" />
          </div>
          <span className="text-sm text-gray-400 font-medium">Total funds</span>
        </div>
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
          ${funds}
        </div>
      </div>

      {/* Tools Count */}
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-800/50 p-6 hover:border-green-500/30 transition-all duration-500 hover:shadow-[0_0_25px_rgba(74,250,154,0.15)] group">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-500/10 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-500">
            <Tool size={18} className="text-green-400" />
          </div>
          <span className="text-sm text-gray-400 font-medium">Tools</span>
        </div>
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
          {toolsCount}
        </div>
      </div>
    </div>
  )
}

