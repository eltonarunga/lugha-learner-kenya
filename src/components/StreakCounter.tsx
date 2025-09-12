import { cn } from "@/lib/utils";
import { Flame, Calendar } from "lucide-react";

interface StreakCounterProps {
  currentStreak: number;
  longestStreak?: number;
  showLongest?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const StreakCounter = ({
  currentStreak,
  longestStreak = 0,
  showLongest = true,
  size = "md",
  className
}: StreakCounterProps) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  };

  const getStreakColor = (streak: number) => {
    if (streak === 0) return "text-muted-foreground";
    if (streak < 3) return "text-warning";
    if (streak < 7) return "text-primary";
    if (streak < 30) return "text-accent";
    return "text-success";
  };

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Start your streak!";
    if (streak === 1) return "Great start!";
    if (streak < 7) return "Building momentum!";
    if (streak < 30) return "On fire!";
    return "Unstoppable!";
  };

  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      {/* Current Streak */}
      <div className="flex items-center space-x-2">
        <Flame className={cn(
          iconSizes[size],
          getStreakColor(currentStreak),
          currentStreak > 0 && "animate-pulse"
        )} />
        <span className={cn(
          "font-bold",
          sizeClasses[size],
          getStreakColor(currentStreak)
        )}>
          {currentStreak} day{currentStreak !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Streak Message */}
      <p className={cn(
        "text-xs text-center font-medium",
        getStreakColor(currentStreak)
      )}>
        {getStreakMessage(currentStreak)}
      </p>

      {/* Longest Streak */}
      {showLongest && longestStreak > 0 && (
        <div className="flex items-center space-x-1 text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span className="text-xs">
            Best: {longestStreak} day{longestStreak !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Visual streak indicators */}
      <div className="flex space-x-1">
        {Array.from({ length: Math.min(7, currentStreak) }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full",
              getStreakColor(currentStreak).replace('text-', 'bg-')
            )}
          />
        ))}
        {currentStreak > 7 && (
          <span className={cn(
            "text-xs font-bold",
            getStreakColor(currentStreak)
          )}>
            +{currentStreak - 7}
          </span>
        )}
      </div>
    </div>
  );
};