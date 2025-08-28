import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AnswerSubmission {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean; // Not used anymore, determined by server
  timeSpent?: number;
}

export const useAnswerSubmission = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitAnswer = async (submission: AnswerSubmission) => {
    setSubmitting(true);
    setError(null);

    try {
      // Use secure server-side answer validation
      const { data, error } = await supabase.rpc('check_answer', {
        p_question_id: submission.questionId,
        p_selected_answer: submission.selectedAnswer
      });

      if (error) throw error;

      const result = data?.[0];
      if (!result) throw new Error('No result returned from server');
      
      return { 
        success: true, 
        isCorrect: result.is_correct,
        correctAnswer: result.correct_answer,
        explanation: result.explanation,
        xpEarned: result.xp_earned
      };
    } catch (err) {
      console.error('Error submitting answer:', err);
      setError('Failed to submit answer');
      return { success: false, isCorrect: false };
    } finally {
      setSubmitting(false);
    }
  };

  const submitLessonCompletion = async (lessonId: string, score: number, languageCode: string = 'swahili') => {
    setSubmitting(true);
    setError(null);

    try {
      // Use secure server-side lesson completion
      const { data, error } = await supabase.rpc('complete_lesson', {
        p_lesson_id: lessonId,
        p_score: score,
        p_language_code: languageCode
      });

      if (error) throw error;

      const result = data?.[0];
      if (!result) throw new Error('No result returned from server');

      return { 
        success: result.success,
        totalXp: result.total_xp_earned,
        lessonXp: result.lesson_xp
      };
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