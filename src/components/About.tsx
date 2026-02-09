import { Code2, Lightbulb, Target, Rocket, Download, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedSection from "./AnimatedSection";

const About = () => {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Code2,
      title: t('about.fullStack'),
      description: t('about.fullStackDesc')
    },
    {
      icon: Lightbulb,
      title: t('about.problemSolver'),
      description: t('about.problemSolverDesc')
    },
    {
      icon: Target,
      title: t('about.userCentered'),
      description: t('about.userCenteredDesc')
    },
    {
      icon: Rocket,
      title: t('about.learner'),
      description: t('about.learnerDesc')
    }
  ];

  const specializations = [
    "Custom Management Systems",
    "E-commerce Platforms",
    "Mobile Applications",
    "AI-Powered Solutions",
    "REST API Development",
    "Database Design"
  ];

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/10 to-background"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <Code2 className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">{t('about.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            {t('about.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Bio */}
          <AnimatedSection delay={0.1} direction="left">
            <div className="space-y-6">
              <div className="prose prose-lg text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  {t('about.bio1')}
                </p>
                <p className="leading-relaxed">
                  {t('about.bio2')}
                </p>
                <p className="leading-relaxed">
                  {t('about.bio3')}
                </p>
              </div>

              {/* Specializations */}
              <div className="pt-4">
                <h3 className="text-lg font-bold text-foreground mb-4">{t('about.whatIBuild')}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {specializations.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg"
                  className="bg-accent hover:bg-accent/90 shadow-accent"
                  asChild
                >
                  <a href="/resume.pdf" download="Abdulwasea_CV.pdf" className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    {t('hero.downloadCV')}
                  </a>
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  asChild
                >
                  <a href="#contact">{t('about.getInTouch')}</a>
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Content - Highlights Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {highlights.map((item, index) => (
              <AnimatedSection key={index} delay={0.2 + index * 0.1}>
                <div className="group bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-5 md:p-6 hover:border-accent/30 hover:shadow-elegant transition-all duration-500 h-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                    index % 2 === 0 
                      ? 'bg-gradient-to-br from-accent to-accent/80 shadow-accent' 
                      : 'bg-gradient-to-br from-primary to-primary-glow shadow-elegant'
                  }`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
