import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  BookOpen, 
  PlayCircle, 
  CheckCircle2, 
  Lock,
  Star,
  Volume2,
  FileText,
  Brain,
  Target
} from 'lucide-react';

export default function GrammarPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('swahili');

  const grammarTopics = {
    swahili: [
      {
        id: 1,
        title: 'Basic Sentence Structure',
        description: 'Learn the fundamental word order in Kiswahili',
        difficulty: 'Beginner',
        lessons: 5,
        completed: 5,
        unlocked: true,
        concepts: ['Subject-Verb-Object', 'Noun Classes', 'Basic Questions']
      },
      {
        id: 2,
        title: 'Verb Conjugations',
        description: 'Master present, past, and future tense markers',
        difficulty: 'Intermediate',
        lessons: 8,
        completed: 3,
        unlocked: true,
        concepts: ['Tense Markers', 'Subject Prefixes', 'Negative Forms']
      },
      {
        id: 3,
        title: 'Noun Classes & Agreement',
        description: 'Understand the complex noun class system',
        difficulty: 'Advanced',
        lessons: 12,
        completed: 0,
        unlocked: false,
        concepts: ['Class Prefixes', 'Adjective Agreement', 'Possessive Forms']
      }
    ],
    kikuyu: [
      {
        id: 1,
        title: 'Basic Greetings & Responses',
        description: 'Essential greeting patterns in Kikuyu',
        difficulty: 'Beginner',
        lessons: 4,
        completed: 4,
        unlocked: true,
        concepts: ['Time-based Greetings', 'Formal vs Informal', 'Age Respect']
      },
      {
        id: 2,
        title: 'Tonal Patterns',
        description: 'Master the tonal system of Kikuyu',
        difficulty: 'Intermediate',
        lessons: 10,
        completed: 2,
        unlocked: true,
        concepts: ['High Tone', 'Low Tone', 'Rising Tone', 'Meaning Changes']
      }
    ],
    kalenjin: [
      {
        id: 1,
        title: 'Basic Sentence Formation',
        description: 'Learn to construct simple sentences',
        difficulty: 'Beginner',
        lessons: 6,
        completed: 1,
        unlocked: true,
        concepts: ['Word Order', 'Basic Verbs', 'Simple Questions']
      },
      {
        id: 2,
        title: 'Cultural Expressions',
        description: 'Traditional phrases and cultural context',
        difficulty: 'Intermediate',
        lessons: 8,
        completed: 0,
        unlocked: true,
        concepts: ['Ceremonial Language', 'Respect Forms', 'Traditional Wisdom']
      }
    ]
  };

  const grammarRules = [
    {
      rule: 'Verb-Subject Agreement',
      explanation: 'Verbs must agree with their subjects in person and number',
      example: 'Ni-na-soma (I am reading) vs Tu-na-soma (We are reading)',
      language: 'Kiswahili'
    },
    {
      rule: 'Tonal Meaning',
      explanation: 'Different tones can completely change word meanings',
      example: 'mũndũ (person) vs mundũ (person - different tone)',
      language: 'Kikuyu'
    },
    {
      rule: 'Respect Hierarchy',
      explanation: 'Language changes based on age and social status',
      example: 'Different greetings for elders vs peers',
      language: 'Kalenjin'
    }
  ];

  const practiceExercises = [
    {
      id: 1,
      title: 'Verb Conjugation Practice',
      type: 'Fill in the blanks',
      difficulty: 'Intermediate',
      questions: 15,
      timeEstimate: '10 min'
    },
    {
      id: 2,
      title: 'Sentence Reordering',
      type: 'Drag and drop',
      difficulty: 'Beginner',
      questions: 10,
      timeEstimate: '8 min'
    },
    {
      id: 3,
      title: 'Cultural Context Quiz',
      type: 'Multiple choice',
      difficulty: 'Advanced',
      questions: 20,
      timeEstimate: '15 min'
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

  const languages = [
    { value: 'swahili', label: 'Kiswahili', flag: '🇰🇪' },
    { value: 'kikuyu', label: 'Kikuyu', flag: '🇰🇪' },
    { value: 'kalenjin', label: 'Kalenjin', flag: '🇰🇪' }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Grammar Guide</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Master the structure and rules of Kenyan languages with detailed explanations and practice
        </p>
      </div>

      {/* Language Selection */}
      <div className="flex justify-center">
        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          {languages.map((lang) => (
            <Button
              key={lang.value}
              variant={selectedLanguage === lang.value ? "default" : "ghost"}
              onClick={() => setSelectedLanguage(lang.value)}
              className="flex items-center gap-2"
            >
              <span>{lang.flag}</span>
              {lang.label}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="topics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="topics" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Topics
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Rules
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Practice
          </TabsTrigger>
          <TabsTrigger value="reference" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Reference
          </TabsTrigger>
        </TabsList>

        <TabsContent value="topics" className="space-y-6">
          <div className="grid gap-4">
            {grammarTopics[selectedLanguage as keyof typeof grammarTopics]?.map((topic) => (
              <Card key={topic.id} className={!topic.unlocked ? 'opacity-60' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {topic.completed === topic.lessons ? (
                          <CheckCircle2 className="h-6 w-6 text-green-500" />
                        ) : topic.unlocked ? (
                          <PlayCircle className="h-6 w-6 text-primary" />
                        ) : (
                          <Lock className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl flex items-center gap-2">
                          {topic.title}
                          {topic.completed === topic.lessons && <Star className="h-4 w-4 text-yellow-500" />}
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">{topic.description}</p>
                        <div className="flex gap-2 mt-3">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${getDifficultyColor(topic.difficulty)}`} />
                            {topic.difficulty}
                          </Badge>
                          <Badge variant="secondary">{topic.lessons} lessons</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress: {topic.completed}/{topic.lessons}</span>
                        <span>{Math.round((topic.completed / topic.lessons) * 100)}%</span>
                      </div>
                      <Progress value={(topic.completed / topic.lessons) * 100} className="h-2" />
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Key Concepts:</p>
                      <div className="flex flex-wrap gap-1">
                        {topic.concepts.map((concept, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {concept}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center gap-2"
                        disabled={!topic.unlocked}
                      >
                        <Volume2 className="h-4 w-4" />
                        Audio Guide
                      </Button>
                      <Button 
                        size="sm"
                        disabled={!topic.unlocked}
                      >
                        {topic.completed === 0 ? 'Start Topic' : 'Continue'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            {grammarRules.map((rule, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <div>
                      <h3 className="font-semibold">{rule.rule}</h3>
                      <Badge variant="outline" className="mt-1">{rule.language}</Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <p className="text-muted-foreground">{rule.explanation}</p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="font-medium text-sm mb-1">Example:</p>
                      <p className="font-mono text-sm">{rule.example}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Volume2 className="h-4 w-4 mr-2" />
                        Listen
                      </Button>
                      <Button size="sm" variant="outline">Practice This Rule</Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <div className="grid gap-4">
            {practiceExercises.map((exercise) => (
              <Card key={exercise.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{exercise.title}</CardTitle>
                      <p className="text-muted-foreground mt-1">{exercise.type}</p>
                      <div className="flex gap-2 mt-3">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${getDifficultyColor(exercise.difficulty)}`} />
                          {exercise.difficulty}
                        </Badge>
                        <Badge variant="secondary">{exercise.questions} questions</Badge>
                        <Badge variant="secondary">{exercise.timeEstimate}</Badge>
                      </div>
                    </div>
                    <Button>Start Practice</Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reference" className="space-y-6">
          <div className="text-center space-y-4">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto" />
            <h3 className="text-xl font-semibold">Grammar Reference</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Quick reference guides for grammar rules, verb tables, and language patterns
            </p>
            <Button size="lg">
              <FileText className="h-4 w-4 mr-2" />
              View Reference Guide
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}