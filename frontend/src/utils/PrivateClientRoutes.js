import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loadable from 'ui-component/Loadable';
import { lazy } from 'react';
import ComponentLoader from 'utils/ComponentLoader';

const Landing = Loadable(lazy(() => ComponentLoader(() => import('views/client/landing'))));

const PrivateClientRoutes = ({ component: Component }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  return loading ? (
    <Landing />
  ) : isAuthenticated && user && user?.role === 102 ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

PrivateClientRoutes.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default PrivateClientRoutes;
