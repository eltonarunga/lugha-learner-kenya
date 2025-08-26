import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AnswerSubmission {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent?: number;
}

export const useAnswerSubmission = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitAnswer = async (submission: AnswerSubmission) => {
    setSubmitting(true);
    setError(null);

    try {
      // In a real app, you would submit the answer to check correctness
      // For now, we'll just simulate the submission
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return { success: true, isCorrect: submission.isCorrect };
    } catch (err) {
      console.error('Error submitting answer:', err);
      setError('Failed to submit answer');
      return { success: false, isCorrect: false };
    } finally {
      setSubmitting(false);
    }
  };

  const submitLessonCompletion = async (lessonId: string, score: number, xpEarned: number) => {
    setSubmitting(true);
    setError(null);

    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) throw new Error('User not authenticated');

      // Update or create user progress
      const { error: progressError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.data.user.id,
          lesson_id: lessonId,
          language_code: 'swahili', // This should come from user context
          score,
          is_completed: true,
          completed_at: new Date().toISOString(),
          attempts: 1 // In real app, increment existing attempts
        });

      if (progressError) throw progressError;

      // Note: XP updates would be handled via database triggers or separate endpoint
      // For now, just log the XP earned
      console.log(`User earned ${xpEarned} XP for completing lesson ${lessonId}`);

      return { success: true };
    } catch (err) {
      console.error('Error submitting lesson completion:', err);
      setError('Failed to save progress');
      return { success: false };
    } finally {
      setSubmitting(false);
    }
  };

  return { submitAnswer, submitLessonCompletion, submitting, error };
};