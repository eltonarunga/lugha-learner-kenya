import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Play, 
  Book, 
  Trophy, 
  BarChart3, 
  Target, 
  Users, 
  MessageSquare,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  gradient: string;
  description: string;
}

const quickActions: QuickAction[] = [
  {
    id: "practice",
    label: "Quick Practice",
    icon: Play,
    path: "/lessons",
    gradient: "bg-gradient-sunset",
    description: "5-min lesson"
  },
  {
    id: "library",
    label: "Library",
    icon: Book,
    path: "/library",
    gradient: "bg-gradient-accent",
    description: "Browse content"
  },
  {
    id: "challenges",
    label: "Challenges",
    icon: Target,
    path: "/challenges",
    gradient: "bg-gradient-success",
    description: "Test skills"
  },
  {
    id: "leaderboard",
    label: "Leaderboard",
    icon: Trophy,
    path: "/leaderboard",
    gradient: "bg-gradient-hero",
    description: "View rankings"
  }
];

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.id}
              variant="ghost"
              onClick={() => navigate(action.path)}
              className={`
                h-auto p-4 flex flex-col items-center space-y-2 rounded-lg
                hover:scale-105 transition-all duration-300
                ${action.gradient} text-white hover:text-white
                border-0 shadow-md hover:shadow-lg
              `}
            >
              <Icon className="w-6 h-6" />
              <div className="text-center">
                <p className="font-medium text-sm">{action.label}</p>
                <p className="text-xs opacity-90">{action.description}</p>
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};