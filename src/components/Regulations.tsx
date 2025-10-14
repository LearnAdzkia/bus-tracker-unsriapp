import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileText, 
  DollarSign, 
  Clock, 
  Users, 
  Shield,
  AlertTriangle,
  Info,
  Navigation,
  Bus,
  CreditCard,
  UserCheck,
  MapPin
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface RegulationsProps {
  onBack: () => void;
}

export function Regulations({ onBack }: RegulationsProps) {
  const busTypes = [
    {
      name: 'DAMRI',
      price: 'Rp 15.000',
      capacity: '40 penumpang',
      features: ['AC', 'Kursi empuk', 'Jadwal tetap', 'Rute jauh'],
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      name: 'Bus Kaleng',
      price: 'Rp 10.000',
      capacity: '40 penumpang',
      features: ['Kipas angin', 'Kursi standar', 'Lebih fleksibel', 'Rute jauh'],
      color: 'bg-orange-50 border-orange-200 text-orange-800'
    },
    {
      name: 'Shuttle Kampus',
      price: 'GRATIS',
      capacity: '30 penumpang',
      features: ['AC', 'Khusus sivitas UNSRI', 'Hanya dalam kampus', 'Wajib tunjukkan KTM/ID'],
      color: 'bg-green-50 border-green-200 text-green-800'
    }
  ];

  const regulations = [
    {
      category: 'Umum',
      icon: Users,
      rules: [
        'Penumpang wajib memiliki tiket atau membayar tarif yang berlaku',
        'Dilarang merokok di dalam bus',
        'Dilarang membawa barang berbahaya dan terlarang',
        'Penumpang wajib menggunakan sabuk pengaman jika tersedia',
        'Prioritas tempat duduk untuk ibu hamil, lansia, dan penyandang disabilitas',
        'Dilarang mengganggu ketertiban dan kenyamanan penumpang lain'
      ]
    },
    {
      category: 'Pembayaran',
      icon: CreditCard,
      rules: [
        'Pembayaran dilakukan secara tunai kepada kondektur atau sopir',
        'Tarif sudah termasuk bagasi hingga batas wajar',
        'Tidak ada pengembalian uang untuk tiket yang sudah dibeli',
        'Anak di bawah 5 tahun gratis (tanpa tempat duduk terpisah)',
        'Mahasiswa dapat menunjukkan KTM untuk verifikasi identitas',
        'Simpan bukti pembayaran hingga tiba di tujuan'
      ]
    },
    {
      category: 'Shuttle Kampus',
      icon: UserCheck,
      rules: [
        'Hanya untuk mahasiswa, dosen, dan staff UNSRI',
        'Wajib menunjukkan KTM (mahasiswa) atau ID Card (dosen/staff)',
        'Gratis untuk semua sivitas akademika UNSRI',
        'Dilarang membawa tamu/keluarga yang bukan sivitas UNSRI',
        'Hanya melayani rute dalam area kampus Indralaya',
        'TIDAK melayani rute ke Bukit Indralaya'
      ]
    },
    {
      category: 'Keselamatan',
      icon: Shield,
      rules: [
        'Selalu gunakan sabuk pengaman jika tersedia',
        'Jangan berdiri saat bus sedang berjalan',
        'Pegang pegangan saat bus berbelok atau berhenti mendadak',
        'Keluar masuk bus hanya saat bus berhenti sempurna',
        'Laporkan kondisi tidak aman kepada petugas',
        'Ikuti instruksi sopir dan kondektur'
      ]
    }
  ];

  const penalties = [
    {
      violation: 'Merokok di dalam bus',
      penalty: 'Teguran + turun di pemberhentian terdekat',
      severity: 'Sedang'
    },
    {
      violation: 'Membawa barang berbahaya',
      penalty: 'Barang disita + lapor pihak berwajib',
      severity: 'Berat'
    },
    {
      violation: 'Mengganggu penumpang lain',
      penalty: 'Teguran + turun di pemberhentian terdekat',
      severity: 'Sedang'
    },
    {
      violation: 'Tidak membayar tiket',
      penalty: 'Bayar tarif 2x lipat + turun',
      severity: 'Sedang'
    },
    {
      violation: 'Merusak fasilitas bus',
      penalty: 'Ganti rugi + sanksi akademik',
      severity: 'Berat'
    }
  ];

  const emergencyContacts = [
    {
      title: 'Security Kampus UNSRI',
      phone: '(0711) 580056',
      available: '24 jam'
    },
    {
      title: 'Transportasi Kampus',
      phone: '(0711) 580077',
      available: 'Senin-Jumat 07:00-17:00'
    },
    {
      title: 'Polsek Indralaya',
      phone: '(0711) 580112',
      available: '24 jam'
    },
    {
      title: 'Ambulans Kampus',
      phone: '(0711) 580911',
      available: '24 jam'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E88E5] to-[#FDB913] text-white p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <Navigation className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Regulasi Transportasi</h1>
        </div>
        
        <p className="text-sm opacity-90">
          Aturan dan kebijakan penggunaan transportasi kampus UNSRI
        </p>
      </div>

      <div className="p-4">
        <Tabs defaultValue="bus-types" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bus-types">Jenis Bus</TabsTrigger>
            <TabsTrigger value="rules">Aturan</TabsTrigger>
            <TabsTrigger value="contact">Kontak</TabsTrigger>
          </TabsList>

          <TabsContent value="bus-types" className="mt-4 space-y-4">
            {/* Bus Types */}
            <div className="space-y-4">
              {busTypes.map((bus, index) => (
                <Card key={index} className={`border-l-4 ${bus.color}`}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center">
                        <Bus className="w-5 h-5 mr-2" />
                        {bus.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-lg font-bold">
                        {bus.price}
                      </Badge>
                    </div>
                    <CardDescription>
                      Kapasitas: {bus.capacity}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-medium">Fitur & Fasilitas:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {bus.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Important Notes */}
            <Alert className="border-amber-300 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription>
                <div className="text-amber-800 space-y-1">
                  <p><strong>Catatan Penting:</strong></p>
                  <p>• Shuttle Bus GRATIS hanya untuk sivitas akademika UNSRI</p>
                  <p>• Wajib tunjukkan KTM/ID Card saat naik Shuttle</p>
                  <p>• Shuttle hanya berkeliling area kampus, TIDAK ke Bukit Indralaya</p>
                  <p>• Tarif bus dapat berubah sewaktu-waktu</p>
                </div>
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="rules" className="mt-4 space-y-4">
            {/* Regulations by Category */}
            <div className="space-y-4">
              {regulations.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <IconComponent className="w-5 h-5 mr-2 text-[#1E88E5]" />
                        Aturan {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {category.rules.map((rule, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-[#FDB913] rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{rule}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Penalties */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Sanksi Pelanggaran
                </CardTitle>
                <CardDescription>
                  Konsekuensi dari pelanggaran aturan transportasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {penalties.map((penalty, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{penalty.violation}</h4>
                        <Badge variant={penalty.severity === 'Berat' ? 'destructive' : 'secondary'}>
                          {penalty.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{penalty.penalty}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Legal Notice */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <div className="text-sm space-y-1">
                  <p><strong>Perhatian:</strong></p>
                  <p>Semua aturan di atas berlaku sesuai dengan Peraturan Rektor UNSRI tentang Transportasi Kampus. Pelanggaran dapat dikenakan sanksi akademik bagi mahasiswa dan sanksi kepegawaian bagi dosen/staff.</p>
                </div>
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="contact" className="mt-4 space-y-4">
            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Kontak Darurat
                </CardTitle>
                <CardDescription>
                  Hubungi nomor berikut dalam situasi darurat
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{contact.title}</h4>
                      <p className="text-sm text-gray-500">{contact.available}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#1E88E5]">{contact.phone}</p>
                      <Button size="sm" className="mt-1 h-6 px-2 text-xs">
                        Hubungi
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Regular Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="w-5 h-5 mr-2 text-[#1E88E5]" />
                  Informasi & Keluhan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-gray-900">Layanan Informasi Transportasi</h4>
                  <p className="text-sm text-gray-600 mb-2">Senin - Jumat: 08:00 - 16:00 WIB</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      📞 (0711) 580077
                    </Button>
                    <Button size="sm" variant="outline">
                      📧 transport@unsri.ac.id
                    </Button>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-gray-900">Pengaduan & Saran</h4>
                  <p className="text-sm text-gray-600 mb-2">Layanan pengaduan online 24 jam</p>
                  <Button size="sm" className="bg-[#FDB913] hover:bg-[#e6a512] text-gray-900">
                    🌐 Buka Portal Pengaduan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Location Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  Lokasi Terminal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900">Terminal Utama Kampus</h4>
                    <p className="text-sm text-blue-700">Jl. Srijaya Negara, Bukit Lama, Ilir Barat I</p>
                    <p className="text-sm text-blue-700">Palembang, Sumatera Selatan</p>
                  </div>
                  
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <MapPin className="w-4 h-4 mr-2" />
                    Buka di Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Feedback */}
            <Card className="border-l-4 border-l-[#FDB913]">
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <h4 className="font-medium text-gray-900">Punya Saran untuk Aplikasi?</h4>
                  <p className="text-sm text-gray-600">
                    Bantu kami meningkatkan layanan Bus Tracker UNSRI
                  </p>
                  <Button className="bg-[#FDB913] hover:bg-[#e6a512] text-gray-900">
                    💬 Kirim Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}