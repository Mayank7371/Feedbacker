"use client"

import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { Header } from "@/components/Header"
import { FeedbackForm } from "@/components/FeedbackForm"
import { FeedbackDisplay } from "@/components/FeedbackDisplay"

interface FeedbackItem {
  id: string
  rating: number
  sentiment: "positive" | "negative" | "neutral"
  message: string
  category: string
  timestamp: string
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([
    {
      id: "1",
      rating: 5,
      sentiment: "positive",
      message: "This feedback system is amazing! Very intuitive and easy to use. The design is clean and the submission process is smooth.",
      category: "Website Experience",
      timestamp: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "2",
      rating: 3,
      sentiment: "neutral",
      message: "The interface is okay, but I think it could use some improvements. Loading times seem a bit slow sometimes.",
      category: "Website Experience",
      timestamp: new Date(Date.now() - 172800000).toISOString()
    }
  ])
  
  const handleFeedbackSubmit = (feedbackData: any) => {
    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      ...feedbackData,
      timestamp: new Date().toISOString()
    }
    
    setFeedbackItems(prev => [newFeedback, ...prev])
    console.log("Feedback submitted:", newFeedback)
  }
  
  const handleClearAll = () => {
    setFeedbackItems([])
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Feedback area */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {/* Welcome content - shown when no feedback */}
          {feedbackItems.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
              <div className="text-center mb-8 animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
                  Feedback Hub
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                  Collect valuable customer feedback to improve your products and services. Share your thoughts and help us make things better.
                </p>
              </div>
            </div>
          )}
          
          {/* Feedback display */}
          <div className="flex-1 px-4 py-6">
            <FeedbackDisplay 
              feedbackItems={feedbackItems} 
              onClearAll={handleClearAll} 
            />
          </div>
          
          {/* Feedback form - fixed at bottom */}
          <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent pt-8">
            <FeedbackForm onSubmit={handleFeedbackSubmit} />
          </div>
        </main>
      </div>
    </div>
  )
}
