import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Book, Sparkles, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ProverbCard from "@/components/ProverbCard";
import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/components/MainLayout";

interface ProverbData {
  id: string;
  proverb_text: string;
  cultural_meaning: string;
  language_origin: string;
  question_text: string;
  lesson_title: string;
}

const CulturalLibrary = () => {
  const [proverbs, setProverbs] = useState<ProverbData[]>([]);
  const [filteredProverbs, setFilteredProverbs] = useState<ProverbData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchProverbs();
  }, []);

  useEffect(() => {
    filterProverbs();
  }, [proverbs, searchTerm, selectedLanguage]);

  const fetchProverbs = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select(`
          id,
          proverb_text,
          cultural_meaning,
          language_origin,
          question_text,
          lessons!inner(title)
        `)
        .not('proverb_text', 'is', null);

      if (error) throw error;

      const proverbData: ProverbData[] = data.map(item => ({
        id: item.id,
        proverb_text: item.proverb_text || '',
        cultural_meaning: item.cultural_meaning || '',
        language_origin: item.language_origin || '',
        question_text: item.question_text,
        lesson_title: (item.lessons as any).title
      }));

      setProverbs(proverbData);
    } catch (error) {
      console.error('Error fetching proverbs:', error);
      toast({
        title: "Error",
        description: "Failed to load cultural library",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterProverbs = () => {
    let filtered = proverbs;

    if (selectedLanguage !== "all") {
      filtered = filtered.filter(p => p.language_origin === selectedLanguage);
    }

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.proverb_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.cultural_meaning.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProverbs(filtered);
  };

  const languages = Array.from(new Set(proverbs.map(p => p.language_origin))).filter(Boolean);

  const getLanguageStats = () => {
    const stats: Record<string, number> = {};
    proverbs.forEach(p => {
      stats[p.language_origin] = (stats[p.language_origin] || 0) + 1;
    });
    return stats;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Sparkles className="w-8 h-8 animate-pulse mx-auto text-primary" />
          <p className="text-muted-foreground">Loading wisdom...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Book className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">Cultural Library</h1>
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the wisdom of African cultures through traditional proverbs and their meanings.
              Each saying carries centuries of knowledge passed down through generations.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <Badge variant="outline" className="gap-1">
                <Globe className="w-3 h-3" />
                {proverbs.length} Proverbs
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Book className="w-3 h-3" />
                {languages.length} Languages
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search proverbs or meanings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Languages</TabsTrigger>
              {languages.map(lang => (
                <TabsTrigger key={lang} value={lang} className="capitalize">
                  {lang} ({getLanguageStats()[lang]})
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedLanguage} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProverbs.map((proverb) => (
                  <ProverbCard
                    key={proverb.id}
                    proverb={proverb.proverb_text}
                    meaning={proverb.cultural_meaning}
                    language={proverb.language_origin}
                    origin={proverb.language_origin}
                    className="h-full"
                  />
                ))}
              </div>

              {filteredProverbs.length === 0 && (
                <div className="text-center py-12">
                  <Book className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No proverbs found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CulturalLibrary;