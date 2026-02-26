"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { 
  Paperclip, 
  Mic, 
  Send, 
  ChevronDown,
  Sparkles
} from "lucide-react"

interface ChatInputProps {
  onSend?: (message: string) => void
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [mode, setMode] = useState("Standard")
  const [showModeDropdown, setShowModeDropdown] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const modes = ["Standard", "Creative", "Precise", "Balanced"]

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`
    }
  }, [message])

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-6">
      <div
        className={cn(
          "relative flex items-end gap-2 p-3",
          "bg-card rounded-2xl border border-border",
          "shadow-lg shadow-black/20",
          "transition-all duration-200",
          "focus-within:border-primary/50 focus-within:glow-sm"
        )}
      >
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message AI Chat..."
          rows={1}
          className={cn(
            "flex-1 resize-none bg-transparent",
            "text-foreground placeholder:text-muted-foreground",
            "focus:outline-none",
            "min-h-11 max-h-37.5 py-3 px-2"
          )}
        />

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Mode selector */}
          <div className="relative">
            <button
              onClick={() => setShowModeDropdown(!showModeDropdown)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg",
                "text-sm text-muted-foreground",
                "hover:bg-secondary transition-colors"
              )}
            >
              {mode}
              <ChevronDown className={cn(
                "w-4 h-4 transition-transform",
                showModeDropdown && "rotate-180"
              )} />
            </button>

            {showModeDropdown && (
              <div className={cn(
                "absolute bottom-full right-0 mb-2",
                "bg-card border border-border rounded-lg shadow-xl",
                "py-1 min-w-35",
                "animate-fade-in"
              )}>
                {modes.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setMode(m)
                      setShowModeDropdown(false)
                    }}
                    className={cn(
                      "w-full px-4 py-2 text-left text-sm",
                      "hover:bg-secondary transition-colors",
                      mode === m ? "text-primary" : "text-foreground"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Attachment */}
          <button
            className={cn(
              "p-2.5 rounded-lg",
              "text-muted-foreground hover:text-foreground",
              "hover:bg-secondary transition-colors"
            )}
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Voice */}
          <button
            className={cn(
              "p-2.5 rounded-lg",
              "text-muted-foreground hover:text-foreground",
              "hover:bg-secondary transition-colors"
            )}
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Send */}
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={cn(
              "p-2.5 rounded-lg",
              "transition-all duration-200",
              message.trim()
                ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-sm"
                : "bg-secondary text-muted-foreground cursor-not-allowed"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-muted-foreground mt-3">
        AI Chat can make mistakes. By messaging AI Chat, you agree to our{" "}
        <a href="#" className="underline hover:text-foreground transition-colors">Terms of Service</a>
        {" "}and acknowledge our{" "}
        <a href="#" className="underline hover:text-foreground transition-colors">Privacy Policy</a>.
      </p>
    </div>
  )
}
