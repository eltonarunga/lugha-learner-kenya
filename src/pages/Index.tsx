import { useUser } from "@/contexts/UserContext";
import { Navigate } from "react-router-dom";

const Index = () => {
  const { userData } = useUser();

  if (userData) {
    return <Navigate to="/dashboard" />;
  }

  return <Navigate to="/auth" />;
};

export default Index;
