import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Bell, MapPin, Clock, FileText, AlertTriangle, Wifi, Calendar, Navigation, X } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';
import unsriLogo from 'figma:asset/8259e4a8503c053d1b9d24a0f566d68e1cc9aaeb.png';

interface DashboardProps {
  userName: string;
  onNavigate: (page: string) => void;
}

export function Dashboard({ userName, onNavigate }: DashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [rushHourDismissed, setRushHourDismissed] = useState(false);
  const [nextRushHour, setNextRushHour] = useState<string | null>(null);
  const [countdownMinutes, setCountdownMinutes] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTotalMinutes = currentHour * 60 + currentMinute;
      
      // Rush hours in minutes from start of day
      const rushHours = [
        { start: 6 * 60 + 30, end: 8 * 60 + 30, label: 'Pagi (06:30 - 08:30)' }, // 6:30 - 8:30
        { start: 11 * 60 + 30, end: 13 * 60, label: 'Siang (11:30 - 13:00)' }, // 11:30 - 13:00
        { start: 16 * 60, end: 18 * 60, label: 'Sore (16:00 - 18:00)' } // 16:00 - 18:00
      ];
      
      // Check if currently in rush hour
      const currentRushHour = rushHours.find(
        hour => currentTotalMinutes >= hour.start && currentTotalMinutes <= hour.end
      );
      
      if (currentRushHour) {
        setNextRushHour(currentRushHour.label);
        setCountdownMinutes(null);
      } else {
        // Find next rush hour
        let nextHour = rushHours.find(hour => currentTotalMinutes < hour.start - 30);
        if (!nextHour) {
          // If past all rush hours today, get first rush hour tomorrow
          nextHour = rushHours[0];
        }
        
        if (nextHour) {
          const warningTime = nextHour.start - 30; // 30 minutes before
          const minutesUntilWarning = warningTime - currentTotalMinutes;
          
          if (minutesUntilWarning <= 30 && minutesUntilWarning > 0) {
            setNextRushHour(nextHour.label);
            setCountdownMinutes(minutesUntilWarning);
          } else if (minutesUntilWarning <= 0) {
            setNextRushHour(nextHour.label);
            setCountdownMinutes(null);
          } else {
            setNextRushHour(null);
            setCountdownMinutes(null);
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isRushHour = () => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const totalMinutes = hour * 60 + minute;
    
    return (
      (totalMinutes >= 6 * 60 + 30 && totalMinutes <= 8 * 60 + 30) ||
      (totalMinutes >= 11 * 60 + 30 && totalMinutes <= 13 * 60) ||
      (totalMinutes >= 16 * 60 && totalMinutes <= 18 * 60)
    );
  };

  const nearbyBuses = [
    {
      id: 'DAMRI-01',
      type: 'DAMRI',
      distance: '250m',
      estimatedArrival: '5 menit',
      status: 'active'
    },
    {
      id: 'KALENG-03',
      type: 'Bus Kaleng',
      distance: '400m',
      estimatedArrival: '8 menit',
      status: 'active'
    },
    {
      id: 'SHUTTLE-02',
      type: 'Shuttle',
      distance: '150m',
      estimatedArrival: '3 menit',
      status: 'active'
    }
  ];

  const announcements = [
    "Perubahan jadwal bus: Libur Nasional 17 Agustus",
    "Maintenance sistem jam 02:00 - 04:00 WIB",
    "Peringatan cuaca: Hujan deras sore ini"
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E88E5] to-[#2196F3] dark:from-[#1E3A8A] dark:to-[#1E40AF] text-white p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1 min-w-0 pr-2">
            <h1 className="text-lg sm:text-xl font-bold truncate">Selamat Datang, {userName}</h1>
            <p className="text-xs sm:text-sm opacity-90">
              {currentTime.toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg p-1">
              <ImageWithFallback
                src={unsriLogo}
                alt="Logo UNSRI"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Status Info */}
        <div className="flex justify-between text-xs opacity-90">
          <div className="flex items-center space-x-1">
            <Wifi className="w-3 h-3" />
            <span className="hidden sm:inline">Real-time aktif</span>
            <span className="sm:hidden">Live</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>v1.0.0</span>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 space-y-4">
        {/* Rush Hour Alert */}
        {(isRushHour() || (nextRushHour && countdownMinutes !== null && countdownMinutes <= 30)) && !rushHourDismissed && (
          <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-600">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <div className="flex justify-between items-start w-full">
              <div className="flex-1">
                <AlertDescription>
                  <div className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
                    ⚠️ PERHATIAN: Jam Sibuk Kampus
                  </div>
                  <div className="text-sm text-orange-700 dark:text-orange-200 space-y-1">
                    {nextRushHour && (
                      <div>
                        {countdownMinutes !== null ? (
                          <p><strong>Akan dimulai:</strong> {nextRushHour} ({countdownMinutes} menit lagi)</p>
                        ) : (
                          <p><strong>Sedang berlangsung:</strong> {nextRushHour}</p>
                        )}
                      </div>
                    )}
                    <p><strong>Pagi:</strong> 06:30 - 08:30 | <strong>Siang:</strong> 11:30 - 13:00 | <strong>Sore:</strong> 16:00 - 18:00</p>
                    <p className="text-xs mt-1">💡 Datang lebih awal atau gunakan alternatif waktu untuk menghindari antrean panjang</p>
                  </div>
                </AlertDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRushHourDismissed(true)}
                className="text-orange-600 hover:bg-orange-100 dark:text-orange-300 dark:hover:bg-orange-800/20 ml-2 p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </Alert>
        )}

        {/* Announcements Carousel */}
        <Card className="border-l-4 border-l-[#1E88E5] dark:border-l-[#3B82F6]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg flex items-center">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#1E88E5] dark:text-[#3B82F6]" />
              Pengumuman
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {announcements.map((announcement, index) => (
                <div key={index} className="text-sm text-gray-600 dark:text-gray-300 p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                  {announcement}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Menu */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Menu Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="h-14 sm:h-16 justify-start space-x-3 hover:bg-[#1E88E5]/10 border-[#1E88E5]/30 dark:hover:bg-[#3B82F6]/20 dark:border-[#3B82F6]/30"
                onClick={() => onNavigate('track')}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1E88E5] dark:bg-[#3B82F6] rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm sm:text-base">Lacak Bus</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Peta real-time lokasi bus</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-14 sm:h-16 justify-start space-x-3 hover:bg-[#2196F3]/10 border-[#2196F3]/30 dark:hover:bg-[#60A5FA]/20 dark:border-[#60A5FA]/30"
                onClick={() => onNavigate('schedule')}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#2196F3] dark:bg-[#60A5FA] rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm sm:text-base">Jadwal Keberangkatan</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Daftar jadwal lengkap bus kampus</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-14 sm:h-16 justify-start space-x-3 hover:bg-[#1976D2]/10 border-[#1976D2]/30 dark:hover:bg-[#3B82F6]/20 dark:border-[#3B82F6]/30"
                onClick={() => onNavigate('regulations')}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#1976D2] dark:bg-[#3B82F6] rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm sm:text-base">Regulasi Transportasi</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Info aturan & kebijakan</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Buses */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-base sm:text-lg">Bus Terdekat</CardTitle>
              <Button variant="ghost" size="sm" className="text-[#1E88E5] dark:text-[#3B82F6]">
                <Navigation className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Lihat Semua</span>
                <span className="sm:hidden">Semua</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {nearbyBuses.map((bus) => (
              <div key={bus.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div>
                    <div className="font-medium text-sm sm:text-base">{bus.id} - {bus.type}</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{bus.distance} • {bus.estimatedArrival}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-xs sm:text-sm">
                    AKTIF
                  </div>
                  <Button 
                    size="sm" 
                    className="mt-1 h-6 px-2 text-xs bg-[#1E88E5] hover:bg-[#1565C0] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
                    onClick={() => onNavigate('track')}
                  >
                    Lacak
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Popular Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Rute Populer</CardTitle>
            <CardDescription>Akses cepat ke rute yang sering digunakan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start h-10 sm:h-12 text-sm sm:text-base"
              onClick={() => onNavigate('schedule')}
            >
              <span>Indralaya → Palembang</span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start h-10 sm:h-12 text-sm sm:text-base"
              onClick={() => onNavigate('schedule')}
            >
              <span>Shuttle FE → FH → Perpustakaan</span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-between h-10 sm:h-12 text-sm sm:text-base"
              onClick={() => onNavigate('schedule')}
            >
              <span>Shuttle Antar-Kampus</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                GRATIS
              </Badge>
            </Button>
          </CardContent>
        </Card>

        {/* Important Info */}
        <Card className="border-l-4 border-l-amber-500 dark:border-l-amber-400">
          <CardContent className="pt-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">💡</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Catatan Penting:</strong><br />
                Aplikasi ini hanya untuk tracking dan informasi. Pembayaran dilakukan langsung di bus. Tidak ada fitur pemesanan tiket.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}