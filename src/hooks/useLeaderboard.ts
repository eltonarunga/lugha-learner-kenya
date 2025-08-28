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
        const { data, error } = await supabase.rpc('get_public_leaderboard', {
          p_limit: 50
        });

        if (error) throw error;

        const leaderboardData = (data || []).map((entry: any) => ({
          id: entry.name, // Use name as id for display purposes
          name: entry.name,
          total_xp: entry.total_xp,
          current_streak: entry.current_streak,
          avatar: entry.name.substring(0, 2).toUpperCase(),
          position: entry.rank
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