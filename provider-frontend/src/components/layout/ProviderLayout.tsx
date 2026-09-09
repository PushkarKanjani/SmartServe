import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  User as UserIcon,
  LifeBuoy,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiClient } from '../../api/client';

export const ProviderLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await apiClient.get('/providers/me');
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to load profile in layout', err);
      }
    };
    if (user) {
      loadProfile();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Services', path: '/services', icon: Briefcase },
    { name: 'Availability', path: '/availability', icon: Calendar },
    { name: 'Profile & Trust', path: '/profile', icon: UserIcon },
    { name: 'Support', path: '/support', icon: LifeBuoy },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#1F2A1E]/20 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 h-screen w-64 bg-white border-r border-[#2F5233]/10 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-[#2F5233]/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#2F5233] text-white flex items-center justify-center font-bold text-base shadow-sm">
              S
            </div>
            <div>
              <span className="font-serif-display text-lg font-bold text-[#1F2A1E]">SmartServe</span>
              <span className="block text-[9px] text-[#7A9E6E] font-semibold uppercase tracking-wider mt-0.5">
                Partner Workspace
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          <div className="text-[10px] font-bold text-[#1F2A1E]/40 uppercase tracking-wider mb-4 px-2">
            Menu
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#2F5233] text-white shadow-md shadow-[#2F5233]/20'
                    : 'text-[#1F2A1E]/70 hover:bg-[#FAF7F0] hover:text-[#2F5233]'
                }`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Bottom User Area */}
        <div className="p-4 border-t border-[#2F5233]/10 shrink-0">
          <div className="flex items-center gap-3 mb-4 px-2">
            <img
              src={profile?.photo_url || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=100'}
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#2F5233]/20"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#1F2A1E] truncate">{profile?.full_name || user?.email}</p>
              <p className="text-[10px] text-[#1F2A1E]/60 truncate">{profile?.category || 'Service Partner'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white h-16 border-b border-[#2F5233]/10 flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#2F5233] text-white flex items-center justify-center font-bold text-base">
              S
            </div>
            <span className="font-serif-display text-lg font-bold text-[#1F2A1E]">SmartServe</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -mr-2 text-[#1F2A1E]/70 hover:text-[#2F5233]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
