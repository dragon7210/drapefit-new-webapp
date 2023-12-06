import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Box, ButtonBase, useTheme, useMediaQuery } from '@mui/material';
import { IconMenu2 } from '@tabler/icons';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import NotificationSection from './NotificationSection';

const Logo = GenS3Link('landing/images/logo_full');
const LogoSmall = GenS3Link('landing/images/logo');

const Header = ({ handleLeftDrawerToggle, slot }) => {
  const location = useLocation();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [pathTo, setPathTo] = useState('/');

  useEffect(() => {
    const myPath = location.pathname;
    if (myPath.includes('/dfadmin')) {
      setPathTo('/dfadmin');
    } else if (myPath.includes('/dfinventory')) {
      setPathTo('/dfinventory');
    } else if (myPath.includes('/dfsupplier')) {
      setPathTo('/dfsupplier');
    } else if (myPath.includes('/dfmerchandise')) {
      setPathTo('/dfmerchandise');
    }
  }, [location.pathname]);

  return (
    <>
      <Box sx={{ width: 228, display: 'flex' }}>
        <Box component="span" sx={{ display: 'block', flexGrow: 1 }}>
          <Link to={pathTo} className="v-align-center">
            <DFnewImgTag
              src={matchDownSM ? `${LogoSmall}.webp` : `${Logo}.webp`}
              fallback={matchDownSM ? `${LogoSmall}.png` : `${Logo}.png`}
              height="44"
              lzheight={44}
              alt="Drape Fit Logo"
            />
          </Link>
        </Box>
        {!slot && (
          <ButtonBase sx={{ borderRadius: '8px', overflow: 'hidden' }}>
            <Avatar
              className="header-btn-toggle"
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                transition: 'all .25s ease-in-out'
              }}
              onClick={handleLeftDrawerToggle}
              color="inherit"
            >
              <IconMenu2 stroke={1.5} size="1.3rem" />
            </Avatar>
          </ButtonBase>
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      {!slot && <NotificationSection />}
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
