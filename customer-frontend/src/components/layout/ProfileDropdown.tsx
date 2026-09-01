import { FC, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { useToast } from '../../hooks/useToast';
import { User, LogOut, ShieldCheck, ChevronDown } from 'lucide-react';

export const ProfileDropdown: FC = () => {
  const navigate = useNavigate();
  const { customer, logout } = useAuth();
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsOpen(false);
    try {
      await logout();
      showToast('Signed out successfully', 'info');
      navigate('/login', { replace: true });
    } catch {
      showToast('Failed to sign out', 'error');
    }
  };

  const name = customer?.full_name || 'Customer User';
  const email = customer?.email || 'customer@smartserve.in';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 rounded-full p-1 hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
        aria-label="User menu"
      >
        <Avatar name={name} size="sm" />
        <span className="hidden sm:block text-sm font-semibold text-slate-800 max-w-[120px] truncate">
          {name}
        </span>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-fade-in z-50">
          {/* Header */}
          <div className="px-3 py-3 border-b border-slate-100">
            <p className="text-sm font-bold text-slate-900 truncate">{name}</p>
            <p className="text-xs text-slate-500 truncate mt-0.5">{email}</p>
            <div className="mt-2">
              <Badge variant="info" size="sm" icon={<ShieldCheck className="h-3 w-3" />}>
                Customer Account
              </Badge>
            </div>
          </div>

          {/* Links */}
          <div className="py-1">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
            >
              <User className="h-4 w-4 text-slate-400" />
              Account Settings
            </Link>

            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition text-left"
            >
              <LogOut className="h-4 w-4 text-rose-500" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
