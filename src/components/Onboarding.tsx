import { useState } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, MapPin, Clock, Bell, User, SkipForward } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import campusUnsri from 'figma:asset/6a1b01cfccb71b9d3e496fff35b09197e0eb12db.png';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: MapPin,
    title: "Selamat Datang di Bus Tracker UNSRI",
    description: "Aplikasi untuk memantau lokasi bus kampus secara real-time dan mendapatkan informasi jadwal keberangkatan.",
    image: campusUnsri
  },
  {
    icon: Clock,
    title: "Lacak Bus Real-Time",
    description: "Pantau lokasi bus secara langsung untuk merencanakan perjalanan Anda dengan lebih baik.",
    image: "https://images.unsplash.com/photo-1732115234692-3ee71d5363af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwSW5kb25lc2lhfGVufDF8fHx8MTc1OTI0OTMxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: Clock,
    title: "Cek Jadwal & Rute",
    description: "Akses jadwal lengkap bus DAMRI, Bus Kaleng, dan Shuttle gratis dengan informasi tarif dan estimasi waktu perjalanan.",
    image: null
  },
  {
    icon: Bell,
    title: "Notifikasi & Pengingat",
    description: "Dapatkan pemberitahuan tentang jadwal bus, peringatan jam sibuk, dan update penting lainnya.",
    image: null
  },
  {
    icon: User,
    title: "Mulai Perjalanan Anda",
    description: "Daftar atau masuk dengan akun UNSRI Anda untuk mendapatkan pengalaman yang lebih personal dan akses ke semua fitur.",
    image: null
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <Button variant="ghost" size="sm" onClick={skip} className="text-gray-500">
          <SkipForward className="w-4 h-4 mr-1" />
          Lewati
        </Button>
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentSlide ? 'bg-[#FDB913]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <div className="w-16"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {slide.image ? (
          <div className="w-64 h-40 mb-8 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={slide.image}
              alt="Onboarding illustration"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-24 h-24 bg-gradient-to-br from-[#FDB913] to-[#FF8C00] rounded-full flex items-center justify-center mb-8">
            <IconComponent className="w-12 h-12 text-white" />
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {slide.title}
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-sm">
          {slide.description}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center p-6">
        <Button
          variant="ghost"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={currentSlide === 0 ? 'invisible' : ''}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Kembali
        </Button>
        
        <Button
          onClick={nextSlide}
          className="bg-[#FDB913] hover:bg-[#e6a512] text-gray-900"
        >
          {currentSlide === slides.length - 1 ? 'Mulai' : 'Lanjut'}
          {currentSlide !== slides.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
}