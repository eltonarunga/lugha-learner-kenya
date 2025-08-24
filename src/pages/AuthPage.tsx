import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import mascotImage from "@/assets/lugha-mascot.png";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const { setUserData } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (loginEmail && loginPassword) {
      setUserData({
        name: loginEmail.split('@')[0],
        age: "25",
        language: "swahili",
        email: loginEmail,
        isGuest: false
      });
      navigate("/onboarding");
    }
  };

  const handleSignup = () => {
    if (signupEmail && signupPassword && signupName) {
        setUserData({
            name: signupName,
            age: "25",
            language: "swahili",
            email: signupEmail,
            isGuest: false
        });
        navigate("/onboarding");
    }
  };

  const handleGuestMode = () => {
    setUserData({
      name: "Guest",
      age: "25",
      language: "swahili",
      isGuest: true
    });
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card border-0">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src={mascotImage}
              alt="Lugha Learner Mascot"
              className="w-20 h-20"
            />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
            Welcome to Lugha Learner
          </CardTitle>
          <CardDescription className="text-base">
            Join thousands learning African languages!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Email address"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <Button
                onClick={handleLogin}
                variant="hero"
                size="lg"
                className="w-full"
                disabled={!loginEmail || !loginPassword}
              >
                Login
              </Button>

              <Button variant="link" className="w-full text-sm">
                Forgot your password?
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="Full name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Create password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
              </div>

              <Button
                onClick={handleSignup}
                variant="hero"
                size="lg"
                className="w-full"
                disabled={!signupEmail || !signupPassword || !signupName}
              >
                Create Account
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-4 border-t">
            <Button
              onClick={handleGuestMode}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Continue as Guest
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Limited features available in guest mode
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
