"use client"

interface CreateNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onCancel: () => void
}

export function CreateNavigation({ activeTab, onTabChange, onCancel }: CreateNavigationProps) {
  return (
    <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-800/50 shadow-xl overflow-hidden sticky top-8">
      <div className="p-4 border-b border-gray-800/50">
        <h2 className="text-lg font-medium text-white">Agent Setup</h2>
        <p className="text-xs text-gray-400 mt-1">Complete all sections</p>
      </div>

      <div className="p-2">
        <button
          type="button"
          onClick={() => onTabChange("details")}
          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center ${
            activeTab === "details" ? "bg-green-400/10 text-green-400" : "text-gray-300 hover:bg-gray-800/70"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-medium ${
              activeTab === "details" ? "bg-green-400 text-black" : "bg-gray-800 text-gray-400 border border-gray-700"
            }`}
          >
            1
          </div>
          <div>
            <div className="font-medium">Agent Details</div>
            <div className="text-xs text-gray-400">Name, description & instructions</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("tools")}
          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center mt-2 ${
            activeTab === "tools" ? "bg-green-400/10 text-green-400" : "text-gray-300 hover:bg-gray-800/70"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-medium ${
              activeTab === "tools" ? "bg-green-400 text-black" : "bg-gray-800 text-gray-400 border border-gray-700"
            }`}
          >
            2
          </div>
          <div>
            <div className="font-medium">Tools & Capabilities</div>
            <div className="text-xs text-gray-400">Select agent abilities</div>
          </div>
        </button>
      </div>

      <div className="p-4 mt-4 border-t border-gray-800/50">
        <button
          type="button"
          onClick={onCancel}
          className="w-full px-4 py-2.5 border border-gray-700/50 rounded-xl text-gray-300 hover:bg-gray-800/50 transition-all duration-300 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

