import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { 
  Bell, 
  BellRing, 
  Clock, 
  AlertTriangle, 
  Info,
  Check,
  Trash2,
  Settings,
  Navigation
} from 'lucide-react';

interface NotificationsProps {
  onBack: () => void;
}

export function Notifications({ onBack }: NotificationsProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'rush_hour',
      title: 'Peringatan Jam Sibuk',
      message: 'Jam sibuk sore (16:00-18:00) akan dimulai dalam 30 menit. Persiapkan diri Anda.',
      time: '2 menit yang lalu',
      read: false,
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      id: 2,
      type: 'bus_arrival',
      title: 'Bus DAMRI-01 Tiba',
      message: 'Bus DAMRI-01 akan tiba di Fakultas Teknik dalam 5 menit. 12 kursi tersedia.',
      time: '5 menit yang lalu',
      read: false,
      icon: BellRing,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'schedule_change',
      title: 'Perubahan Jadwal',
      message: 'Jadwal bus shuttle jam 14:00 ditunda menjadi 14:15 karena maintenance ringan.',
      time: '1 jam yang lalu',
      read: true,
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      id: 4,
      type: 'announcement',
      title: 'Pengumuman Penting',
      message: 'Layanan bus akan dihentikan sementara pada 17 Agustus 2024 dalam rangka Hari Kemerdekaan.',
      time: '3 jam yang lalu',
      read: true,
      icon: Info,
      color: 'text-green-600'
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Reminder: Bus Anda',
      message: 'Jangan lupa! Bus Kaleng-03 ke Palembang akan berangkat dari Terminal dalam 15 menit.',
      time: '1 hari yang lalu',
      read: true,
      icon: Bell,
      color: 'text-purple-600'
    }
  ]);

  const [settings, setSettings] = useState({
    rushHour: true,
    busArrival: true,
    scheduleChanges: true,
    announcements: true,
    reminders: true,
    sound: true,
    vibration: true,
    pushNotifications: true
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1E88E5] to-[#FF8C00] text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <Navigation className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Notifikasi</h1>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">
              {unreadCount} baru
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">Semua Notifikasi</TabsTrigger>
            <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-4">
            {/* Actions */}
            {notifications.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {unreadCount > 0 && (
                        <Button size="sm" variant="outline" onClick={markAllAsRead}>
                          <Check className="w-4 h-4 mr-1" />
                          Tandai Semua Dibaca
                        </Button>
                      )}
                    </div>
                    <Button size="sm" variant="destructive" onClick={clearAll}>
                      <Trash2 className="w-4 h-4 mr-1" />
                      Hapus Semua
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications List */}
            <div className="space-y-3">
              {notifications.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500 mb-2">Tidak ada notifikasi</p>
                    <p className="text-sm text-gray-400">
                      Notifikasi terbaru akan muncul di sini
                    </p>
                  </CardContent>
                </Card>
              ) : (
                notifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <Card 
                      key={notification.id}
                      className={`${!notification.read ? 'ring-1 ring-blue-200 bg-blue-50/30' : ''}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full bg-gray-100 ${notification.color}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          
                          <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between">
                              <h4 className={`font-medium ${!notification.read ? 'text-blue-900' : 'text-gray-900'}`}>
                                {notification.title}
                              </h4>
                              <div className="flex items-center space-x-1">
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-6 w-6 p-0"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between pt-2">
                              <span className="text-xs text-gray-500">
                                {notification.time}
                              </span>
                              {!notification.read && (
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="text-xs text-blue-600 hover:text-blue-800 h-auto p-1"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  Tandai dibaca
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Pengaturan Notifikasi
                </CardTitle>
                <CardDescription>
                  Atur jenis notifikasi yang ingin Anda terima
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Notification Types */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Jenis Notifikasi</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="rush-hour">Peringatan Jam Sibuk</Label>
                        <p className="text-xs text-gray-500">Peringatan 30 menit sebelum jam sibuk</p>
                      </div>
                      <Switch
                        id="rush-hour"
                        checked={settings.rushHour}
                        onCheckedChange={(checked) => setSettings({...settings, rushHour: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="bus-arrival">Kedatangan Bus</Label>
                        <p className="text-xs text-gray-500">Notifikasi saat bus hampir tiba</p>
                      </div>
                      <Switch
                        id="bus-arrival"
                        checked={settings.busArrival}
                        onCheckedChange={(checked) => setSettings({...settings, busArrival: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="schedule-changes">Perubahan Jadwal</Label>
                        <p className="text-xs text-gray-500">Update tentang perubahan jadwal bus</p>
                      </div>
                      <Switch
                        id="schedule-changes"
                        checked={settings.scheduleChanges}
                        onCheckedChange={(checked) => setSettings({...settings, scheduleChanges: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="announcements">Pengumuman Penting</Label>
                        <p className="text-xs text-gray-500">Pengumuman resmi dari kampus</p>
                      </div>
                      <Switch
                        id="announcements"
                        checked={settings.announcements}
                        onCheckedChange={(checked) => setSettings({...settings, announcements: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="reminders">Pengingat Personal</Label>
                        <p className="text-xs text-gray-500">Reminder yang Anda set sendiri</p>
                      </div>
                      <Switch
                        id="reminders"
                        checked={settings.reminders}
                        onCheckedChange={(checked) => setSettings({...settings, reminders: checked})}
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Methods */}
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium text-gray-900">Metode Notifikasi</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="push">Push Notification</Label>
                        <p className="text-xs text-gray-500">Notifikasi popup di layar</p>
                      </div>
                      <Switch
                        id="push"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="sound">Suara</Label>
                        <p className="text-xs text-gray-500">Bunyi notifikasi</p>
                      </div>
                      <Switch
                        id="sound"
                        checked={settings.sound}
                        onCheckedChange={(checked) => setSettings({...settings, sound: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="vibration">Getaran</Label>
                        <p className="text-xs text-gray-500">Getaran pada perangkat mobile</p>
                      </div>
                      <Switch
                        id="vibration"
                        checked={settings.vibration}
                        onCheckedChange={(checked) => setSettings({...settings, vibration: checked})}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full bg-[#FDB913] hover:bg-[#e6a512] text-gray-900">
                    Simpan Pengaturan
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