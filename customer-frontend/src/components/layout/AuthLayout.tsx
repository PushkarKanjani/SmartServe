import { FC, ReactNode } from 'react';

export interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const brandName = import.meta.env.VITE_BRAND_NAME || 'SmartServe';
  const brandTagline = import.meta.env.VITE_BRAND_TAGLINE || 'Professional services, made simple.';

  return (
    <div className="flex min-h-screen min-h-[100dvh] flex-col justify-center bg-slate-900 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#2563EB]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        {/* Brand Mark (Splash target location) */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2563EB] shadow-lg shadow-[#2563EB]/30">
          <svg className="h-8 w-8 text-white" viewBox="0 0 100 100" fill="none">
            <path
              d="M68 32C68 25.3726 62.6274 20 56 20H38C30.268 20 24 26.268 24 34C24 41.732 30.268 48 38 48H62C69.732 48 76 54.268 76 62C76 69.732 69.732 76 62 76H44C37.3726 76 32 70.6274 32 64"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white">{brandName}</h2>
        <p className="mt-1 text-sm font-medium text-slate-400">{brandTagline}</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-fade-in">
        <div className="rounded-2xl bg-white/95 backdrop-blur-md px-6 py-8 shadow-xl sm:px-10 border border-white/20">
          {children}
        </div>
      </div>
    </div>
  );
};
