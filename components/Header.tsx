"use client"

import { cn } from "@/lib/utils"
import { 
  MessageSquare, 
  BarChart3,
  Settings,
  Users,
  TrendingUp,
  Menu,
  User
} from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
}

const navItems = [
  { icon: MessageSquare, label: "Feedback", active: true },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "Customers" },
  { icon: TrendingUp, label: "Insights" },
  { icon: Settings, label: "Settings" },
]

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      {/* Left - Menu button */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg hover:bg-secondary transition-colors lg:hidden"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Center - Navigation */}
      <nav className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium",
              "transition-colors duration-200",
              item.active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <item.icon className="w-4 h-4" />
            <span className="hidden lg:inline">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        <button
          className={cn(
            "hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg",
            "text-sm font-medium text-muted-foreground",
            "hover:text-foreground hover:bg-secondary transition-colors"
          )}
        >
          <User className="w-4 h-4" />
          <span>Login</span>
        </button>
        
        <button
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-lg",
            "bg-primary text-primary-foreground",
            "text-sm font-medium",
            "hover:bg-primary/90 transition-colors",
            "glow-sm"
          )}
        >
          <MessageSquare className="w-4 h-4" />
          <span>New Feedback</span>
        </button>
      </div>
    </header>
  )
}
