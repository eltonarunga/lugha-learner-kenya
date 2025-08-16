import { Button } from "@/components/ui/button";
import { Home, Trophy, BarChart3, Settings, Book } from "lucide-react";

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export const Navigation = ({ currentScreen, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "lesson", label: "Learn", icon: Book },
    { id: "progress", label: "Progress", icon: BarChart3 },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 h-12 px-2 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};