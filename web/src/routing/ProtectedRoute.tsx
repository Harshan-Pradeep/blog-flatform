import { Navigate } from 'react-router-dom';
import HomeLayout from '../layouts/HomeLayout';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" />;
  }

  return <HomeLayout>{children}</HomeLayout>;
};

export default ProtectedRoute;