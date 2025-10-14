import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  RotateCcw,
  AlertTriangle,
  Info,
  Locate,
  Route
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface BusTrackerProps {
  onBack: () => void;
}

export function BusTracker({ onBack }: BusTrackerProps) {
  const [selectedBus, setSelectedBus] = useState('');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000); // Update every 5 seconds for real-time tracking

    return () => clearInterval(timer);
  }, []);

  // Mock bus data with real-time positions - REMOVED seat info
  const activeBuses = [
    {
      id: 'DAMRI-01',
      type: 'DAMRI',
      route: 'Indralaya → Palembang',
      currentLocation: 'Fakultas Teknik',
      nextStop: 'Fakultas Kedokteran',
      estimatedArrival: '3 menit',
      status: 'active',
      coordinates: { lat: -2.9969, lng: 104.7361 },
      speed: '45 km/h',
      passengers: 25
    },
    {
      id: 'KALENG-03',
      type: 'Bus Kaleng',
      route: 'Palembang → Indralaya',
      currentLocation: 'Jalan Srijaya Negara',
      nextStop: 'Gerbang Utama UNSRI',
      estimatedArrival: '8 menit',
      status: 'active',
      coordinates: { lat: -2.9875, lng: 104.7245 },
      speed: '40 km/h',
      passengers: 37
    },
    {
      id: 'SHUTTLE-02',
      type: 'Shuttle',
      route: 'Terminal → MIPA → FIK → Perpustakaan',
      currentLocation: 'Fakultas MIPA',
      nextStop: 'Fakultas Ilmu Komputer',
      estimatedArrival: '2 menit',
      status: 'active',
      coordinates: { lat: -2.9985, lng: 104.7380 },
      speed: '25 km/h',
      passengers: 12
    },
    {
      id: 'DAMRI-05',
      type: 'DAMRI',
      route: 'Indralaya → Palembang',
      currentLocation: 'Terminal Kampus',
      nextStop: 'Berangkat dalam 5 menit',
      estimatedArrival: '5 menit',
      status: 'standby',
      coordinates: { lat: -2.9950, lng: 104.7340 },
      speed: '0 km/h',
      passengers: 40
    },
    {
      id: 'KALENG-07',
      type: 'Bus Kaleng',
      route: 'Indralaya → Palembang',
      currentLocation: 'Fakultas Ekonomi',
      nextStop: 'Fakultas Hukum',
      estimatedArrival: '4 menit',
      status: 'active',
      coordinates: { lat: -2.9960, lng: 104.7355 },
      speed: '30 km/h',
      passengers: 28
    },
    {
      id: 'SHUTTLE-03',
      type: 'Shuttle',
      route: 'Terminal → FE → FH → Perpustakaan',
      currentLocation: 'Fakultas Ekonomi',
      nextStop: 'Fakultas Hukum',
      estimatedArrival: '3 menit',
      status: 'active',
      coordinates: { lat: -2.9960, lng: 104.7355 },
      speed: '20 km/h',
      passengers: 8
    },
    {
      id: 'SHUTTLE-04',
      type: 'Shuttle',
      route: 'Terminal → FKIP → FT → FK',
      currentLocation: 'Fakultas Teknik',
      nextStop: 'Fakultas Kedokteran',
      estimatedArrival: '5 menit',
      status: 'active',
      coordinates: { lat: -2.9970, lng: 104.7365 },
      speed: '22 km/h',
      passengers: 15
    },
    {
      id: 'SHUTTLE-05',
      type: 'Shuttle',
      route: 'Terminal → FKM → Pertanian → Rusunawa',
      currentLocation: 'Fakultas Kesehatan Masyarakat',
      nextStop: 'Fakultas Pertanian',
      estimatedArrival: '4 menit',
      status: 'standby',
      coordinates: { lat: -2.9975, lng: 104.7370 },
      speed: '0 km/h',
      passengers: 6
    }
  ];

  const campusCheckpoints = [
    { name: 'Fakultas Ekonomi', type: 'fakultas' },
    { name: 'Fakultas Hukum', type: 'fakultas' },
    { name: 'Fakultas Teknik', type: 'fakultas' },
    { name: 'Fakultas Kedokteran', type: 'fakultas' },
    { name: 'Fakultas Keguruan dan Ilmu Pendidikan (FKIP)', type: 'fakultas' },
    { name: 'Fakultas Ilmu Sosial dan Ilmu Politik (FISIP)', type: 'fakultas' },
    { name: 'Fakultas Pertanian', type: 'fakultas' },
    { name: 'Fakultas Ilmu Komputer', type: 'fakultas' },
    { name: 'Fakultas Matematika dan Ilmu Pengetahuan Alam (MIPA)', type: 'fakultas' },
    { name: 'Fakultas Kesehatan Masyarakat (FKM)', type: 'fakultas' },
    { name: 'Perpustakaan Pusat UNSRI', type: 'fasilitas' },
    { name: 'Masjid Al-Nabawi', type: 'fasilitas' },
    { name: 'Apartemen Mahasiswa', type: 'fasilitas' },
    { name: 'Rusunawa', type: 'fasilitas' },
    { name: 'Klinik Kampus', type: 'fasilitas' },
    { name: 'Terminal Kampus', type: 'terminal' },
    { name: 'Gerbang Utama UNSRI', type: 'gerbang' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200 dark:text-green-200 dark:bg-green-900/30 dark:border-green-800';
      case 'standby': return 'text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-200 dark:bg-blue-900/30 dark:border-blue-800';
      default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-200 dark:bg-gray-800/30 dark:border-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🟢';
      case 'standby': return '🔵';
      default: return '⚪';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'AKTIF';
      case 'standby': return 'STANDBY';
      default: return 'TIDAK DIKETAHUI';
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          let errorMessage = 'Tidak dapat mengakses lokasi. ';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Izin lokasi ditolak. Silakan aktifkan izin lokasi di pengaturan browser.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Informasi lokasi tidak tersedia.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Permintaan lokasi timeout.';
              break;
            default:
              errorMessage += 'Terjadi kesalahan yang tidak diketahui.';
              break;
          }
          console.error('Error getting location:', {
            code: error.code,
            message: error.message
          });
          alert(errorMessage);
        }
      );
    } else {
      alert('Geolocation tidak didukung oleh browser ini.');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E88E5] to-[#FDB913] dark:from-[#1E3A8A] dark:to-[#F59E0B] text-white p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <h1 className="text-lg sm:text-xl font-bold">Lacak Bus Real-Time</h1>
        </div>
        
        <div className="flex justify-between items-center text-xs opacity-90">
          <div className="flex items-center space-x-1">
            <RotateCcw className="w-3 h-3 animate-spin" />
            <span className="hidden sm:inline">Live tracking: {lastUpdate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            <span className="sm:hidden">Live: {lastUpdate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="hidden sm:block">Update setiap 5 detik</div>
          <div className="sm:hidden">5s update</div>
        </div>
      </div>

      <div className="p-3 sm:p-4 space-y-4">
        {/* Location & Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg flex items-center">
              <Locate className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Lokasi & Kontrol
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button 
                onClick={handleGetLocation}
                className="flex-1 bg-[#1E88E5] hover:bg-[#1565C0] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
              >
                <MapPin className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Dapatkan Lokasi Saya</span>
                <span className="sm:hidden">Lokasi Saya</span>
              </Button>
              <Button variant="outline" className="flex-1">
                <Route className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Lihat Peta Rute</span>
                <span className="sm:hidden">Peta Rute</span>
              </Button>
            </div>
            
            {userLocation && (
              <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-800 dark:text-green-300">
                  📍 Lokasi Anda: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Alert className="border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-600">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription>
            <div className="text-sm text-orange-800 dark:text-orange-300 space-y-1">
              <p><strong>⚠️ Catatan Penting:</strong></p>
              <p>• Bus Indralaya TIDAK melayani rute ke Bukit Indralaya</p>
              <p>• Hanya berkeliling area kampus Indralaya</p>
              <p>• Estimasi waktu dapat berubah sesuai kondisi lalu lintas</p>
            </div>
          </AlertDescription>
        </Alert>

        {/* Active Buses */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-base sm:text-lg">Bus Aktif Saat Ini</CardTitle>
              <Badge variant="secondary">{activeBuses.length} bus aktif</Badge>
            </div>
            <CardDescription>
              Pilih bus untuk melihat detail tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeBuses.map((bus) => (
              <Card 
                key={bus.id} 
                className={`cursor-pointer transition-all hover:shadow-md dark:hover:bg-gray-800/50 ${
                  selectedBus === bus.id ? 'ring-2 ring-[#1E88E5] dark:ring-[#3B82F6]' : ''
                }`}
                onClick={() => setSelectedBus(selectedBus === bus.id ? '' : bus.id)}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#1E88E5] dark:text-[#3B82F6] text-sm sm:text-base">{bus.id}</span>
                        <Badge variant="outline" className="text-xs">{bus.type}</Badge>
                        {bus.status === 'standby' && (
                          <Badge variant="secondary" className="text-xs">STANDBY</Badge>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{bus.route}</p>
                    </div>
                    <div className={`text-xs sm:text-sm px-2 py-1 rounded border ${getStatusColor(bus.status)}`}>
                      {getStatusIcon(bus.status)} {getStatusText(bus.status)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Lokasi Saat Ini:</p>
                      <p className="font-medium">{bus.currentLocation}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Pemberhentian Berikutnya:</p>
                      <p className="font-medium">{bus.nextStop}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Estimasi Tiba:</p>
                      <p className="font-medium">{bus.estimatedArrival}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Kecepatan:</p>
                      <p className="font-medium">{bus.speed}</p>
                    </div>
                  </div>

                  {selectedBus === bus.id && (
                    <div className="mt-4 pt-3 border-t dark:border-gray-700 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Total Penumpang:</p>
                          <p className="font-medium">
                            {bus.passengers} orang
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Koordinat:</p>
                          <p className="font-medium text-xs">
                            {bus.coordinates.lat.toFixed(4)}, {bus.coordinates.lng.toFixed(4)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button size="sm" className="flex-1 bg-[#1E88E5] hover:bg-[#1565C0] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Lihat di Peta</span>
                          <span className="sm:hidden">Peta</span>
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Set Reminder</span>
                          <span className="sm:hidden">Reminder</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Campus Checkpoints */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Checkpoint Kampus</CardTitle>
            <CardDescription>
              Titik-titik pemberhentian bus di area kampus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {campusCheckpoints.map((checkpoint, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      checkpoint.type === 'fakultas' ? 'bg-blue-500' :
                      checkpoint.type === 'fasilitas' ? 'bg-green-500' :
                      checkpoint.type === 'terminal' ? 'bg-red-500' :
                      'bg-yellow-500'
                    }`}></div>
                    <span className="text-xs sm:text-sm">{checkpoint.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {checkpoint.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Keterangan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Fakultas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Fasilitas</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Terminal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Gerbang</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Google Maps - Indralaya */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg flex items-center">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#1E88E5] dark:text-[#3B82F6]" />
              Peta Kampus Indralaya
            </CardTitle>
            <CardDescription>
              Lokasi real-time bus dan rute di area kampus UNSRI Indralaya
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-64 sm:h-96 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63737.34851166479!2d104.70266087832031!3d-2.9969000000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b9c8b9b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sUniversitas%20Sriwijaya%20Kampus%20Indralaya!5e0!3m2!1sid!2sid!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Kampus UNSRI Indralaya"
              ></iframe>
            </div>
            <div className="p-3 sm:p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  📍 Koordinat: -2.9969, 104.7361
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open('https://maps.google.com/?q=Universitas+Sriwijaya+Kampus+Indralaya', '_blank')}
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Buka di Google Maps</span>
                  <span className="sm:hidden">Google Maps</span>
                </Button>
              </div>
              
              {/* Bus Markers Legend */}
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Bus Aktif di Peta:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeBuses.slice(0, 4).map((bus) => (
                    <div key={bus.id} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        bus.status === 'active' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <span className="text-blue-700 dark:text-blue-300 truncate">{bus.id} - {bus.currentLocation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <div className="text-sm space-y-1">
              <p><strong>💡 Tips Penggunaan:</strong></p>
              <p>• Aktifkan GPS untuk mendapatkan estimasi jarak yang akurat</p>
              <p>• Tracking real-time membutuhkan koneksi internet yang stabil</p>
              <p>• Estimasi waktu dapat berubah sesuai kondisi lalu lintas</p>
              <p>• Gunakan fitur reminder untuk notifikasi bus yang akan tiba</p>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}