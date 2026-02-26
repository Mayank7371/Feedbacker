"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Send, 
  Smile,
  Frown,
  Meh
} from "lucide-react"

interface FeedbackFormProps {
  onSubmit?: (feedback: FeedbackData) => void
}

interface FeedbackData {
  rating: number
  sentiment: "positive" | "negative" | "neutral"
  message: string
  category: string
}

const categories = [
  "Product Quality",
  "Customer Service",
  "Website Experience",
  "Delivery/Pricing",
  "Feature Request",
  "Bug Report",
  "General Feedback"
]

export function FeedbackForm({ onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [sentiment, setSentiment] = useState<"positive" | "negative" | "neutral">("neutral")
  const [message, setMessage] = useState("")
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [message])

  const handleSubmit = async () => {
    if (!message.trim() || !category) return
    
    setIsSubmitting(true)
    
    const feedbackData: FeedbackData = {
      rating,
      sentiment,
      message,
      category
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API call
      onSubmit?.(feedbackData)
      // Reset form
      setRating(0)
      setSentiment("neutral")
      setMessage("")
      setCategory("")
    } catch (error) {
      console.error("Failed to submit feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Auto-set sentiment based on rating
  useEffect(() => {
    if (rating >= 4) setSentiment("positive")
    else if (rating <= 2) setSentiment("negative")
    else setSentiment("neutral")
  }, [rating])

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-6">
      <div className={cn(
        "relative flex flex-col gap-4 p-6",
        "bg-card rounded-2xl border border-border",
        "shadow-lg shadow-black/20",
        "transition-all duration-200"
      )}>
        <h2 className="text-2xl font-bold text-center text-foreground mb-2">
          Share Your Feedback
        </h2>
        
        {/* Rating Stars */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">How would you rate your experience?</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className={cn(
                  "p-1 transition-all duration-200",
                  (hoverRating >= star || rating >= star) 
                    ? "text-yellow-400 scale-110" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Star 
                  className={cn("w-8 h-8", (hoverRating >= star || rating >= star) && "fill-current")} 
                />
              </button>
            ))}
          </div>
          <p className="text-sm font-medium">
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent"}
          </p>
        </div>

        {/* Sentiment Selector */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Overall sentiment</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setSentiment("positive")}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-lg transition-all",
                sentiment === "positive"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              <ThumbsUp className="w-6 h-6" />
              <span className="text-xs">Positive</span>
            </button>
            
            <button
              onClick={() => setSentiment("neutral")}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-lg transition-all",
                sentiment === "neutral"
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              <Meh className="w-6 h-6" />
              <span className="text-xs">Neutral</span>
            </button>
            
            <button
              onClick={() => setSentiment("negative")}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-lg transition-all",
                sentiment === "negative"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              <ThumbsDown className="w-6 h-6" />
              <span className="text-xs">Negative</span>
            </button>
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-muted-foreground">
            Category <span className="text-destructive">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={cn(
              "px-4 py-3 rounded-lg bg-input border border-border",
              "text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
              "transition-all duration-200"
            )}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Message Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-muted-foreground">
            Your feedback <span className="text-destructive">*</span>
          </label>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tell us about your experience..."
            rows={3}
            className={cn(
              "w-full px-4 py-3 rounded-lg bg-input border border-border",
              "text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              "resize-none transition-all duration-200"
            )}
          />
          <p className="text-xs text-muted-foreground">
            Press Ctrl+Enter to submit
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!message.trim() || !category || isSubmitting}
          className={cn(
            "w-full py-3.5 rounded-lg font-medium transition-all duration-200",
            "flex items-center justify-center gap-2",
            (!message.trim() || !category || isSubmitting)
              ? "bg-secondary text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90 glow-sm"
          )}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Feedback
            </>
          )}
        </button>
      </div>
    </div>
  )
}