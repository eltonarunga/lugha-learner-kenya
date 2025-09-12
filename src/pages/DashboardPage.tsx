import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Star, Play, Target, Calendar, BookOpen, Sparkles, Library } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useLessons } from "@/hooks/useLessons";
import { useUserStats } from "@/hooks/useUserStats";
import { useUserAchievements } from "@/hooks/useUserAchievements";
import { DailyGoal } from "@/components/DailyGoal";
import { QuickActions } from "@/components/QuickActions";
import { RecentAchievements } from "@/components/RecentAchievements";
import { StreakCounter } from "@/components/StreakCounter";
import { XPAnimator } from "@/components/XPAnimator";
import { LevelProgress } from "@/components/LevelProgress";

const DashboardPage = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const { lessons, loading: lessonsLoading } = useLessons(userData?.language);
  const { stats, loading: statsLoading } = useUserStats();
  const { achievements, loading: achievementsLoading } = useUserAchievements();

  const languageLabels: { [key: string]: string } = {
    swahili: "Kiswahili",
    kikuyu: "Gĩkũyũ", 
    luo: "Dholuo",
    kalenjin: "Kalenjin"
  };

  const getLessonTypeIcon = (type?: string) => {
    switch (type) {
      case 'proverbs': return <Sparkles className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getLessonTypeBadge = (type?: string) => {
    switch (type) {
      case 'proverbs': return <Badge variant="secondary" className="text-xs">Wisdom</Badge>;
      default: return <Badge variant="outline" className="text-xs">Learn</Badge>;
    }
  };

  const todayGoal = 50;
  const xpForNextLevel = Math.max(0, (stats.level * 100) - stats.totalXP);
  const totalXPForNextLevel = stats.level * 100;

  if (!userData) {
    return <Navigate to="/auth" />;
  }

  if (lessonsLoading || statsLoading || achievementsLoading) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const onStartLesson = (lessonId?: string) => {
    if (lessonId) {
      navigate(`/lesson?id=${lessonId}`);
    } else {
      // Fallback to first available lesson
      navigate("/lesson?id=default");
    }
  };
  const onViewProgress = () => navigate("/progress");
  const onViewLeaderboard = () => navigate("/leaderboard");

  return (
    <div className="min-h-screen bg-background p-4 space-y-6 animate-slide-up">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold animate-slide-in">
          Jambo, {userData.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          Ready to continue your {languageLabels[userData.language]} journey?
        </p>
        
        {/* Level Progress */}
        <LevelProgress
          currentLevel={stats.level}
          currentXP={stats.totalXP}
          xpForNextLevel={xpForNextLevel}
          totalXPForNextLevel={totalXPForNextLevel}
          className="max-w-md mx-auto"
        />
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-card transition-all duration-300 hover:scale-105">
          <CardContent className="p-6 text-center">
            <StreakCounter 
              currentStreak={stats.streak}
              longestStreak={Math.max(stats.streak, stats.streak * 1.2)}
              size="md"
            />
          </CardContent>
        </Card>

        <Card className="hover:shadow-primary transition-all duration-300 hover:scale-105">
          <CardContent className="p-6 text-center">
            <XPAnimator 
              startXP={Math.max(0, stats.totalXP - 50)}
              endXP={stats.totalXP}
              className="text-xl"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Keep growing! 🌟
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-card transition-all duration-300 hover:scale-105">
          <CardContent className="p-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <BookOpen className="w-8 h-8 text-success animate-float" />
              <p className="text-2xl font-bold text-success">{stats.lessonsCompleted}</p>
              <p className="text-sm text-muted-foreground">Lessons Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Daily Goal */}
      <DailyGoal 
        currentXP={stats.todayProgress}
        dailyGoal={todayGoal}
        streak={stats.streak}
        className="animate-slide-up"
      />

      {/* Today's Lessons */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Today's Lessons
          </CardTitle>
          <CardDescription>Complete lessons to earn XP and maintain your streak!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {lessons.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No lessons available yet. Check back soon!
            </p>
          ) : (
            lessons.slice(0, 4).map((lesson, index) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between p-3 rounded-lg border transition-smooth bg-muted/50 border-border hover:bg-muted/80"
               >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10">
                    {getLessonTypeIcon(lesson.lesson_type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{lesson.title}</p>
                      {getLessonTypeBadge(lesson.lesson_type)}
                    </div>
                    <p className="text-sm text-muted-foreground">+{lesson.xp_reward} XP</p>
                    {lesson.cultural_context && (
                      <p className="text-xs text-muted-foreground italic mt-1">
                        {lesson.cultural_context}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => onStartLesson(lesson.id)}
                  variant="lesson"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Play className="w-4 h-4" />
                  Start
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Enhanced Layout: Achievements and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Achievements */}
        <RecentAchievements 
          achievements={achievements}
          maxDisplay={4}
          className="animate-slide-up"
        />
        
        {/* Enhanced Quick Actions */}
        <QuickActions />
      </div>

    </div>
  );
};

export default DashboardPage;
