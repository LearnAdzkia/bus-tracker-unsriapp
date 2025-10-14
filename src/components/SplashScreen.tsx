import { useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import damriBus from 'figma:asset/246dc25004b17bda780122639a66fb58b6ba37ba.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#1E88E5] via-[#2196F3] to-[#1976D2] flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center space-y-8">
        {/* App Name */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Bus Tracker UNSRI</h1>
          <p className="text-xl opacity-90">Track Your Bus, Plan Your Journey</p>
        </div>
        
        {/* DAMRI Bus Image */}
        <div className="w-64 h-32 rounded-xl overflow-hidden shadow-2xl">
          <ImageWithFallback
            src={damriBus}
            alt="Bus DAMRI"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Loading indicator */}
        <div className="flex space-x-2 mt-8">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
      
      {/* Version */}
      <div className="absolute bottom-8 text-sm opacity-75">
        Version 1.0.0
      </div>
    </div>
  );
}