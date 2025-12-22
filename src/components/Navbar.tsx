import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Code2, Settings } from "lucide-react";
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "الرئيسية", href: "#home" },
    { name: "من أنا", href: "#about" },
    { name: "خدماتي", href: "#services" },
    { name: "أعمالي", href: "#portfolio" },
    { name: "اتصل بي", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Code2 className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold text-gradient-primary">DevArt</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-accent transition-all duration-300 ease-out relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <Link to="/admin/login">
              <Button variant="ghost" size="icon" className="hover:bg-accent/10">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <ThemeToggle />
            <button className="btn-hero">ابدأ مشروعك</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2 rtl:space-x-reverse">
            <Link to="/admin/login">
              <Button variant="ghost" size="icon" className="hover:bg-accent/10">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-all duration-300 ease-out"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-muted-foreground hover:text-accent transition-smooth py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button className="btn-hero w-full mt-4">ابدأ مشروعك</button>
          </div>
        )}
        </div>
      </nav>
  );
};

export default Navbar;