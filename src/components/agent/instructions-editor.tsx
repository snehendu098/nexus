"use client"

import { useState, useRef, useEffect } from "react"
import { Edit3, Save, X, Info, Eye, Code } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface InstructionsEditorProps {
  instructions: string
  onSaveInstructions: (instructions: string) => void
}

export function InstructionsEditor({ instructions, onSaveInstructions }: InstructionsEditorProps) {
  const [editingInstructions, setEditingInstructions] = useState(false)
  const [editedInstructions, setEditedInstructions] = useState(instructions)
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false)
  const instructionsRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    // Auto-resize textarea when editing instructions
    if (editingInstructions && instructionsRef.current && !showMarkdownPreview) {
      instructionsRef.current.style.height = "auto"
      instructionsRef.current.style.height = `${instructionsRef.current.scrollHeight}px`
    }
  }, [editingInstructions, editedInstructions, showMarkdownPreview])

  const handleSaveInstructions = () => {
    onSaveInstructions(editedInstructions)
    setEditingInstructions(false)
    setShowMarkdownPreview(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-medium text-white/90">Agent Instructions</h3>
        {!editingInstructions ? (
          <button
            onClick={() => setEditingInstructions(true)}
            className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-green-400 transition-colors bg-gray-800/70 hover:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700/50"
          >
            <Edit3 size={14} />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditingInstructions(false)
                setEditedInstructions(instructions)
                setShowMarkdownPreview(false)
              }}
              className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-red-400 transition-colors bg-gray-800/70 hover:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700/50"
            >
              <X size={14} />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSaveInstructions}
              className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-green-400 transition-colors bg-gray-800/70 hover:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700/50"
            >
              <Save size={14} />
              <span>Save</span>
            </button>
          </div>
        )}
      </div>

      {editingInstructions ? (
        <div className="border border-gray-700/50 rounded-xl overflow-hidden shadow-lg">
          {/* Edit/Preview Toggle */}
          <div className="flex border-b border-gray-700/50">
            <button
              onClick={() => setShowMarkdownPreview(false)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm ${
                !showMarkdownPreview ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              <Code size={14} />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setShowMarkdownPreview(true)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm ${
                showMarkdownPreview ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              <Eye size={14} />
              <span>Preview</span>
            </button>
          </div>

          {/* Edit/Preview Content */}
          {showMarkdownPreview ? (
            <div className="p-5 bg-gray-800/50 min-h-[250px] max-h-[500px] overflow-y-auto custom-scrollbar">
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{editedInstructions}</ReactMarkdown>
              </div>
            </div>
          ) : (
            <textarea
              ref={instructionsRef}
              value={editedInstructions}
              onChange={(e) => setEditedInstructions(e.target.value)}
              className="w-full bg-gray-800/50 border-none p-5 text-sm text-gray-300 focus:outline-none focus:ring-0 min-h-[250px] max-h-[500px] font-mono resize-none"
              placeholder="Enter instructions for this agent using Markdown..."
            />
          )}

          {/* Markdown Help */}
          <div className="p-3 border-t border-gray-700/50 bg-gray-800/30">
            <div className="text-xs text-gray-400 flex items-center">
              <Info size={12} className="mr-1.5" />
              <span>
                Supports Markdown: # Heading, **bold**, *italic*, `code`, \`\`\`code blocks\`\`\`, &gt; quotes, - lists
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/30 border border-gray-700/50 rounded-xl p-5 text-sm text-gray-300 prose prose-invert prose-sm max-w-none shadow-lg">
          <ReactMarkdown>{instructions}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}

