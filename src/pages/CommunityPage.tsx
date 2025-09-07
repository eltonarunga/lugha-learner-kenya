import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Users, Trophy, Heart, Share2, Search } from 'lucide-react';

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const forumPosts = [
    {
      id: 1,
      author: 'Amina K.',
      title: 'Struggling with Kalenjin pronunciation',
      content: 'Can anyone help with the proper pronunciation of "kiptaiyat"?',
      replies: 12,
      likes: 8,
      language: 'Kalenjin',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      author: 'John M.',
      title: 'Beautiful Kikuyu proverb meaning',
      content: 'Just learned "Mũndũ wa kĩgongona ndarĩ mbeũ" - love the wisdom!',
      replies: 6,
      likes: 15,
      language: 'Kikuyu',
      timestamp: '4 hours ago'
    }
  ];

  const studyGroups = [
    {
      id: 1,
      name: 'Swahili Beginners',
      members: 24,
      language: 'Kiswahili',
      description: 'Daily practice sessions for beginners',
      nextSession: 'Today 6 PM'
    },
    {
      id: 2,
      name: 'Kalenjin Culture Club',
      members: 18,
      language: 'Kalenjin',
      description: 'Learn language through cultural stories',
      nextSession: 'Tomorrow 7 PM'
    }
  ];

  const leaderboard = [
    { name: 'Sarah W.', points: 2450, streak: 15, language: 'Kikuyu' },
    { name: 'David K.', points: 2380, streak: 12, language: 'Kiswahili' },
    { name: 'Grace M.', points: 2290, streak: 18, language: 'Kalenjin' }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Community Hub</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with fellow learners, practice together, and celebrate your language learning journey
        </p>
      </div>

      <Tabs defaultValue="forum" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forum" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Forum
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Study Groups
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Practice Partners
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forum" className="space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>Start Discussion</Button>
          </div>

          <div className="space-y-4">
            {forumPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {post.author} • {post.timestamp}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{post.language}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.content}</p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      {post.replies} replies
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {studyGroups.map((group) => (
              <Card key={group.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">{group.language}</Badge>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{group.members} members</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{group.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Next session: {group.nextSession}</p>
                    <Button size="sm">Join Group</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-dashed">
            <CardContent className="pt-6 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Create Study Group</h3>
              <p className="text-muted-foreground mb-4">Start your own study group and practice with others</p>
              <Button>Create Group</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="space-y-4">
            {leaderboard.map((user, index) => (
              <Card key={user.name}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-primary">#{index + 1}</div>
                      <Avatar>
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge variant="outline">{user.language}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{user.points}</p>
                      <p className="text-sm text-muted-foreground">{user.streak} day streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <div className="text-center space-y-4">
            <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto" />
            <h3 className="text-xl font-semibold">Practice Partners</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Connect with other learners for real-time conversation practice
            </p>
            <Button size="lg">Find Practice Partner</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}