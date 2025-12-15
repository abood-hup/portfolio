import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

interface HeroContent {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  profile_image_url: string | null;
}

const AdminHero = () => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    profile_image_url: '',
  });

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from('hero_content')
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
        subtitle: data.subtitle || '',
        description: data.description || '',
        profile_image_url: data.profile_image_url || '',
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

    const heroData = {
      title: formData.title,
      subtitle: formData.subtitle || null,
      description: formData.description || null,
      profile_image_url: formData.profile_image_url || null,
    };

    if (content) {
      const { error } = await supabase
        .from('hero_content')
        .update(heroData)
        .eq('id', content.id);

      if (error) {
        toast.error('خطأ في تحديث المحتوى');
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from('hero_content')
        .insert([heroData]);

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
          <CardTitle>محتوى الصفحة الرئيسية</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">العنوان الرئيسي *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="مثال: مرحباً، أنا محمد"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">العنوان الفرعي</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="مثال: مطور ويب محترف"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="وصف قصير عنك..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile_image_url">رابط صورة البروفايل</Label>
              <Input
                id="profile_image_url"
                value={formData.profile_image_url}
                onChange={(e) => setFormData({ ...formData, profile_image_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            {formData.profile_image_url && (
              <div className="mt-4">
                <Label>معاينة الصورة</Label>
                <img
                  src={formData.profile_image_url}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-full border border-border"
                />
              </div>
            )}
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

export default AdminHero;
