import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star } from "lucide-react";

interface LevelProgressProps {
  currentLevel: number;
  currentXP: number;
  xpForNextLevel: number;
  totalXPForNextLevel: number;
  showDetails?: boolean;
  className?: string;
}

export const LevelProgress = ({
  currentLevel,
  currentXP,
  xpForNextLevel,
  totalXPForNextLevel,
  showDetails = true,
  className
}: LevelProgressProps) => {
  const progressPercentage = ((totalXPForNextLevel - xpForNextLevel) / totalXPForNextLevel) * 100;
  
  const getLevelColor = (level: number) => {
    if (level < 5) return "text-warning";
    if (level < 10) return "text-primary";
    if (level < 20) return "text-accent";
    return "text-success";
  };

  const getLevelBadge = (level: number) => {
    if (level < 5) return "Beginner";
    if (level < 10) return "Explorer";
    if (level < 20) return "Scholar";
    if (level < 50) return "Expert";
    return "Master";
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Level Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={cn(
            "p-3 rounded-full",
            "bg-gradient-to-br from-primary/20 to-accent/20"
          )}>
            <Trophy className={cn("w-6 h-6", getLevelColor(currentLevel))} />
          </div>
          <div>
            <h3 className={cn("text-xl font-bold", getLevelColor(currentLevel))}>
              Level {currentLevel}
            </h3>
            <p className="text-sm text-muted-foreground">
              {getLevelBadge(currentLevel)}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">
            {currentXP.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Total XP</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Progress to Level {currentLevel + 1}
          </span>
          <span className="font-medium">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        <Progress 
          value={progressPercentage} 
          className="h-3 bg-muted"
        />
        
        {showDetails && (
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{totalXPForNextLevel - xpForNextLevel} XP to go</span>
            <span>{totalXPForNextLevel} XP needed</span>
          </div>
        )}
      </div>

      {/* Level Milestones */}
      <div className="flex justify-between text-xs">
        {[1, 5, 10, 20, 50].map((milestone, index) => (
          <div 
            key={milestone}
            className={cn(
              "flex flex-col items-center space-y-1",
              currentLevel >= milestone ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Star className={cn(
              "w-3 h-3",
              currentLevel >= milestone && "fill-current"
            )} />
            <span>{milestone}</span>
          </div>
        ))}
      </div>
    </div>
  );
};