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
    nandi: "Kalenjin"
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
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          Jambo, {userData.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          Ready to continue your {languageLabels[userData.language]} journey?
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="text-center shadow-card">
          <CardContent className="p-4">
            <div className="flex flex-col items-center space-y-1">
              <Flame className="w-6 h-6 text-warning" />
              <p className="text-2xl font-bold text-warning">{stats.streak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center shadow-card">
          <CardContent className="p-4">
            <div className="flex flex-col items-center space-y-1">
              <Star className="w-6 h-6 text-primary" />
              <p className="text-2xl font-bold text-primary">{stats.totalXP}</p>
              <p className="text-xs text-muted-foreground">Total XP</p>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center shadow-card">
          <CardContent className="p-4">
            <div className="flex flex-col items-center space-y-1">
              <Trophy className="w-6 h-6 text-accent" />
              <p className="text-2xl font-bold text-accent">{stats.level}</p>
              <p className="text-xs text-muted-foreground">Level</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Goal Progress */}
      <Card className="shadow-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-success" />
              Daily Goal
            </CardTitle>
            <Badge variant="secondary">{stats.todayProgress}/{todayGoal} XP</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={(stats.todayProgress / todayGoal) * 100} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {todayGoal - stats.todayProgress} XP to reach your daily goal!
          </p>
        </CardContent>
      </Card>

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

      {/* Achievements */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            {achievements.length === 0 ? (
              <p className="text-center text-muted-foreground py-4 w-full">
                Complete lessons to unlock achievements!
              </p>
            ) : (
              achievements.slice(0, 3).map((achievement) => (
                <div
                  key={achievement.id}
                  className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-smooth ${
                    achievement.earned
                      ? "bg-gradient-success text-success-foreground shadow-celebration"
                      : "bg-muted/50 opacity-50"
                  }`}
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <p className="text-xs text-center font-medium">{achievement.name}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 pb-6">
        <Button
          onClick={onViewProgress}
          variant="outline"
          className="h-12"
        >
          View Progress
        </Button>
        <Button
          onClick={onViewLeaderboard}
          variant="outline"
          className="h-12"
        >
          Leaderboard
        </Button>
        <Button
          onClick={() => navigate("/cultural-library")}
          variant="outline"
          className="h-12 flex items-center gap-2"
        >
          <Library className="w-4 h-4" />
          Library
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
