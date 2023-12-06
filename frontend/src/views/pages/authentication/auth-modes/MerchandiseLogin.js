import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import AuthWrapper from '../AuthWrapper';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthMerchandiseLogin from '../auth-forms/AuthMerchandiseLogin';

const Logo = GenS3Link('landing/images/logo_full');

const MerchandiseLogin = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <AuthWrapper className="sign admin">
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
                    <Grid item xs={12} sx={{ margin: '-10px 0 -20px' }}>
                      <Grid
                        container
                        direction={matchDownSM ? 'column-reverse' : 'row'}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item>
                          <Stack alignItems="center" justifyContent="center" spacing={1}>
                            <Typography
                              className="txt-center"
                              color="#232f3e"
                              gutterBottom
                              variant={matchDownSM ? 'h3' : 'h2'}
                            >
                              Merchandise Sign-In
                              <br />
                              (Supplier)
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthMerchandiseLogin />
                    </Grid>
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AuthWrapper>
    </>
  );
};

export default MerchandiseLogin;
