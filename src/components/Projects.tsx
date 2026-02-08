import { ExternalLink, Code, ShoppingCart, Briefcase, GraduationCap, Palette, Brain, Bot, BookOpen, Search } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Yemeni Dar Modern Store",
      description: "A modern Yemeni e-commerce platform designed and developed from scratch, featuring product management, shopping cart, user authentication, and a clean responsive interface.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      liveDemo: "https://yemeni-dar-shop.lovable.app",
      icon: ShoppingCart,
      color: "accent"
    },
    {
      id: 2,
      title: "Wadhifni Platform",
      description: "A professional job recruitment platform connecting job seekers with employers, including job listings, user profiles, application management, and admin dashboards.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      liveDemo: "https://wadhifni.lovable.app",
      icon: Briefcase,
      color: "primary"
    },
    {
      id: 3,
      title: "University Fee Payment App",
      description: "A mobile application built with Flutter allowing students to pay university fees and view financial data, fully integrated with a backend accounting system for real-time updates.",
      technologies: ["Flutter", "PHP", "MySQL", "REST APIs"],
      liveDemo: "https://arwa-fee-system.lovable.app",
      icon: GraduationCap,
      color: "accent"
    },
    {
      id: 4,
      title: "Dev Art",
      description: "A creative platform for developers to showcase, share, and manage their software projects in an organized and visually appealing way.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP"],
      liveDemo: "https://dev-art.lovable.app",
      icon: Palette,
      color: "primary"
    },
    {
      id: 5,
      title: "Dev Art AI",
      description: "An AI-powered version of Dev Art that provides smart project recommendations, automated descriptions, and intelligent categorization.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "AI APIs"],
      liveDemo: "https://dev-art-ai.lovable.app",
      icon: Brain,
      color: "accent"
    },
    {
      id: 6,
      title: "Abdo AI",
      description: "A smart AI assistant platform that helps users with content generation, problem-solving, and intelligent interactions.",
      technologies: ["JavaScript", "AI APIs"],
      liveDemo: "https://abdo-ai.vercel.app",
      icon: Bot,
      color: "primary"
    },
    {
      id: 7,
      title: "My Forever AI",
      description: "A personalized AI assistant designed for long-term interaction, productivity, and intelligent digital support.",
      technologies: ["JavaScript", "AI APIs"],
      liveDemo: "https://my-forever-ai.lovable.app",
      icon: Bot,
      color: "accent"
    },
    {
      id: 8,
      title: "Smart Edu Core",
      description: "An educational management system providing smart tools for students and institutions, including learning resources, analytics, and system automation.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      liveDemo: "https://smart-edu-core.lovable.app",
      icon: BookOpen,
      color: "primary"
    },
    {
      id: 9,
      title: "AC Research",
      description: "A research-focused platform designed to help students and researchers organize academic work, manage references, and collaborate efficiently.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP"],
      liveDemo: "https://ac-research.lovable.app",
      icon: Search,
      color: "accent"
    }
  ];

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <Code className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            My Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects showcasing my expertise in web development, mobile apps, and AI solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-accent/30 hover:shadow-elegant transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300 ${
                project.color === 'accent' 
                  ? 'bg-gradient-to-br from-accent to-accent/80 shadow-accent' 
                  : 'bg-gradient-to-br from-primary to-primary-glow shadow-elegant'
              }`}>
                <project.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg md:text-xl font-bold text-card-foreground group-hover:text-accent transition-colors mb-3">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-5 line-clamp-3">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.slice(0, 4).map((tech, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className={`text-xs px-2.5 py-0.5 ${
                      project.color === 'accent'
                        ? 'bg-accent/5 border-accent/20 text-accent'
                        : 'bg-primary/5 border-primary/20 text-primary'
                    }`}
                  >
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge variant="outline" className="text-xs px-2.5 py-0.5 bg-muted/50">
                    +{project.technologies.length - 4}
                  </Badge>
                )}
              </div>

              {/* Action Button */}
              <Button 
                size="sm"
                className={`w-full group/btn ${
                  project.color === 'accent'
                    ? 'bg-accent hover:bg-accent/90'
                    : 'bg-primary hover:bg-primary/90'
                }`}
                onClick={() => window.open(project.liveDemo, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                Live Demo
              </Button>

              {/* Decorative gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50 shadow-professional max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-gradient-accent mb-4">
              Have a Project in Mind?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              I'm always excited to work on new and challenging projects. Let's discuss how I can help bring your ideas to life.
            </p>
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 shadow-accent"
              onClick={() => window.location.href = '#contact'}
            >
              Start Your Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
