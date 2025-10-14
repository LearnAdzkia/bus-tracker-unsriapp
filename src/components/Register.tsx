import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Eye, EyeOff, ArrowLeft, Shield, Check, X } from 'lucide-react';
import unsriLogo from 'figma:asset/8259e4a8503c053d1b9d24a0f566d68e1cc9aaeb.png';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface RegisterProps {
  onRegister: () => void;
  onBack: () => void;
}

export function Register({ onRegister, onBack }: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    fullName: '',
    nimNip: '',
    email: '',
    faculty: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false
  });

  const validatePassword = (password: string) => {
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setFormData({...formData, password});
    validatePassword(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }
    // Simulate registration
    onRegister();
  };

  const faculties = [
    'Fakultas Ekonomi',
    'Fakultas Hukum', 
    'Fakultas Teknik',
    'Fakultas Kedokteran',
    'Fakultas Keguruan dan Ilmu Pendidikan (FKIP)',
    'Fakultas Ilmu Sosial dan Ilmu Politik (FISIP)',
    'Fakultas Pertanian',
    'Fakultas Ilmu Komputer',
    'Fakultas Matematika dan Ilmu Pengetahuan Alam (MIPA)',
    'Fakultas Kesehatan Masyarakat (FKM)',
    'Unit Kerja Lainnya'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E88E5] via-[#2196F3] to-[#1976D2] flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="absolute left-4 top-4"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2 p-1">
            <ImageWithFallback
              src={unsriLogo}
              alt="Logo UNSRI"
              className="w-full h-full object-contain"
            />
          </div>
          <CardTitle className="text-2xl">Daftar Akun Baru</CardTitle>
          <CardDescription>
            Lengkapi data diri Anda untuk mendaftar
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih role Anda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                  <SelectItem value="dosen">Dosen</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Nama Lengkap</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nimNip">
                {formData.role === 'mahasiswa' ? 'NIM' : 'NIP'}
              </Label>
              <Input
                id="nimNip"
                type="text"
                placeholder={`Masukkan ${formData.role === 'mahasiswa' ? 'NIM' : 'NIP'} Anda`}
                value={formData.nimNip}
                onChange={(e) => setFormData({...formData, nimNip: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email UNSRI</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@unsri.ac.id"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faculty">Fakultas/Unit Kerja</Label>
              <Select value={formData.faculty} onValueChange={(value) => setFormData({...formData, faculty: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih fakultas/unit kerja" />
                </SelectTrigger>
                <SelectContent>
                  {faculties.map((faculty) => (
                    <SelectItem key={faculty} value={faculty}>
                      {faculty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="08123456789"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={handlePasswordChange}
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
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="text-xs space-y-1">
                  <div className="flex items-center space-x-1">
                    {passwordStrength.length ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                    <span className={passwordStrength.length ? 'text-green-600' : 'text-red-600'}>
                      Minimal 8 karakter
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {passwordStrength.uppercase ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                    <span className={passwordStrength.uppercase ? 'text-green-600' : 'text-red-600'}>
                      Huruf besar
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {passwordStrength.lowercase ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                    <span className={passwordStrength.lowercase ? 'text-green-600' : 'text-red-600'}>
                      Huruf kecil
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {passwordStrength.number ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                    <span className={passwordStrength.number ? 'text-green-600' : 'text-red-600'}>
                      Angka
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {passwordStrength.symbol ? <Check className="w-3 h-3 text-green-500" /> : <X className="w-3 h-3 text-red-500" />}
                    <span className={passwordStrength.symbol ? 'text-green-600' : 'text-red-600'}>
                      Simbol
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Konfirmasi password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData({...formData, agreeTerms: checked as boolean})}
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                Saya setuju dengan{' '}
                <Button variant="link" className="p-0 h-auto text-[#1E88E5] underline">
                  Syarat & Ketentuan
                </Button>
                {' '}yang berlaku
              </Label>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-[#1E88E5] hover:bg-[#1976D2] text-white"
              disabled={!formData.agreeTerms}
            >
              <Shield className="w-4 h-4 mr-2" />
              Daftar Sekarang
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}