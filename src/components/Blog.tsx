import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import AnimatedSection from "./AnimatedSection";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  title_ar: string | null;
  slug: string;
  excerpt: string | null;
  excerpt_ar: string | null;
  cover_image: string | null;
  category: string | null;
  tags: string[] | null;
  published_at: string | null;
  read_time: number | null;
}

const Blog = () => {
  const { t, language } = useLanguage();

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, title_ar, slug, excerpt, excerpt_ar, cover_image, category, tags, published_at, read_time')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as BlogPost[];
    }
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(language === 'ar' ? 'ar-YE' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Demo posts for display
  const demoPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Getting Started with Flutter for Cross-Platform Development',
      title_ar: 'البدء مع Flutter لتطوير التطبيقات متعددة المنصات',
      slug: 'flutter-getting-started',
      excerpt: 'Learn how to build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.',
      excerpt_ar: 'تعلم كيفية بناء تطبيقات جميلة ومترجمة أصلياً للهاتف والويب وسطح المكتب من قاعدة كود واحدة.',
      cover_image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600',
      category: 'Mobile Development',
      tags: ['Flutter', 'Dart', 'Mobile'],
      published_at: '2024-01-15',
      read_time: 8
    },
    {
      id: '2',
      title: 'Building RESTful APIs with PHP and MySQL',
      title_ar: 'بناء واجهات برمجة التطبيقات RESTful باستخدام PHP و MySQL',
      slug: 'restful-apis-php',
      excerpt: 'A comprehensive guide to creating secure and scalable REST APIs using PHP and MySQL database.',
      excerpt_ar: 'دليل شامل لإنشاء واجهات برمجة تطبيقات REST آمنة وقابلة للتطوير باستخدام PHP وقاعدة بيانات MySQL.',
      cover_image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600',
      category: 'Backend',
      tags: ['PHP', 'MySQL', 'API'],
      published_at: '2024-01-10',
      read_time: 12
    },
    {
      id: '3',
      title: 'Introduction to AI and Expert Systems',
      title_ar: 'مقدمة في الذكاء الاصطناعي والنظم الخبيرة',
      slug: 'ai-expert-systems',
      excerpt: 'Explore the fundamentals of artificial intelligence and how expert systems can solve complex problems.',
      excerpt_ar: 'استكشف أساسيات الذكاء الاصطناعي وكيف يمكن للنظم الخبيرة حل المشاكل المعقدة.',
      cover_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600',
      category: 'AI',
      tags: ['AI', 'Expert Systems', 'Machine Learning'],
      published_at: '2024-01-05',
      read_time: 10
    }
  ];

  const displayPosts = posts.length > 0 ? posts : demoPosts;

  return (
    <section id="blog" className="py-16 md:py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <BookOpen className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">{t('blog.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            {t('blog.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </AnimatedSection>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card/80 rounded-2xl p-6 animate-pulse">
                <div className="h-48 bg-muted rounded-xl mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : displayPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayPosts.map((post, index) => (
              <AnimatedSection key={post.id} delay={index * 0.1}>
                <article className="group relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-accent/30 hover:shadow-elegant transition-all duration-500 hover:-translate-y-2">
                  {/* Cover Image */}
                  {post.cover_image && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.cover_image} 
                        alt={language === 'ar' && post.title_ar ? post.title_ar : post.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent"></div>
                      {post.category && (
                        <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                          {post.category}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.published_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.read_time} {t('blog.minRead')}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-card-foreground group-hover:text-accent transition-colors mb-3 line-clamp-2">
                      {language === 'ar' && post.title_ar ? post.title_ar : post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {language === 'ar' && post.excerpt_ar ? post.excerpt_ar : post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs bg-accent/5 border-accent/20 text-accent">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Read More */}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="group/btn p-0 h-auto text-accent hover:text-accent/80"
                    >
                      {t('blog.readMore')}
                      <ArrowRight className="w-4 h-4 ms-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <AnimatedSection className="text-center py-12">
            <p className="text-muted-foreground">{t('blog.noPosts')}</p>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default Blog;
