import { useState } from "react";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { AuthScreen } from "@/components/AuthScreen";
import { DashboardScreen } from "@/components/DashboardScreen";
import { LessonScreen } from "@/components/LessonScreen";
import { ProgressScreen } from "@/components/ProgressScreen";
import { LeaderboardScreen } from "@/components/LeaderboardScreen";
import { SettingsScreen } from "@/components/SettingsScreen";
import { Navigation } from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

type Screen = "auth" | "onboarding" | "dashboard" | "lesson" | "progress" | "leaderboard" | "settings";

interface UserData {
  name: string;
  age: string;
  language: string;
  email?: string;
  isGuest: boolean;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("auth");
  const [userData, setUserData] = useState<UserData | null>(null);
  const { toast } = useToast();

  const handleOnboardingComplete = (data: { name: string; age: string; language: string }) => {
    setUserData({ ...data, isGuest: userData?.isGuest || false });
    setCurrentScreen("dashboard");
    toast({
      title: "Welcome to LughaSmart! 🎉",
      description: `Ready to start learning ${data.language}?`,
    });
  };

  const handleLogin = (email: string) => {
    setUserData({ 
      name: email.split('@')[0], 
      age: "25", 
      language: "swahili", 
      email, 
      isGuest: false 
    });
    setCurrentScreen("onboarding");
  };

  const handleGuestMode = () => {
    setUserData({ 
      name: "Guest", 
      age: "25", 
      language: "swahili", 
      isGuest: true 
    });
    setCurrentScreen("onboarding");
  };

  const handleLessonComplete = (xp: number) => {
    setCurrentScreen("dashboard");
    toast({
      title: "Lesson Complete! 🏆",
      description: `You earned ${xp} XP! Keep up the great work!`,
    });
  };

  const handleLanguageChange = (newLanguage: string) => {
    if (userData) {
      setUserData({ ...userData, language: newLanguage });
      toast({
        title: "Language Changed",
        description: `Now learning ${newLanguage}!`,
      });
    }
  };

  const handleLogout = () => {
    setUserData(null);
    setCurrentScreen("auth");
    toast({
      title: "Logged out",
      description: "See you soon!",
    });
  };

  // Render current screen
  switch (currentScreen) {
    case "auth":
      return (
        <AuthScreen 
          onLogin={handleLogin}
          onGuestMode={handleGuestMode}
        />
      );

    case "onboarding":
      return (
        <OnboardingScreen 
          onComplete={handleOnboardingComplete}
        />
      );

    case "dashboard":
      return userData ? (
        <div className="pb-16">
          <DashboardScreen 
            userName={userData.name}
            language={userData.language}
            onStartLesson={() => setCurrentScreen("lesson")}
            onViewProgress={() => setCurrentScreen("progress")}
            onViewLeaderboard={() => setCurrentScreen("leaderboard")}
          />
          <Navigation 
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen as Screen)}
          />
        </div>
      ) : null;

    case "lesson":
      return userData ? (
        <LessonScreen 
          language={userData.language}
          onComplete={handleLessonComplete}
          onBack={() => setCurrentScreen("dashboard")}
        />
      ) : null;

    case "progress":
      return userData ? (
        <div className="pb-16">
          <ProgressScreen 
            onBack={() => setCurrentScreen("dashboard")}
          />
          <Navigation 
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen as Screen)}
          />
        </div>
      ) : null;

    case "leaderboard":
      return userData ? (
        <div className="pb-16">
          <LeaderboardScreen 
            currentUser={userData.name}
            onBack={() => setCurrentScreen("dashboard")}
          />
          <Navigation 
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen as Screen)}
          />
        </div>
      ) : null;

    case "settings":
      return userData ? (
        <div className="pb-16">
          <SettingsScreen 
            currentLanguage={userData.language}
            onBack={() => setCurrentScreen("dashboard")}
            onLanguageChange={handleLanguageChange}
            onLogout={handleLogout}
          />
          <Navigation 
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen as Screen)}
          />
        </div>
      ) : null;

    default:
      return null;
  }
};

export default Index;
