"use client";

import {
  Settings,
  Plus,
  MessageSquare,
  Info,
  Zap,
  Loader2,
} from "lucide-react";
import { GridBackground } from "@/components/core/grid-background";
import { NexusLogo } from "@/components/core/nexus-logo";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { ShadcnWallet } from "../core/shadcn-wallet";
import { Button } from "../ui/button";
import axios from "axios";

export default function AgentHome() {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { account, connected } = useWallet();

  useEffect(() => {
    setMounted(true);

    // Add overflow-hidden to body when no agents to prevent scrollbar
    if (!(agents.length > 0)) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [agents.length > 0]);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      if (account?.address.toString()) {
        const { data } = await axios.get(
          `/api/agents/all?ownerWallet=${account?.address.toString()}`
        );

        if (data.success) {
          setAgents(data.data);
          console.log(data);
        }
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account?.address.toString() && connected) {
      fetchAgents();
    }
  }, [account?.address.toString()]);

  return (
    <div
      className={`min-h-screen bg-black text-white flex flex-col items-center relative ${
        !(agents.length > 0) ? "overflow-hidden h-screen" : "overflow-x-hidden"
      } font-sans`}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 z-0">
        <GridBackground />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-400/5 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] z-0" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px] z-0" />

      {/* Logo - Taking 50% of screen height */}
      <div
        className={`flex items-center justify-center h-[45vh] w-full z-10 relative transition-opacity duration-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <NexusLogo />
      </div>

      {/* Tabs and Content - Taking remaining height */}
      <div
        className={`w-full max-w-6xl px-4 pb-8 z-10 relative transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } ${!(agents.length > 0) ? "h-[55vh] flex flex-col" : ""}`}
      >
        <div className="flex mb-6 justify-between items-center">
          {/* Conditional UI: Show "Create Agent" button only when agents exist */}
          {agents.length > 0 ? (
            <Link href="/create">
              <button className="flex items-center px-6 py-2.5 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-lg transition-all duration-300 hover:bg-gray-700/80 hover:border-gray-600/50 group">
                <Plus
                  size={16}
                  className="mr-2 text-green-400 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-medium">Create Agent</span>
              </button>
            </Link>
          ) : null}

          <div className=" ml-auto">{account && <ShadcnWallet />}</div>
        </div>

        {account && agents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {agents.map((agent) => (
              <MinimalistAgentCard
                key={agent._id}
                _id={agent._id}
                name={agent.displayName}
                description={agent.description}
                color={agent.color}
              />
            ))}
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center py-8 px-6 bg-gray-900/40 backdrop-blur-md rounded-xl border border-gray-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(74,250,154,0.1)] hover:border-gray-700/50">
            <div className="bg-gray-800/80 p-5 rounded-full mb-8 shadow-[0_0_20px_rgba(74,250,154,0.2)] animate-pulse">
              <Settings className="text-green-400 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-white/90">
              No Agents Found
            </h2>
            <p className="text-gray-400 text-center mb-10 max-w-md">
              Create your own agent to customize actions & instructions
            </p>

            {account && (
              <Link href="/create">
                <button
                  disabled={loading}
                  className={`relative bg-gradient-to-r from-green-500 to-emerald-400 text-black rounded-lg px-8 py-3.5 font-medium transition-all duration-300 overflow-hidden group shadow-lg shadow-green-500/20 hover:shadow-green-500/30 ${
                    isHovered ? "pl-12" : "pl-8"
                  }`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {!loading && (
                    <>
                      <span
                        className={`absolute left-0 top-0 h-full flex items-center transition-all duration-300 ${
                          isHovered
                            ? "opacity-100 translate-x-4"
                            : "opacity-0 -translate-x-4"
                        }`}
                      >
                        <Zap size={20} className="animate-pulse" />
                      </span>
                      <span
                        className={`transition-all duration-300 ${
                          isHovered ? "translate-x-2" : "translate-x-0"
                        }`}
                      >
                        Create Agent
                      </span>{" "}
                    </>
                  )}

                  {loading && (
                    <span className="flex items-center justify-center">
                      <Loader2 size={20} className="animate-spin" />
                    </span>
                  )}
                </button>
              </Link>
            )}

            {!account && <ShadcnWallet />}
          </div>
        )}
      </div>
    </div>
  );
}

function MinimalistAgentCard({ _id, name, description }: any) {
  return (
    <div className="group">
      <div className="relative bg-gray-900/40 backdrop-blur-md rounded-xl border border-gray-800/50 p-6 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(74,250,154,0.15)] overflow-hidden group-hover:translate-y-[-2px] group-hover:border-green-500/20 h-full flex flex-col">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(74,250,154,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Floating particles effect (decorative) */}
        <div className="absolute w-2 h-2 rounded-full bg-green-400/20 top-10 right-10 opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:transform group-hover:translate-y-[-10px]"></div>
        <div className="absolute w-1 h-1 rounded-full bg-green-400/30 bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 group-hover:transform group-hover:translate-y-[-5px]"></div>

        {/* Card content */}
        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-2 text-white/90 group-hover:text-white transition-colors duration-300 relative">
            {name}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-transparent group-hover:w-1/2 transition-all duration-500"></div>
          </h3>

          <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors duration-300 relative z-10">
            {description}
          </p>
        </div>

        {/* Always visible action buttons that enhance on hover */}
        <div className="mt-6 relative z-10 flex justify-end space-x-3">
          {/* Info button */}
          <Link href={`/agent/${_id}`}>
            <button className="inline-flex items-center justify-center rounded-full bg-gray-800/50 p-2 text-gray-500 hover:text-gray-300 transition-all duration-300 hover:bg-gray-700/80 cursor-pointer group-hover:scale-110">
              <Info size={16} className="transition-transform duration-300" />
            </button>
          </Link>

          {/* Chat button */}
          <Link href={`/agent/${_id}/chat`}>
            <button className="inline-flex items-center justify-center rounded-full bg-green-400/5 p-2 text-green-400/70 transition-all duration-300 hover:bg-green-400/20 hover:text-green-400 cursor-pointer group-hover:scale-110">
              <MessageSquare
                size={16}
                className="transition-transform duration-300"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
