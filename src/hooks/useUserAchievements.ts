import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement_type: string;
  requirement_value: number;
  earned?: boolean;
  earned_at?: string;
}

export const useUserAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useUser();

  useEffect(() => {
    if (!userData) return;

    const fetchAchievements = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          throw new Error('User not authenticated');
        }

        // Get all achievements
        const { data: allAchievements, error: achievementsError } = await supabase
          .from('achievements')
          .select('*')
          .eq('is_active', true);

        if (achievementsError) throw achievementsError;

        // Get user's earned achievements
        const { data: userAchievements, error: userAchievementsError } = await supabase
          .from('user_achievements')
          .select('achievement_id, earned_at')
          .eq('user_id', user.id);

        if (userAchievementsError) throw userAchievementsError;

        // Merge the data
        const achievementsWithStatus = (allAchievements || []).map(achievement => {
          const userAchievement = userAchievements?.find(ua => ua.achievement_id === achievement.id);
          return {
            ...achievement,
            earned: !!userAchievement,
            earned_at: userAchievement?.earned_at
          };
        });

        setAchievements(achievementsWithStatus);
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError('Failed to load achievements');
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [userData]);

  return { achievements, loading, error };
};