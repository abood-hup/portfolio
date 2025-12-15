import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

interface ContactInfo {
  id: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  whatsapp: string | null;
  twitter: string | null;
  linkedin: string | null;
  github: string | null;
}

const AdminContact = () => {
  const [content, setContent] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    whatsapp: '',
    twitter: '',
    linkedin: '',
    github: '',
  });

  const fetchContent = async () => {
    const { data, error } = await supabase
      .from('contact_info')
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
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        whatsapp: data.whatsapp || '',
        twitter: data.twitter || '',
        linkedin: data.linkedin || '',
        github: data.github || '',
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

    const contactData = {
      email: formData.email || null,
      phone: formData.phone || null,
      address: formData.address || null,
      whatsapp: formData.whatsapp || null,
      twitter: formData.twitter || null,
      linkedin: formData.linkedin || null,
      github: formData.github || null,
    };

    if (content) {
      const { error } = await supabase
        .from('contact_info')
        .update(contactData)
        .eq('id', content.id);

      if (error) {
        toast.error('خطأ في تحديث المحتوى');
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from('contact_info')
        .insert([contactData]);

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
          <CardTitle>معلومات التواصل</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+966 5XX XXX XXXX"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="المدينة، البلد"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">واتساب</Label>
              <Input
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="+966XXXXXXXXX"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="twitter">تويتر/X</Label>
                <Input
                  id="twitter"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  placeholder="@username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">لينكدإن</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="in/username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="username"
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

export default AdminContact;
