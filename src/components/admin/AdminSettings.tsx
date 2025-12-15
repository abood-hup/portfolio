import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

interface SiteSettings {
  id: string;
  site_name: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    site_name: '',
    logo_url: '',
    favicon_url: '',
    primary_color: '',
    secondary_color: '',
  });

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .maybeSingle();

    if (error) {
      toast.error('خطأ في جلب الإعدادات');
      setLoading(false);
      return;
    }

    if (data) {
      setSettings(data);
      setFormData({
        site_name: data.site_name || '',
        logo_url: data.logo_url || '',
        favicon_url: data.favicon_url || '',
        primary_color: data.primary_color || '',
        secondary_color: data.secondary_color || '',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const settingsData = {
      site_name: formData.site_name || null,
      logo_url: formData.logo_url || null,
      favicon_url: formData.favicon_url || null,
      primary_color: formData.primary_color || null,
      secondary_color: formData.secondary_color || null,
    };

    if (settings) {
      const { error } = await supabase
        .from('site_settings')
        .update(settingsData)
        .eq('id', settings.id);

      if (error) {
        toast.error('خطأ في تحديث الإعدادات');
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from('site_settings')
        .insert([settingsData]);

      if (error) {
        toast.error('خطأ في حفظ الإعدادات');
        setSaving(false);
        return;
      }
    }

    toast.success('تم حفظ الإعدادات بنجاح');
    setSaving(false);
    fetchSettings();
  };

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات الموقع</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site_name">اسم الموقع</Label>
              <Input
                id="site_name"
                value={formData.site_name}
                onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                placeholder="DevArt"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo_url">رابط الشعار</Label>
              <Input
                id="logo_url"
                value={formData.logo_url}
                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="favicon_url">رابط أيقونة الموقع</Label>
              <Input
                id="favicon_url"
                value={formData.favicon_url}
                onChange={(e) => setFormData({ ...formData, favicon_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary_color">اللون الأساسي</Label>
                <Input
                  id="primary_color"
                  value={formData.primary_color}
                  onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                  placeholder="#000000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary_color">اللون الثانوي</Label>
                <Input
                  id="secondary_color"
                  value={formData.secondary_color}
                  onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                  placeholder="#ffffff"
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={saving}>
              <Save className="h-4 w-4 ml-2" />
              {saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
