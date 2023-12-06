import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateClientRoutes = ({ component: Component }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return isAuthenticated && user && user?.role === 102 ? <Component /> : <Navigate to="/login" />;
};

PrivateClientRoutes.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default PrivateClientRoutes;
