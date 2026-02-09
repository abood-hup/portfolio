import { Code, Layers, Database, Lightbulb, Monitor, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedSection from "./AnimatedSection";

const Skills = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      titleKey: 'skills.programming',
      icon: Code,
      color: "accent",
      skills: ["HTML", "CSS", "JavaScript", "PHP", "Python", "C++", "Java"]
    },
    {
      titleKey: 'skills.frameworks',
      icon: Layers,
      color: "primary",
      skills: ["Flutter", "React", "Bootstrap", "Tailwind CSS", "Git", "GitHub", "Figma", "Canva"]
    },
    {
      titleKey: 'skills.databases',
      icon: Database,
      color: "accent",
      skills: ["MySQL", "SQL Server", "Oracle", "Firebase"]
    },
    {
      titleKey: 'skills.concepts',
      icon: Lightbulb,
      color: "primary",
      skills: ["OOP", "REST APIs", "Expert Systems", "AI Basics", "Clean Code", "System Integration"]
    },
    {
      titleKey: 'skills.devTools',
      icon: Wrench,
      color: "accent",
      skills: ["VS Code", "Android Studio", "Postman", "XAMPP", "Docker"]
    },
    {
      titleKey: 'skills.general',
      icon: Monitor,
      color: "primary",
      skills: ["Microsoft Office", "Windows/Linux", "Networking Basics", "IT Support"]
    }
  ];

  return (
    <section id="skills" className="py-16 md:py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <Code className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">{t('skills.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </AnimatedSection>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 hover:border-accent/30 hover:shadow-elegant transition-all duration-500 h-full">
                {/* Icon Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    category.color === 'accent' 
                      ? 'bg-gradient-to-br from-accent to-accent/80 shadow-accent' 
                      : 'bg-gradient-to-br from-primary to-primary-glow shadow-elegant'
                  }`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-card-foreground group-hover:text-accent transition-colors">
                    {t(category.titleKey)}
                  </h3>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className={`px-3 py-1.5 text-sm rounded-lg border transition-all duration-300 hover:scale-105 cursor-default ${
                        category.color === 'accent'
                          ? 'bg-accent/5 border-accent/20 text-accent hover:bg-accent/10'
                          : 'bg-primary/5 border-primary/20 text-primary hover:bg-primary/10'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Decorative gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
