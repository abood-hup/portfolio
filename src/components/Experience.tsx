import { GraduationCap, Briefcase, Calendar, MapPin, Award, CheckCircle } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      type: "education",
      title: "Bachelor's Degree in Information Systems",
      organization: "Queen Arwa University",
      location: "Sana'a, Yemen",
      period: "2022 - 2026 (Expected)",
      description: "Specializing in Computer Information Systems with focus on software development and systems analysis.",
      highlights: [
        "Expert Systems Development",
        "AI-Powered Applications",
        "Web & Mobile Development",
        "Database Management"
      ]
    }
  ];

  const practicalExperience = [
    {
      title: "Full-Stack Web Development",
      description: "Building complete web applications from frontend to backend with modern technologies"
    },
    {
      title: "Mobile App Development",
      description: "Creating cross-platform mobile applications using Flutter and native technologies"
    },
    {
      title: "AI & Expert Systems",
      description: "Developing intelligent systems for medical diagnosis and smart recommendations"
    },
    {
      title: "Systems Analysis & Design",
      description: "Analyzing business requirements and designing efficient software solutions"
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
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            Experience & Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Academic foundation combined with hands-on practical experience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Education Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-accent">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gradient-accent">Education</h3>
            </div>

            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 hover:border-accent/30 hover:shadow-elegant transition-all duration-500"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-card-foreground mb-1">
                      {exp.title}
                    </h4>
                    <p className="text-accent font-medium">{exp.organization}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{exp.description}</p>

                <div className="space-y-2">
                  {exp.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Practical Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-elegant">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gradient-primary">Practical Experience</h3>
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
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-xl border border-border/30">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">3+</div>
                <div className="text-xs text-muted-foreground">Years Exp</div>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-xl border border-border/30">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1">50+</div>
                <div className="text-xs text-muted-foreground">Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
