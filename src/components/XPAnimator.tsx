import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface XPAnimatorProps {
  startXP: number;
  endXP: number;
  duration?: number;
  showSparkles?: boolean;
  className?: string;
}

export const XPAnimator = ({ 
  startXP, 
  endXP, 
  duration = 2000, 
  showSparkles = true,
  className 
}: XPAnimatorProps) => {
  const [currentXP, setCurrentXP] = useState(startXP);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (startXP === endXP) return;

    setIsAnimating(true);
    const startTime = Date.now();
    const xpDiff = endXP - startXP;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startXP + (xpDiff * easeOut);
      
      setCurrentXP(Math.round(currentValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [startXP, endXP, duration]);

  return (
    <div className={cn("relative inline-flex items-center gap-2", className)}>
      <span className={cn(
        "font-bold text-primary transition-all duration-300",
        isAnimating && "scale-110"
      )}>
        {currentXP.toLocaleString()} XP
      </span>
      {showSparkles && isAnimating && (
        <Sparkles className="w-5 h-5 text-warning animate-pulse" />
      )}
    </div>
  );
};