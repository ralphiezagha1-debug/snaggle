import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../state/auth';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={`/signin?next=${location.pathname}`} replace />;
  }

  return children;
};
