import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SplashScreen } from '../components/common/SplashScreen';
import { useAuth } from '../auth/useAuth';

export const CustomerSplashView: React.FC = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const handleFinish = () => {
    sessionStorage.setItem('smartserve_splash_done', 'true');
    if (token || user) {
      navigate('/home', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('smartserve_splash_done')) {
      handleFinish();
    }
  }, [token, user]);

  return <SplashScreen onFinish={handleFinish} durationMs={1500} />;
};

export default CustomerSplashView;

