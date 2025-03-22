import { GridBackground } from "@/components/core/grid-background";

export default function AgentInfoLoading() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <GridBackground />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-400/5 rounded-full blur-[150px] z-0" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] z-0" />

      {/* Loading UI */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 rounded-full bg-gray-800/70 animate-pulse"></div>
          <div className="h-8 w-48 bg-gray-800/70 rounded-md ml-4 animate-pulse"></div>
          <div className="ml-auto flex space-x-2">
            <div className="w-10 h-10 rounded-full bg-gray-800/70 animate-pulse"></div>
            <div className="w-10 h-10 rounded-full bg-gray-800/70 animate-pulse"></div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800/50 p-4 animate-pulse"
                >
                  <div className="h-4 w-24 bg-gray-800 rounded mb-2"></div>
                  <div className="h-6 w-16 bg-gray-800 rounded"></div>
                </div>
              ))}
            </div>

            {/* Tokens List */}
            <div className="bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800/50 overflow-hidden">
              <div className="p-4 border-b border-gray-800/50">
                <div className="h-6 w-32 bg-gray-800 rounded animate-pulse"></div>
              </div>

              <div>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-4 border-b border-gray-800/50 flex justify-between animate-pulse"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-800 mr-3"></div>
                      <div>
                        <div className="h-4 w-16 bg-gray-800 rounded mb-2"></div>
                        <div className="h-3 w-24 bg-gray-800 rounded"></div>
                      </div>
                    </div>
                    <div className="h-4 w-20 bg-gray-800 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7">
            <div className="bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800/50 overflow-hidden">
              <div className="p-6 border-b border-gray-800/50">
                <div className="h-6 w-48 bg-gray-800 rounded animate-pulse"></div>
              </div>

              <div className="p-6 space-y-6">
                {/* Keys */}
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center animate-pulse"
                    >
                      <div className="h-4 w-24 bg-gray-800 rounded"></div>
                      <div className="h-4 w-48 bg-gray-800 rounded"></div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="space-y-2 animate-pulse">
                  <div className="h-4 w-full bg-gray-800 rounded"></div>
                  <div className="h-4 w-full bg-gray-800 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-800 rounded"></div>
                </div>

                {/* Instructions */}
                <div className="animate-pulse">
                  <div className="h-5 w-40 bg-gray-800 rounded mb-3"></div>
                  <div className="h-32 w-full bg-gray-800/50 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
