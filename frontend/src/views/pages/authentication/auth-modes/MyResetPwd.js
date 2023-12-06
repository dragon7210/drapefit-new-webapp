import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import AuthWrapper from '../AuthWrapper';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthResetPwd from '../auth-forms/AuthResetPwd';

const Logo = GenS3Link('landing/images/logo_full');

const MyResetPwd = () => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper className="sign">
      <Grid container direction="column" justifyContent="flex-end">
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 0 }}>
                    <DFnewImgTag
                      src={`${Logo}.webp`}
                      fallback={`${Logo}.png`}
                      height="40"
                      lzheight={40}
                      alt="Drape Fit"
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ margin: '-5px 0 -15px' }}>
                    <Typography color="#232f3e" gutterBottom align="center" variant={matchDownMD ? 'h3' : 'h2'}>
                      Reset your password
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthResetPwd />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default MyResetPwd;
