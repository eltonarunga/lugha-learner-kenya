import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AchievementBadge } from "./AchievementBadge";
import { ArrowRight, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned?: boolean;
  earned_at?: string;
  progress?: number;
}

interface RecentAchievementsProps {
  achievements: Achievement[];
  maxDisplay?: number;
  className?: string;
}

export const RecentAchievements = ({ 
  achievements, 
  maxDisplay = 4, 
  className 
}: RecentAchievementsProps) => {
  const navigate = useNavigate();
  
  // Sort achievements: earned first (by date), then by progress
  const sortedAchievements = [...achievements]
    .sort((a, b) => {
      if (a.earned && !b.earned) return -1;
      if (!a.earned && b.earned) return 1;
      if (a.earned && b.earned) {
        return new Date(b.earned_at || 0).getTime() - new Date(a.earned_at || 0).getTime();
      }
      return (b.progress || 0) - (a.progress || 0);
    })
    .slice(0, maxDisplay);

  const earnedCount = achievements.filter(a => a.earned === true).length;
  const totalCount = achievements.length;

  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Achievements</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/progress")}
            className="text-primary hover:text-primary/80"
          >
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Progress Summary */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">
            {earnedCount} / {totalCount} unlocked
          </span>
        </div>

        {/* Achievements Grid */}
        {sortedAchievements.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {sortedAchievements.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                type={achievement.earned === true ? "earned" : (achievement.progress ? "progress" : "locked")}
                name={achievement.name}
                description={achievement.description}
                icon={achievement.icon}
                progress={achievement.progress}
                earnedAt={achievement.earned_at}
                size="sm"
                className="transition-transform hover:scale-105"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Award className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No achievements yet</p>
            <p className="text-xs">Complete lessons to earn your first badge!</p>
          </div>
        )}

        {/* Encouragement for next achievement */}
        {earnedCount < totalCount && (
          <div className="pt-3 border-t border-muted">
            <p className="text-xs text-center text-muted-foreground">
              Keep learning to unlock {totalCount - earnedCount} more achievement{totalCount - earnedCount !== 1 ? 's' : ''}!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};