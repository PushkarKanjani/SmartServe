import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SplashScreen } from '../components/common/SplashScreen';
import { useAuth } from '../context/AuthContext';

export const ProviderSplashView: React.FC = () => {
  const navigate = useNavigate();
  const { token, isVerified } = useAuth();

  const handleFinish = () => {
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

  return <SplashScreen onFinish={handleFinish} durationMs={8000} />;
};

export default ProviderSplashView;
