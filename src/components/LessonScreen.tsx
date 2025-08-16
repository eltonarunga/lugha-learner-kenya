import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Volume2, CheckCircle, XCircle, ArrowLeft } from "lucide-react";

interface Question {
  id: number;
  type: "multiple-choice";
  question: string;
  audio?: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface LessonScreenProps {
  language: string;
  onComplete: (xp: number) => void;
  onBack: () => void;
}

export const LessonScreen = ({ language, onComplete, onBack }: LessonScreenProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  // Mock lesson data - would come from backend in real app
  const lessons = {
    swahili: [
      {
        id: 1,
        type: "multiple-choice" as const,
        question: "How do you say 'Hello' in Swahili?",
        audio: "jambo",
        options: ["Jambo", "Asante", "Karibu", "Baada"],
        correct: 0,
        explanation: "Jambo is the most common way to say hello in Swahili!"
      },
      {
        id: 2,
        type: "multiple-choice" as const,
        question: "What does 'Asante' mean?",
        audio: "asante",
        options: ["Hello", "Thank you", "Goodbye", "Please"],
        correct: 1,
        explanation: "Asante means 'Thank you' in Swahili."
      },
      {
        id: 3,
        type: "multiple-choice" as const,
        question: "How do you say 'Welcome' in Swahili?",
        audio: "karibu",
        options: ["Jambo", "Asante", "Karibu", "Kwaheri"],
        correct: 2,
        explanation: "Karibu means 'Welcome' - you'll hear this a lot in Kenya!"
      }
    ],
    kikuyu: [
      {
        id: 1,
        type: "multiple-choice" as const,
        question: "How do you say 'Hello' in Kikuyu?",
        audio: "wihii",
        options: ["Wîhîî", "Nĩ wega", "Nĩ ũrî", "Tiguo"],
        correct: 0,
        explanation: "Wîhîî is a common greeting in Kikuyu!"
      }
    ],
    luo: [
      {
        id: 1,
        type: "multiple-choice" as const,
        question: "How do you say 'Hello' in Luo?",
        audio: "amosi",
        options: ["Amosi", "Erokamano", "Oriti", "Nyathi"],
        correct: 0,
        explanation: "Amosi is how you greet someone in Luo!"
      }
    ]
  };

  const currentLessonQuestions = lessons[language as keyof typeof lessons] || lessons.swahili;
  const question = currentLessonQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / currentLessonQuestions.length) * 100;

  const playAudio = () => {
    // In a real app, this would play actual audio files
    // For now, we'll use text-to-speech or just show a visual indicator
    console.log(`Playing audio: ${question.audio}`);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    setShowFeedback(true);
    
    if (answerIndex === question.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < currentLessonQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setAnswered(false);
    } else {
      // Lesson complete
      const earnedXP = score * 10 + 10; // Base XP + bonus for correct answers
      onComplete(earnedXP);
    }
  };

  const isCorrect = selectedAnswer === question.correct;
  const isLastQuestion = currentQuestion === currentLessonQuestions.length - 1;

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          onClick={onBack}
          variant="ghost" 
          size="icon"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex-1 mx-4">
          <Progress value={progress} className="h-3" />
        </div>
        
        <Badge variant="secondary">
          {currentQuestion + 1}/{currentLessonQuestions.length}
        </Badge>
      </div>

      {/* Question Card */}
      <Card className="shadow-card mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{question.question}</CardTitle>
          {question.audio && (
            <Button 
              onClick={playAudio}
              variant="outline"
              size="sm"
              className="mx-auto"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Listen
            </Button>
          )}
        </CardHeader>
        
        <CardContent className="space-y-3">
          {question.options.map((option, index) => {
            let buttonVariant: "outline" | "success" | "destructive" = "outline";
            let className = "w-full p-4 text-left h-auto justify-start";
            
            if (showFeedback && selectedAnswer !== null) {
              if (index === question.correct) {
                buttonVariant = "success";
                className += " ring-2 ring-success";
              } else if (index === selectedAnswer && !isCorrect) {
                buttonVariant = "destructive";
                className += " ring-2 ring-destructive";
              }
            } else if (selectedAnswer === index) {
              className += " ring-2 ring-primary";
            }
            
            return (
              <Button
                key={index}
                variant={buttonVariant}
                onClick={() => handleAnswerSelect(index)}
                disabled={answered}
                className={className}
              >
                <span className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Feedback */}
      {showFeedback && (
        <Card className={`shadow-card mb-6 ${isCorrect ? 'border-success' : 'border-destructive'}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className={`font-semibold ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                  {isCorrect ? "Correct! 🎉" : "Not quite right 😔"}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {question.explanation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      {showFeedback && (
        <Button 
          onClick={handleNext}
          variant="hero"
          size="lg"
          className="w-full"
        >
          {isLastQuestion ? "Complete Lesson! 🏆" : "Continue"}
        </Button>
      )}
    </div>
  );
};