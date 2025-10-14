import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  User, 
  Settings, 
  Bell, 
  Moon, 
  Sun,
  Shield,
  Info,
  LogOut,
  Edit,
  Heart,
  Star,
  Navigation,
  HelpCircle,
  Share2,
  Download,
  Check,
  X,
  Camera,
  Upload,
  ChevronDown
} from 'lucide-react';

interface ProfileProps {
  userName: string;
  userEmail: string;
  onBack: () => void;
  onLogout: () => void;
  onEditProfile: () => void;
  onUpdateUser: (user: {name: string, email: string}) => void;
  darkMode: boolean;
  onToggleDarkMode: (enabled: boolean) => void;
}

export function Profile({ userName, userEmail, onBack, onLogout, onEditProfile, onUpdateUser, darkMode, onToggleDarkMode }: ProfileProps) {
  const [autoLocation, setAutoLocation] = useState(true);
  const [dataUsage, setDataUsage] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState(userName);
  const [editedEmail, setEditedEmail] = useState(userEmail);
  const [userStatus, setUserStatus] = useState("mahasiswa");
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXQlMjB5b3VuZyUyMG1hbnxlbnwxfHx8fDE3NTkyNTA5ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral");

  const userStats = {
    totalTrips: 47,
    favoriteBus: 'DAMRI-01',
    totalDistance: '1,250 km',
    carbonSaved: '45.2 kg CO2'
  };

  const handleSaveProfile = () => {
    // Update user in parent component and localStorage
    onUpdateUser({ name: editedName, email: editedEmail });
    setIsEditingProfile(false);
    // In a real app, this would also update the user's profile in the backend
    console.log('Profile saved:', { name: editedName, email: editedEmail, status: userStatus });
  };

  const handleCancelEditProfile = () => {
    setEditedName(userName);
    setEditedEmail(userEmail);
    setIsEditingProfile(false);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Silakan pilih file gambar yang valid');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Create canvas to resize image and maintain aspect ratio
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set square dimensions for profile picture
          const size = 400;
          canvas.width = size;
          canvas.height = size;
          
          // Calculate crop dimensions to maintain aspect ratio
          const sourceSize = Math.min(img.width, img.height);
          const sourceX = (img.width - sourceSize) / 2;
          const sourceY = (img.height - sourceSize) / 2;
          
          // Draw cropped and resized image
          ctx?.drawImage(img, sourceX, sourceY, sourceSize, sourceSize, 0, 0, size, size);
          
          // Convert to data URL and set as profile image
          const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setProfileImage(resizedDataUrl);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would open camera
    console.log('Opening camera...');
    // For demo purposes, we'll just show an alert
    alert('Camera functionality would be implemented here in a real app');
  };

  const menuItems = [
    {
      icon: Edit,
      title: 'Edit Profil',
      description: 'Ubah informasi personal Anda',
      action: () => {
        setIsEditingProfile(true);
      }
    },
    {
      icon: Heart,
      title: 'Rute Favorit',
      description: 'Kelola rute yang sering Anda gunakan',
      action: () => {
        alert('Rute Favorit Anda:\n• Indralaya → Palembang\n• Shuttle Terminal → MIPA → FIK\n• Shuttle Terminal → FE → FH → Perpustakaan');
      }
    },
    {
      icon: Bell,
      title: 'Pengaturan Notifikasi',
      description: 'Atur preferensi notifikasi',
      action: () => {
        const settings = confirm('Pengaturan Notifikasi:\n\n✅ Bus tiba dalam 5 menit\n✅ Perubahan jadwal\n✅ Pengumuman penting\n❌ Promosi dan penawaran\n\nKlik OK untuk mengubah pengaturan');
        if (settings) {
          alert('Pengaturan notifikasi berhasil diperbarui!');
        }
      }
    },
    {
      icon: HelpCircle,
      title: 'Bantuan & FAQ',
      description: 'Dapatkan bantuan menggunakan aplikasi',
      action: () => {
        alert('Bantuan & FAQ:\n\n• Cara melacak bus real-time\n• Jadwal keberangkatan\n• Informasi tarif\n• Kontak support: support@unsri.ac.id\n• WhatsApp: 0711-123456');
      }
    },
    {
      icon: Shield,
      title: 'Privasi & Keamanan',
      description: 'Kelola pengaturan privasi Anda',
      action: () => {
        alert('Pengaturan Privasi:\n\n✅ Lokasi untuk tracking bus\n✅ Data perjalanan (anonim)\n❌ Berbagi data dengan pihak ketiga\n❌ Iklan yang dipersonalisasi\n\nData Anda aman dan terlindungi!');
      }
    },
    {
      icon: Share2,
      title: 'Bagikan Aplikasi',
      description: 'Ajak teman menggunakan Bus Tracker UNSRI',
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'Bus Tracker UNSRI',
            text: 'Yuk download aplikasi Bus Tracker UNSRI untuk melacak bus kampus secara real-time!',
            url: window.location.href
          });
        } else {
          alert('Bus Tracker UNSRI\n\nYuk download aplikasi Bus Tracker UNSRI untuk melacak bus kampus secara real-time!\n\nLink: ' + window.location.href);
        }
      }
    },
    {
      icon: Download,
      title: 'Unduh Data Perjalanan',
      description: 'Export riwayat perjalanan Anda',
      action: () => {
        const confirm_download = confirm('Unduh data perjalanan Anda?\n\nData yang akan diunduh:\n• Riwayat perjalanan (3 bulan terakhir)\n• Rute favorit\n• Statistik penggunaan\n\nFormat: PDF');
        if (confirm_download) {
          alert('Data perjalanan Anda sedang diproses dan akan dikirim ke email dalam 5-10 menit');
        }
      }
    },
    {
      icon: Info,
      title: 'Tentang Aplikasi',
      description: 'Informasi versi dan developer',
      action: () => {
        alert('Bus Tracker UNSRI v1.0.0\n\nDikembangkan oleh:\nTim IT Universitas Sriwijaya\n\nKontak Developer:\nit@unsri.ac.id\n\n© 2024 UNSRI\nHak Cipta Dilindungi');
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E88E5] to-[#2196F3] dark:from-[#1E3A8A] dark:to-[#1E40AF] text-white p-4">
        <div className="flex items-center space-x-3 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <h1 className="text-lg sm:text-xl font-bold">Profil</h1>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative">
            <Avatar className="w-12 h-12 sm:w-16 sm:h-16 ring-2 ring-white">
              <AvatarImage 
                src={profileImage} 
                alt={userName}
                className="object-cover w-full h-full"
              />
              <AvatarFallback className="bg-white text-[#1E88E5] text-base sm:text-lg font-bold">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 flex space-x-1">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="w-5 h-5 sm:w-6 sm:h-6 bg-[#1E88E5] dark:bg-[#3B82F6] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#1565C0] dark:hover:bg-[#2563EB] transition-colors"
              >
                <Upload className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              </label>
              <Button
                size="sm"
                onClick={handleCameraCapture}
                className="w-5 h-5 sm:w-6 sm:h-6 bg-[#2196F3] dark:bg-[#60A5FA] rounded-full p-0 hover:bg-[#1976D2] dark:hover:bg-[#3B82F6] transition-colors"
              >
                <Camera className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1">
            {isEditingProfile ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Nama lengkap"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 flex-1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    placeholder="Email"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 flex-1 text-sm"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={userStatus} onValueChange={setUserStatus}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white flex-1 [&_svg]:text-white">
                      <SelectValue className="text-white" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <SelectItem value="mahasiswa" className="text-gray-900 dark:text-gray-100">Mahasiswa</SelectItem>
                      <SelectItem value="dosen" className="text-gray-900 dark:text-gray-100">Dosen</SelectItem>
                      <SelectItem value="karyawan" className="text-gray-900 dark:text-gray-100">Karyawan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2 mt-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleSaveProfile}
                    className="text-white hover:bg-white/20 bg-white/10"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Simpan
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCancelEditProfile}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Batal
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">{editedName}</h2>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditingProfile(true)}
                    className="text-white hover:bg-white/20 p-1 h-auto"
                    title="Edit Profil"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm opacity-90">{editedEmail}</p>
                <Badge className="mt-2 bg-white/20 text-white border-white/30 capitalize">
                  {userStatus}
                </Badge>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* User Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Star className="w-5 h-5 mr-2 text-[#1E88E5]" />
              Statistik Perjalanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{userStats.totalTrips}</p>
                <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">Total Perjalanan</p>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">{userStats.totalDistance}</p>
                <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">Jarak Tempuh</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                <p className="text-sm font-bold text-yellow-600 dark:text-yellow-400">{userStats.favoriteBus}</p>
                <p className="text-xs sm:text-sm text-yellow-600 dark:text-yellow-400">Bus Favorit</p>
              </div>
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <p className="text-sm font-bold text-purple-600 dark:text-purple-400">{userStats.carbonSaved}</p>
                <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-400">Karbon Tersimpan</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Pengaturan Cepat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <div>
                  <Label htmlFor="dark-mode">Mode Gelap</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Tampilan gelap untuk mata yang nyaman</p>
                </div>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={onToggleDarkMode}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Navigation className="w-5 h-5" />
                <div>
                  <Label htmlFor="auto-location">Lokasi Otomatis</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Deteksi lokasi untuk estimasi yang akurat</p>
                </div>
              </div>
              <Switch
                id="auto-location"
                checked={autoLocation}
                onCheckedChange={setAutoLocation}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5" />
                <div>
                  <Label htmlFor="data-usage">Hemat Data</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Kurangi pemakaian data mobile</p>
                </div>
              </div>
              <Switch
                id="data-usage"
                checked={dataUsage}
                onCheckedChange={setDataUsage}
              />
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow dark:hover:bg-gray-800/50">
                <CardContent className="p-3 sm:p-4" onClick={item.action}>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 truncate">{item.description}</p>
                    </div>
                    <Navigation className="w-4 h-4 text-gray-400 dark:text-gray-500 rotate-180 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* App Info */}
        <Card className="border-l-4 border-l-[#1E88E5]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Bus Tracker UNSRI</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Versi 1.0.0 • Build 2024.01</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Dikembangkan oleh</p>
                <p className="font-medium text-[#1E88E5] dark:text-[#3B82F6]">Tim IT UNSRI</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Card className="border-red-200">
          <CardContent className="p-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Keluar dari Akun
            </Button>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 pt-4">
          <p>© 2024 Universitas Sriwijaya</p>
          <p>Aplikasi ini hanya untuk tracking dan informasi bus kampus</p>
        </div>
      </div>
    </div>
  );
}