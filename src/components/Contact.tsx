import { Mail, Phone, MapPin, Send, MessageCircle, Github, Linkedin, Instagram, Facebook } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedSection from "./AnimatedSection";

const Contact = () => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: language === 'ar' ? "خطأ في التحقق" : "Validation Error",
        description: language === 'ar' ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: language === 'ar' ? "بريد إلكتروني غير صالح" : "Invalid Email",
        description: language === 'ar' ? "يرجى إدخال عنوان بريد إلكتروني صالح" : "Please enter a valid email address",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Create WhatsApp message
    const whatsappMessage = `Hello, I'm ${formData.name}
    
Email: ${formData.email}
Subject: ${formData.subject || 'General Inquiry'}

Message:
${formData.message}`;

    const whatsappURL = `https://wa.me/967739266110?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappURL, '_blank');

    toast({
      title: language === 'ar' ? "جارِ إعادة التوجيه إلى واتساب" : "Redirecting to WhatsApp",
      description: language === 'ar' ? "فتح واتساب لإرسال رسالتك" : "Opening WhatsApp to send your message",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email'),
      value: "abdulwasea.alkhorasani@gmail.com",
      link: "mailto:abdulwasea.alkhorasani@gmail.com"
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      value: "+967 739 266 110",
      link: "tel:+967739266110"
    },
    {
      icon: MapPin,
      title: t('contact.location'),
      value: language === 'ar' ? "صنعاء، اليمن" : "Sana'a, Yemen",
      link: "#"
    }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/abdulwasea", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/abdulwasea-r-alkhorasani-6863b7335", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/0a_r.9", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/share/1A9i2gAigv/", label: "Facebook" },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-background"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <Mail className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">{t('contact.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Info - Left Side */}
          <AnimatedSection delay={0.1} direction="left" className="lg:col-span-2 space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="group flex items-center gap-4 p-4 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl hover:border-accent/30 hover:shadow-elegant transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <info.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{info.title}</div>
                    <div className="font-medium text-foreground group-hover:text-accent transition-colors">
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Contact */}
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-accent" />
                {t('contact.quickContact')}
              </h3>
              <div className="space-y-3">
                <a
                  href="https://wa.me/967739266110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('contact.chatWhatsApp')}
                </a>
                <a
                  href="mailto:abdulwasea.alkhorasani@gmail.com"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
                >
                  <Mail className="w-5 h-5" />
                  {t('contact.sendEmail')}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">{t('contact.connect')}</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-muted/50 rounded-lg border border-border/50 hover:border-accent/30 hover:bg-accent/10 transition-all duration-300"
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form - Right Side */}
          <AnimatedSection delay={0.2} direction="right" className="lg:col-span-3">
            <form 
              onSubmit={handleSubmit}
              className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 shadow-professional"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-accent">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t('contact.sendMessage')}</h3>
                  <p className="text-sm text-muted-foreground">{t('contact.sendMessageDesc')}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact.fullName')} *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder={t('contact.namePlaceholder')}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-background/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contact.emailAddress')} *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t('contact.emailPlaceholder')}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-background/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{t('contact.subject')}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder={t('contact.subjectPlaceholder')}
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t('contact.message')} *</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={t('contact.messagePlaceholder')}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 shadow-accent group"
                  disabled={isSubmitting}
                >
                  <Send className="w-5 h-5 me-2 group-hover:translate-x-1 transition-transform" />
                  {isSubmitting ? t('contact.sending') : t('contact.sendButton')}
                </Button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
