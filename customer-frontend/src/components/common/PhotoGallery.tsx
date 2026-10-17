import React, { useState } from 'react';
import { Camera, Eye, X } from 'lucide-react';

interface PhotoGalleryProps {
  title: string;
  badge?: string;
  photos: string[];
  emptyMessage?: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  title,
  badge,
  photos,
  emptyMessage,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!photos || photos.length === 0) {
    if (!emptyMessage) return null;
    return (
      <div className="bg-[#FAF7F0] border border-[#E5DEC9] rounded-2xl p-4 text-center">
        <Camera className="w-6 h-6 text-[#1F2A1E]/30 mx-auto mb-2" />
        <p className="text-xs text-[#1F2A1E]/50">{emptyMessage}</p>
      </div>
    );
  }

  // Helper to ensure full URL if relative
  const resolvePhotoUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    return `${apiBase.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`;
  };

  return (
    <div className="bg-[#FAF7F0] border border-[#E5DEC9] rounded-2xl p-5 shadow-2xs">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#2F5233]" />
          <h4 className="text-xs font-bold text-[#1F2A1E] uppercase tracking-wider">{title}</h4>
        </div>
        {badge && (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#2F5233]/10 text-[#2F5233]">
            {badge}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {photos.map((photo, idx) => {
          const fullUrl = resolvePhotoUrl(photo);
          return (
            <div
              key={idx}
              onClick={() => setSelectedPhoto(fullUrl)}
              className="group relative aspect-video bg-[#F2EDE1] rounded-xl overflow-hidden border border-[#E5DEC9] cursor-pointer shadow-2xs hover:shadow-xs transition-all"
            >
              <img
                src={fullUrl}
                alt={`${title} #${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback dummy image if offline
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-1.5 rounded-lg bg-white/90 text-[#1F2A1E]">
                  <Eye className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="relative max-w-3xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-2 flex items-center justify-center">
              <img
                src={selectedPhoto}
                alt="Enlarged proof"
                className="max-h-[80vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
