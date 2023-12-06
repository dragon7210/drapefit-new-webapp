import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateInventoryRoutes = ({ component: Component }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return isAuthenticated && user && (user?.role === 100 || user?.role === 104) ? (
    <Component />
  ) : (
    <Navigate to="/dfinventory/login" />
  );
};

PrivateInventoryRoutes.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default PrivateInventoryRoutes;
