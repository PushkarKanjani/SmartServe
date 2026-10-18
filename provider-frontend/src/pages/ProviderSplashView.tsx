import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SplashScreen } from '../components/common/SplashScreen';
import { useAuth } from '../context/AuthContext';

export const ProviderSplashView: React.FC = () => {
  const navigate = useNavigate();
  const { token, isVerified } = useAuth();

  const handleFinish = () => {
    sessionStorage.setItem('smartserve_splash_done', 'true');
    if (token) {
      if (isVerified === false) {
        navigate('/application-status', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } else {
      navigate('/login', { replace: true });
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('smartserve_splash_done')) {
      handleFinish();
    }
  }, [token, isVerified]);

  return <SplashScreen onFinish={handleFinish} durationMs={1500} />;
};

export default ProviderSplashView;

