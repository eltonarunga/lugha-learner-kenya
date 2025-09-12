import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "./ProgressRing";
import { 
  Target, 
  CheckCircle, 
  Calendar, 
  Flame,
  Clock,
  Trophy
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DailyGoalProps {
  currentXP: number;
  dailyGoal: number;
  streak: number;
  className?: string;
}

export const DailyGoal = ({ 
  currentXP, 
  dailyGoal, 
  streak, 
  className 
}: DailyGoalProps) => {
  const [isGoalReached, setIsGoalReached] = useState(false);
  const progressPercentage = Math.min((currentXP / dailyGoal) * 100, 100);
  const remainingXP = Math.max(dailyGoal - currentXP, 0);
  
  useEffect(() => {
    setIsGoalReached(currentXP >= dailyGoal);
  }, [currentXP, dailyGoal]);

  const getMotivationalMessage = () => {
    if (isGoalReached) return "🎉 Goal achieved! Keep going!";
    if (progressPercentage >= 75) return "🔥 Almost there!";
    if (progressPercentage >= 50) return "💪 Halfway done!";
    if (progressPercentage >= 25) return "🚀 Great start!";
    return "🎯 Let's begin today's journey!";
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300",
      isGoalReached && "bg-gradient-success text-success-foreground shadow-celebration",
      className
    )}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Target className={cn(
              "w-5 h-5",
              isGoalReached ? "text-success-foreground" : "text-primary"
            )} />
            <h3 className="font-semibold">Daily Goal</h3>
          </div>
          
          {isGoalReached && (
            <Badge variant="secondary" className="bg-success-foreground/20">
              <CheckCircle className="w-3 h-3 mr-1" />
              Complete
            </Badge>
          )}
        </div>

        {/* Progress Ring and Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {currentXP} / {dailyGoal} XP
                </span>
              </div>
              <Progress 
                value={progressPercentage} 
                className={cn(
                  "h-2",
                  isGoalReached && "bg-success-foreground/20"
                )}
              />
            </div>
            
            <div className="mt-3 space-y-1">
              <p className="text-sm font-medium">
                {getMotivationalMessage()}
              </p>
              {!isGoalReached && (
                <p className="text-xs text-muted-foreground">
                  {remainingXP} XP to go
                </p>
              )}
            </div>
          </div>
          
          <div className="ml-4">
            <ProgressRing 
              progress={progressPercentage}
              size="md"
              color={isGoalReached ? "success" : "primary"}
              showPercentage={false}
            />
          </div>
        </div>

        {/* Streak Info */}
        <div className="flex items-center justify-between pt-3 border-t border-muted">
          <div className="flex items-center space-x-2">
            <Flame className={cn(
              "w-4 h-4",
              streak > 0 ? "text-warning" : "text-muted-foreground"
            )} />
            <span className="text-sm">
              {streak} day streak
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>Today</span>
          </div>
        </div>
      </div>

      {/* Success Animation Overlay */}
      {isGoalReached && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      )}
    </Card>
  );
};