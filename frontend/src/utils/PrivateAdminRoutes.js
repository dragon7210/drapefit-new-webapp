import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateAdminRoutes = ({ component: Component }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return isAuthenticated && user && (user?.role === 100 || user?.role === 101) ? (
    <Component />
  ) : (
    <Navigate to="/dfadmin/login" />
  );
};

PrivateAdminRoutes.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default PrivateAdminRoutes;
