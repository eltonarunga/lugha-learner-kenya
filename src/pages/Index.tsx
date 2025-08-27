import { useUser } from "@/contexts/UserContext";
import { Navigate } from "react-router-dom";

const Index = () => {
  const { userData, loading, user } = useUser();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (userData || user) {
    return <Navigate to="/dashboard" />;
  }

  return <Navigate to="/auth" />;
};

export default Index;
