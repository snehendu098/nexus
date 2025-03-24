"use client";

import { useState } from "react";
import { Edit3, Save, X, PenToolIcon as Tool } from "lucide-react";
import { ToolSelector } from "@/components/core/tool-selector";
import { availableTools } from "@/utils/constants";

interface ToolsListProps {
  tools: number[]; // Changed from string[] to number[]
  onSaveTools: (tools: number[]) => void; // Changed from tools: string[] to tools: number[]
}

export function ToolsList({ tools, onSaveTools }: ToolsListProps) {
  const [editingTools, setEditingTools] = useState(false);
  const [editedTools, setEditedTools] = useState<number[]>(tools);

  const handleSaveTools = () => {
    onSaveTools(editedTools);
    setEditingTools(false);
  };

  const handleAddTool = (toolIndex: number) => {
    if (!editedTools.includes(toolIndex)) {
      setEditedTools((prev) => [...prev, toolIndex]);
    }
  };

  const handleRemoveTool = (toolIndex: number) => {
    setEditedTools((prev) => prev.filter((idx) => idx !== toolIndex));
  };

  // Helper function to get tool name from index
  const getToolName = (toolIndex: number) => {
    const tool = availableTools[toolIndex];
    return tool ? tool.name : `Tool ${toolIndex}`;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-800/50 overflow-hidden hover:border-green-500/30 transition-all duration-500 hover:shadow-[0_0_25px_rgba(74,250,154,0.15)]">
      <div className="p-6 border-b border-gray-800/50 flex justify-between items-center">
        <h2 className="text-lg font-medium">Agent Tools</h2>
        {!editingTools ? (
          <button
            onClick={() => setEditingTools(true)}
            className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-green-400 transition-colors bg-gray-800/70 hover:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700/50"
          >
            <Edit3 size={14} />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditingTools(false);
                setEditedTools([...tools]);
              }}
              className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors bg-gray-800/70 hover:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700/50"
            >
              <X size={14} />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSaveTools}
              className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-green-400 transition-colors bg-gray-800/70 hover:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700/50"
            >
              <Save size={14} />
              <span>Save</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        {editingTools ? (
          // Edit mode - use the core ToolSelector component
          <ToolSelector
            selectedTools={editedTools}
            onAddTool={handleAddTool}
            onRemoveTool={handleRemoveTool}
            compact={true}
          />
        ) : (
          // Display mode - just show the tools with premium styling
          <div className="flex flex-wrap gap-3">
            {tools.map((toolIndex) => (
              <div
                key={toolIndex}
                className="px-4 py-2 bg-gradient-to-br from-gray-800/80 to-gray-900/80 text-green-400 rounded-xl text-sm flex items-center border border-gray-700/50 hover:border-green-400/30 transition-all duration-300 hover:shadow-[0_0_10px_rgba(74,250,154,0.15)] group"
              >
                <Tool
                  size={14}
                  className="mr-2 group-hover:scale-110 transition-transform duration-300"
                />
                {getToolName(toolIndex)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
