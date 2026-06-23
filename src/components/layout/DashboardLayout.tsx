import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Zap, ChevronLeft, ChevronRight, Bell, Search,
  Sun, Moon, LogOut, Settings, User as UserIcon, Menu, X
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { getDashboardRoute } from '@/lib/auth';
import { getInitials } from '@/lib/utils';
import { APP_NAME } from '@/constants';
import { toast } from '@/components/ui/Toast';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
  title: string;
  roleLabel: string;
}

export default function DashboardLayout({ children, sidebarItems, title, roleLabel }: DashboardLayoutProps) {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQueryState] = useState(() => {
    return new URLSearchParams(window.location.search).get('q') || '';
  });
  const setSearchQuery = (val: string) => {
    setSearchQueryState(val);
    const params = new URLSearchParams(window.location.search);
    if (val) {
      params.set('q', val);
    } else {
      params.delete('q');
    }
    const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState(null, '', newUrl);
    window.dispatchEvent(new Event('creator_search_changed'));
  };

  useEffect(() => {
    const handleUrlChange = () => {
      const q = new URLSearchParams(window.location.search).get('q') || '';
      setSearchQueryState(q);
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('creator_search_changed', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('creator_search_changed', handleUrlChange);
    };
  }, []);

  const isCreatorPath = location.pathname.includes('/creator');
  const [notifications, setNotifications] = useState(isCreatorPath ? 4 : 3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsList, setNotificationsList] = useState(() => {
    const pathIsCreator = window.location.pathname.includes('/creator');
    return pathIsCreator ? [
      { id: 1, title: 'AI Video Render Complete', message: 'Your video "Summer Promo 2026" has finished generating.', time: '10m ago', read: false },
      { id: 2, title: 'Trending Alert', message: 'Your YouTube Thumbnail template is trending under #creator-hub.', time: '2h ago', read: false },
      { id: 3, title: 'New System Notification', message: 'System updates scheduled for Sunday at 02:00 AM UTC.', time: '4h ago', read: false },
      { id: 4, title: 'Social Integration Connected', message: 'Instagram and Twitter accounts synced successfully.', time: '1d ago', read: false }
    ] : [
      { id: 1, title: 'New System Submission', message: 'Modern Business Card Set has been submitted for review.', time: '2h ago', read: false },
      { id: 2, title: 'Security Alert', message: 'New login detected from dynamic IP address.', time: '5h ago', read: false },
      { id: 3, title: 'Billing Generated', message: 'Monthly platform transaction invoice generated.', time: '1d ago', read: false }
    ];
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-2 p-4 border-b border-border ${collapsed ? 'justify-center' : ''}`}>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          {!collapsed && <span className="font-display font-bold text-lg gradient-primary-text">{APP_NAME}</span>}
        </Link>
      </div>

      {/* User info */}
      {!collapsed && user && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
            ) : (
              <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {getInitials(user.name)}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
              <span className="text-xs text-muted-foreground">{roleLabel}</span>
            </div>
          </div>
        </div>
      )}
      {collapsed && user && (
        <div className="p-4 border-b border-border flex justify-center">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
              {getInitials(user.name)}
            </div>
          )}
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <Link
          to={user ? getDashboardRoute(user.role) : '/'}
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
            location.pathname === (user ? getDashboardRoute(user.role) : '/')
              ? 'bg-primary/10 text-primary font-medium'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          } ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Dashboard' : undefined}
        >
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">Dashboard</span>}
        </Link>

        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative ${
              location.pathname === item.href
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            } ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="text-sm flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">{item.badge}</span>
                )}
              </>
            )}
            {collapsed && item.badge && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-border space-y-1">
        <Link
          to="/settings"
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">Settings</span>}
        </Link>
        <Link
          to="/profile"
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Profile' : undefined}
        >
          <UserIcon className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">Profile</span>}
        </Link>
        <button
          onClick={() => {
            setMobileOpen(false);
            handleLogout();
          }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="text-sm">Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col border-r border-border bg-card transition-all duration-300 relative flex-shrink-0 ${
        collapsed ? 'w-16' : 'w-64'
      }`}>
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all duration-200 shadow-sm z-10"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-50 overflow-y-auto">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card px-4 flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base lg:text-lg font-display font-semibold text-foreground truncate">{title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-muted rounded-xl px-3 py-1.5 max-w-xs">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none w-32 lg:w-48"
              />
            </div>

            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-white text-2xs rounded-full flex items-center justify-center font-bold text-[9px]">
                    {notifications}
                  </span>
                )}
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-200">
                    <div className="p-4 border-b border-border flex items-center justify-between bg-primary/5">
                      <span className="text-sm font-bold text-foreground">Notifications</span>
                      {notifications > 0 && (
                        <button 
                          onClick={() => {
                            setNotifications(0);
                            setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
                            toast('success', 'All notifications marked as read');
                          }}
                          className="text-2xs text-primary font-semibold hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-border/40">
                      {notificationsList.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground text-xs">
                          No notifications found.
                        </div>
                      ) : (
                        notificationsList.map(n => (
                          <div 
                            key={n.id} 
                            onClick={() => {
                              if (!n.read) {
                                setNotifications(prev => Math.max(0, prev - 1));
                                setNotificationsList(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item));
                              }
                            }}
                            className={`p-3.5 hover:bg-muted/30 cursor-pointer transition-colors ${n.read ? 'opacity-55' : 'bg-primary/5'}`}
                          >
                            <div className="flex justify-between items-start mb-0.5">
                              <p className="text-xs font-bold text-foreground truncate">{n.title}</p>
                              <span className="text-3xs text-muted-foreground text-[10px] whitespace-nowrap ml-2">{n.time}</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-normal">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="p-3 border-t border-border flex justify-between items-center bg-secondary/20">
                      <button 
                        onClick={() => {
                          setNotificationsList([]);
                          setNotifications(0);
                          setShowNotifications(false);
                          toast('success', 'Cleared all notifications');
                        }}
                        className="text-2xs text-destructive font-semibold hover:underline w-full text-center"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
