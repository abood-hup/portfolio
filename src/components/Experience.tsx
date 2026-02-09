import { GraduationCap, Briefcase, Calendar, MapPin, Award, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedSection from "./AnimatedSection";

const Experience = () => {
  const { t } = useLanguage();

  const highlights = [
    t('experience.education') === 'Education' ? 'Expert Systems Development' : 'تطوير النظم الخبيرة',
    t('experience.education') === 'Education' ? 'AI-Powered Applications' : 'تطبيقات الذكاء الاصطناعي',
    t('experience.education') === 'Education' ? 'Web & Mobile Development' : 'تطوير الويب والموبايل',
    t('experience.education') === 'Education' ? 'Database Management' : 'إدارة قواعد البيانات'
  ];

  const practicalExperience = [
    {
      title: t('experience.education') === 'Education' ? 'Full-Stack Web Development' : 'تطوير ويب متكامل',
      description: t('experience.education') === 'Education' 
        ? 'Building complete web applications from frontend to backend with modern technologies' 
        : 'بناء تطبيقات ويب كاملة من الواجهة الأمامية إلى الخلفية بتقنيات حديثة'
    },
    {
      title: t('experience.education') === 'Education' ? 'Mobile App Development' : 'تطوير تطبيقات الموبايل',
      description: t('experience.education') === 'Education'
        ? 'Creating cross-platform mobile applications using Flutter and native technologies'
        : 'إنشاء تطبيقات موبايل متعددة المنصات باستخدام Flutter والتقنيات الأصلية'
    },
    {
      title: t('experience.education') === 'Education' ? 'AI & Expert Systems' : 'الذكاء الاصطناعي والنظم الخبيرة',
      description: t('experience.education') === 'Education'
        ? 'Developing intelligent systems for medical diagnosis and smart recommendations'
        : 'تطوير أنظمة ذكية للتشخيص الطبي والتوصيات الذكية'
    },
    {
      title: t('experience.education') === 'Education' ? 'Systems Analysis & Design' : 'تحليل وتصميم النظم',
      description: t('experience.education') === 'Education'
        ? 'Analyzing business requirements and designing efficient software solutions'
        : 'تحليل متطلبات العمل وتصميم حلول برمجية فعالة'
    }
  ];

  return (
    <section id="experience" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/20 to-background"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t('experience.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            {t('experience.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Education Section */}
          <AnimatedSection delay={0.1} direction="left">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-accent">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gradient-accent">{t('experience.education')}</h3>
            </div>

            <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 hover:border-accent/30 hover:shadow-elegant transition-all duration-500">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-card-foreground mb-1">
                    {t('experience.degree')}
                  </h4>
                  <p className="text-accent font-medium">{t('experience.university')}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{t('experience.period')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{t('experience.location')}</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{t('experience.degreeDesc')}</p>

              <div className="space-y-2">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Practical Experience */}
          <AnimatedSection delay={0.2} direction="right">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-elegant">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gradient-primary">{t('experience.practical')}</h3>
            </div>

            <div className="space-y-4">
              {practicalExperience.map((exp, index) => (
                <div 
                  key={index}
                  className="group bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-5 hover:border-primary/30 hover:shadow-elegant transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-card-foreground group-hover:text-primary transition-colors mb-1">
                        {exp.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-card/50 rounded-xl border border-border/30">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">25+</div>
                <div className="text-xs text-muted-foreground">{t('experience.projects')}</div>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-xl border border-border/30">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">3+</div>
                <div className="text-xs text-muted-foreground">{t('experience.yearsExp')}</div>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-xl border border-border/30">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">50+</div>
                <div className="text-xs text-muted-foreground">{t('experience.clients')}</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Experience;
