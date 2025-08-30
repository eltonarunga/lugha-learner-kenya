import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  language_code: string;
  level: number;
  order_index: number;
  xp_reward: number;
  is_active: boolean;
  lesson_type?: string;
  cultural_context?: string;
}

export const useLessons = (languageCode?: string) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from('lessons')
          .select('*')
          .eq('is_active', true)
          .order('order_index');

        if (languageCode) {
          query = query.eq('language_code', languageCode);
        }

        const { data, error } = await query;

        if (error) throw error;

        setLessons(data || []);
      } catch (err) {
        console.error('Error fetching lessons:', err);
        setError('Failed to load lessons');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [languageCode]);

  return { lessons, loading, error };
};