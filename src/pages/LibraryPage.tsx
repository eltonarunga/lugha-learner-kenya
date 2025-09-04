import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Book, Sparkles, Globe, Calendar, User, Quote } from "lucide-react";
import ProverbCard from "@/components/ProverbCard";

interface CulturalContent {
  id: string;
  title: string;
  content: string;
  type: 'proverb' | 'story' | 'history' | 'tradition';
  language: string;
  origin: string;
  meaning?: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const LibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<CulturalContent[]>([]);

  // Mock data for cultural content
  useEffect(() => {
    const mockContent: CulturalContent[] = [
      {
        id: "1",
        title: "Haraka haraka haina baraka",
        content: "Haraka haraka haina baraka",
        type: "proverb",
        language: "swahili",
        origin: "East Africa",
        meaning: "Hurrying hastily brings no blessing. This proverb teaches the importance of patience and taking time to do things properly rather than rushing.",
        tags: ["patience", "wisdom", "planning"],
        difficulty: "beginner"
      },
      {
        id: "2",
        title: "Mti hauendi ila kwa mti",
        content: "Mti hauendi ila kwa mti",
        type: "proverb",
        language: "swahili",
        origin: "Tanzania",
        meaning: "A tree does not fall without help from another tree. This teaches about the importance of relationships and community support.",
        tags: ["community", "cooperation", "relationships"],
        difficulty: "intermediate"
      },
      {
        id: "3",
        title: "Usijenge nyumba bila msingi",
        content: "Usijenge nyumba bila msingi",
        type: "proverb",
        language: "swahili",
        origin: "Kenya",
        meaning: "Do not build a house without a foundation. This emphasizes the importance of proper preparation and strong foundations in all endeavors.",
        tags: ["preparation", "foundation", "planning"],
        difficulty: "beginner"
      },
      {
        id: "4",
        title: "The Origin of Lake Victoria",
        content: "Long ago, in the heart of East Africa, there lived a beautiful maiden named Nalubaale. The gods were so moved by her kindness and beauty that they blessed the land with a great lake in her honor.",
        type: "story",
        language: "english",
        origin: "Uganda",
        tags: ["mythology", "nature", "legends"],
        difficulty: "intermediate"
      },
      {
        id: "5",
        title: "Traditional Maasai Greeting",
        content: "The Maasai people have a beautiful greeting tradition where they ask 'Kasserian Ingera?' which means 'And how are the children?' This greeting emphasizes the community's priority on the wellbeing of all children.",
        type: "tradition",
        language: "maasai",
        origin: "Kenya & Tanzania",
        tags: ["greetings", "community", "children"],
        difficulty: "beginner"
      },
      {
        id: "6",
        title: "Iwe yak chuny",
        content: "Iwe yak chuny",
        type: "proverb",
        language: "luo",
        origin: "Kenya",
        meaning: "You are the medicine of the heart. This beautiful expression is used to tell someone they bring joy and healing to your life.",
        tags: ["love", "healing", "relationships"],
        difficulty: "advanced"
      }
    ];

    // Simulate loading
    setTimeout(() => {
      setContent(mockContent);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredContent = content.filter(item => {
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === "all" || item.type === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'proverb': return <Quote className="w-4 h-4" />;
      case 'story': return <Book className="w-4 h-4" />;
      case 'history': return <Calendar className="w-4 h-4" />;
      case 'tradition': return <User className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cultural Library</h1>
            <p className="text-muted-foreground">
              Discover the rich wisdom and traditions of African cultures
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search proverbs, stories, and traditions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="proverb">Proverbs</TabsTrigger>
          <TabsTrigger value="story">Stories</TabsTrigger>
          <TabsTrigger value="tradition">Traditions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Content */}
        <TabsContent value={activeTab} className="mt-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-3 w-full mb-2" />
                  <Skeleton className="h-3 w-2/3 mb-4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                {filteredContent.map((item) => (
                  <div key={item.id}>
                    {item.type === 'proverb' ? (
                      <ProverbCard
                        proverb={item.content}
                        meaning={item.meaning || ""}
                        language={item.language}
                        origin={item.origin}
                        className="h-full"
                      />
                    ) : (
                      <Card className="h-full bg-gradient-to-br from-accent/5 to-primary/5 border-primary/20 hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(item.type)}
                              <CardTitle className="text-lg font-semibold">
                                {item.title}
                              </CardTitle>
                            </div>
                            <Badge className={getDifficultyColor(item.difficulty)}>
                              {item.difficulty}
                            </Badge>
                          </div>
                          <CardDescription className="flex items-center gap-1 text-sm">
                            <Globe className="w-3 h-3" />
                            {item.origin}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <div className="bg-background/60 rounded-lg p-4 border-l-4 border-primary">
                            <p className="text-sm leading-relaxed text-foreground">
                              {item.content}
                            </p>
                          </div>
                          
                          {item.meaning && (
                            <div>
                              <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                                Cultural Meaning:
                              </h4>
                              <p className="text-sm text-foreground leading-relaxed">
                                {item.meaning}
                              </p>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ))}
              </div>
              
              {filteredContent.length === 0 && !loading && (
                <div className="text-center py-12">
                  <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No content found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or explore different categories
                  </p>
                </div>
              )}
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LibraryPage;