"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { GridBackground } from "@/components/core/grid-background";
import { Settings, Send } from "lucide-react";
import Link from "next/link";
import { NexusAvatar } from "@/components/core/nexus-avatar";
import { redirect, useParams } from "next/navigation";
import axios from "axios";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import ChatLoading from "./loading";
import { reactiveAgent } from "@/utils/agent";
import { HumanMessage } from "@langchain/core/messages";
import ReactMarkdown from "react-markdown";

type Message = {
  _id: string;
  message: string;
  type: "user" | "ai";
};

export default function AgentChatPage() {
  const params = useParams();
  const agentId = params.id as string;

  const [agentData, setAgentData] = useState<any>({});
  const [messages, setMessages] = useState<any[]>([]);
  const [runtimeMessage, setRuntimeMessage] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { account } = useWallet();

  async function fetchChatsForAgent() {
    setLoading(true);
    try {
      if (account?.address.toString()) {
        const { data } = await axios.get(
          `/api/chats/${agentId}?ownerWallet=${account?.address.toString()}`
        );

        if (data.success) {
          console.log(data);
          setAgentData(data.data.agent);
          setMessages(data.data.chats);
        } else {
          redirect("/");
        }
      } else {
        redirect("/");
      }
    } catch (err) {
      console.log(err);
      redirect("/");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchChatsForAgent();
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "24px";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    console.log("agent", agentData);
    const agent = await reactiveAgent(agentData);
    console.log("agent");

    const userMessage = {
      message: inputValue,
      type: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const stream = await agent.stream(
      {
        messages: [new HumanMessage(inputValue)],
      },
      {
        configurable: {
          thread_id: agentData._id,
        },
      }
    );

    for await (const chunk of stream) {
      if ("agent" in chunk) {
        if (typeof chunk.agent.messages[0].content === "string") {
          const aiMessage: Message = {
            _id: (Date.now() + 1).toString(),
            message: chunk.agent.messages[0].content as string,
            type: "ai",
          };

          setMessages((prev) => [...prev, aiMessage]);
          setIsTyping(false);
          setRuntimeMessage("");
        } else {
          setRuntimeMessage(chunk.agent.messages[0].content[0].text);
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return !loading ? (
    <div className="min-h-screen h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Grid Background with increased opacity */}
      <div className="absolute inset-0 z-0 opacity-70">
        <GridBackground />
      </div>

      {/* Subtle glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-400/5 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] z-0" />

      {/* Header - Fixed at top */}
      <header className="fixed top-0 left-0 right-0 z-20 border-b border-gray-800/70 backdrop-blur-md bg-black/80">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800/70 hover:bg-gray-700/70 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-green-400 flex items-center justify-center">
                <span className="text-black font-bold">N</span>
              </div>
              <span className="font-medium text-green-400">
                {agentData.displayName || "Nexus"}
              </span>
            </div>
          </div>

          <Link href={`/${agentId}`}>
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-800/70 hover:bg-gray-700/70 transition-colors">
              <Settings size={16} className="text-gray-400" />
            </button>
          </Link>
        </div>
      </header>

      {/* Main Chat Area - Adjusted for fixed header and input */}
      <main className="flex-grow flex flex-col relative z-10 w-full overflow-hidden pt-16 pb-32">
        {messages.length === 0 && !isTyping ? (
          <div
            className={`flex-grow flex flex-col items-center justify-center transition-opacity duration-1000 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mb-6">
              <NexusAvatar size="large" />
            </div>
            <h1 className="text-2xl font-medium text-white mb-2 text-center">
              Can I help you with anything?
            </h1>
            <p className="text-gray-400 text-center max-w-md text-sm">
              I'm {agentData.displayName}. Let's get started!
            </p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto custom-scrollbar h-full w-full">
            <div className="max-w-5xl mx-auto px-4 w-full">
              <div className="space-y-6 pb-4">
                {messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] prose prose-invert prose-sm md:max-w-[70%] rounded-2xl px-4 py-3 backdrop-blur-sm ${
                        message.type === "user"
                          ? "bg-green-400/5 text-white border border-green-400/10"
                          : "bg-gray-900/40 border border-gray-800/30"
                      }`}
                    >
                      <ReactMarkdown>{message.message}</ReactMarkdown>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start items-center">
                    <div className="max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 bg-gray-900/40 backdrop-blur-sm border border-gray-800/30">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                    <p className="ml-2 text-xs text-white/60 animate-pulse">
                      {runtimeMessage}
                    </p>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Input Area - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-md pt-2 pb-4">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative rounded-2xl bg-gray-900/50 backdrop-blur-md border border-gray-800/50 shadow-lg">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-white resize-none py-4 px-4 pr-24 max-h-32 overflow-y-auto custom-scrollbar"
              style={{ minHeight: "24px" }}
            />

            <div className="absolute right-2 bottom-2 flex items-center">
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  inputValue.trim()
                    ? "bg-green-400 text-black hover:bg-green-500"
                    : "bg-gray-700 text-gray-500"
                }`}
              >
                <Send size={14} />
              </button>
            </div>
          </div>

          <div className="text-center mt-3">
            <p className="text-xs text-gray-500">
              Nexus AI may generate inaccurate information. We recommend
              checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <ChatLoading />
  );
}
