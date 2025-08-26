import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Volume2, CheckCircle, XCircle, ArrowLeft, Loader2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Navigate } from "react-router-dom";
import { useQuestions, Question } from "@/hooks/useQuestions";
import { useAnswerSubmission } from "@/hooks/useAnswerSubmission";
import InteractiveMascot from "@/components/InteractiveMascot";
import { useLessons } from "@/hooks/useLessons";

const LessonPage = () => {
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get('id');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<{ [questionId: string]: number }>({});
  
  const { userData } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { questions, loading: questionsLoading, error: questionsError } = useQuestions(lessonId);
  const { lessons, loading: lessonsLoading } = useLessons(userData?.language);
  const { submitAnswer, submitLessonCompletion, submitting } = useAnswerSubmission();

  // Find current lesson details
  const currentLesson = lessons.find(lesson => lesson.id === lessonId);

  useEffect(() => {
    // Simulate fetching correct answers from a secure endpoint
    // In reality, this would be done after each answer submission
    if (questions.length > 0) {
      const mockCorrectAnswers: { [questionId: string]: number } = {};
      questions.forEach((q, index) => {
        // Mock correct answers - in reality these come from secure backend
        mockCorrectAnswers[q.id] = index === 0 ? 0 : index === 1 ? 1 : 2;
      });
      setCorrectAnswers(mockCorrectAnswers);
    }
  }, [questions]);

  if (!userData) {
    return <Navigate to="/auth" />;
  }

  if (!lessonId) {
    return <Navigate to="/dashboard" />;
  }

  if (questionsLoading || lessonsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (questionsError || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-4">
              {questionsError || "No questions found for this lesson."}
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const playAudio = () => {
    if (question.audio_url) {
      // Play actual audio file
      const audio = new Audio(question.audio_url);
      audio.play().catch(console.error);
    } else {
      // Fallback: use text-to-speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(question.question_text);
        utterance.lang = userData.language === 'swahili' ? 'sw-KE' : 'en-US';
        speechSynthesis.speak(utterance);
      }
    }
  };

  const handleAnswerSelect = async (answerIndex: number) => {
    if (answered) return;

    setSelectedAnswer(answerIndex);
    setAnswered(true);
    setShowFeedback(true);

    const isCorrect = answerIndex === correctAnswers[question.id];
    if (isCorrect) {
      setScore(score + 1);
    }

    // Submit answer to backend
    await submitAnswer({
      questionId: question.id,
      selectedAnswer: answerIndex,
      isCorrect
    });
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setAnswered(false);
    } else {
      // Lesson complete
      const earnedXP = (currentLesson?.xp_reward || 10) + (score * 5); // Base XP + bonus for correct answers
      
      const result = await submitLessonCompletion(lessonId, score, earnedXP);
      
      navigate("/dashboard");
      
      if (result.success) {
        toast({
          title: "Lesson Complete! 🏆",
          description: `You earned ${earnedXP} XP! Keep up the great work!`,
        });
      } else {
        toast({
          title: "Lesson Complete! 🏆",
          description: "Great job! Your progress will be saved shortly.",
          variant: "default"
        });
      }
    }
  };

  const onBack = () => navigate("/dashboard");

  const isCorrect = selectedAnswer === correctAnswers[question.id];
  const isLastQuestion = currentQuestion === questions.length - 1;

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
          {currentQuestion + 1}/{questions.length}
        </Badge>
      </div>

      {/* Interactive Mascot */}
      <InteractiveMascot 
        isCorrect={showFeedback ? isCorrect : null}
        isAnswered={answered}
        encouragementMessage={currentLesson?.title ? `Let's learn ${currentLesson.title}!` : "You can do this!"}
      />

      {/* Question Card */}
      <Card className="shadow-card mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{question.question_text}</CardTitle>
          {(question.audio_url || true) && (
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
              if (index === correctAnswers[question.id]) {
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
                  {/* In real app, explanation would come from secure backend after answer submission */}
                  Great job! Keep learning to master this language.
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
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            isLastQuestion ? "Complete Lesson! 🏆" : "Continue"
          )}
        </Button>
      )}
    </div>
  );
};

export default LessonPage;
