import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.hireMe': 'Hire Me',
    
    // Hero
    'hero.greeting': "Hi, I'm",
    'hero.tagline': 'Software Developer & Systems Analyst',
    'hero.description': 'Building scalable web systems, mobile apps, and AI-powered solutions that transform ideas into reality',
    'hero.available': 'Available for hire',
    'hero.viewProjects': 'View Projects',
    'hero.downloadCV': 'Download CV',
    'hero.contactMe': 'Contact Me',
    
    // About
    'about.badge': 'About Me',
    'about.title': 'Who I Am',
    'about.subtitle': 'A passionate software developer dedicated to creating impactful digital solutions',
    'about.bio1': "I'm a software developer specializing in web systems, mobile applications, and AI-powered solutions.",
    'about.bio2': 'With a strong passion for building scalable, user-centered systems, I transform complex business requirements into elegant, efficient software solutions.',
    'about.bio3': 'As a continuous learner and problem solver, I stay updated with the latest technologies and best practices to deliver modern, high-quality solutions.',
    'about.whatIBuild': 'What I Build:',
    'about.getInTouch': 'Get In Touch',
    'about.fullStack': 'Full-Stack Developer',
    'about.fullStackDesc': 'Proficient in both frontend and backend technologies',
    'about.problemSolver': 'Problem Solver',
    'about.problemSolverDesc': 'Turning complex challenges into elegant solutions',
    'about.userCentered': 'User-Centered',
    'about.userCenteredDesc': 'Building systems that prioritize user experience',
    'about.learner': 'Continuous Learner',
    'about.learnerDesc': 'Always exploring new technologies and best practices',
    
    // Skills
    'skills.badge': 'Technical Expertise',
    'skills.title': 'Skills & Technologies',
    'skills.subtitle': 'A comprehensive toolkit built through years of experience in software development',
    'skills.programming': 'Programming Languages',
    'skills.frameworks': 'Frameworks & Tools',
    'skills.databases': 'Databases',
    'skills.concepts': 'Concepts & Methodologies',
    'skills.devTools': 'Development Tools',
    'skills.general': 'General IT Skills',
    
    // Projects
    'projects.badge': 'Featured Work',
    'projects.title': 'My Projects',
    'projects.subtitle': 'A collection of projects showcasing my expertise in web development, mobile apps, and AI solutions',
    'projects.liveDemo': 'Live Demo',
    'projects.cta.title': 'Have a Project in Mind?',
    'projects.cta.description': "I'm always excited to work on new and challenging projects. Let's discuss how I can help bring your ideas to life.",
    'projects.cta.button': 'Start Your Project',
    
    // Experience
    'experience.badge': 'Background',
    'experience.title': 'Experience & Education',
    'experience.subtitle': 'Academic foundation combined with hands-on practical experience',
    'experience.education': 'Education',
    'experience.practical': 'Practical Experience',
    'experience.degree': "Bachelor's Degree in Information Systems",
    'experience.university': 'Queen Arwa University',
    'experience.location': "Sana'a, Yemen",
    'experience.period': '2022 - 2026',
    'experience.degreeDesc': 'Specializing in Computer Information Systems with focus on software development and systems analysis.',
    'experience.projects': 'Projects',
    'experience.yearsExp': 'Years Exp',
    'experience.clients': 'Clients',
    
    // Blog
    'blog.badge': 'Tech Articles',
    'blog.title': 'Latest Blog Posts',
    'blog.subtitle': 'Sharing knowledge, tutorials, and insights about software development and technology',
    'blog.readMore': 'Read More',
    'blog.minRead': 'min read',
    'blog.noPosts': 'No blog posts yet. Check back soon!',
    
    // Contact
    'contact.badge': 'Get In Touch',
    'contact.title': 'Contact Me',
    'contact.subtitle': 'Have a project in mind or want to collaborate? I\'d love to hear from you!',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.quickContact': 'Quick Contact',
    'contact.chatWhatsApp': 'Chat on WhatsApp',
    'contact.sendEmail': 'Send Email',
    'contact.connect': 'Connect With Me',
    'contact.sendMessage': 'Send a Message',
    'contact.sendMessageDesc': "I'll get back to you as soon as possible",
    'contact.fullName': 'Full Name',
    'contact.emailAddress': 'Email Address',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.sendButton': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.namePlaceholder': 'Your name',
    'contact.emailPlaceholder': 'your@email.com',
    'contact.subjectPlaceholder': 'What is this regarding?',
    'contact.messagePlaceholder': 'Tell me about your project or inquiry...',
    
    // Footer
    'footer.description': 'Software developer passionate about creating impactful digital solutions that help businesses grow and thrive.',
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.madeWith': 'Made with',
    'footer.inYemen': 'in Yemen',
    
    // Common
    'common.learnMore': 'Learn More',
  },
  ar: {
    // Navbar
    'nav.home': 'الرئيسية',
    'nav.about': 'من أنا',
    'nav.skills': 'المهارات',
    'nav.projects': 'المشاريع',
    'nav.experience': 'الخبرات',
    'nav.blog': 'المدونة',
    'nav.contact': 'التواصل',
    'nav.hireMe': 'وظفني',
    
    // Hero
    'hero.greeting': 'مرحباً، أنا',
    'hero.tagline': 'مطور برمجيات ومحلل نظم',
    'hero.description': 'بناء أنظمة ويب قابلة للتطوير، تطبيقات الهاتف المحمول، وحلول مدعومة بالذكاء الاصطناعي تحول الأفكار إلى واقع',
    'hero.available': 'متاح للعمل',
    'hero.viewProjects': 'عرض المشاريع',
    'hero.downloadCV': 'تحميل السيرة',
    'hero.contactMe': 'تواصل معي',
    
    // About
    'about.badge': 'من أنا',
    'about.title': 'تعرف علي',
    'about.subtitle': 'مطور برمجيات شغوف مكرس لإنشاء حلول رقمية مؤثرة',
    'about.bio1': 'أنا مطور برمجيات متخصص في أنظمة الويب وتطبيقات الهاتف المحمول والحلول المدعومة بالذكاء الاصطناعي.',
    'about.bio2': 'مع شغف قوي لبناء أنظمة قابلة للتطوير ومتمحورة حول المستخدم، أحول متطلبات الأعمال المعقدة إلى حلول برمجية أنيقة وفعالة.',
    'about.bio3': 'كمتعلم مستمر وحلال للمشاكل، أبقى على اطلاع بأحدث التقنيات وأفضل الممارسات لتقديم حلول حديثة وعالية الجودة.',
    'about.whatIBuild': 'ما أبنيه:',
    'about.getInTouch': 'تواصل معي',
    'about.fullStack': 'مطور متكامل',
    'about.fullStackDesc': 'متمكن في تقنيات الواجهة الأمامية والخلفية',
    'about.problemSolver': 'حلال المشاكل',
    'about.problemSolverDesc': 'تحويل التحديات المعقدة إلى حلول أنيقة',
    'about.userCentered': 'تمحور حول المستخدم',
    'about.userCenteredDesc': 'بناء أنظمة تعطي الأولوية لتجربة المستخدم',
    'about.learner': 'متعلم مستمر',
    'about.learnerDesc': 'استكشاف دائم للتقنيات الجديدة وأفضل الممارسات',
    
    // Skills
    'skills.badge': 'الخبرة التقنية',
    'skills.title': 'المهارات والتقنيات',
    'skills.subtitle': 'مجموعة أدوات شاملة بنيت من خلال سنوات من الخبرة في تطوير البرمجيات',
    'skills.programming': 'لغات البرمجة',
    'skills.frameworks': 'الأطر والأدوات',
    'skills.databases': 'قواعد البيانات',
    'skills.concepts': 'المفاهيم والمنهجيات',
    'skills.devTools': 'أدوات التطوير',
    'skills.general': 'مهارات تقنية عامة',
    
    // Projects
    'projects.badge': 'الأعمال المميزة',
    'projects.title': 'مشاريعي',
    'projects.subtitle': 'مجموعة من المشاريع التي تعرض خبرتي في تطوير الويب وتطبيقات الهاتف والحلول الذكية',
    'projects.liveDemo': 'معاينة مباشرة',
    'projects.cta.title': 'هل لديك مشروع في ذهنك؟',
    'projects.cta.description': 'أنا دائماً متحمس للعمل على مشاريع جديدة وصعبة. دعنا نناقش كيف يمكنني المساعدة في تحويل أفكارك إلى واقع.',
    'projects.cta.button': 'ابدأ مشروعك',
    
    // Experience
    'experience.badge': 'الخلفية',
    'experience.title': 'الخبرة والتعليم',
    'experience.subtitle': 'أساس أكاديمي مع خبرة عملية تطبيقية',
    'experience.education': 'التعليم',
    'experience.practical': 'الخبرة العملية',
    'experience.degree': 'بكالوريوس نظم معلومات',
    'experience.university': 'جامعة الملكة أروى',
    'experience.location': 'صنعاء، اليمن',
    'experience.period': '2022 - 2026',
    'experience.degreeDesc': 'تخصص في نظم المعلومات الحاسوبية مع التركيز على تطوير البرمجيات وتحليل النظم.',
    'experience.projects': 'مشاريع',
    'experience.yearsExp': 'سنوات خبرة',
    'experience.clients': 'عملاء',
    
    // Blog
    'blog.badge': 'مقالات تقنية',
    'blog.title': 'أحدث المقالات',
    'blog.subtitle': 'مشاركة المعرفة والدروس التعليمية والرؤى حول تطوير البرمجيات والتكنولوجيا',
    'blog.readMore': 'اقرأ المزيد',
    'blog.minRead': 'دقائق قراءة',
    'blog.noPosts': 'لا توجد مقالات بعد. تحقق لاحقاً!',
    
    // Contact
    'contact.badge': 'تواصل معي',
    'contact.title': 'اتصل بي',
    'contact.subtitle': 'هل لديك مشروع في ذهنك أو تريد التعاون؟ يسعدني السماع منك!',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'الهاتف',
    'contact.location': 'الموقع',
    'contact.quickContact': 'تواصل سريع',
    'contact.chatWhatsApp': 'محادثة واتساب',
    'contact.sendEmail': 'إرسال بريد',
    'contact.connect': 'تواصل معي',
    'contact.sendMessage': 'أرسل رسالة',
    'contact.sendMessageDesc': 'سأرد عليك في أقرب وقت ممكن',
    'contact.fullName': 'الاسم الكامل',
    'contact.emailAddress': 'البريد الإلكتروني',
    'contact.subject': 'الموضوع',
    'contact.message': 'الرسالة',
    'contact.sendButton': 'إرسال الرسالة',
    'contact.sending': 'جارِ الإرسال...',
    'contact.namePlaceholder': 'اسمك',
    'contact.emailPlaceholder': 'بريدك@الإلكتروني.com',
    'contact.subjectPlaceholder': 'ما هو موضوع الرسالة؟',
    'contact.messagePlaceholder': 'أخبرني عن مشروعك أو استفسارك...',
    
    // Footer
    'footer.description': 'مطور برمجيات شغوف بإنشاء حلول رقمية مؤثرة تساعد الشركات على النمو والازدهار.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.services': 'الخدمات',
    'footer.contact': 'التواصل',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.madeWith': 'صنع بـ',
    'footer.inYemen': 'في اليمن',
    
    // Common
    'common.learnMore': 'اعرف المزيد',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
