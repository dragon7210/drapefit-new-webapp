import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

import { SET_MENU } from 'actions/common/types';
import { drawerWidth } from 'constant/other';
import Header from './Header';
import Sidebar from './Sidebar';
import AdminFooter from './Footer/AdminFooter';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  padding: '24px 24px 72px',
  width: `calc(100% - ${drawerWidth}px)`,
  ...(!open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: -drawerWidth
    }
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const MainLayout = () => {
  const location = useLocation();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({
      type: SET_MENU,
      opened: !leftDrawerOpened
    });
  };
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    dispatch({
      type: SET_MENU,
      opened: !matchDownMd
    });
  }, [dispatch, matchDownMd]);

  useEffect(() => {
    const myPath = location.pathname;
    if (
      [
        '/dfadmin',
        '/dfadmin/',
        '/dfadmin/login',
        '/dfadmin/login/',
        '/dfadmin/forgot-pwd',
        '/dfadmin/forgot-pwd/'
      ].includes(myPath) ||
      [
        '/dfinventory',
        '/dfinventory/',
        '/dfinventory/login',
        '/dfinventory/login/',
        '/dfinventory/forgot-pwd',
        '/dfinventory/forgot-pwd/'
      ].includes(myPath) ||
      [
        '/dfsupplier',
        '/dfsupplier/',
        '/dfsupplier/login',
        '/dfsupplier/login/',
        '/dfsupplier/forgot-pwd',
        '/dfsupplier/forgot-pwd/'
      ].includes(myPath) ||
      ['/dfmerchandise', '/dfmerchandise/', '/dfmerchandise/login', '/dfmerchandise/login/'].includes(myPath)
    ) {
      setIsLoginPage(true);
      dispatch({
        type: SET_MENU,
        opened: false
      });
    } else {
      setIsLoginPage(false);
      dispatch({
        type: SET_MENU,
        opened: true
      });
    }
  }, [dispatch, location.pathname]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: '#ff6c00',
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} slot={isLoginPage} />
        </Toolbar>
      </AppBar>
      <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
      <Main theme={theme} open={leftDrawerOpened}>
        <Outlet />
        <AdminFooter />
      </Main>
    </Box>
  );
};

export default MainLayout;
