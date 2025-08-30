import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Globe, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ProverbCard from "@/components/ProverbCard";

interface CulturalItem {
  proverb_text: string;
  cultural_meaning: string;
  language_origin: string;
  explanation?: string;
  lesson_title: string;
}

const CulturalLibraryPage = () => {
  const [culturalItems, setCulturalItems] = useState<CulturalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCulturalContent = async () => {
      try {
        const { data, error } = await supabase
          .from('questions')
          .select(`
            proverb_text,
            cultural_meaning,
            language_origin,
            explanation,
            lessons!inner(title, lesson_type)
          `)
          .not('proverb_text', 'is', null)
          .eq('lessons.lesson_type', 'proverbs');

        if (error) throw error;

        const items = data?.map(item => ({
          proverb_text: item.proverb_text,
          cultural_meaning: item.cultural_meaning,
          language_origin: item.language_origin,
          explanation: item.explanation,
          lesson_title: (item as any).lessons.title
        })) || [];

        setCulturalItems(items);
      } catch (err) {
        console.error('Error fetching cultural content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCulturalContent();
  }, []);

  const getLanguageStats = () => {
    const stats: Record<string, number> = {};
    culturalItems.forEach(item => {
      stats[item.language_origin] = (stats[item.language_origin] || 0) + 1;
    });
    return stats;
  };

  const languageStats = getLanguageStats();

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={() => navigate("/dashboard")}
          variant="ghost"
          size="icon"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Cultural Library
          </h1>
          <p className="text-muted-foreground">
            Explore the wisdom of African cultures through traditional proverbs
          </p>
        </div>
      </div>

      {/* Language Statistics */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Language Collection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(languageStats).map(([language, count]) => (
              <Badge key={language} variant="secondary" className="flex items-center gap-1">
                {language === 'swahili' && '🇹🇿'}
                {language === 'nandi' && '🇰🇪'}
                {language === 'luo' && '🇰🇪'}
                {language === 'kikuyu' && '🇰🇪'}
                {language.charAt(0).toUpperCase() + language.slice(1)} ({count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cultural Items */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading cultural wisdom...</p>
        </div>
      ) : culturalItems.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Complete proverb lessons to unlock cultural wisdom here!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {culturalItems.map((item, index) => (
            <ProverbCard
              key={index}
              proverb={item.proverb_text}
              meaning={item.cultural_meaning}
              language={item.language_origin}
              origin={item.language_origin}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CulturalLibraryPage;