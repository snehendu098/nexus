"use client";

import { useState } from "react";
import { Search, X, Plus, Check, PenToolIcon as Tool } from "lucide-react";

// Define the tools array here so it can be imported by other components
export const availableTools = [
  {
    id: "web-search",
    name: "Web Search",
    description: "Search the web for real-time information",
    category: "search",
  },
  {
    id: "code-interpreter",
    name: "Code Interpreter",
    description: "Execute code and analyze data",
    category: "development",
  },
  {
    id: "image-generation",
    name: "Image Generation",
    description: "Generate images from text descriptions",
    category: "media",
  },
  {
    id: "text-analysis",
    name: "Text Analysis",
    description: "Analyze text for sentiment, entities, and more",
    category: "analysis",
  },
  {
    id: "data-visualization",
    name: "Data Visualization",
    description: "Create charts and graphs from data",
    category: "data",
  },
  {
    id: "file-management",
    name: "File Management",
    description: "Upload, download, and manage files",
    category: "utility",
  },
  {
    id: "translation",
    name: "Translation",
    description: "Translate text between languages",
    category: "communication",
  },
  {
    id: "summarization",
    name: "Summarization",
    description: "Summarize long texts into concise points",
    category: "analysis",
  },
];

// Update the interface to use indices
interface ToolSelectorProps {
  selectedTools: number[]; // Indices of selected tools
  onAddTool: (toolIndex: number) => void;
  onRemoveTool: (toolIndex: number) => void;
  onClearTools?: () => void; // Optional for the agent/[id] page
  compact?: boolean; // Optional prop to control display density
}

export function ToolSelector({
  selectedTools,
  onAddTool,
  onRemoveTool,
  onClearTools,
  compact = false,
}: ToolSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);

  // Filter tools based on search query only, not on selection status
  const filteredTools = availableTools.filter((tool) => {
    // Filter based on search query
    const query = searchQuery.toLowerCase();
    return (
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      (tool.category && tool.category.toLowerCase().includes(query))
    );
  });

  // Helper function to get tool name from index
  const getToolName = (toolIndex: number) => {
    const tool = availableTools[toolIndex];
    return tool ? tool.name : `Tool ${toolIndex}`;
  };

  return (
    <div className={compact ? "" : "mb-8"}>
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-gray-800/80 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 text-white shadow-sm"
        />
      </div>

      {/* Selected Tools Display */}
      {selectedTools.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-white">
              Selected Tools ({selectedTools.length})
            </h3>
            {onClearTools && (
              <button
                type="button"
                onClick={onClearTools}
                className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-300 bg-gray-800/70 px-3 py-1.5 rounded-md hover:bg-gray-800"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedTools.map((toolIndex) => (
              <div
                key={`selected-${toolIndex}`}
                className="bg-gray-800/80 text-white text-sm px-3 py-1.5 rounded-lg flex items-center"
              >
                <Tool size={14} className="mr-1.5 text-green-400" />
                {getToolName(toolIndex)}
                <button
                  type="button"
                  onClick={() => onRemoveTool(toolIndex)}
                  className="ml-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar mt-6">
        {filteredTools.map((tool) => {
          const actualIndex = availableTools.indexOf(tool);
          const isSelected = selectedTools.includes(actualIndex);
          const isHovered = hoveredTool === actualIndex;

          return (
            <button
              key={actualIndex}
              type="button"
              className={`w-full text-left relative p-5 rounded-xl border transition-all duration-300 
                ${
                  isSelected
                    ? "bg-green-400/10 border-green-400/30 hover:bg-green-400/20 hover:border-green-400/50 hover:shadow-[0_0_15px_rgba(74,250,154,0.15)]"
                    : "bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/60 hover:border-gray-600/50"
                }`}
              onClick={() => {
                if (isSelected) {
                  onRemoveTool(actualIndex);
                } else {
                  onAddTool(actualIndex);
                }
              }}
              onMouseEnter={() => setHoveredTool(actualIndex)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3
                    className={`font-medium mb-2 transition-colors duration-300 ${
                      isSelected ? "text-green-400" : "text-white"
                    }`}
                  >
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-400">{tool.description}</p>
                </div>
                {!compact && (
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 
                      ${
                        isSelected
                          ? "bg-green-400/20 border border-green-400/30"
                          : isHovered
                          ? "bg-gray-700/80 border border-gray-500"
                          : "bg-gray-700 border border-gray-600"
                      }`}
                  >
                    {isSelected ? (
                      <Check
                        size={14}
                        className={`text-green-400 ${
                          isHovered ? "scale-110" : ""
                        } transition-transform duration-300`}
                      />
                    ) : (
                      <Plus
                        size={14}
                        className={`${
                          isHovered
                            ? "text-green-400 scale-110"
                            : "text-gray-400"
                        } transition-all duration-300`}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Add a subtle glow effect for selected items */}
              {isSelected && (
                <div className="absolute inset-0 rounded-xl bg-green-400/5 pointer-events-none"></div>
              )}

              {/* Add a subtle highlight effect on hover */}
              {isHovered && !isSelected && (
                <div className="absolute inset-0 rounded-xl bg-gray-700/10 pointer-events-none"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
