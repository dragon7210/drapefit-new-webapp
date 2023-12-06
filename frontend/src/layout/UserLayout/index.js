import { Link, Outlet } from 'react-router-dom';
import { AppBar, Box, CssBaseline, Toolbar, styled, useTheme, useMediaQuery } from '@mui/material';

import LinkSection from 'layout/MainLayout/Header/LinkSection';
import Footer from 'layout/MainLayout/Footer';
import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const Logo = GenS3Link('landing/images/logo_full');
const LogoSmall = GenS3Link('landing/images/logo');

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
  ...theme.typography.mainContent
}));

const UserLayout = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar enableColorOnDark position="fixed" color="inherit" elevation={1} sx={{ backgroundColor: '#fffffff1' }}>
        <Toolbar sx={{ padding: { md: '8px 124px !important', sm: '8px 24px' } }}>
          <Box component="span" sx={{ display: 'block', height: '50px', flexGrow: 1 }}>
            <Link to="/">
              <DFnewImgTag
                src={matchDownSM ? `${LogoSmall}.webp` : `${Logo}.webp`}
                fallback={matchDownSM ? `${LogoSmall}.png` : `${Logo}.png`}
                height="50"
                lzheight={50}
                alt="Drape Fit Logo"
              />
            </Link>
          </Box>
          <Box flexGrow={1}></Box>
          <Box sx={{ display: 'flex', alignItems: 'end' }}>
            <LinkSection />
          </Box>
        </Toolbar>
      </AppBar>
      <Main theme={theme}>
        <Outlet />
        <Footer />
      </Main>
    </Box>
  );
};

export default UserLayout;
