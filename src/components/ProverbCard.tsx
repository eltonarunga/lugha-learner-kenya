import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Book } from "lucide-react";

interface ProverbCardProps {
  proverb: string;
  meaning: string;
  language: string;
  origin: string;
  className?: string;
}

const ProverbCard = ({ proverb, meaning, language, origin, className = "" }: ProverbCardProps) => {
  const getLanguageFlag = (lang: string) => {
    const flags: Record<string, string> = {
      'swahili': '🇹🇿',
      'nandi': '🇰🇪', 
      'luo': '🇰🇪',
      'kikuyu': '🇰🇪'
    };
    return flags[lang] || '🌍';
  };

  return (
    <Card className={`bg-gradient-to-br from-accent/5 to-primary/5 border-primary/20 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Traditional Wisdom
          </CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1">
            {getLanguageFlag(language)} {origin}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-background/60 rounded-lg p-4 border-l-4 border-primary">
          <p className="text-base italic font-medium text-foreground leading-relaxed">
            "{proverb}"
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <Book className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Cultural Meaning:</h4>
            <p className="text-sm text-foreground leading-relaxed">
              {meaning}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProverbCard;