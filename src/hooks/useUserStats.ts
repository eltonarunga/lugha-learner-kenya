import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';

export interface UserStats {
  totalXP: number;
  streak: number;
  level: number;
  todayProgress: number;
  weeklyProgress: number;
  lessonsCompleted: number;
}

export const useUserStats = () => {
  const [stats, setStats] = useState<UserStats>({
    totalXP: 0,
    streak: 0,
    level: 1,
    todayProgress: 0,
    weeklyProgress: 0,
    lessonsCompleted: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useUser();

  useEffect(() => {
    if (!userData) return;

    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          throw new Error('User not authenticated');
        }

        // Get user profile data
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('total_xp, current_streak')
          .eq('user_id', user.id)
          .single();

        if (profileError) throw profileError;

        // Get lessons completed count
        const { count: completedCount, error: progressError } = await supabase
          .from('user_progress')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('is_completed', true);

        if (progressError) throw progressError;

        // Calculate level (500 XP per level)
        const level = Math.floor((profile?.total_xp || 0) / 500) + 1;

        // Calculate today's progress (mock for now - would need daily tracking)
        const todayProgress = Math.min((profile?.total_xp || 0) % 50, 50);

        // Calculate weekly progress (mock for now - would need weekly tracking)
        const weeklyProgress = Math.min((profile?.total_xp || 0) % 350, 350);

        setStats({
          totalXP: profile?.total_xp || 0,
          streak: profile?.current_streak || 0,
          level,
          todayProgress,
          weeklyProgress,
          lessonsCompleted: completedCount || 0
        });
      } catch (err) {
        console.error('Error fetching user stats:', err);
        setError('Failed to load user stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userData]);

  return { stats, loading, error };
};