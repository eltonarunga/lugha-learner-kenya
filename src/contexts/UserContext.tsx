import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface UserData {
  name: string;
  age: string;
  language: string;
  email?: string;
  isGuest: boolean;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile data when authenticated
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUserData(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('name, email, age, selected_language')
        .eq('user_id', userId)
        .single();

      if (profile && profile.name && profile.age && profile.selected_language) {
        // User has a complete profile
        setUserData({
          name: profile.name,
          age: profile.age,
          language: profile.selected_language,
          email: profile.email || '',
          isGuest: false
        });
      } else {
        // User exists but profile is incomplete, they need onboarding
        setUserData({
          name: profile?.name || '',
          age: profile?.age || '',
          language: profile?.selected_language || '',
          email: profile?.email || '',
          isGuest: false
        });
      }
    } catch (error) {
      // Profile doesn't exist, user needs onboarding
      console.error('Error fetching user profile:', error);
      setUserData({
        name: '',
        age: '',
        language: '',
        email: '',
        isGuest: false
      });
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserData(null);
    setUser(null);
    setSession(null);
  };

  return (
    <UserContext.Provider value={{ 
      userData, 
      setUserData, 
      user, 
      session, 
      loading, 
      signOut 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
