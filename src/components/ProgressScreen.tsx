import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Star, Target, Calendar, BookOpen } from "lucide-react";

interface ProgressScreenProps {
  onBack: () => void;
}

export const ProgressScreen = ({ onBack }: ProgressScreenProps) => {
  // Mock data - would come from backend in real app
  const progressData = {
    totalXP: 1250,
    currentLevel: 3,
    nextLevelXP: 1500,
    streakDays: 7,
    lessonsCompleted: 12,
    totalLessons: 45,
    skillsUnlocked: 5,
    totalSkills: 12,
    weeklyGoal: 350,
    weeklyProgress: 280
  };

  const weeklyData = [
    { day: "Mon", xp: 50, completed: true },
    { day: "Tue", xp: 40, completed: true },
    { day: "Wed", xp: 35, completed: true },
    { day: "Thu", xp: 45, completed: true },
    { day: "Fri", xp: 60, completed: true },
    { day: "Sat", xp: 50, completed: true },
    { day: "Sun", xp: 0, completed: false }
  ];

  const achievements = [
    { id: 1, title: "First Steps", description: "Complete your first lesson", icon: "🎯", unlocked: true, date: "2 days ago" },
    { id: 2, title: "Week Warrior", description: "7-day learning streak", icon: "🔥", unlocked: true, date: "Today!" },
    { id: 3, title: "Quick Learner", description: "Complete 5 lessons in one day", icon: "⚡", unlocked: false, date: "" },
    { id: 4, title: "Vocabulary Master", description: "Learn 100 new words", icon: "📚", unlocked: false, date: "" },
    { id: 5, title: "Perfect Score", description: "Get 100% on a lesson", icon: "💯", unlocked: true, date: "3 days ago" }
  ];

  const levelProgress = ((progressData.totalXP - ((progressData.currentLevel - 1) * 500)) / 500) * 100;

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
            Level {progressData.currentLevel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={levelProgress} className="h-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{progressData.totalXP} XP</span>
              <span>{progressData.nextLevelXP} XP to next level</span>
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
              <p className="text-2xl font-bold text-warning">{progressData.streakDays}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <BookOpen className="w-6 h-6 text-accent" />
              <p className="text-2xl font-bold text-accent">{progressData.lessonsCompleted}</p>
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
              <span className="text-lg font-semibold">{progressData.weeklyProgress} / {progressData.weeklyGoal} XP</span>
              <Badge variant="secondary">
                {Math.round((progressData.weeklyProgress / progressData.weeklyGoal) * 100)}%
              </Badge>
            </div>
            <Progress value={(progressData.weeklyProgress / progressData.weeklyGoal) * 100} className="h-3" />
            
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
            <span className="font-semibold">{progressData.lessonsCompleted}/{progressData.totalLessons}</span>
          </div>
          <Progress value={(progressData.lessonsCompleted / progressData.totalLessons) * 100} className="h-2" />
          
          <div className="flex justify-between items-center">
            <span>Skills</span>
            <span className="font-semibold">{progressData.skillsUnlocked}/{progressData.totalSkills}</span>
          </div>
          <Progress value={(progressData.skillsUnlocked / progressData.totalSkills) * 100} className="h-2" />
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
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-smooth ${
                achievement.unlocked 
                  ? "bg-gradient-success/10 border border-success/20" 
                  : "bg-muted/30 opacity-60"
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                achievement.unlocked ? "bg-gradient-success" : "bg-muted"
              }`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                {achievement.unlocked && achievement.date && (
                  <p className="text-xs text-success font-medium mt-1">{achievement.date}</p>
                )}
              </div>
              {achievement.unlocked && (
                <Badge variant="secondary">✓</Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};