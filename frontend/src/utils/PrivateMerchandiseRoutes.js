import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateMerchandiseRoutes = ({ component: Component }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return isAuthenticated && user && (user?.role === 100 || user?.role === 107) ? (
    <Component />
  ) : (
    <Navigate to="/dfmerchandise/login" />
  );
};

PrivateMerchandiseRoutes.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default PrivateMerchandiseRoutes;
