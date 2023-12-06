import { Box, Divider, Button, Grid, Typography } from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';
import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const FBIcon = GenS3Link('landing/images/icons/social-facebook');

const Facebook = () => {
  return (
    <Box className="overview">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className="overview-sup-title">MANAGE FACEBOOK SETTINGS</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ borderColor: '#ff6c00' }} />
        </Grid>
        <Grid item xs={12}>
          <Typography className="account-common-content">
            <strong>Sign in with Facebook</strong>
          </Typography>
          <Typography className="account-common-content">
            Sign in with Facebook Connecting your Facebook account allows you to sign into Drape Fit without needing a
            new password.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AnimateButton>
            <Button className="sign-facebook-btn" disableElevation size="large" variant="outlined">
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 }, display: 'flex', alignItems: 'center' }}>
                <DFnewImgTag
                  src={`${FBIcon}.svg`}
                  fallback={`${FBIcon}.svg`}
                  width="24"
                  height="24"
                  lzheight={25}
                  alt="CONNECT FACEBOOK"
                />
              </Box>
              CONNECT FACEBOOK
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Facebook;
