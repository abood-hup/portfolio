import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

interface AboutContent {
  id: string;
  title: string;
  description: string | null;
  skills: string[] | null;
  experience_years: number | null;
  projects_count: number | null;
}

const AdminAbout = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    experience_years: 0,
    projects_count: 0,
  });

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from('about_content')
      .select('*')
      .maybeSingle();

    if (error) {
      toast.error('خطأ في جلب المحتوى');
      setLoading(false);
      return;
    }

    if (data) {
      setContent(data);
      setFormData({
        title: data.title,
        description: data.description || '',
        skills: data.skills?.join(', ') || '',
        experience_years: data.experience_years || 0,
        projects_count: data.projects_count || 0,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const aboutData = {
      title: formData.title,
      description: formData.description || null,
      skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : null,
      experience_years: formData.experience_years || null,
      projects_count: formData.projects_count || null,
    };

    if (content) {
      const { error } = await supabase
        .from('about_content')
        .update(aboutData)
        .eq('id', content.id);

      if (error) {
        toast.error('خطأ في تحديث المحتوى');
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from('about_content')
        .insert([aboutData]);

      if (error) {
        toast.error('خطأ في حفظ المحتوى');
        setSaving(false);
        return;
      }
    }

    toast.success('تم حفظ المحتوى بنجاح');
    setSaving(false);
    fetchContent();
  };

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>محتوى "من أنا"</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">العنوان *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="مثال: نبذة عني"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="اكتب نبذة عنك..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">المهارات (افصل بفاصلة)</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="React, TypeScript, Node.js, Python"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience_years">سنوات الخبرة</Label>
                <Input
                  id="experience_years"
                  type="number"
                  value={formData.experience_years}
                  onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projects_count">عدد المشاريع</Label>
                <Input
                  id="projects_count"
                  type="number"
                  value={formData.projects_count}
                  onChange={(e) => setFormData({ ...formData, projects_count: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={saving}>
              <Save className="h-4 w-4 ml-2" />
              {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAbout;
