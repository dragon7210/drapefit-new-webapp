import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthAdminRoutes = ({ component: Component }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return isAuthenticated && user && (user?.role === 100 || user?.role === 101) ? (
    <Navigate to="/dfadmin/dashboard" />
  ) : (
    <Component />
  );
};

AuthAdminRoutes.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default AuthAdminRoutes;
