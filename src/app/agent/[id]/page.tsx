"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { GridBackground } from "@/components/core/grid-background";
import Link from "next/link";
import { AgentHeader } from "@/components/agent/agent-header";
import { StatsCards } from "@/components/agent/stats-cards";
import { SecurityCard } from "@/components/agent/security-card";
import { TokensList } from "@/components/agent/tokens-list";
import { ToolsList } from "@/components/agent/tools-list";
import { AgentDetailsCard } from "@/components/agent/agent-details-card";

export default function AgentInfoPage() {
  const params = useParams();
  const agentId = params.id as string;
  const [agent, setAgent] = useState<any>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // if (!agent) {
  //   return (
  //     <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
  //       <div className="text-2xl font-bold mb-4">Agent not found</div>
  //       <Link href="/" className="text-green-400 hover:underline">
  //         Return to Dashboard
  //       </Link>
  //     </div>
  //   );
  // }

  const handleSaveTools = (tools: number[]) => {
    setAgent((prev: any) => ({ ...prev, tools }));
  };

  const handleSaveInstructions = (instructions: string) => {
    setAgent((prev: any) => ({ ...prev, instructions }));
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Enhanced Grid Background with more visible lines */}
      <div className="absolute inset-0 z-0 opacity-50">
        <GridBackground />
      </div>

      {/* Enhanced Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-green-400/10 to-blue-500/5 rounded-full blur-[150px] z-0 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-purple-500/10 to-blue-500/5 rounded-full blur-[120px] z-0" />
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-amber-500/5 to-purple-500/5 rounded-full blur-[100px] z-0" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <AgentHeader agentName={agent?.name || ""} agentId={agentId} />

        {/* Main Content - Grid Layout with premium styling */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Stats and Tokens */}
          <div className="lg:col-span-5 space-y-8">
            {/* Stats Cards */}
            <StatsCards
              funds={agent?.funds || ""}
              toolsCount={agent?.tools.length || 0}
            />

            {/* Security Card */}
            <SecurityCard
              publicKey={agent?.publicKey || ""}
              privateKey={agent?.privateKey || ""}
              createdOn={agent?.createdOn || ""}
            />

            {/* Tokens List */}
            <TokensList tokens={agent?.tokens || []} />

            {/* Tools List */}
            <ToolsList
              tools={agent?.tools || []}
              onSaveTools={handleSaveTools}
            />
          </div>

          {/* Right Column - About Agent */}
          <AgentDetailsCard
            agentName={agent?.name || ""}
            agentId={agentId}
            description={agent?.description || ""}
            instructions={agent?.instructions || ""}
            onSaveInstructions={handleSaveInstructions}
          />
        </div>
      </div>
    </div>
  );
}
