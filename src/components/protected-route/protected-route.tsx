import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  forNotAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  forNotAuth: forNotAuth
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector((state) => state.user).isAuthenticated;
  const location = useLocation();

  if (!forNotAuth && !isAuthenticated) {
    return <Navigate replace to='/login' />;
  }

  if (forNotAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
