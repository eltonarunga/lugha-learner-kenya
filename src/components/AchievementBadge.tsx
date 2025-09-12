import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Zap, Target, Calendar, Flame } from "lucide-react";

interface AchievementBadgeProps {
  type: "earned" | "locked" | "progress";
  name: string;
  description: string;
  icon?: string;
  progress?: number; // 0-100 for progress type
  earnedAt?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const iconMap = {
  star: Star,
  award: Award,
  zap: Zap,
  target: Target,
  calendar: Calendar,
  flame: Flame,
};

export const AchievementBadge = ({
  type,
  name,
  description,
  icon = "award",
  progress = 0,
  earnedAt,
  className,
  size = "md"
}: AchievementBadgeProps) => {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Award;
  
  const sizeClasses = {
    sm: "p-3",
    md: "p-4", 
    lg: "p-6"
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={cn(
      "relative rounded-lg border transition-all duration-300",
      sizeClasses[size],
      type === "earned" && "bg-gradient-success border-success/20 shadow-celebration",
      type === "locked" && "bg-muted border-muted-foreground/20 opacity-60",
      type === "progress" && "bg-gradient-accent border-accent/20",
      "hover:scale-105 hover:shadow-lg",
      className
    )}>
      {/* Achievement Icon */}
      <div className={cn(
        "flex items-center justify-center rounded-full mb-3 mx-auto",
        iconSizes[size],
        type === "earned" && "text-success-foreground",
        type === "locked" && "text-muted-foreground",
        type === "progress" && "text-accent-foreground"
      )}>
        <IconComponent className={iconSizes[size]} />
      </div>

      {/* Achievement Info */}
      <div className="text-center space-y-1">
        <h4 className={cn(
          "font-semibold",
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-lg"
        )}>
          {name}
        </h4>
        <p className={cn(
          "text-muted-foreground",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          size === "lg" && "text-base"
        )}>
          {description}
        </p>

        {/* Progress bar for progress type */}
        {type === "progress" && (
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Earned date */}
        {type === "earned" && earnedAt && (
          <Badge variant="secondary" className="text-xs mt-2">
            {new Date(earnedAt).toLocaleDateString()}
          </Badge>
        )}
      </div>

      {/* Shine effect for earned achievements */}
      {type === "earned" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-lg" />
      )}
    </div>
  );
};