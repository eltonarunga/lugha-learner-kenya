import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Star, Target, Calendar, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Navigate } from "react-router-dom";
import { useUserStats } from "@/hooks/useUserStats";
import { useUserAchievements } from "@/hooks/useUserAchievements";

const ProgressPage = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
  const { stats, loading: statsLoading } = useUserStats();
  const { achievements, loading: achievementsLoading } = useUserAchievements();

  const weeklyGoal = 350;
  const totalLessons = 50; // Could come from lessons count
  const totalSkills = 12; // Could come from skills/categories count

  const weeklyData = [
    { day: "Mon", xp: Math.floor(stats.weeklyProgress * 0.15), completed: true },
    { day: "Tue", xp: Math.floor(stats.weeklyProgress * 0.12), completed: true },
    { day: "Wed", xp: Math.floor(stats.weeklyProgress * 0.10), completed: true },
    { day: "Thu", xp: Math.floor(stats.weeklyProgress * 0.13), completed: true },
    { day: "Fri", xp: Math.floor(stats.weeklyProgress * 0.17), completed: true },
    { day: "Sat", xp: Math.floor(stats.weeklyProgress * 0.15), completed: true },
    { day: "Sun", xp: Math.floor(stats.weeklyProgress * 0.18), completed: false }
  ];

  const nextLevelXP = stats.level * 500;
  const currentLevelXP = (stats.level - 1) * 500;
  const levelProgress = ((stats.totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  if (!userData) {
    return <Navigate to="/auth" />;
  }

  if (statsLoading || achievementsLoading) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading progress...</p>
        </div>
      </div>
    );
  }

  const onBack = () => navigate("/dashboard");

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          size="icon"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold ml-4">Your Progress</h1>
      </div>

      {/* Level Progress */}
      <Card className="shadow-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Level {stats.level}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={levelProgress} className="h-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{stats.totalXP} XP</span>
              <span>{nextLevelXP} XP to next level</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Calendar className="w-6 h-6 text-warning" />
              <p className="text-2xl font-bold text-warning">{stats.streak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <BookOpen className="w-6 h-6 text-accent" />
              <p className="text-2xl font-bold text-accent">{stats.lessonsCompleted}</p>
              <p className="text-sm text-muted-foreground">Lessons Done</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Goal */}
      <Card className="shadow-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-success" />
            Weekly Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">{stats.weeklyProgress} / {weeklyGoal} XP</span>
              <Badge variant="secondary">
                {Math.round((stats.weeklyProgress / weeklyGoal) * 100)}%
              </Badge>
            </div>
            <Progress value={(stats.weeklyProgress / weeklyGoal) * 100} className="h-3" />

            {/* Weekly Chart */}
            <div className="grid grid-cols-7 gap-2 mt-4">
              {weeklyData.map((day, index) => (
                <div key={index} className="text-center">
                  <div className={`h-12 rounded-md flex items-end justify-center transition-smooth ${
                    day.completed ? 'bg-gradient-success' : 'bg-muted'
                  }`}>
                    <div
                      className={`w-full rounded-md transition-smooth ${
                        day.completed ? 'bg-success' : 'bg-muted-foreground'
                      }`}
                      style={{ height: `${Math.max((day.xp / 60) * 100, 10)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{day.day}</p>
                  <p className="text-xs font-medium">{day.xp}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Progress */}
      <Card className="shadow-card mb-6">
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Lessons</span>
            <span className="font-semibold">{stats.lessonsCompleted}/{totalLessons}</span>
          </div>
          <Progress value={(stats.lessonsCompleted / totalLessons) * 100} className="h-2" />

          <div className="flex justify-between items-center">
            <span>Skills</span>
            <span className="font-semibold">{Math.floor(stats.lessonsCompleted / 4)}/{totalSkills}</span>
          </div>
          <Progress value={(Math.floor(stats.lessonsCompleted / 4) / totalSkills) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="shadow-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              Complete lessons to unlock achievements!
            </p>
          ) : (
            achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-smooth ${
                  achievement.earned
                    ? "bg-gradient-success/10 border border-success/20"
                    : "bg-muted/30 opacity-60"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  achievement.earned ? "bg-gradient-success" : "bg-muted"
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{achievement.name}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.earned && achievement.earned_at && (
                    <p className="text-xs text-success font-medium mt-1">
                      Earned {new Date(achievement.earned_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {achievement.earned && (
                  <Badge variant="secondary">✓</Badge>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPage;
