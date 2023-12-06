import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, Typography, Button, Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const Fab_1 = GenS3Link('landing/images/client/landing/fab-img1');
const Fab_2 = GenS3Link('landing/images/client/landing/fab-img2');

const TwoFabulousWays = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('lg'));
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Grid className="two-fabulous-ways" container>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography className="orange-bold-title">Two fabulous ways to find what you love</Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <DFnewImgTag
            src={`${Fab_1}.webp`}
            fallback={`${Fab_1}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '224px' }}
            alt="Get Pieces Hand-Selected By Our Professional Stylists"
          />
        </Grid>
        <Grid item xs={12} lg={6} sx={{ my: 'auto' }}>
          <Typography className="darker-extra-bold-title" sx={{ mt: 2 }}>
            Get Pieces Hand-Selected By Our Professional Stylists
          </Typography>
          <Typography className="darker-center-margin-content">
            Try on the best pieces at home when you get a Drape Fit clothing subscription box, keep the favourite
            apparels and send back the rest to us. A $20 Drape Fit styling fee covers your best online personal stylist
            in USA time and expertise - it gets credited toward anything you buy.
          </Typography>
          <Box className="h-align-center" sx={{ mb: matchesXs ? 4 : 2 }}>
            <Link to={user ? `${user?.pRoute}` : '/login'}>
              <Button className="custom-btn">TAKE YOUR STYLE QUIZ</Button>
            </Link>
          </Box>
        </Grid>
        {matchesXs ? (
          <>
            <Grid item xs={12} lg={6}>
              <DFnewImgTag
                src={`${Fab_2}.webp`}
                fallback={`${Fab_2}.jpg`}
                width="100%"
                lzheight={`auto`}
                style={{ minHeight: '224px' }}
                alt="On The Instant Buy Pieces Curated Just For Your Style"
              />
            </Grid>
            <Grid item xs={12} lg={6} sx={{ my: 'auto' }}>
              <Typography className="darker-extra-bold-title" sx={{ mt: 2 }}>
                On The Instant Buy Pieces Curated Just For Your Style
              </Typography>
              <Typography className="darker-center-margin-content">
                Leap hours of browsing and discover pieces curated just for your look, style and life. After getting
                your first Drape Fit Monthly Fashion Box, on the instant buy what you want and when you want it, to feel
                your best.
              </Typography>
              <Box className="h-align-center" sx={{ mb: 4 }}>
                <Link to={user ? `${user?.pRoute}` : '/login'}>
                  <Button className="custom-btn">TAKE YOUR STYLE QUIZ</Button>
                </Link>
              </Box>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} lg={6} sx={{ my: 'auto' }}>
              <Typography className="darker-extra-bold-title" sx={{ mt: 2 }}>
                On The Instant Buy Pieces Curated Just For Your Style
              </Typography>
              <Typography className="darker-center-margin-content">
                Leap hours of browsing and discover pieces curated just for your look, style and life. After getting
                your first Drape Fit Monthly Fashion Box, on the instant buy what you want and when you want it, to feel
                your best.
              </Typography>
              <Box className="h-align-center" sx={{ mb: 2 }}>
                <Link to={user ? `${user?.pRoute}` : '/login'}>
                  <Button className="custom-btn">TAKE YOUR STYLE QUIZ</Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <DFnewImgTag
                src={`${Fab_2}.webp`}
                fallback={`${Fab_2}.jpg`}
                width="100%"
                lzheight={`auto`}
                style={{ minHeight: '224px' }}
                alt="On The Instant Buy Pieces Curated Just For Your Style"
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default TwoFabulousWays;
