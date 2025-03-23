"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { GridBackground } from "@/components/core/grid-background";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AgentDetailsForm } from "@/components/create/agent-details-form";
import { CreateNavigation } from "@/components/create/create-navigation";
import { ToolSelector } from "@/components/core/tool-selector";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export default function CreateAgentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    systemMessage: "",
    responseStyle: 50,
  });
  const [selectedTools, setSelectedTools] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("details");
  const [showPreview, setShowPreview] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const { account } = useWallet();

  // Check form validity
  useEffect(() => {
    const valid =
      formData.name.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.systemMessage.trim() !== "";
    setIsFormValid(valid);
  }, [formData]);

  // Animate in on mount
  useEffect(() => {
    setAnimateIn(true);
  }, []);

  // Add a sample markdown example to help users understand what they can do
  const addExampleMarkdown = () => {
    const exampleMarkdown = `
Your name is **Nexus (Agent)**.

## Behavioral Guidelines:
  1. NEVER be rude to user
  2. NEVER try to be over professional
  3. ALWAYS be friendly to the user
  4. NEVER act over politely
  4. ALWAYS be concise and to the point

## Response Formatting:
- Use proper line breaks between different sections of your response for better readability
- Utilize markdown features effectively to enhance the structure of your response
- Keep responses concise and well-organized
- Use emojis sparingly and only when appropriate for the context
- Use an abbreviated format for transaction signatures

## IMPORTANT POINTS:
- You are in your developement phase
- The development team will update you with more features
- Don't use tools when it is not necessary
- **Always try to provide short, clear and concise responses**
    `;

    setFormData((prev) => ({ ...prev, systemMessage: exampleMarkdown }));
    setShowPreview(true);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTool = (toolIndex: number) => {
    setSelectedTools((prev) => [...prev, toolIndex]);
  };

  const handleRemoveTool = (toolIndex: number) => {
    setSelectedTools((prev) => prev.filter((idx) => idx !== toolIndex));
  };

  const handleClearTools = () => {
    setSelectedTools([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalData = {
      displayName: formData.name,
      description: formData.description,
      instructions: formData.systemMessage,
      tools: [0, 1, 2, 3, 4, 5, 6, 7, 8].concat(selectedTools),
      ownerWallet: account?.address.toString(),
    };

    try {
      const { data } = await axios.post("/api/agents/create", finalData);

      if (!data.success) {
        toast({
          title: "Error",
          description: "Couldn't create agents",
          variant: "destructive",
        });
      } else {
        console.log(data);
        toast({
          title: "Success",
          description: "Agent created successfully",
        });
      }
    } catch (err: any) {
      console.log(err);

      toast({
        title: "Error",
        description: `Couldn't create agent: ${err.message}`,
        variant: "destructive",
      });
    }
  };

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

      {/* Content */}
      <div
        className={`relative z-10 container mx-auto px-4 py-12 transition-all duration-1000 ease-out ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 mb-6 group"
          >
            <ArrowLeft
              size={16}
              className="mr-2 group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-6xl font-bold mb-4 text-green-400">
            Create New Agent
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Configure your custom AI agent with the capabilities you need
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-3">
            <CreateNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onCancel={() => router.push("/")}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <form onSubmit={handleSubmit}>
              {/* Details Tab */}
              {activeTab === "details" && (
                <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-800/50 shadow-xl overflow-hidden">
                  <div className="p-8 border-b border-gray-800/50">
                    <h2 className="text-2xl font-semibold text-white">
                      Agent Details
                    </h2>
                    <p className="text-gray-400 mt-1">
                      Define your agent's identity and behavior
                    </p>
                  </div>

                  <div className="p-8">
                    <AgentDetailsForm
                      name={formData.name}
                      description={formData.description}
                      systemMessage={formData.systemMessage}
                      responseStyle={formData.responseStyle}
                      showPreview={showPreview}
                      onNameChange={(value) => handleInputChange("name", value)}
                      onDescriptionChange={(value) =>
                        handleInputChange("description", value)
                      }
                      onSystemMessageChange={(value) =>
                        handleInputChange("systemMessage", value)
                      }
                      onResponseStyleChange={(value) =>
                        handleInputChange("responseStyle", value)
                      }
                      onTogglePreview={setShowPreview}
                      onAddExampleMarkdown={addExampleMarkdown}
                    />
                  </div>

                  <div className="border-t border-gray-800/50 p-6 flex justify-end bg-gray-900/60">
                    <button
                      type="button"
                      className="px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center bg-green-400/10 text-green-400 hover:bg-green-400/20"
                      onClick={() => setActiveTab("tools")}
                    >
                      Next: Select Tools
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Tools Tab */}
              {activeTab === "tools" && (
                <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl border border-gray-800/50 shadow-xl overflow-hidden">
                  <div className="p-8 border-b border-gray-800/50">
                    <h2 className="text-2xl font-semibold text-white">
                      Tools & Capabilities
                    </h2>
                    <p className="text-gray-400 mt-1">
                      Select the tools your agent can use
                    </p>
                  </div>

                  <div className="p-8">
                    <ToolSelector
                      selectedTools={selectedTools}
                      onAddTool={handleAddTool}
                      onRemoveTool={handleRemoveTool}
                      onClearTools={handleClearTools}
                    />
                  </div>

                  <div className="border-t border-gray-800/50 p-6 flex justify-between bg-gray-900/60">
                    <button
                      type="button"
                      className="px-6 py-3 border border-gray-700/50 rounded-xl text-gray-300 hover:bg-gray-800/50 transition-all duration-300 flex items-center"
                      onClick={() => setActiveTab("details")}
                    >
                      <svg
                        className="mr-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Back
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-400 text-black rounded-xl font-medium hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center"
                    >
                      <Sparkles className="mr-2 w-4 h-4" />
                      Create Agent
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
