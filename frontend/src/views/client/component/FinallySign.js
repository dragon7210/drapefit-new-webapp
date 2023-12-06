import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Grid, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const DividerImg = GenS3Link('landing/images/client/divider-img');

const FinallySign = ({ propsValue }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Grid className="global-padding" container>
        <Grid item xs={12}>
          <Typography className="about-title">
            {propsValue.title.first} <strong>{propsValue.title.last}</strong>
          </Typography>
          <Box>{propsValue.content}</Box>
          <Box className="h-align-center" sx={{ my: '20px' }}>
            <DFnewImgTag
              src={`${DividerImg}.webp`}
              fallback={`${DividerImg}.png`}
              height="19"
              lzheight={19}
              alt="divider"
            />
          </Box>
        </Grid>
        <Grid className="finally-sign-align-right" item xs={12} md={6}>
          <Box className="finally-sign-image-box">
            <DFnewImgTag
              className="finally-sign-image"
              src={`${propsValue.image}.webp`}
              fallback={`${propsValue.image}.jpg`}
              lzheight={`auto`}
              style={{ minHeight: '300px' }}
              alt="finally sign"
            />
          </Box>
        </Grid>
        <Grid className="finally-sign-align-left" item xs={12} md={6}>
          <Box className="finally-sign-content-box">
            <Typography className="finally-sign-title">Finally Ready To Sign Up?</Typography>
            <Typography className="finally-sign-content">
              We are the best online personal style provider. We do give our client with plenty of options to get a best
              FIT. Upgrade your style in easy steps.
            </Typography>
            <Box className="h-align-center" sx={{ mt: user ? 2 : 0 }}>
              <Link to={user ? `${user?.pRoute}` : '/login'}>
                <Button className="custom-btn small">
                  {user ? 'TAKE YOUR STYLE QUIZ' : 'COMPLETE YOUR FIT PROFILE'}
                </Button>
              </Link>
            </Box>
            {!user && (
              <Typography className="finally-sign-account">
                Already a member?{' '}
                <Link className="finally-sign-link" to="/login">
                  Sign in
                </Link>
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

FinallySign.propTypes = {
  propsValue: PropTypes.object
};

export default FinallySign;
