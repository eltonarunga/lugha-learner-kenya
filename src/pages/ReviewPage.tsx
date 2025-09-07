import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  RotateCcw, 
  Clock, 
  Brain, 
  Target, 
  BookOpen,
  TrendingUp,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';

export default function ReviewPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [reviewType, setReviewType] = useState('spaced');

  const reviewStats = {
    totalItems: 127,
    dueToday: 23,
    overdue: 8,
    mastered: 96,
    streak: 12
  };

  const spacedRepetitionItems = [
    {
      id: 1,
      content: 'Hujambo',
      translation: 'Hello (formal)',
      language: 'Kiswahili',
      difficulty: 'Easy',
      nextReview: 'Now',
      interval: '1 day',
      status: 'due'
    },
    {
      id: 2,
      content: 'Mũndũ wa kĩgongona ndarĩ mbeũ',
      translation: 'A selfish person has no seeds',
      language: 'Kikuyu',
      difficulty: 'Hard',
      nextReview: 'Overdue',
      interval: '3 days',
      status: 'overdue'
    },
    {
      id: 3,
      content: 'Chamge ak kibendo',
      translation: 'Unity is strength',
      language: 'Kalenjin',
      difficulty: 'Medium',
      nextReview: 'In 2 hours',
      interval: '12 hours',
      status: 'upcoming'
    }
  ];

  const weeklyProgress = [
    { day: 'Mon', reviewed: 15, target: 20 },
    { day: 'Tue', reviewed: 22, target: 20 },
    { day: 'Wed', reviewed: 18, target: 20 },
    { day: 'Thu', reviewed: 25, target: 20 },
    { day: 'Fri', reviewed: 20, target: 20 },
    { day: 'Sat', reviewed: 12, target: 15 },
    { day: 'Sun', reviewed: 8, target: 15 }
  ];

  const mistakePatterns = [
    {
      category: 'Tense Usage',
      mistakes: 12,
      improvement: '+15%',
      language: 'Kiswahili'
    },
    {
      category: 'Pronunciation',
      mistakes: 8,
      improvement: '-5%',
      language: 'Kalenjin'
    },
    {
      category: 'Cultural Context',
      mistakes: 6,
      improvement: '+22%',
      language: 'Kikuyu'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'due':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'overdue':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'upcoming':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'due':
        return 'border-l-yellow-500';
      case 'overdue':
        return 'border-l-red-500';
      case 'upcoming':
        return 'border-l-blue-500';
      default:
        return 'border-l-green-500';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Review & Practice</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Strengthen your memory with spaced repetition and targeted practice
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-primary">{reviewStats.dueToday}</div>
            <p className="text-sm text-muted-foreground">Due Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-red-500">{reviewStats.overdue}</div>
            <p className="text-sm text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-500">{reviewStats.mastered}</div>
            <p className="text-sm text-muted-foreground">Mastered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-500">{reviewStats.totalItems}</div>
            <p className="text-sm text-muted-foreground">Total Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-orange-500">{reviewStats.streak}</div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="review" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="review" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Review
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="mistakes" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Weak Areas
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="review" className="space-y-6">
          <div className="flex gap-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="swahili">Kiswahili</SelectItem>
                <SelectItem value="kikuyu">Kikuyu</SelectItem>
                <SelectItem value="kalenjin">Kalenjin</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={reviewType} onValueChange={setReviewType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Review type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spaced">Spaced Repetition</SelectItem>
                <SelectItem value="mistakes">Review Mistakes</SelectItem>
                <SelectItem value="random">Random Review</SelectItem>
              </SelectContent>
            </Select>

            <Button size="lg" className="ml-auto">
              <Brain className="h-4 w-4 mr-2" />
              Start Review Session
            </Button>
          </div>

          <div className="space-y-4">
            {spacedRepetitionItems.map((item) => (
              <Card key={item.id} className={`border-l-4 ${getStatusColor(item.status)}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item.status)}
                      <div>
                        <CardTitle className="text-lg">{item.content}</CardTitle>
                        <p className="text-muted-foreground">{item.translation}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant="outline">{item.language}</Badge>
                      <p className="text-xs text-muted-foreground">{item.difficulty}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Next review: {item.nextReview} • Interval: {item.interval}
                    </div>
                    <Button size="sm">Review Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Review Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyProgress.map((day) => (
                  <div key={day.day} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-medium">{day.day}</div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{day.reviewed} reviewed</span>
                        <span>Target: {day.target}</span>
                      </div>
                      <Progress value={(day.reviewed / day.target) * 100} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round((day.reviewed / day.target) * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mistakes" className="space-y-6">
          <div className="grid gap-4">
            {mistakePatterns.map((pattern, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{pattern.category}</CardTitle>
                      <Badge variant="outline">{pattern.language}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-500">{pattern.mistakes}</p>
                      <p className="text-sm text-muted-foreground">mistakes this week</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Improvement:</span>
                      <span className={`text-sm font-medium ${
                        pattern.improvement.startsWith('+') ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {pattern.improvement}
                      </span>
                    </div>
                    <Button size="sm">Practice This Area</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div className="text-center space-y-4">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto" />
            <h3 className="text-xl font-semibold">Review Schedule</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your personalized review schedule based on spaced repetition algorithms
            </p>
            <Button size="lg">
              <BookOpen className="h-4 w-4 mr-2" />
              View Full Schedule
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}