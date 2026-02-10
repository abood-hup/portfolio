import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Code2, Settings } from "lucide-react";
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { Button } from './ui/button';
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: "#home" },
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.skills'), href: "#skills" },
    { name: t('nav.projects'), href: "#portfolio" },
    { name: t('nav.experience'), href: "#experience" },
    
    { name: t('nav.contact'), href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-accent group-hover:scale-110 transition-transform">
              <Code2 className="h-6 w-6 text-accent-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient-primary hidden sm:block">Abdulwasea</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors rounded-lg hover:bg-accent/10"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/admin/login">
              <Button variant="ghost" size="icon" className="hover:bg-accent/10">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <LanguageToggle />
            <ThemeToggle />
            <a 
              href="#contact"
              className="px-6 py-2.5 bg-accent text-accent-foreground font-semibold rounded-lg shadow-accent hover:shadow-elegant hover:scale-105 transition-all duration-300"
            >
              {t('nav.hireMe')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link to="/admin/login">
              <Button variant="ghost" size="icon" className="hover:bg-accent/10">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in bg-background/95 backdrop-blur-md">
            <div className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="pt-4 px-4">
              <a 
                href="#contact"
                className="block w-full text-center px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.hireMe')}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
