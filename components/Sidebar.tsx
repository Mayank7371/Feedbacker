"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Trash2,
  ChevronLeft,
  MessageSquare
} from "lucide-react"

interface FeedbackSession {
  id: string
  title: string
  date: string
  feedbackCount: number
}

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sessions, setSessions] = useState<FeedbackSession[]>([
    { id: "1", title: "Current Session", date: "Today", feedbackCount: 0 }
  ])
  const [activeChat, setActiveChat] = useState("1")

  const filteredSessions = sessions.filter(session => 
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const groupedSessions = filteredSessions.reduce((acc, session) => {
    if (!acc[session.date]) {
      acc[session.date] = []
    }
    acc[session.date].push(session)
    return acc
  }, {} as Record<string, FeedbackSession[]>)

  const handleNewSession = () => {
    const newSession: FeedbackSession = {
      id: Date.now().toString(),
      title: "New Session",
      date: "Today",
      feedbackCount: 0
    }
    setSessions([newSession, ...sessions])
    setActiveChat(newSession.id)
  }

  const handleDeleteAllSessions = () => {
    setSessions([])
    setActiveChat("")
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:relative z-50 h-full flex flex-col",
          "bg-sidebar border-r border-sidebar-border",
          "transition-all duration-300 ease-in-out",
          isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full lg:translate-x-0 lg:w-0"
        )}
      >
        <div className={cn(
          "flex flex-col h-full w-64 overflow-hidden",
          !isOpen && "invisible"
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <button
                onClick={onToggle}
                className="p-2 rounded-lg hover:bg-sidebar-hover transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-sidebar-foreground" />
              </button>
              <h2 className="font-semibold text-foreground">Feedback Sessions</h2>
            </div>
          </div>

          {/* Search */}
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-9 pr-4 py-2.5 rounded-lg",
                  "bg-input border border-border",
                  "text-sm text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring",
                  "transition-all duration-200"
                )}
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto px-3">
            {Object.entries(groupedSessions).map(([date, dateSessions]) => (
              <div key={date} className="mb-4">
                <p className="text-xs font-medium text-muted-foreground px-2 mb-2">
                  {date}
                </p>
                <div className="space-y-1">
                  {dateSessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => setActiveChat(session.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
                        "text-left text-sm transition-all duration-200",
                        "group",
                        activeChat === session.id
                          ? "bg-secondary text-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-hover"
                      )}
                    >
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      <div className="flex-1 truncate">
                        <div className="font-medium">{session.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {session.feedbackCount} feedback items
                        </div>
                      </div>
                      <button
                        className={cn(
                          "p-1 rounded opacity-0 group-hover:opacity-100",
                          "hover:bg-muted transition-all duration-200"
                        )}
                        onClick={(e) => {
                          e.stopPropagation()
                          // Show menu
                        }}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            {filteredSessions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <MessageSquare className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">No sessions found</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-sidebar-border">
            <button
              onClick={handleDeleteAllSessions}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-4 py-2.5",
                "rounded-lg border border-border",
                "text-sm text-destructive",
                "hover:bg-destructive/10 transition-colors duration-200"
              )}
            >
              <Trash2 className="w-4 h-4" />
              Delete All Sessions
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
