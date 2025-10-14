import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Home, Search, Bell, User, MapPin } from 'lucide-react';

interface BottomNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  hasNotifications?: boolean;
}

export function BottomNavigation({ currentPage, onNavigate, hasNotifications = false }: BottomNavigationProps) {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      badge: false
    },
    {
      id: 'track',
      label: 'Track',
      icon: MapPin,
      badge: false
    },
    {
      id: 'schedule',
      label: 'Jadwal',
      icon: Search,
      badge: false
    },
    {
      id: 'notifications',
      label: 'Notifikasi',
      icon: Bell,
      badge: hasNotifications
    },
    {
      id: 'profile',
      label: 'Profil',
      icon: User,
      badge: false
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-2 sm:px-4 py-2 z-50 dark:bg-[#1A2332] dark:border-[#34495E]">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-1 sm:px-2 relative min-w-0 ${
                isActive 
                  ? 'text-[#1E88E5] bg-[#1E88E5]/10 dark:text-[#3B82F6] dark:bg-[#3B82F6]/20' 
                  : 'text-gray-600 hover:text-[#1E88E5] hover:bg-[#1E88E5]/5 dark:text-gray-400 dark:hover:text-[#3B82F6] dark:hover:bg-[#3B82F6]/10'
              }`}
            >
              <div className="relative">
                <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-[#1E88E5] dark:text-[#3B82F6]' : ''}`} />
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 w-2 h-2 p-0 bg-red-500 border-white dark:border-gray-800">
                    <span className="sr-only">New notifications</span>
                  </Badge>
                )}
              </div>
              <span className={`text-xs truncate max-w-full ${isActive ? 'text-[#FDB913] dark:text-[#F59E0B]' : ''}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}