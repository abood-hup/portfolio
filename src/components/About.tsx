import { Code2, Lightbulb, Target, Rocket, Download, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Full-Stack Developer",
      description: "Proficient in both frontend and backend technologies"
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Turning complex challenges into elegant solutions"
    },
    {
      icon: Target,
      title: "User-Centered",
      description: "Building systems that prioritize user experience"
    },
    {
      icon: Rocket,
      title: "Continuous Learner",
      description: "Always exploring new technologies and best practices"
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
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <Code2 className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            Who I Am
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate software developer dedicated to creating impactful digital solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Bio */}
          <div className="space-y-6">
            <div className="prose prose-lg text-muted-foreground">
              <p className="text-lg leading-relaxed">
                I'm a <span className="text-accent font-semibold">software developer</span> specializing in 
                <span className="text-primary font-semibold"> web systems</span>, 
                <span className="text-accent font-semibold"> mobile applications</span>, and 
                <span className="text-primary font-semibold"> AI-powered solutions</span>.
              </p>
              <p className="leading-relaxed">
                With a strong passion for building scalable, user-centered systems, I transform complex 
                business requirements into elegant, efficient software solutions. I believe in writing 
                clean code and creating intuitive interfaces that make technology accessible to everyone.
              </p>
              <p className="leading-relaxed">
                As a continuous learner and problem solver, I stay updated with the latest technologies 
                and best practices to deliver modern, high-quality solutions that help businesses grow 
                and thrive in the digital age.
              </p>
            </div>

            {/* Specializations */}
            <div className="pt-4">
              <h3 className="text-lg font-bold text-foreground mb-4">What I Build:</h3>
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
                  Download CV
                </a>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                asChild
              >
                <a href="#contact">Get In Touch</a>
              </Button>
            </div>
          </div>

          {/* Right Content - Highlights Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="group bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-5 md:p-6 hover:border-accent/30 hover:shadow-elegant transition-all duration-500"
              >
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
