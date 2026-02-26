"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { X, Sparkles } from "lucide-react"

interface ModelChip {
  id: string
  name: string
  category: "feature" | "model"
  highlighted?: boolean
}

const featureChips: ModelChip[] = [
  { id: "online", name: "Online", category: "feature" },
  { id: "genius", name: "Genius", category: "feature" },
  { id: "super-genius", name: "Super Genius", category: "feature" },
  { id: "online-genius", name: "Online Genius", category: "feature" },
  { id: "deep-research", name: "Deep Research", category: "feature" },
  { id: "deepseek", name: "DeepSeek V3.2", category: "feature", highlighted: true },
]

const modelChips: ModelChip[] = [
  { id: "gemini-flash", name: "Gemini 2.5 Flash Lite", category: "model", highlighted: true },
  { id: "gemini-pro", name: "Gemini 3 Pro", category: "model" },
  { id: "claude", name: "Claude 4.5 Opus", category: "model" },
  { id: "chatgpt", name: "ChatGPT 4o", category: "model" },
  { id: "grok", name: "Grok 4", category: "model" },
  { id: "gpt5", name: "GPT-5.2", category: "model" },
]

export function ModelChips() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["online"])
  const [selectedModel, setSelectedModel] = useState<string>("gemini-flash")

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-3xl mx-auto animate-fade-in">
      {/* Feature chips */}
      <div className="flex flex-wrap justify-center gap-2">
        {featureChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => toggleFeature(chip.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm",
              "border transition-all duration-200",
              selectedFeatures.includes(chip.id)
                ? "bg-chip-active text-primary-foreground border-chip-active glow-sm"
                : chip.highlighted
                  ? "bg-chip border-primary/50 text-chip-foreground hover:bg-chip-hover hover:border-primary"
                  : "bg-chip border-border text-chip-foreground hover:bg-chip-hover"
            )}
          >
            {chip.highlighted && <Sparkles className="w-3 h-3" />}
            {chip.name}
            {selectedFeatures.includes(chip.id) && (
              <X className="w-3 h-3 ml-1" />
            )}
          </button>
        ))}
      </div>

      {/* Model chips */}
      <div className="flex flex-wrap justify-center gap-2">
        {modelChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => setSelectedModel(chip.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm",
              "border transition-all duration-200",
              selectedModel === chip.id
                ? "bg-chip-active text-primary-foreground border-chip-active glow-sm"
                : chip.highlighted
                  ? "bg-chip border-primary/50 text-chip-foreground hover:bg-chip-hover hover:border-primary"
                  : "bg-chip border-border text-chip-foreground hover:bg-chip-hover"
            )}
          >
            {chip.highlighted && <Sparkles className="w-3 h-3" />}
            {chip.name}
            {selectedModel === chip.id && (
              <X className="w-3 h-3 ml-1" />
            )}
          </button>
        ))}
      </div>

      {/* Chat Presets */}
      <button
        className={cn(
          "px-5 py-2.5 rounded-full text-sm",
          "bg-secondary border border-border text-secondary-foreground",
          "hover:bg-chip-hover transition-colors duration-200"
        )}
      >
        Chat Presets
      </button>
    </div>
  )
}
