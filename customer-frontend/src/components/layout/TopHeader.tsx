import { FC, FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ProfileDropdown } from './ProfileDropdown';
import { Menu, Search, Bell } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export interface TopHeaderProps {
  onToggleMobileSidebar: () => void;
}

export const TopHeader: FC<TopHeaderProps> = ({ onToggleMobileSidebar }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  const handleNotificationClick = () => {
    showToast('No new notifications', 'info');
  };

  return (
    <header className="sticky top-0 z-40 flex h-[72px] w-full items-center justify-between border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8">
      {/* Left section: Hamburger + Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden transition"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <Link to="/home" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-xs group-hover:bg-[#1D4ED8] transition">
            <svg className="h-6 w-6" viewBox="0 0 100 100" fill="none">
              <path
                d="M68 32C68 25.3726 62.6274 20 56 20H38C30.268 20 24 26.268 24 34C24 41.732 30.268 48 38 48H62C69.732 48 76 54.268 76 62C76 69.732 69.732 76 62 76H44C37.3726 76 32 70.6274 32 64"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-extrabold tracking-tight text-slate-900">SmartServe</span>
          </div>
        </Link>
      </div>

      {/* Middle section: Compact Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search for AC repair, cleaning, salon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition"
          />
        </div>
      </form>

      {/* Right section: Notifications + Profile */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleNotificationClick}
          className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#2563EB] ring-2 ring-white" />
        </button>

        <div className="h-6 w-px bg-slate-200" />

        <ProfileDropdown />
      </div>
    </header>
  );
};
