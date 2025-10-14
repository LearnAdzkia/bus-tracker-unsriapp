import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Eye, EyeOff, Mail, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import unsriLogo from 'figma:asset/8259e4a8503c053d1b9d24a0f566d68e1cc9aaeb.png';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface LoginProps {
  onLogin: () => void;
  onRegister: () => void;
  onSkipLogin: () => void;
}

export function Login({ onLogin, onRegister, onSkipLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E88E5] via-[#2196F3] to-[#1976D2] dark:from-[#1E3A8A] dark:via-[#1E40AF] dark:to-[#1E3A8A] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 p-1">
            <ImageWithFallback
              src={unsriLogo}
              alt="Logo UNSRI"
              className="w-full h-full object-contain"
            />
          </div>
          <CardTitle className="text-xl sm:text-2xl">Masuk ke Akun Anda</CardTitle>
          <CardDescription>
            Gunakan kredensial UNSRI Anda untuk melanjutkan
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">NIM/NIP/Email UNSRI</Label>
              <Input
                id="email"
                type="text"
                placeholder="Masukkan NIM, NIP, atau email@unsri.ac.id"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password Anda"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData({...formData, rememberMe: checked as boolean})}
              />
              <Label htmlFor="remember" className="text-sm">
                Ingat saya
              </Label>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-[#1E88E5] hover:bg-[#1976D2] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB] text-white">
              Masuk
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="w-full border-[#FDB913] text-[#FDB913] hover:bg-[#FDB913] hover:text-white dark:border-[#F59E0B] dark:text-[#F59E0B] dark:hover:bg-[#F59E0B]"
            >
              <Mail className="w-4 h-4 mr-2" />
              Masuk dengan Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800/50"
              onClick={onSkipLogin}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Lihat Bus Tracker Saja
            </Button>
            
            <div className="flex flex-col items-center space-y-2 text-sm">
              <Button variant="link" className="p-0 h-auto text-[#1E88E5]">
                Lupa Password?
              </Button>
              <div className="flex items-center space-x-1">
                <span className="text-gray-600">Belum punya akun?</span>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-[#1E88E5]"
                  onClick={onRegister}
                >
                  Daftar Akun Baru
                </Button>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}