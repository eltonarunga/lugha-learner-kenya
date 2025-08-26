import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Star, Play, Target, Calendar } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  const { userData } = useUser();
  const navigate = useNavigate();

  // Mock data - would come from backend in real app
  const userStats = {
    xp: 1250,
    streak: 7,
    level: 3,
    totalLessons: 45,
    completedLessons: 12,
    todayGoal: 50,
    todayProgress: 30
  };

  const languageLabels: { [key: string]: string } = {
    swahili: "Kiswahili",
    kikuyu: "Gĩkũyũ",
    luo: "Dholuo"
  };

  const todayLessons = [
    { id: 1, title: "Basic Greetings", completed: true, xp: 25 },
    { id: 2, title: "Family Members", completed: true, xp: 30 },
    { id: 3, title: "Numbers 1-10", completed: false, xp: 25 },
    { id: 4, title: "Colors", completed: false, xp: 30 }
  ];

  const achievements = [
    { id: 1, title: "First Lesson", icon: "🎯", unlocked: true },
    { id: 2, title: "Week Warrior", icon: "🔥", unlocked: true },
    { id: 3, title: "Quick Learner", icon: "⚡", unlocked: false }
  ];

  if (!userData) {
    return <Navigate to="/auth" />;
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
              <p className="text-2xl font-bold text-warning">{userStats.streak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center shadow-card">
          <CardContent className="p-4">
            <div className="flex flex-col items-center space-y-1">
              <Star className="w-6 h-6 text-primary" />
              <p className="text-2xl font-bold text-primary">{userStats.xp}</p>
              <p className="text-xs text-muted-foreground">Total XP</p>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center shadow-card">
          <CardContent className="p-4">
            <div className="flex flex-col items-center space-y-1">
              <Trophy className="w-6 h-6 text-accent" />
              <p className="text-2xl font-bold text-accent">{userStats.level}</p>
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
            <Badge variant="secondary">{userStats.todayProgress}/{userStats.todayGoal} XP</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={(userStats.todayProgress / userStats.todayGoal) * 100} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {userStats.todayGoal - userStats.todayProgress} XP to reach your daily goal!
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
          {todayLessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`flex items-center justify-between p-3 rounded-lg border transition-smooth ${
                lesson.completed
                  ? "bg-success/10 border-success/20"
                  : "bg-muted/50 border-border hover:bg-muted/80"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  lesson.completed ? "bg-success text-success-foreground" : "bg-muted"
                }`}>
                  {lesson.completed ? "✓" : lesson.id}
                </div>
                <div>
                  <p className="font-medium">{lesson.title}</p>
                  <p className="text-sm text-muted-foreground">+{lesson.xp} XP</p>
                </div>
              </div>
              {!lesson.completed && (
                <Button
                  onClick={() => onStartLesson(`lesson-${lesson.id}`)}
                  variant="lesson"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Play className="w-4 h-4" />
                  Start
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex flex-col items-center space-y-2 p-3 rounded-lg transition-smooth ${
                  achievement.unlocked
                    ? "bg-gradient-success text-success-foreground shadow-celebration"
                    : "bg-muted/50 opacity-50"
                }`}
              >
                <span className="text-2xl">{achievement.icon}</span>
                <p className="text-xs text-center font-medium">{achievement.title}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 pb-6">
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
      </div>
    </div>
  );
};

export default DashboardPage;
