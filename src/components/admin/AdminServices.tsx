import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    sort_order: 0,
  });

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      toast.error('خطأ في جلب الخدمات');
      return;
    }
    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: '',
      sort_order: 0,
    });
    setEditingService(null);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description || '',
      icon: service.icon || '',
      sort_order: service.sort_order,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceData = {
      title: formData.title,
      description: formData.description || null,
      icon: formData.icon || null,
      sort_order: formData.sort_order,
    };

    if (editingService) {
      const { error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', editingService.id);

      if (error) {
        toast.error('خطأ في تحديث الخدمة');
        return;
      }
      toast.success('تم تحديث الخدمة بنجاح');
    } else {
      const { error } = await supabase
        .from('services')
        .insert([serviceData]);

      if (error) {
        toast.error('خطأ في إضافة الخدمة');
        return;
      }
      toast.success('تم إضافة الخدمة بنجاح');
    }

    setIsDialogOpen(false);
    resetForm();
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('خطأ في حذف الخدمة');
      return;
    }
    toast.success('تم حذف الخدمة بنجاح');
    fetchServices();
  };

  if (loading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة الخدمات</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              إضافة خدمة
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان الخدمة *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">اسم الأيقونة (Lucide)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="مثال: Code, Globe, Smartphone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order">ترتيب العرض</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button type="submit">
                  {editingService ? 'تحديث' : 'إضافة'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                {service.icon && <span className="text-accent">{service.icon}</span>}
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {service.description}
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(service)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(service.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          لا توجد خدمات حتى الآن. قم بإضافة خدمتك الأولى!
        </div>
      )}
    </div>
  );
};

export default AdminServices;
