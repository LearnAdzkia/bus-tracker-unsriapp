import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft,
  Camera,
  Upload,
  Save,
  User,
  Mail,
  Phone,
  Building,
  UserCheck
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface EditProfileProps {
  user: {
    name: string;
    email: string;
    phone?: string;
    faculty?: string;
    role?: string;
    photo?: string;
  };
  onSave: (updatedUser: any) => void;
  onBack: () => void;
}

export function EditProfile({ user, onSave, onBack }: EditProfileProps) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    faculty: user.faculty || '',
    role: user.role || 'mahasiswa',
    photo: user.photo || ''
  });
  
  const [previewPhoto, setPreviewPhoto] = useState<string>(user.photo || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

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

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Ukuran file terlalu besar. Maksimal 5MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewPhoto(result);
        setFormData({...formData, photo: result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error('Nama lengkap harus diisi');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('Email harus diisi');
      return;
    }

    onSave(formData);
    toast.success('Profil berhasil diperbarui');
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E88E5] to-[#2196F3] text-white p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Edit Profil</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Photo Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Foto Profil
            </CardTitle>
            <CardDescription>
              Klik pada foto untuk mengganti atau mengambil foto baru
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="relative inline-block">
              <Avatar className="w-32 h-32 mx-auto ring-4 ring-blue-100">
                <AvatarImage src={previewPhoto} alt="Profile photo" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                  {formData.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <Button
                size="sm"
                className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-[#1E88E5] hover:bg-[#1976D2]"
                onClick={triggerFileUpload}
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex justify-center space-x-2">
              <Button variant="outline" size="sm" onClick={triggerFileUpload}>
                <Upload className="w-4 h-4 mr-2" />
                Pilih dari Galeri
              </Button>
              <Button variant="outline" size="sm" onClick={triggerCameraCapture}>
                <Camera className="w-4 h-4 mr-2" />
                Ambil Foto
              </Button>
            </div>

            {/* Hidden file inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="user"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Informasi Personal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                  <SelectItem value="dosen">Dosen</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
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
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="08123456789"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Batal
          </Button>
          <Button onClick={handleSave} className="flex-1 bg-[#1E88E5] hover:bg-[#1976D2]">
            <Save className="w-4 h-4 mr-2" />
            Simpan Perubahan
          </Button>
        </div>

        {/* Tips */}
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Tips Foto Profil:</strong></p>
              <p>• Gunakan foto wajah yang jelas dan profesional</p>
              <p>• Maksimal ukuran file 5MB</p>
              <p>• Format yang didukung: JPG, PNG, WebP</p>
              <p>• Rasio 1:1 (persegi) untuk hasil terbaik</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}