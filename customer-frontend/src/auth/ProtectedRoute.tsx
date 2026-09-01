import { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';
import { Skeleton } from '../components/ui/Skeleton';

export interface ProtectedRouteProps {
  children?: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-8">
        <div className="w-full max-w-md space-y-4">
          <Skeleton variant="circular" width={64} height={64} className="mx-auto" />
          <Skeleton variant="text" width="60%" className="mx-auto" />
          <Skeleton variant="rectangular" height={120} />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
