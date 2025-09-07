import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Mic, 
  Volume2, 
  Play, 
  Pause,
  RotateCcw,
  CheckCircle2,
  Users,
  ShoppingCart,
  Coffee,
  Briefcase,
  Home
} from 'lucide-react';

export default function ConversationPage() {
  const [selectedScenario, setSelectedScenario] = useState('market');
  const [isRecording, setIsRecording] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const scenarios = [
    {
      id: 'market',
      title: 'At the Market',
      description: 'Practice buying fruits and vegetables',
      icon: ShoppingCart,
      difficulty: 'Beginner',
      steps: 8,
      language: 'Kiswahili'
    },
    {
      id: 'cafe',
      title: 'Ordering Coffee',
      description: 'Learn to order drinks and snacks',
      icon: Coffee,
      difficulty: 'Beginner',
      steps: 6,
      language: 'Kiswahili'
    },
    {
      id: 'office',
      title: 'Office Meeting',
      description: 'Professional conversation practice',
      icon: Briefcase,
      difficulty: 'Intermediate',
      steps: 12,
      language: 'Kiswahili'
    },
    {
      id: 'family',
      title: 'Family Gathering',
      description: 'Casual conversation with relatives',
      icon: Home,
      difficulty: 'Intermediate',
      steps: 10,
      language: 'Kikuyu'
    }
  ];

  const conversationSteps = [
    {
      id: 1,
      speaker: 'vendor',
      text: 'Habari za asubuhi! Karibu dukani.',
      translation: 'Good morning! Welcome to the shop.',
      audio: true
    },
    {
      id: 2,
      speaker: 'user',
      text: 'Habari! Ningependa kununua matunda.',
      translation: 'Hello! I would like to buy some fruits.',
      isUserTurn: true
    },
    {
      id: 3,
      speaker: 'vendor',
      text: 'Vizuri! Tuna machungwa, ndizi, na mapapai.',
      translation: 'Great! We have oranges, bananas, and papayas.',
      audio: true
    }
  ];

  const practicePartners = [
    {
      id: 1,
      name: 'Sarah',
      level: 'Intermediate',
      language: 'Kiswahili',
      specialty: 'Business conversations',
      available: true
    },
    {
      id: 2,
      name: 'David',
      level: 'Advanced',
      language: 'Kikuyu',
      specialty: 'Cultural discussions',
      available: false
    },
    {
      id: 3,
      name: 'Grace',
      level: 'Beginner',
      language: 'Kalenjin',
      specialty: 'Daily conversations',
      available: true
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Conversation Practice</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Practice real-world conversations through interactive scenarios and live partners
        </p>
      </div>

      <Tabs defaultValue="scenarios" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scenarios" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Scenarios
          </TabsTrigger>
          <TabsTrigger value="live" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Live Practice
          </TabsTrigger>
          <TabsTrigger value="ai-chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            AI Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {scenarios.map((scenario) => {
              const IconComponent = scenario.icon;
              return (
                <Card 
                  key={scenario.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedScenario === scenario.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedScenario(scenario.id)}
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <IconComponent className="h-8 w-8 text-primary mt-1" />
                      <div className="flex-1">
                        <CardTitle className="text-lg">{scenario.title}</CardTitle>
                        <p className="text-muted-foreground mt-1">{scenario.description}</p>
                        <div className="flex gap-2 mt-3">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${getDifficultyColor(scenario.difficulty)}`} />
                            {scenario.difficulty}
                          </Badge>
                          <Badge variant="secondary">{scenario.steps} steps</Badge>
                          <Badge variant="outline">{scenario.language}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* Selected Scenario Practice */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Market Conversation Practice</CardTitle>
                  <p className="text-muted-foreground">Step {currentStep + 1} of 8</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restart
                  </Button>
                  <Button variant="outline" size="sm">
                    Skip Step
                  </Button>
                </div>
              </div>
              <Progress value={(currentStep / 8) * 100} className="mt-4" />
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Conversation Display */}
              <div className="space-y-4">
                {conversationSteps.map((step) => (
                  <div 
                    key={step.id} 
                    className={`flex gap-3 ${step.speaker === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar>
                      <AvatarFallback>
                        {step.speaker === 'user' ? 'You' : 'V'}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`max-w-md ${step.speaker === 'user' ? 'text-right' : ''}`}>
                      <div className={`p-4 rounded-lg ${
                        step.speaker === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="font-medium">{step.text}</p>
                        <p className="text-sm opacity-80 mt-1">{step.translation}</p>
                      </div>
                      {step.audio && (
                        <Button variant="ghost" size="sm" className="mt-2">
                          <Volume2 className="h-4 w-4 mr-2" />
                          Listen
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* User Input Section */}
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <p className="font-medium">Your turn to respond:</p>
                    <p className="text-muted-foreground">
                      Try saying: "Ningependa machungwa mawili" (I would like two oranges)
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button 
                        size="lg"
                        variant={isRecording ? "destructive" : "default"}
                        onClick={() => setIsRecording(!isRecording)}
                        className="flex items-center gap-2"
                      >
                        <Mic className="h-5 w-5" />
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                      </Button>
                      <Button size="lg" variant="outline">
                        <Volume2 className="h-5 w-5 mr-2" />
                        Hear Example
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live" className="space-y-6">
          <div className="grid gap-4">
            {practicePartners.map((partner) => (
              <Card key={partner.id} className={!partner.available ? 'opacity-60' : ''}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{partner.name}</h3>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{partner.level}</Badge>
                          <Badge variant="outline">{partner.language}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Specialty: {partner.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center gap-2 mb-2 ${
                        partner.available ? 'text-green-500' : 'text-red-500'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          partner.available ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <span className="text-sm">
                          {partner.available ? 'Available' : 'Busy'}
                        </span>
                      </div>
                      <Button 
                        size="sm"
                        disabled={!partner.available}
                      >
                        {partner.available ? 'Start Chat' : 'Notify When Available'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-chat" className="space-y-6">
          <div className="text-center space-y-4">
            <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto" />
            <h3 className="text-xl font-semibold">AI Conversation Partner</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Practice conversations with our AI tutor that adapts to your learning level
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg">Start Casual Chat</Button>
              <Button size="lg" variant="outline">Focused Practice</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}