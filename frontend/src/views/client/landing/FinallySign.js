import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#fff',
  color: '#232f3e',
  padding: '60px 30px',
  width: '400px',
  [theme.breakpoints.down('sm')]: {
    width: '310px',
    padding: '30px 15px !important'
  },
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

const FinallySign = () => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Box className="finally-sign" sx={{ display: 'flex', alignItems: 'center' }}>
        <CardWrapper
          border={false}
          content={false}
          sx={{ marginLeft: '120px', [theme.breakpoints.down('sm')]: { mx: 'auto' } }}
        >
          <Typography className="finally-sign-title">Finally Ready To Sign Up?</Typography>
          <Typography className="finally-sign-content">
            We are the best online personal style provider. We do give our client with plenty of options to get a best
            FIT. Upgrade your style in easy steps.
          </Typography>
          <Box className="h-align-center">
            <Link to={user ? `${user?.pRoute}` : '/login'}>
              <Button className="custom-btn">{user ? 'TAKE YOUR STYLE QUIZ' : 'COMPLETE YOUR FIT PROFILE'}</Button>
            </Link>
          </Box>
          {!user && (
            <Typography className="finally-sign-account">
              Already have an acount?
              <Link className="finally-sign-sign" to="/login">
                Sign in
              </Link>
            </Typography>
          )}
        </CardWrapper>
      </Box>
    </>
  );
};

export default FinallySign;
