import { GridBackground } from "@/components/core/grid-background";

export default function CreateLoading() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <GridBackground />
      </div>

      {/* Enhanced Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-400/5 rounded-full blur-[150px] z-0 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] z-0" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] z-0" />

      {/* Loading Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Loading Spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-700 border-t-green-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 rounded-full bg-green-400/20 blur-xl -z-10"></div>
          </div>

          {/* Loading Text */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-2">Loading</h2>
            <p className="text-gray-400">
              Preparing agent creation interface...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
