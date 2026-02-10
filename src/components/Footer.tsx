import { Code2, Github, Linkedin, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  const quickLinks = [
    { name: t('nav.home'), href: "#home" },
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.skills'), href: "#skills" },
    { name: t('nav.projects'), href: "#portfolio" },
    { name: t('nav.contact'), href: "#contact" },
  ];

  const services = [
    language === 'ar' ? "تطوير الويب" : "Web Development",
    language === 'ar' ? "تطبيقات الهاتف" : "Mobile Apps",
    language === 'ar' ? "حلول الذكاء الاصطناعي" : "AI Solutions",
    language === 'ar' ? "تحليل النظم" : "Systems Analysis",
    language === 'ar' ? "تصميم قواعد البيانات" : "Database Design"
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/abdulwasea" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/abdulwasea-r-alkhorasani-6863b7335" },
    { icon: Mail, href: "mailto:abdulwasea.alkhorasani@gmail.com" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-glow/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Code2 className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="text-2xl font-bold">Abdulwasea</span>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-accent">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-accent">{t('footer.services')}</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-primary-foreground/70 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-accent">{t('footer.contact')}</h3>
            <div className="space-y-4">
              <a 
                href="mailto:abdulwasea.alkhorasani@gmail.com"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors group"
              >
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-sm group-hover:underline">abdulwasea.alkhorasani@gmail.com</span>
              </a>
              <a 
                href="tel:+967739266110"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-sm">+967 739 266 110</span>
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-sm">{language === 'ar' ? "صنعاء، اليمن" : "Sana'a, Yemen"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-primary-foreground/70 text-sm">
              <span>© {currentYear} Abdulwasea Alkhorasani.</span>
              <span className="hidden sm:inline">{t('footer.rights')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
