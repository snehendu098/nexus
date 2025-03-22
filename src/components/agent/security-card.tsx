"use client"

import { useState } from "react"
import { Shield, Key, Clock, Copy, CheckCircle } from "lucide-react"

interface SecurityCardProps {
  publicKey: string
  privateKey: string
  createdOn: string
}

export function SecurityCard({ publicKey, privateKey, createdOn }: SecurityCardProps) {
  const [copiedPublic, setCopiedPublic] = useState(false)
  const [copiedPrivate, setCopiedPrivate] = useState(false)

  const copyToClipboard = (text: string, type: "public" | "private") => {
    navigator.clipboard.writeText(text)
    if (type === "public") {
      setCopiedPublic(true)
      setTimeout(() => setCopiedPublic(false), 2000)
    } else {
      setCopiedPrivate(true)
      setTimeout(() => setCopiedPrivate(false), 2000)
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-800/50 overflow-hidden hover:border-green-500/30 transition-all duration-500 hover:shadow-[0_0_25px_rgba(74,250,154,0.15)]">
      <div className="p-6 border-b border-gray-800/50 flex justify-between items-center">
        <div className="flex items-center">
          <Shield size={18} className="text-green-400 mr-2" />
          <h2 className="text-lg font-medium">Agent Security</h2>
        </div>
        <div className="text-xs px-2 py-1 rounded-full bg-green-400/10 text-green-400 border border-green-400/20">
          Secured
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="flex justify-between items-center group">
          <div className="flex items-center">
            <Key size={16} className="text-gray-500 mr-3 group-hover:text-green-400 transition-colors duration-300" />
            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              Public Key
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-mono bg-gray-800/80 px-3 py-1.5 rounded-lg mr-2 border border-gray-700/50">
              {publicKey}
            </span>
            <button
              onClick={() => copyToClipboard(publicKey, "public")}
              className="p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              {copiedPublic ? (
                <CheckCircle size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center group">
          <div className="flex items-center">
            <Key size={16} className="text-gray-500 mr-3 group-hover:text-green-400 transition-colors duration-300" />
            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              Private Key
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-mono bg-gray-800/80 px-3 py-1.5 rounded-lg mr-2 border border-gray-700/50">
              {privateKey}
            </span>
            <button
              onClick={() => copyToClipboard(privateKey, "private")}
              className="p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              {copiedPrivate ? (
                <CheckCircle size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center group">
          <div className="flex items-center">
            <Clock size={16} className="text-gray-500 mr-3 group-hover:text-green-400 transition-colors duration-300" />
            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              Created on
            </div>
          </div>
          <div className="text-sm bg-gray-800/80 px-3 py-1.5 rounded-lg border border-gray-700/50">{createdOn}</div>
        </div>
      </div>
    </div>
  )
}

