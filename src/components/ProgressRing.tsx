import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number; // 0-100
  size?: "sm" | "md" | "lg" | "xl";
  showPercentage?: boolean;
  className?: string;
  color?: "primary" | "success" | "accent";
}

export const ProgressRing = ({ 
  progress, 
  size = "md", 
  showPercentage = true, 
  className,
  color = "primary" 
}: ProgressRingProps) => {
  const sizeMap = {
    sm: { container: 60, stroke: 4, font: "text-xs" },
    md: { container: 80, stroke: 6, font: "text-sm" },
    lg: { container: 120, stroke: 8, font: "text-lg" },
    xl: { container: 160, stroke: 10, font: "text-xl" }
  };

  const config = sizeMap[size];
  const radius = (config.container - config.stroke * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colorMap = {
    primary: "hsl(var(--primary))",
    success: "hsl(var(--success))",
    accent: "hsl(var(--accent))"
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={config.container}
        height={config.container}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.container / 2}
          cy={config.container / 2}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={config.stroke}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={config.container / 2}
          cy={config.container / 2}
          r={radius}
          stroke={colorMap[color]}
          strokeWidth={config.stroke}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 2px 4px ${colorMap[color]}40)`
          }}
        />
      </svg>
      {showPercentage && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center font-bold",
          config.font
        )}>
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};