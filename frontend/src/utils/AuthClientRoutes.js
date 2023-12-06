import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthClientRoutes = ({ component: Component }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return isAuthenticated && user && user?.role === 102 ? <Navigate to="/" /> : <Component />;
};

AuthClientRoutes.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default AuthClientRoutes;
