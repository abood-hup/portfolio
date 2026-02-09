import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="relative hover:bg-accent/10 transition-colors"
      title={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
    >
      <Globe className="h-5 w-5" />
      <span className="absolute -bottom-0.5 -right-0.5 text-[10px] font-bold bg-accent text-accent-foreground rounded px-1">
        {language === 'en' ? 'ع' : 'EN'}
      </span>
    </Button>
  );
};

export default LanguageToggle;
