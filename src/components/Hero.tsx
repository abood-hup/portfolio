import { Download, Mail, ExternalLink, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import profileImage from "@/assets/profile-image.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-primary/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>
      
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-20 left-4 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-accent/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-4 md:right-10 w-56 md:w-80 h-56 md:h-80 bg-primary/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <div className="absolute top-1/3 right-1/4 w-32 md:w-48 h-32 md:h-48 bg-accent/5 rounded-full blur-2xl"></div>
      
      {/* Floating Decorative Elements - Hidden on mobile */}
      <motion.div 
        className="hidden lg:block absolute top-32 right-20 p-4 bg-card/20 backdrop-blur-md rounded-2xl border border-accent/20 shadow-elegant"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="h-8 w-8 text-accent" />
      </motion.div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-10 pt-24 md:pt-28">
          {/* Profile Image */}
          <motion.div 
            className="relative inline-block group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="absolute -inset-5 md:-inset-7 bg-gradient-to-r from-accent via-primary to-accent rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-all duration-700"></div>
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden shadow-elegant border-4 border-card/50 backdrop-blur-sm">
              <img 
                src={profileImage} 
                alt="Abdulwasea Alkhorasani" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
              />
            </div>
            {/* Status Badge */}
            <motion.div 
              className="absolute -top-2 -right-2 md:-top-3 md:-right-3 px-3 py-1 md:px-4 md:py-1.5 bg-accent text-accent-foreground rounded-full text-xs md:text-sm font-bold border-2 border-card shadow-accent"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {t('hero.available')}
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/30 backdrop-blur-sm rounded-full border border-accent/20 text-sm text-muted-foreground">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              {t('hero.tagline')}
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-foreground">{t('hero.greeting')} </span>
              <span className="text-gradient-accent">Abdulwasea</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              {t('hero.description')}
            </p>
          </motion.div>

          {/* Tech Stack Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {["React", "Flutter", "PHP", "Python", "MySQL", "AI/ML"].map((tech, index) => (
              <motion.span 
                key={tech}
                className="px-4 py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-300 cursor-default"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.08, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 pb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.a 
              href="#portfolio" 
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl shadow-accent hover:shadow-elegant transform transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {t('hero.viewProjects')}
            </motion.a>
            <motion.a 
              href="/resume.pdf" 
              download="Abdulwasea_CV.pdf"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-card/80 backdrop-blur-sm border-2 border-accent/30 text-foreground font-bold rounded-xl hover:bg-accent/10 hover:border-accent transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              {t('hero.downloadCV')}
            </motion.a>
            <motion.a 
              href="#contact" 
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary/30 text-foreground font-bold rounded-xl hover:bg-primary/10 hover:border-primary transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {t('hero.contactMe')}
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
