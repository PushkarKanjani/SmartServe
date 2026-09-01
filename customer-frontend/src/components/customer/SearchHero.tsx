import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';

export interface SearchHeroProps {
  customerName?: string;
}

export const SearchHero: FC<SearchHeroProps> = ({ customerName = 'Friend' }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const firstName = customerName.split(' ')[0] || 'Friend';

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A1128] via-[#0F1D40] to-[#0B132B] p-6 sm:p-8 lg:p-10 text-white shadow-xl">
      {/* Decorative Orbs */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#2563EB]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 max-w-2xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md border border-white/15">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>Professional Home Services</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
          Hi {firstName} 👋
        </h1>
        <p className="text-base text-slate-300">
          What service do you need today? Select from 14+ categories of verified experts.
        </p>

        {/* Large Rounded Search Input */}
        <form onSubmit={handleSearch} className="pt-2">
          <div className="relative flex items-center shadow-lg">
            <Search className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for AC repair, deep cleaning, salon at home..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/20 bg-white/95 py-4 pl-12 pr-28 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-base transition"
            />
            <button
              type="submit"
              className="absolute right-2.5 rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1D4ED8] transition shadow-md active:scale-95"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
