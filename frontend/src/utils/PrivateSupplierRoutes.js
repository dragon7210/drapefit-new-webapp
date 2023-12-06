import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateSupplierRoutes = ({ component: Component }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return isAuthenticated && user && (user?.role === 100 || user?.role === 107) ? (
    <Component />
  ) : (
    <Navigate to="/dfsupplier/login" />
  );
};

PrivateSupplierRoutes.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default PrivateSupplierRoutes;
