import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthMerchandiseRoutes = ({ component: Component }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return isAuthenticated && user && (user?.role === 100 || user?.role === 107) ? (
    <Navigate to="/dfmerchandise/dashboard" />
  ) : (
    <Component />
  );
};

AuthMerchandiseRoutes.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default AuthMerchandiseRoutes;
