import { FC, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { SplashScreen } from './components/common/SplashScreen';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './auth/AuthContext';
import { ToastProvider } from './components/ui/Toast';

export const App: FC = () => {
  // platform:web
  const [splashDone, setSplashDone] = useState<boolean>(() => {
    return sessionStorage.getItem('smartserve_splash_seen') === 'true';
  });

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <AppRoutes />
            {!splashDone && (
              <SplashScreen durationMs={5400} onFinish={() => setSplashDone(true)} />
            )}
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
