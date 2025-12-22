import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in as admin
  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setLoading(true);
    
    if (isSignUp) {
      const { error } = await signUp(email, password);
      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('هذا البريد مسجل مسبقاً، قم بتسجيل الدخول');
        } else {
          toast.error('حدث خطأ أثناء إنشاء الحساب');
        }
        setLoading(false);
        return;
      }
      toast.success('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول');
      setIsSignUp(false);
      setLoading(false);
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error('خطأ في البريد الإلكتروني أو كلمة المرور');
        setLoading(false);
        return;
      }
      toast.success('تم تسجيل الدخول بنجاح');
      // Navigation will happen via useEffect when isAdmin becomes true
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4" dir="rtl">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-accent" />
          </div>
          <CardTitle className="text-2xl font-bold">لوحة التحكم</CardTitle>
          <CardDescription>
            {isSignUp ? 'أنشئ حساب مسؤول جديد' : 'قم بتسجيل الدخول للوصول إلى لوحة التحكم'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'جاري التحميل...' : (isSignUp ? 'إنشاء حساب' : 'تسجيل الدخول')}
              <ArrowRight className="mr-2 h-4 w-4" />
            </Button>
          </form>
          <div className="mt-4 text-center space-y-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-accent hover:underline transition-colors"
            >
              {isSignUp ? 'لديك حساب؟ سجل الدخول' : 'ليس لديك حساب؟ أنشئ حساباً'}
            </button>
            <div>
              <a href="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                العودة للموقع
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
