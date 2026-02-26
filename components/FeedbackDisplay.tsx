"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  Meh,
  Calendar,
  Tag,
  MessageCircle
} from "lucide-react"

interface FeedbackItem {
  id: string
  rating: number
  sentiment: "positive" | "negative" | "neutral"
  message: string
  category: string
  timestamp: string
  userName?: string
}

interface FeedbackDisplayProps {
  feedbackItems: FeedbackItem[]
  onClearAll?: () => void
}

const sentimentIcons = {
  positive: ThumbsUp,
  negative: ThumbsDown,
  neutral: Meh
}

const sentimentColors = {
  positive: "text-green-400",
  negative: "text-red-400",
  neutral: "text-yellow-400"
}

const sentimentBgColors = {
  positive: "bg-green-500/10 border-green-500/20",
  negative: "bg-red-500/10 border-red-500/20",
  neutral: "bg-yellow-500/10 border-yellow-500/20"
}

export function FeedbackDisplay({ feedbackItems, onClearAll }: FeedbackDisplayProps) {
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "rating">("newest")

  const sortedFeedback = [...feedbackItems].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      case "oldest":
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const getSentimentIcon = (sentiment: "positive" | "negative" | "neutral") => {
    const Icon = sentimentIcons[sentiment]
    return <Icon className="w-4 h-4" />
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Feedback ({feedbackItems.length})
          </h2>
          <p className="text-muted-foreground mt-1">
            All collected feedback responses
          </p>
        </div>
        
        <div className="flex gap-3">
          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className={cn(
              "px-3 py-2 rounded-lg bg-card border border-border",
              "text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring",
              "transition-all duration-200"
            )}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="rating">Highest Rated</option>
          </select>
          
          {/* Clear all button */}
          {feedbackItems.length > 0 && (
            <button
              onClick={onClearAll}
              className={cn(
                "px-4 py-2 rounded-lg border border-border",
                "text-destructive hover:bg-destructive/10",
                "transition-colors duration-200 text-sm"
              )}
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      {feedbackItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold text-foreground">
              {feedbackItems.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Responses</div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold text-foreground">
              {(feedbackItems.reduce((sum, f) => sum + f.rating, 0) / feedbackItems.length).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold text-foreground">
              {feedbackItems.filter(f => f.sentiment === "positive").length}
            </div>
            <div className="text-sm text-muted-foreground">Positive Feedback</div>
          </div>
        </div>
      )}

      {/* Feedback Items */}
      <div className="space-y-4">
        {sortedFeedback.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <MessageCircle className="w-12 h-12 mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No feedback yet</h3>
            <p className="text-center max-w-md">
              Feedback submissions will appear here once users start sharing their thoughts.
            </p>
          </div>
        ) : (
          sortedFeedback.map((item) => (
            <div 
              key={item.id}
              className={cn(
                "bg-card border rounded-xl p-5 transition-all duration-200",
                "hover:shadow-lg hover:shadow-black/10",
                sentimentBgColors[item.sentiment]
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Left content */}
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < item.rating ? "text-yellow-400 fill-current" : "text-muted-foreground"
                          )}
                        />
                      ))}
                      <span className="text-sm font-medium text-foreground">
                        {item.rating}/5
                      </span>
                    </div>
                    
                    <div className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs",
                      sentimentBgColors[item.sentiment],
                      sentimentColors[item.sentiment]
                    )}>
                      {getSentimentIcon(item.sentiment)}
                      <span className="capitalize">{item.sentiment}</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {/* Category */}
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm bg-secondary px-2.5 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  {/* Message */}
                  <p className="text-foreground leading-relaxed">
                    {item.message}
                  </p>
                  
                  {/* User info */}
                  {item.userName && (
                    <div className="mt-3 text-sm text-muted-foreground">
                      — {item.userName}
                    </div>
                  )}
                </div>
                
                {/* Right actions */}
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                    <ThumbsDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}