import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface BlogPost {
  id: string;
  title: string;
  title_ar: string | null;
  slug: string;
  content: string;
  content_ar: string | null;
  excerpt: string | null;
  excerpt_ar: string | null;
  cover_image: string | null;
  category: string | null;
  tags: string[] | null;
  published: boolean | null;
  published_at: string | null;
  read_time: number | null;
  sort_order: number | null;
}

const AdminBlog = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    title_ar: '',
    slug: '',
    content: '',
    content_ar: '',
    excerpt: '',
    excerpt_ar: '',
    cover_image: '',
    category: '',
    tags: '',
    published: false,
    read_time: 5
  });

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data as BlogPost[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from('blog_posts').insert({
        title: data.title,
        title_ar: data.title_ar || null,
        slug: data.slug || data.title.toLowerCase().replace(/\s+/g, '-'),
        content: data.content,
        content_ar: data.content_ar || null,
        excerpt: data.excerpt || null,
        excerpt_ar: data.excerpt_ar || null,
        cover_image: data.cover_image || null,
        category: data.category || null,
        tags: data.tags ? data.tags.split(',').map(t => t.trim()) : null,
        published: data.published,
        published_at: data.published ? new Date().toISOString() : null,
        read_time: data.read_time
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success('تم إنشاء المقال بنجاح');
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => toast.error('حدث خطأ أثناء إنشاء المقال')
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase.from('blog_posts').update({
        title: data.title,
        title_ar: data.title_ar || null,
        slug: data.slug,
        content: data.content,
        content_ar: data.content_ar || null,
        excerpt: data.excerpt || null,
        excerpt_ar: data.excerpt_ar || null,
        cover_image: data.cover_image || null,
        category: data.category || null,
        tags: data.tags ? data.tags.split(',').map(t => t.trim()) : null,
        published: data.published,
        published_at: data.published ? new Date().toISOString() : null,
        read_time: data.read_time
      }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success('تم تحديث المقال بنجاح');
      resetForm();
      setIsDialogOpen(false);
    },
    onError: () => toast.error('حدث خطأ أثناء تحديث المقال')
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success('تم حذف المقال بنجاح');
    },
    onError: () => toast.error('حدث خطأ أثناء حذف المقال')
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase.from('blog_posts').update({
        published,
        published_at: published ? new Date().toISOString() : null
      }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success('تم تحديث حالة النشر');
    }
  });

  const resetForm = () => {
    setFormData({
      title: '',
      title_ar: '',
      slug: '',
      content: '',
      content_ar: '',
      excerpt: '',
      excerpt_ar: '',
      cover_image: '',
      category: '',
      tags: '',
      published: false,
      read_time: 5
    });
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      title_ar: post.title_ar || '',
      slug: post.slug,
      content: post.content,
      content_ar: post.content_ar || '',
      excerpt: post.excerpt || '',
      excerpt_ar: post.excerpt_ar || '',
      cover_image: post.cover_image || '',
      category: post.category || '',
      tags: post.tags?.join(', ') || '',
      published: post.published || false,
      read_time: post.read_time || 5
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error('يرجى ملء الحقول المطلوبة');
      return;
    }
    
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">إدارة المدونة</h2>
            <p className="text-sm text-muted-foreground">إضافة وتعديل وحذف المقالات</p>
          </div>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }} className="bg-accent hover:bg-accent/90">
              <Plus className="w-4 h-4 ml-2" />
              مقال جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? 'تعديل المقال' : 'إضافة مقال جديد'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>العنوان (إنجليزي) *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Article Title"
                    dir="ltr"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>العنوان (عربي)</Label>
                  <Input
                    value={formData.title_ar}
                    onChange={(e) => setFormData(prev => ({ ...prev, title_ar: e.target.value }))}
                    placeholder="عنوان المقال"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الرابط (Slug)</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="article-slug"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label>التصنيف</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Web Development"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>المحتوى (إنجليزي) *</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Article content..."
                  dir="ltr"
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>المحتوى (عربي)</Label>
                <Textarea
                  value={formData.content_ar}
                  onChange={(e) => setFormData(prev => ({ ...prev, content_ar: e.target.value }))}
                  placeholder="محتوى المقال..."
                  dir="rtl"
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>الملخص (إنجليزي)</Label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief excerpt..."
                    dir="ltr"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>الملخص (عربي)</Label>
                  <Textarea
                    value={formData.excerpt_ar}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt_ar: e.target.value }))}
                    placeholder="ملخص قصير..."
                    dir="rtl"
                    rows={2}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>صورة الغلاف (رابط)</Label>
                  <Input
                    value={formData.cover_image}
                    onChange={(e) => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
                    placeholder="https://..."
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label>الوسوم (مفصولة بفاصلة)</Label>
                  <Input
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="React, JavaScript, Web"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>وقت القراءة (دقائق)</Label>
                  <Input
                    type="number"
                    value={formData.read_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, read_time: parseInt(e.target.value) || 5 }))}
                    min={1}
                  />
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <Switch
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                  />
                  <Label>نشر المقال</Label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90">
                  <Save className="w-4 h-4 ml-2" />
                  {editingPost ? 'تحديث' : 'إنشاء'}
                </Button>
                <Button type="button" variant="outline" onClick={() => { resetForm(); setIsDialogOpen(false); }}>
                  <X className="w-4 h-4 ml-2" />
                  إلغاء
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">لا توجد مقالات بعد</p>
            <p className="text-sm text-muted-foreground">ابدأ بإضافة مقال جديد</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:border-accent/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {post.cover_image && (
                      <img 
                        src={post.cover_image} 
                        alt={post.title}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg truncate">{post.title}</h3>
                        {post.published ? (
                          <Eye className="w-4 h-4 text-green-500" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      {post.title_ar && (
                        <p className="text-sm text-muted-foreground truncate" dir="rtl">{post.title_ar}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        {post.category && <span className="bg-accent/10 text-accent px-2 py-0.5 rounded">{post.category}</span>}
                        <span>{post.read_time} دقائق قراءة</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => togglePublishMutation.mutate({ id: post.id, published: !post.published })}
                    >
                      {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(post)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        if (confirm('هل أنت متأكد من حذف هذا المقال؟')) {
                          deleteMutation.mutate(post.id);
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
