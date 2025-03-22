interface Token {
  name: string
  balance: string
  value: string
  icon: string
}

interface TokensListProps {
  tokens: Token[]
}

export function TokensList({ tokens }: TokensListProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-800/50 overflow-hidden hover:border-green-500/30 transition-all duration-500 hover:shadow-[0_0_25px_rgba(74,250,154,0.15)]">
      <div className="p-6 border-b border-gray-800/50 flex justify-between items-center">
        <h2 className="text-lg font-medium">Agent Tokens</h2>
        <div className="text-xs px-2 py-1 rounded-full bg-gray-800/70 text-gray-400 border border-gray-700/50">
          {tokens.length} tokens
        </div>
      </div>

      <div className="divide-y divide-gray-800/50">
        {tokens.map((token, index) => (
          <div
            key={index}
            className="p-5 flex items-center justify-between hover:bg-gray-800/30 transition-colors duration-300 group"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mr-4 border border-gray-700/50 group-hover:scale-110 transition-transform duration-300">
                <span className="text-lg">{token.icon}</span>
              </div>
              <div>
                <div className="font-medium group-hover:text-green-400 transition-colors duration-300">
                  {token.name}
                </div>
                <div className="text-sm text-gray-400">
                  {token.balance} {token.name}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                {token.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

