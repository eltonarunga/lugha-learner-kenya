import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

interface WeeklyDataPoint {
  day: string;
  xp: number;
  goal: number;
  date: string;
}

interface WeeklyChartProps {
  data: WeeklyDataPoint[];
  weeklyGoal?: number;
  className?: string;
}

export const WeeklyChart = ({ 
  data, 
  weeklyGoal = 700, 
  className 
}: WeeklyChartProps) => {
  const totalWeeklyXP = data.reduce((sum, day) => sum + day.xp, 0);
  const progressPercentage = (totalWeeklyXP / weeklyGoal) * 100;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-2 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-primary">
            XP: {data.xp}
          </p>
          <p className="text-xs text-muted-foreground">
            Goal: {data.goal}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Weekly Progress</h3>
          <div className="text-right">
            <p className="text-sm font-medium text-primary">
              {totalWeeklyXP} / {weeklyGoal} XP
            </p>
            <p className="text-xs text-muted-foreground">
              {Math.round(progressPercentage)}% of weekly goal
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="xp" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
              <Bar 
                dataKey="goal" 
                fill="hsl(var(--muted))"
                radius={[2, 2, 0, 0]}
                opacity={0.3}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Summary */}
        <div className="grid grid-cols-3 gap-4 pt-3 border-t border-muted">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">
              {data.filter(d => d.xp >= d.goal).length}
            </p>
            <p className="text-xs text-muted-foreground">Goals Met</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-success">
              {Math.max(...data.map(d => d.xp))}
            </p>
            <p className="text-xs text-muted-foreground">Best Day</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-accent">
              {Math.round(totalWeeklyXP / 7)}
            </p>
            <p className="text-xs text-muted-foreground">Daily Avg</p>
          </div>
        </div>
      </div>
    </Card>
  );
};