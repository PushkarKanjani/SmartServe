import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { ArrowLeft, Share2, Heart } from 'lucide-react';

export interface ServiceHeroProps {
  imageUrl: string;
  title: string;
}

export const ServiceHero: FC<ServiceHeroProps> = ({ imageUrl, title }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isFav, setIsFav] = useState(false);

  const handleShare = () => {
    // platform:web
    if (navigator.share) {
      navigator.share({ title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Service link copied to clipboard!', 'success');
    }
  };

  const handleFavToggle = () => {
    setIsFav(!isFav);
    showToast(isFav ? 'Removed from favorites' : 'Saved to favorites', 'info');
  };

  return (
    <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-3xl bg-slate-900 shadow-md">
      <img src={imageUrl} alt={title} className="h-full w-full object-cover opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

      {/* Floating Action Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 backdrop-blur-md shadow-sm hover:bg-white transition active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 backdrop-blur-md shadow-sm hover:bg-white transition active:scale-95"
            aria-label="Share service"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <button
            onClick={handleFavToggle}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-800 backdrop-blur-md shadow-sm hover:bg-white transition active:scale-95"
            aria-label="Favorite service"
          >
            <Heart className={`h-5 w-5 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-slate-800'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
