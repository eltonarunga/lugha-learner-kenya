import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Trophy, Medal, Award, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Navigate } from "react-router-dom";

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const { userData } = useUser();

  if (!userData) {
    return <Navigate to="/auth" />;
  }

  // Mock leaderboard data - would come from backend in real app
  const leaderboardData = [
    { id: 1, name: "Amina K.", xp: 2150, streak: 15, level: 5, avatar: "AK", country: "🇰🇪" },
    { id: 2, name: "John M.", xp: 1890, streak: 12, level: 4, avatar: "JM", country: "🇰🇪" },
    { id: 3, name: "Grace W.", xp: 1675, streak: 8, level: 4, avatar: "GW", country: "🇰🇪" },
    { id: 4, name: "David K.", xp: 1450, streak: 10, level: 3, avatar: "DK", country: "🇰🇪" },
    { id: 5, name: userData.name, xp: 1250, streak: 7, level: 3, avatar: userData.name.substring(0, 2).toUpperCase(), country: "🇰🇪" },
    { id: 6, name: "Sarah N.", xp: 1180, streak: 6, level: 3, avatar: "SN", country: "🇰🇪" },
    { id: 7, name: "Peter O.", xp: 1050, streak: 9, level: 2, avatar: "PO", country: "🇰🇪" },
    { id: 8, name: "Mary L.", xp: 980, streak: 4, level: 2, avatar: "ML", country: "🇰🇪" },
    { id: 9, name: "James R.", xp: 875, streak: 5, level: 2, avatar: "JR", country: "🇰🇪" },
    { id: 10, name: "Ruth A.", xp: 820, streak: 3, level: 2, avatar: "RA", country: "🇰🇪" }
  ].sort((a, b) => b.xp - a.xp);

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return null;
    }
  };

  const getRankColor = (position: number) => {
    switch (position) {
      case 1: return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2: return "bg-gradient-to-r from-gray-300 to-gray-500";
      case 3: return "bg-gradient-to-r from-amber-400 to-amber-600";
      default: return "bg-muted";
    }
  };

  const currentUserRank = leaderboardData.findIndex(user => user.name === userData.name) + 1;

  const onBack = () => navigate("/dashboard");

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
        <h1 className="text-2xl font-bold ml-4">Leaderboard</h1>
      </div>

      {/* Current User Rank Card */}
      {currentUserRank > 0 && (
        <Card className="shadow-card mb-6 border-primary">
            <CardContent className="p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getRankColor(currentUserRank)}`}>
                    #{currentUserRank}
                </div>
                <div>
                    <h3 className="font-bold">Your Rank</h3>
                    <p className="text-sm text-muted-foreground">
                    {leaderboardData[currentUserRank - 1]?.xp} XP • {leaderboardData[currentUserRank - 1]?.streak} day streak
                    </p>
                </div>
                </div>
                <Badge variant="secondary">Level {leaderboardData[currentUserRank - 1]?.level}</Badge>
            </div>
            </CardContent>
        </Card>
      )}


      {/* Top 3 Podium */}
      <Card className="shadow-card mb-6">
        <CardHeader>
          <CardTitle className="text-center flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Top Learners
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-end space-x-4 mb-6">
            {/* 2nd Place */}
            <div className="text-center">
              <div className="relative">
                <Avatar className="w-16 h-16 mx-auto border-4 border-gray-400">
                  <AvatarFallback className="bg-gradient-to-r from-gray-300 to-gray-500 text-white font-bold">
                    {leaderboardData[1].avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2">
                  <Medal className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              <div className="bg-gray-400 h-20 w-16 mx-auto mt-2 rounded-t-lg flex items-end justify-center pb-2">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <p className="text-sm font-semibold mt-2">{leaderboardData[1].name}</p>
              <p className="text-xs text-muted-foreground">{leaderboardData[1].xp} XP</p>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <div className="relative">
                <Avatar className="w-20 h-20 mx-auto border-4 border-yellow-500">
                  <AvatarFallback className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold text-lg">
                    {leaderboardData[0].avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-3 -right-2">
                  <Crown className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-24 w-20 mx-auto mt-2 rounded-t-lg flex items-end justify-center pb-2">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <p className="text-sm font-semibold mt-2">{leaderboardData[0].name}</p>
              <p className="text-xs text-muted-foreground">{leaderboardData[0].xp} XP</p>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <div className="relative">
                <Avatar className="w-16 h-16 mx-auto border-4 border-amber-600">
                  <AvatarFallback className="bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold">
                    {leaderboardData[2].avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="bg-amber-600 h-16 w-16 mx-auto mt-2 rounded-t-lg flex items-end justify-center pb-2">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <p className="text-sm font-semibold mt-2">{leaderboardData[2].name}</p>
              <p className="text-xs text-muted-foreground">{leaderboardData[2].xp} XP</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>All Learners</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {leaderboardData.map((user, index) => {
            const position = index + 1;
            const isCurrentUser = user.name === userData.name;

            return (
              <div
                key={user.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-smooth ${
                  isCurrentUser
                    ? "bg-primary/10 border border-primary/20"
                    : "bg-muted/20 hover:bg-muted/40"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  position <= 3 ? getRankColor(position) + " text-white" : "bg-muted text-foreground"
                }`}>
                  {position <= 3 ? getRankIcon(position) : position}
                </div>

                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-accent text-white font-semibold">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${isCurrentUser ? 'text-primary' : ''}`}>
                      {user.name}
                    </span>
                    <span>{user.country}</span>
                    {isCurrentUser && (
                      <Badge variant="secondary" className="text-xs">You</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {user.xp} XP • {user.streak} day streak
                  </p>
                </div>

                <Badge variant="outline">
                  Level {user.level}
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="h-6" /> {/* Bottom spacing */}
    </div>
  );
};

export default LeaderboardPage;
