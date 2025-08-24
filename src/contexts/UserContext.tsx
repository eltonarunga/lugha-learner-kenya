import { createContext, useState, useContext, ReactNode } from 'react';

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
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
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
