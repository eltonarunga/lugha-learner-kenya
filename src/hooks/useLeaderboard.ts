import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LeaderboardUser {
  id: string;
  name: string;
  total_xp: number;
  current_streak: number;
  avatar: string;
  position?: number;
}

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, name, total_xp, current_streak')
          .order('total_xp', { ascending: false })
          .limit(50);

        if (error) throw error;

        const leaderboardData = (data || []).map((user, index) => ({
          ...user,
          avatar: user.name.substring(0, 2).toUpperCase(),
          position: index + 1
        }));

        setLeaderboard(leaderboardData);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return { leaderboard, loading, error };
};