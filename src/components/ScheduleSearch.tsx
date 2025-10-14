import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { 
  Search, 
  Clock, 
  MapPin, 
  Filter, 
  Bell, 
  Heart, 
  AlertTriangle,
  Navigation,
  RotateCcw,
  Info
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface ScheduleSearchProps {
  onBack: () => void;
}

export function ScheduleSearch({ onBack }: ScheduleSearchProps) {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [busType, setBusType] = useState('all');
  const [onlyActive, setOnlyActive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(timer);
  }, []);

  // Updated schedule data without seat information
  const scheduleData = {
    'indralaya-palembang': {
      pagi: [
        { time: '06:00', type: 'DAMRI', price: 'Rp 15.000', status: 'active' },
        { time: '06:15', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'active' },
        { time: '06:30', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true },
        { time: '06:45', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'active', rush: true },
        { time: '07:00', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true },
        { time: '07:15', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'maintenance', rush: true },
        { time: '07:30', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true },
        { time: '07:45', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'active', rush: true },
        { time: '08:00', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true }
      ],
      siang: [
        { time: '11:00', type: 'DAMRI', price: 'Rp 15.000', status: 'active' },
        { time: '11:15', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'active' },
        { time: '11:30', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true },
        { time: '11:45', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'active', rush: true },
        { time: '12:00', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true },
        { time: '12:15', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'active', rush: true },
        { time: '12:30', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true }
      ],
      sore: [
        { time: '15:00', type: 'DAMRI', price: 'Rp 15.000', status: 'active' },
        { time: '15:15', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'active' },
        { time: '15:30', type: 'DAMRI', price: 'Rp 15.000', status: 'active' },
        { time: '16:00', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true },
        { time: '16:15', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'active', rush: true },
        { time: '16:30', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true },
        { time: '16:45', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'active', rush: true },
        { time: '17:00', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true },
        { time: '17:15', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'active', rush: true },
        { time: '17:30', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true }
      ]
    },
    'palembang-indralaya': {
      pagi: [
        { time: '07:00', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true },
        { time: '07:15', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'active', rush: true },
        { time: '07:30', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true },
        { time: '07:45', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'active', rush: true },
        { time: '08:00', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true }
      ],
      siang: [
        { time: '12:00', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true },
        { time: '12:15', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'active', rush: true },
        { time: '12:30', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true },
        { time: '13:00', type: 'DAMRI', price: 'Rp 15.000', status: 'active' }
      ],
      sore: [
        { time: '17:00', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true },
        { time: '17:15', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'active', rush: true },
        { time: '17:30', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true },
        { time: '17:45', type: 'Bus Kaleng', price: 'Rp 10.000', status: 'active', rush: true },
        { time: '18:00', type: 'DAMRI', price: 'Rp 15.000', status: 'active', rush: true }
      ]
    },
    'shuttle-antar-kampus': {
      pagi: [
        { time: '06:30', type: 'Shuttle', price: 'GRATIS', status: 'active', route: 'Terminal → FKIP → FT → FK' },
        { time: '07:00', type: 'Shuttle', price: 'GRATIS', status: 'active', rush: true, route: 'Terminal → FISIP → MIPA → FIK' },
        { time: '07:30', type: 'Shuttle', price: 'GRATIS', status: 'active', rush: true, route: 'Terminal → FE → FH → Perpustakaan' },
        { time: '08:00', type: 'Shuttle', price: 'GRATIS', status: 'active', rush: true, route: 'Terminal → FKM → Pertanian → Rusunawa' }
      ],
      siang: [
        { time: '11:30', type: 'Shuttle', price: 'GRATIS', status: 'active', rush: true, route: 'Terminal → FT → FK → Klinik' },
        { time: '12:00', type: 'Shuttle', price: 'GRATIS', status: 'active', rush: true, route: 'Terminal → FKIP → FISIP → Perpustakaan' },
        { time: '12:30', type: 'Shuttle', price: 'GRATIS', status: 'active', rush: true, route: 'Terminal → FE → MIPA → FIK' },
        { time: '13:00', type: 'Shuttle', price: 'GRATIS', status: 'active', route: 'Terminal → FH → FKM → Apartemen' }
      ],
      sore: [
        { time: '16:00', type: 'Shuttle', price: 'GRATIS', status: 'active', rush: true, route: 'Terminal → Perpustakaan → MIPA → FIK' },
        { time: '16:30', type: 'Shuttle', price: 'GRATIS', status: 'active', rush: true, route: 'Terminal → FK → FT → FKIP' },
        { time: '17:00', type: 'Shuttle', price: 'GRATIS', status: 'active', rush: true, route: 'Terminal → FE → FH → FISIP' },
        { time: '17:30', type: 'Shuttle', price: 'GRATIS', status: 'active', rush: true, route: 'Terminal → FKM → Pertanian → Rusunawa' }
      ]
    }
  };

  const routes = [
    { value: 'indralaya-palembang', label: 'Indralaya → Palembang' },
    { value: 'palembang-indralaya', label: 'Palembang → Indralaya' },
    { value: 'shuttle-antar-kampus', label: 'Shuttle Antar-Kampus' }
  ];

  const fakultasStops = [
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
    'Perpustakaan Pusat UNSRI',
    'Masjid Al-Nabawi',
    'Apartemen Mahasiswa',
    'Rusunawa',
    'Klinik Kampus',
    'Terminal Kampus'
  ];

  const timeSlots = [
    { value: 'pagi', label: 'Pagi (06:00-10:00)' },
    { value: 'siang', label: 'Siang (11:00-14:00)' },
    { value: 'sore', label: 'Sore (15:00-18:00)' }
  ];

  const busTypes = [
    { value: 'all', label: 'Semua Bus' },
    { value: 'DAMRI', label: 'DAMRI Saja' },
    { value: 'Bus Kaleng', label: 'Bus Kaleng Saja' },
    { value: 'Shuttle', label: 'Shuttle Saja' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200 dark:text-green-200 dark:bg-green-900/30 dark:border-green-800';
      case 'maintenance': return 'text-red-600 bg-red-50 border-red-200 dark:text-red-200 dark:bg-red-900/30 dark:border-red-800';
      default: return 'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-200 dark:bg-gray-800/30 dark:border-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'AKTIF';
      case 'maintenance': return 'MAINTENANCE';
      default: return 'TIDAK DIKETAHUI';
    }
  };

  const getFilteredSchedule = () => {
    if (!selectedRoute || !selectedTime) return [];
    
    const schedules = scheduleData[selectedRoute as keyof typeof scheduleData]?.[selectedTime as keyof typeof scheduleData['indralaya-palembang']] || [];
    
    return schedules.filter(schedule => {
      if (busType !== 'all' && schedule.type !== busType) return false;
      if (onlyActive && schedule.status !== 'active') return false;
      return true;
    });
  };

  const favoriteRoutes = [
    'Indralaya → Palembang',
    'Shuttle Terminal → MIPA → FIK',
    'Shuttle Terminal → FE → FH → Perpustakaan'
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E88E5] to-[#2196F3] dark:from-[#1E3A8A] dark:to-[#1E40AF] text-white p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <h1 className="text-lg sm:text-xl font-bold">Jadwal Keberangkatan</h1>
        </div>
        
        <div className="flex justify-between items-center text-xs opacity-90">
          <div className="flex items-center space-x-1">
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Update: {lastUpdate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="sm:hidden">{lastUpdate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="hidden sm:block">Data real-time</div>
        </div>
      </div>

      <div className="p-3 sm:p-4 space-y-4">
        {/* Search Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg flex items-center">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Pencarian Jadwal
            </CardTitle>
            <CardDescription>
              Pilih rute dan waktu untuk melihat jadwal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="route">Rute</Label>
                <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih rute" />
                  </SelectTrigger>
                  <SelectContent>
                    {routes.map((route) => (
                      <SelectItem key={route.value} value={route.value}>
                        {route.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Waktu</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot.value} value={slot.value}>
                        {slot.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="bus-type">Jenis Bus</Label>
                <Select value={busType} onValueChange={setBusType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis bus" />
                  </SelectTrigger>
                  <SelectContent>
                    {busTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="only-active"
                  checked={onlyActive}
                  onCheckedChange={setOnlyActive}
                />
                <Label htmlFor="only-active" className="text-sm">Hanya bus aktif</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rush Hour Warning */}
        {getFilteredSchedule().some(s => s.rush) && (
          <Alert className="border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-600">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription>
              <div className="text-sm text-orange-800 dark:text-orange-300">
                <strong>⚠️ Jam Sibuk Kampus:</strong> Beberapa jadwal berada dalam jam sibuk. 
                Datang lebih awal atau pertimbangkan waktu alternatif.
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Schedule Results */}
        {selectedRoute && selectedTime && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-base sm:text-lg">
                  Jadwal {routes.find(r => r.value === selectedRoute)?.label}
                </CardTitle>
                <Badge variant="secondary">
                  {getFilteredSchedule().length} jadwal
                </Badge>
              </div>
              <CardDescription>
                {timeSlots.find(t => t.value === selectedTime)?.label}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getFilteredSchedule().length > 0 ? (
                <div className="space-y-3">
                  {getFilteredSchedule().map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 dark:border-gray-700">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-[#1E88E5] dark:text-[#3B82F6] text-base sm:text-lg">
                            {schedule.time}
                          </span>
                          <Badge variant="outline" className="text-xs">{schedule.type}</Badge>
                          {schedule.rush && (
                            <Badge variant="destructive" className="text-xs">JAM SIBUK</Badge>
                          )}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          Tarif: {schedule.price}
                        </div>
                        {schedule.route && (
                          <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                            <MapPin className="w-3 h-3 inline mr-1" />
                            Rute: {schedule.route}
                          </div>
                        )}
                      </div>
                      <div className="text-right space-y-1">
                        <div className={`text-xs px-2 py-1 rounded border ${getStatusColor(schedule.status)}`}>
                          {getStatusText(schedule.status)}
                        </div>
                        <Button 
                          size="sm" 
                          className="text-xs bg-[#1E88E5] hover:bg-[#1565C0] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]"
                          disabled={schedule.status !== 'active'}
                        >
                          <Bell className="w-3 h-3 mr-1" />
                          <span className="hidden sm:inline">Reminder</span>
                          <span className="sm:hidden">📱</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Tidak ada jadwal yang sesuai dengan filter</p>
                  <p className="text-sm">Coba ubah kriteria pencarian</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Favorite Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg flex items-center">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-500" />
              Rute Favorit
            </CardTitle>
            <CardDescription>
              Akses cepat ke rute yang sering Anda gunakan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {favoriteRoutes.map((route, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-10 sm:h-12 text-sm sm:text-base"
                onClick={() => {
                  const routeValue = routes.find(r => r.label === route)?.value;
                  if (routeValue) {
                    setSelectedRoute(routeValue);
                    setSelectedTime('pagi');
                  }
                }}
              >
                <MapPin className="w-4 h-4 mr-2" />
                {route}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Info Box */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <div className="text-sm space-y-1">
              <p><strong>💡 Tips:</strong></p>
              <p>• Jadwal dapat berubah tanpa pemberitahuan sebelumnya</p>
              <p>• Gunakan reminder untuk mendapat notifikasi sebelum keberangkatan</p>
              <p>• Tarif dibayar langsung di bus, siapkan uang pas</p>
              <p>• Shuttle antar-kampus gratis untuk mahasiswa dan dosen UNSRI</p>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}