import { useUser } from "@/contexts/UserContext";
import { Navigate } from "react-router-dom";

const Index = () => {
  const { userData, loading, user } = useUser();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If user is authenticated
  if (user) {
    // If user has complete profile data, go to dashboard
    if (userData && userData.name && userData.age && userData.language) {
      return <Navigate to="/dashboard" />;
    }
    // If user is authenticated but doesn't have complete profile, go to onboarding
    return <Navigate to="/onboarding" />;
  }

  // If no user, go to auth page
  return <Navigate to="/auth" />;
};

export default Index;
