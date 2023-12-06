import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthInventoryRoutes = ({ component: Component }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return isAuthenticated && user && (user?.role === 100 || user?.role === 104) ? (
    <Navigate to="/dfinventory/dashboard" />
  ) : (
    <Component />
  );
};

AuthInventoryRoutes.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default AuthInventoryRoutes;
