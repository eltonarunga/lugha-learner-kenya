import { Button } from "@/components/ui/button";
import { Home, Trophy, BarChart3, Settings, Book, Library } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: "dashboard", label: "Home", icon: Home, path: "/dashboard" },
    { id: "library", label: "Wisdom", icon: Library, path: "/library" },
    { id: "progress", label: "Progress", icon: BarChart3, path: "/progress" },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy, path: "/leaderboard" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
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