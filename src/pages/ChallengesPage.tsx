import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Trophy, 
  Target, 
  Clock, 
  Star, 
  Users,
  CheckCircle,
  PlayCircle,
  Lock
} from 'lucide-react';

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState('weekly');

  const weeklyChallenge = {
    title: 'Proverb Master Week',
    description: 'Learn 15 traditional proverbs from different Kenyan languages',
    progress: 8,
    total: 15,
    timeLeft: '3 days',
    xpReward: 500,
    participants: 127
  };

  const dailyChallenges = [
    {
      id: 1,
      title: 'Morning Greetings',
      description: 'Practice 5 different ways to say good morning in Kikuyu',
      difficulty: 'Easy',
      xpReward: 50,
      timeLeft: '18h',
      completed: false,
      language: 'Kikuyu'
    },
    {
      id: 2,
      title: 'Market Conversation',
      description: 'Complete a simulated market buying scenario in Kiswahili',
      difficulty: 'Medium',
      xpReward: 75,
      timeLeft: '18h',
      completed: true,
      language: 'Kiswahili'
    },
    {
      id: 3,
      title: 'Cultural Story Time',
      description: 'Listen and answer questions about a Kalenjin folktale',
      difficulty: 'Hard',
      xpReward: 100,
      timeLeft: '18h',
      completed: false,
      language: 'Kalenjin'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Streak Master',
      description: 'Maintain a 30-day learning streak',
      icon: '🔥',
      progress: 22,
      total: 30,
      unlocked: false
    },
    {
      id: 2,
      title: 'Polyglot',
      description: 'Complete lessons in all 4 languages',
      icon: '🌍',
      progress: 3,
      total: 4,
      unlocked: false
    },
    {
      id: 3,
      title: 'Social Learner',
      description: 'Help 10 community members',
      icon: '🤝',
      progress: 10,
      total: 10,
      unlocked: true
    }
  ];

  const competitions = [
    {
      id: 1,
      title: 'Monthly Language Sprint',
      description: 'Compete with learners nationwide in a month-long challenge',
      participants: 1250,
      timeLeft: '12 days',
      prize: 'Premium features for 3 months',
      status: 'active'
    },
    {
      id: 2,
      title: 'Cultural Knowledge Quiz',
      description: 'Test your knowledge of Kenyan cultural traditions',
      participants: 0,
      timeLeft: 'Starts in 5 days',
      prize: 'Cultural immersion workshop',
      status: 'upcoming'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Challenges & Goals</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Push your learning with daily challenges, weekly goals, and exciting competitions
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Weekly
          </TabsTrigger>
          <TabsTrigger value="daily" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Daily
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="competitions" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Competitions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-6">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    {weeklyChallenge.title}
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">{weeklyChallenge.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{weeklyChallenge.xpReward} XP</p>
                  <p className="text-sm text-muted-foreground">{weeklyChallenge.participants} participants</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress: {weeklyChallenge.progress}/{weeklyChallenge.total}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {weeklyChallenge.timeLeft} left
                    </span>
                  </div>
                  <Progress value={(weeklyChallenge.progress / weeklyChallenge.total) * 100} className="h-3" />
                </div>
                <Button size="lg" className="w-full">Continue Challenge</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily" className="space-y-6">
          <div className="grid gap-4">
            {dailyChallenges.map((challenge) => (
              <Card key={challenge.id} className={challenge.completed ? 'opacity-75' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {challenge.completed ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <PlayCircle className="h-6 w-6 text-primary" />
                      )}
                      <div>
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge variant="outline">{challenge.language}</Badge>
                      <p className="text-sm font-medium">{challenge.xpReward} XP</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getDifficultyColor(challenge.difficulty)}`} />
                      <span className="text-sm font-medium">{challenge.difficulty}</span>
                      <span className="text-sm text-muted-foreground">• {challenge.timeLeft}</span>
                    </div>
                    <Button 
                      size="sm" 
                      disabled={challenge.completed}
                      variant={challenge.completed ? "secondary" : "default"}
                    >
                      {challenge.completed ? 'Completed' : 'Start Challenge'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={!achievement.unlocked ? 'opacity-75' : ''}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {achievement.title}
                        {achievement.unlocked && <Star className="h-4 w-4 text-yellow-500" />}
                        {!achievement.unlocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.total}</span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.total) * 100} 
                      className="h-2" 
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="competitions" className="space-y-6">
          <div className="space-y-4">
            {competitions.map((competition) => (
              <Card key={competition.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-primary" />
                        {competition.title}
                      </CardTitle>
                      <p className="text-muted-foreground mt-2">{competition.description}</p>
                    </div>
                    <Badge variant={competition.status === 'active' ? 'default' : 'secondary'}>
                      {competition.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Prize: {competition.prize}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {competition.participants > 0 ? `${competition.participants} participants` : 'Be the first to join!'}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {competition.timeLeft}
                      </p>
                    </div>
                    <Button size="sm" disabled={competition.status === 'upcoming'}>
                      {competition.status === 'active' ? 'Join Competition' : 'Coming Soon'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}