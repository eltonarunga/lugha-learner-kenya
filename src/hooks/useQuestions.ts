import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Question {
  id: string;
  lesson_id: string;
  question_text: string;
  image_url?: string;
  audio_url?: string;
  options: string[];
  order_index: number;
  proverb_text?: string;
  cultural_meaning?: string;
  language_origin?: string;
}

export const useQuestions = (lessonId: string | null) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonId) return;

    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);

      try {
        // Use the secure RPC function that doesn't expose correct answers
        const { data, error } = await supabase.rpc('get_public_questions', {
          lesson_id: lessonId
        });

        if (error) throw error;

        setQuestions(data || []);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [lessonId]);

  return { questions, loading, error };
};