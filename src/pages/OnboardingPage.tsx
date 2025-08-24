import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import mascotImage from "@/assets/lugha-mascot.png";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface OnboardingData {
  name: string;
  age: string;
  language: string;
}

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    name: "",
    age: "",
    language: ""
  });
  const { userData, setUserData } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const languages = [
    { value: "swahili", label: "Kiswahili 🇹🇿" },
    { value: "kikuyu", label: "Gĩkũyũ 🇰🇪" },
    { value: "luo", label: "Dholuo 🇰🇪" }
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // It's not letting me spread userData because it can be null.
      // I need to provide a default value.
      const defaultUserData = { name: "", age: "", language: "", email: "", isGuest: false };
      setUserData({ ...(userData || defaultUserData), ...formData });
      navigate("/dashboard");
      toast({
        title: "Welcome to Lugha Learner! 🎉",
        description: `Ready to start learning ${formData.language}?`,
      });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.name.trim().length > 0;
      case 2: return formData.age.trim().length > 0;
      case 3: return formData.language.length > 0;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card border-0">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <img
              src={mascotImage}
              alt="Lugha Learner Mascot"
              className="w-24 h-24 animate-bounce"
            />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
            Karibu Lugha Learner! 🎉
          </CardTitle>
          <CardDescription className="text-base">
            Let's start your African language journey together!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">What's your name?</h3>
                <p className="text-sm text-muted-foreground">We'd love to know what to call you!</p>
              </div>
              <Input
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-center text-lg"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">How old are you?</h3>
                <p className="text-sm text-muted-foreground">This helps us personalize your learning experience</p>
              </div>
              <Input
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="text-center text-lg"
                min="5"
                max="100"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Which language excites you?</h3>
                <p className="text-sm text-muted-foreground">Choose your first language to master!</p>
              </div>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData({ ...formData, language: value })}
              >
                <SelectTrigger className="text-lg">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value} className="text-lg">
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex flex-col space-y-2">
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              variant="hero"
              size="lg"
              className="w-full"
            >
              {step === 3 ? "Start Learning! 🚀" : "Next"}
            </Button>

            <div className="flex justify-center space-x-2 mt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-smooth ${
                    i === step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingPage;
