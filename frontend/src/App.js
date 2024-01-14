import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

import store from 'store.js';
import themes from 'themes';
import { LOGOUT } from 'actions/common/types';
import { loadUser } from 'actions/common/auth';
import { setAlert } from 'actions/common/alert';
import SetAuthToken from 'utils/SetAuthToken';
import DFnewLogger from 'utils/DFnewLogger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { FloatButton } from 'antd';
import LoadingOverlay from 'react-loading-overlay-ts';

import ThemeRoutes from 'routes';
import NavigationScroll from 'layout/NavigationScroll';
import { getUserProducts } from 'actions/client/profile';
import { getAllAddress } from 'actions/client/profile';
import { getPaymentMethods } from 'actions/payment';

const App = () => {
  const location = useLocation();
  const [loadingFlag, setLoadingFlag] = useState(true);
  const simulateRequest = () => {
    const timeout = 100; //-- 0.1s
    return new Promise((resolve) => setTimeout(() => resolve(), timeout));
  };
  const customization = useSelector((state) => state.customization);
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    simulateRequest().then(() => {
      const bodyElm = document.querySelector('body');
      const loaderElm = document.querySelector('.loader-container');
      if (loaderElm) {
        loaderElm.remove();
        bodyElm.style.backgroundColor = 'unset';
        setLoadingFlag(!loadingFlag);
      }
    });
    DFnewLogger('Initialize App...');
    if (sessionStorage.getItem('dftoken')) {
      SetAuthToken(sessionStorage.getItem('dftoken'), false);
    } else if (localStorage.getItem('dftoken')) {
      SetAuthToken(localStorage.getItem('dftoken'), true);
    }

    store.dispatch(loadUser());
    //-- Welcome Back message
    if (user?.name) {
      const pathname = location.pathname;
      let isOkaySayHi = false;
      switch (user?.role) {
        case 100:
          isOkaySayHi = pathname.includes('/dfadmin');
          break;
        case 101:
          isOkaySayHi = pathname.includes('/dfadmin');
          break;
        case 102:
          isOkaySayHi = !pathname.includes('/df');
          break;
        case 103:
          break;
        case 104:
          isOkaySayHi = pathname.includes('/dfinventory');
          break;
        case 105:
          break;
        case 106:
          break;
        case 107:
          isOkaySayHi = pathname.includes('/dfsupplier') || pathname.includes('/dfmerchandise');
          break;
        case 1040:
          break;
        default:
          break;
      }
      if (isOkaySayHi) {
        setAlert(`Welcome Back, ${user?.name}`, 'info');
      }
    }

    window.addEventListener('storage', () => {
      const token = sessionStorage.getItem('dftoken') || localStorage.getItem('dftoken');
      if (!token) {
        store.dispatch({ type: LOGOUT });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingFlag]);

  useEffect(() => {
    if (user && user.user_id) {
      dispatch(getUserProducts());
      dispatch(getAllAddress());
      dispatch(getPaymentMethods());
    }
  }, [user, dispatch]);

  if (loadingFlag) {
    return null; // *
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <FloatButton.BackTop
            icon={<FontAwesomeIcon icon={faChevronUp} style={{ fontWeight: '900' }} />}
            style={{ backgroundColor: '#232f3e', zIndex: '9999' }}
          />
          <LoadingOverlay
            active={customization.isLoading || loading}
            spinner
            styles={{
              overlay: (base) => ({ ...base, zIndex: '10000' }),
              spinner: (base) => ({ ...base, position: 'fixed', bottom: '50vh' })
            }}
          >
            <ThemeRoutes />
          </LoadingOverlay>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
