import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import AuthPage from "@/pages/AuthPage";
import OnboardingPage from "@/pages/OnboardingPage";
import DashboardPage from "@/pages/DashboardPage";
import LessonPage from "@/pages/LessonPage";
import ProgressPage from "@/pages/ProgressPage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import SettingsPage from "@/pages/SettingsPage";
import LibraryPage from "@/pages/LibraryPage";
import CommunityPage from "@/pages/CommunityPage";
import ChallengesPage from "@/pages/ChallengesPage";
import ReviewPage from "@/pages/ReviewPage";
import GrammarPage from "@/pages/GrammarPage";
import ConversationPage from "@/pages/ConversationPage";

import MainLayout from "@/components/MainLayout";
import { UserProvider } from "@/contexts/UserContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/lesson" element={<LessonPage />} />
            

            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/grammar" element={<GrammarPage />} />
              <Route path="/conversation" element={<ConversationPage />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
