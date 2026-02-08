import { ArrowDown, Download, Mail, ExternalLink, Sparkles } from "lucide-react";
import profileImage from "@/assets/profile-image.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-primary/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-4 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-4 md:right-10 w-56 md:w-80 h-56 md:h-80 bg-primary/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-32 md:w-48 h-32 md:h-48 bg-accent/5 rounded-full blur-2xl"></div>
      
      {/* Floating Decorative Elements - Hidden on mobile */}
      <div className="hidden lg:block absolute top-32 right-20 p-4 bg-card/20 backdrop-blur-md rounded-2xl border border-accent/20 animate-bounce shadow-elegant" style={{animationDelay: '0.5s'}}>
        <Sparkles className="h-8 w-8 text-accent" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-10 animate-slide-up pt-20 md:pt-24">
          {/* Profile Image */}
          <div className="relative inline-block group">
            <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-accent via-primary to-accent rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-all duration-700 animate-pulse"></div>
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 mx-auto rounded-full overflow-hidden shadow-elegant border-4 border-card/50 backdrop-blur-sm">
              <img 
                src={profileImage} 
                alt="Abdulwasea Alkhorasani" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
              />
            </div>
            {/* Status Badge */}
            <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 px-3 py-1 md:px-4 md:py-1.5 bg-accent text-accent-foreground rounded-full text-xs md:text-sm font-bold border-2 border-card shadow-accent animate-pulse">
              Available for hire
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/30 backdrop-blur-sm rounded-full border border-accent/20 text-sm text-muted-foreground">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              Software Developer & Systems Analyst
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-foreground">Hi, I'm </span>
              <span className="text-gradient-accent">Abdulwasea</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
              Building <span className="text-accent font-semibold">scalable web systems</span>, 
              <span className="text-primary font-semibold"> mobile apps</span>, and 
              <span className="text-accent font-semibold"> AI-powered solutions</span> that transform ideas into reality
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm px-4">
            {["React", "Flutter", "PHP", "Python", "MySQL", "AI/ML"].map((tech, index) => (
              <span 
                key={tech}
                className="px-4 py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <a 
              href="#portfolio" 
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl shadow-accent hover:shadow-elegant transform hover:scale-105 transition-all duration-300"
            >
              <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              View Projects
            </a>
            <a 
              href="/resume.pdf" 
              download="Abdulwasea_CV.pdf"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-card/80 backdrop-blur-sm border-2 border-accent/30 text-foreground font-bold rounded-xl hover:bg-accent/10 hover:border-accent transition-all duration-300"
            >
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              Download CV
            </a>
            <a 
              href="#contact" 
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary/30 text-foreground font-bold rounded-xl hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Contact Me
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted-foreground">Scroll Down</span>
          <ArrowDown className="h-5 w-5 text-accent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
