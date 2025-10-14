import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { ScheduleSearch } from './components/ScheduleSearch';
import { BusTracker } from './components/BusTracker';
import { Notifications } from './components/Notifications';
import { Profile } from './components/Profile';
import { Regulations } from './components/Regulations';
import { BottomNavigation } from './components/BottomNavigation';

type AppState = 
  | 'splash' 
  | 'onboarding' 
  | 'login' 
  | 'register' 
  | 'dashboard' 
  | 'schedule' 
  | 'track' 
  | 'notifications' 
  | 'profile'
  | 'regulations';

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('splash');
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (hasSeenOnboarding) {
      setShowOnboarding(false);
    }

    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Check dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      const isDark = JSON.parse(savedDarkMode);
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Handle dark mode toggle
  const toggleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);
    localStorage.setItem('darkMode', JSON.stringify(enabled));
    if (enabled) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Handle user profile update
  const handleUpdateUser = (updatedUser: {name: string, email: string}) => {
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const handleSplashComplete = () => {
    if (user) {
      setCurrentState('dashboard');
    } else if (showOnboarding) {
      setCurrentState('onboarding');
    } else {
      setCurrentState('login');
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
    setCurrentState('login');
  };

  const handleLogin = () => {
    // Mock user data - in real app this would come from authentication
    const mockUser = {
      name: 'Valentino Harley Kent',
      email: 'valentino.harley@student.unsri.ac.id'
    };
    setUser(mockUser);
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    setCurrentState('dashboard');
  };

  const handleRegister = () => {
    // Mock registration - in real app this would create account
    const mockUser = {
      name: 'Valentino Harley Kent',
      email: 'valentino.harley@student.unsri.ac.id'
    };
    setUser(mockUser);
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    setCurrentState('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setCurrentState('login');
  };

  const handleNavigate = (page: string) => {
    // Map navigation to states
    const pageMap: Record<string, AppState> = {
      'home': 'dashboard',
      'schedule': 'schedule',
      'track': 'track',
      'notifications': 'notifications',
      'profile': 'profile',
      'regulations': 'regulations'
    };
    
    const targetState = pageMap[page] || 'dashboard';
    setCurrentState(targetState);
  };

  const handleBack = () => {
    setCurrentState('dashboard');
  };

  // Helper to get current page for bottom navigation
  const getCurrentPage = () => {
    const stateToPage: Record<AppState, string> = {
      'splash': 'home',
      'onboarding': 'home',
      'login': 'home',
      'register': 'home',
      'dashboard': 'home',
      'schedule': 'schedule',
      'track': 'home',
      'notifications': 'notifications',
      'profile': 'profile',
      'regulations': 'home'
    };
    
    return stateToPage[currentState] || 'home';
  };

  const shouldShowBottomNav = () => {
    return user && ['dashboard', 'schedule', 'notifications', 'profile'].includes(currentState);
  };

  // Render current screen
  const renderCurrentScreen = () => {
    switch (currentState) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      
      case 'login':
        return (
          <Login 
            onLogin={handleLogin} 
            onRegister={() => setCurrentState('register')}
            onSkipLogin={() => setCurrentState('track')}
          />
        );
      
      case 'register':
        return (
          <Register 
            onRegister={handleRegister} 
            onBack={() => setCurrentState('login')} 
          />
        );
      
      case 'dashboard':
        return (
          <Dashboard 
            userName={user?.name || 'Pengguna'} 
            onNavigate={handleNavigate} 
          />
        );
      
      case 'schedule':
        return <ScheduleSearch onBack={handleBack} />;
      
      case 'track':
        return <BusTracker onBack={handleBack} />;
      
      case 'notifications':
        return <Notifications onBack={handleBack} />;
      
      case 'profile':
        return (
          <Profile 
            userName={user?.name || 'Pengguna'} 
            userEmail={user?.email || 'user@unsri.ac.id'}
            onBack={handleBack}
            onLogout={handleLogout}
            onEditProfile={() => console.log('Edit profile')}
            onUpdateUser={handleUpdateUser}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />
        );
      
      case 'regulations':
        return <Regulations onBack={handleBack} />;
      
      default:
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {renderCurrentScreen()}
      
      {shouldShowBottomNav() && (
        <BottomNavigation 
          currentPage={getCurrentPage()}
          onNavigate={handleNavigate}
          hasNotifications={true} // Mock notification indicator
        />
      )}
    </div>
  );
}