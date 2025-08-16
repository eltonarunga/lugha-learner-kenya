import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Globe, Moon, Volume2, Bell, User, LogOut, Shield } from "lucide-react";

interface SettingsScreenProps {
  currentLanguage: string;
  onBack: () => void;
  onLanguageChange: (language: string) => void;
  onLogout: () => void;
}

export const SettingsScreen = ({ currentLanguage, onBack, onLanguageChange, onLogout }: SettingsScreenProps) => {
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const languages = [
    { value: "swahili", label: "Kiswahili 🇹🇿" },
    { value: "kikuyu", label: "Gĩkũyũ 🇰🇪" },
    { value: "luo", label: "Dholuo 🇰🇪" }
  ];

  const settingSections = [
    {
      title: "Learning",
      icon: <Globe className="w-5 h-5" />,
      items: [
        {
          id: "language",
          label: "Learning Language",
          description: "Change your current learning language",
          type: "select",
          value: currentLanguage,
          options: languages,
          onChange: onLanguageChange
        }
      ]
    },
    {
      title: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      items: [
        {
          id: "notifications",
          label: "Practice Reminders",
          description: "Get daily reminders to practice",
          type: "switch",
          value: notifications,
          onChange: setNotifications
        }
      ]
    },
    {
      title: "Audio & Display",
      icon: <Volume2 className="w-5 h-5" />,
      items: [
        {
          id: "sounds",
          label: "Sound Effects",
          description: "Play sounds for correct/incorrect answers",
          type: "switch",
          value: sounds,
          onChange: setSounds
        },
        {
          id: "darkMode",
          label: "Dark Mode",
          description: "Switch to dark theme",
          type: "switch",
          value: darkMode,
          onChange: setDarkMode
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button 
          onClick={onBack}
          variant="ghost" 
          size="icon"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold ml-4">Settings</h1>
      </div>

      {/* Profile Section */}
      <Card className="shadow-card mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Learning Profile</h3>
              <p className="text-sm text-muted-foreground">
                Level 3 • 1,250 XP • 7-day streak
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Sections */}
      {settingSections.map((section) => (
        <Card key={section.title} className="shadow-card mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              {section.icon}
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {section.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                
                {item.type === "switch" && (
                  <Switch
                    checked={item.value as boolean}
                    onCheckedChange={item.onChange as (checked: boolean) => void}
                  />
                )}
                
                {item.type === "select" && (
                  <div className="w-40">
                    <Select 
                      value={item.value as string} 
                      onValueChange={item.onChange as (value: string) => void}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {item.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Account Actions */}
      <Card className="shadow-card mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5" />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start h-auto p-4">
            <div className="text-left">
              <h4 className="font-medium">Privacy Policy</h4>
              <p className="text-sm text-muted-foreground">Learn how we protect your data</p>
            </div>
          </Button>
          
          <Button variant="outline" className="w-full justify-start h-auto p-4">
            <div className="text-left">
              <h4 className="font-medium">Terms of Service</h4>
              <p className="text-sm text-muted-foreground">Read our terms and conditions</p>
            </div>
          </Button>
          
          <Button variant="outline" className="w-full justify-start h-auto p-4">
            <div className="text-left">
              <h4 className="font-medium">Help & Support</h4>
              <p className="text-sm text-muted-foreground">Get help with using Lugha Learner</p>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <Button 
            onClick={onLogout}
            variant="destructive" 
            className="w-full flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </CardContent>
      </Card>

      <div className="h-6" /> {/* Bottom spacing */}
    </div>
  );
};