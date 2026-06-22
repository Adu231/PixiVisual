import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getDashboardRoute } from '@/lib/auth';

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  return <>{children}</>;
}
