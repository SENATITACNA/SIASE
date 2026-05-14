import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Required role to access this route: 'vigilante' | 'alumno' */
  requiredRole: 'vigilante' | 'alumno';
}

const ROLE_REDIRECTS: Record<string, string> = {
  vigilante: '/dashboard-vigilante',
  alumno: '/dashboard-alumno',
};

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const userStr = localStorage.getItem('user');

  // Not logged in → go to login
  if (!userStr) {
    return <Navigate to="/login" replace />;
  }

  let role: string | undefined;
  try {
    const parsed = JSON.parse(userStr);
    // The login service stores role on the response root, but we also need to
    // persist it into the user object. We store it under "role" key.
    role = parsed.role;
  } catch {
    localStorage.removeItem('user');
    return <Navigate to="/login" replace />;
  }

  // Role doesn't match → redirect to their correct dashboard
  if (role !== requiredRole) {
    const correctPath = role ? ROLE_REDIRECTS[role] : '/login';
    return <Navigate to={correctPath ?? '/login'} replace />;
  }

  return <>{children}</>;
}
