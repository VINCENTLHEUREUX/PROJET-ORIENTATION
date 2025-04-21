import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/connexion" />;
  }
  
  if (requireAdmin && user.role !== 'Administrateur') {
    return <Navigate to="/" />; // On empeche laccess a certaines pages aux utilisateurs normaux
  }
  
  return children;
};

export default PrivateRoute;
