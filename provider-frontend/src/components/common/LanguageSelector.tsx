import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'EN', fullName: 'English' },
  { code: 'hi', label: 'हि', fullName: 'हिन्दी' },
  { code: 'gu', label: 'ગુ', fullName: 'ગુજરાતી' },
];

interface Props {
  className?: string;
  compact?: boolean;
}

export const LanguageSelector: React.FC<Props> = ({ className = '', compact = false }) => {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || 'en').slice(0, 2);

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    try {
      localStorage.setItem('smartserve_language', code);
    } catch {}
  };

  return (
    <div
      className={`inline-flex items-center gap-1 bg-white border border-[#E5DEC9] rounded-xl p-1 shadow-2xs ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <Globe className="w-3.5 h-3.5 text-[#1F2A1E]/50 ml-1.5 hidden sm:inline" />
      <div className="flex items-center gap-0.5">
        {LANGUAGES.map((lang) => {
          const isActive = currentLang === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              title={lang.fullName}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#2F5233] text-white shadow-xs'
                  : 'text-[#1F2A1E]/70 hover:bg-[#F2EDE1] hover:text-[#1F2A1E]'
              }`}
            >
              {compact ? lang.label : lang.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
