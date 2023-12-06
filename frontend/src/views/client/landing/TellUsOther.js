import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, Typography, Button, Box, useMediaQuery, List, ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Fab_3 = GenS3Link('landing/images/client/landing/fab-img3');
const Fab_4 = GenS3Link('landing/images/client/landing/fab-img4');
const How_man = GenS3Link('landing/images/client/landing/how-much-man');
const Receive_men = GenS3Link('landing/images/client/landing/receive-monthly-men');
const Receive_women = GenS3Link('landing/images/client/landing/receive-monthly-women');
const Receive_kids = GenS3Link('landing/images/client/landing/receive-monthly-kids');

const TellUsOther = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('lg'));
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Grid container className="tell-us-other">
        {matchesXs ? (
          <>
            <Grid item xs={12} lg={6}>
              <DFnewImgTag
                src={`${How_man}.webp`}
                fallback={`${How_man}.jpg`}
                width="100%"
                lzheight={`auto`}
                style={{ minHeight: '224px' }}
                alt="How Much Does Fit Cost"
              />
            </Grid>
            <Grid item xs={12} lg={6} sx={{ my: 'auto' }}>
              <Typography className="darker-sup-extra-bold-title" sx={{ mt: 2 }}>
                How Much Does FIT Cost?
              </Typography>
              <List sx={{ listStyleType: 'disc', px: '3vw', mb: 2, '& .MuiListItem-root': { display: 'list-item' } }}>
                <ListItem className="darker-center-content">
                  Each FIT Box has a <strong>$20 styling fee</strong> is applied to your purchase and you're only billed
                  for what you keep. <strong>It's Free Shipping!</strong> Prepaid return envelope included.
                </ListItem>
                <ListItem className="darker-center-content">
                  Items in your box generally will cost depends as per you choose in your style profile.
                </ListItem>
                <ListItem className="darker-center-content">
                  Receive a FIT Box monthly or quarterly. Choose your freequency.{' '}
                  <strong>Skip or cancel anytime.</strong>
                </ListItem>
                <ListItem className="darker-center-content">
                  Will share profit on every quarter towards the products you consume.
                </ListItem>
              </List>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} lg={6} sx={{ my: 'auto' }}>
              <Typography className="darker-sup-extra-bold-title" sx={{ mt: 2 }}>
                How Much Does Fit Cost?
              </Typography>
              <List sx={{ listStyleType: 'disc', px: '3vw', '& .MuiListItem-root': { display: 'list-item' } }}>
                <ListItem className="darker-center-content">
                  Each FIT Box has a <strong>$20 styling fee</strong> is applied to your purchase and you're only billed
                  for what you keep. <strong>It's Free Shipping!</strong> Prepaid return envelope included.
                </ListItem>
                <ListItem className="darker-center-content">
                  Items in your box generally will cost depends as per you choose in your style profile.
                </ListItem>
                <ListItem className="darker-center-content">
                  Receive a FIT Box monthly or quarterly. Choose your freequency.{' '}
                  <strong>Skip or cancel anytime.</strong>
                </ListItem>
                <ListItem className="darker-center-content">
                  Will share profit on every quarter towards the products you consume.
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} lg={6}>
              <DFnewImgTag
                src={`${How_man}.webp`}
                fallback={`${How_man}.jpg`}
                width="100%"
                lzheight={`auto`}
                style={{ minHeight: '224px' }}
                alt="How Much Does Fit Cost"
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} lg={6}>
          <DFnewImgTag
            src={`${Fab_3}.webp`}
            fallback={`${Fab_3}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '224px' }}
            alt="Get Pieces Hand-Selected"
          />
        </Grid>
        <Grid item xs={12} lg={6} sx={{ my: 'auto' }}>
          <Typography className="darker-sup-extra-bold-title" sx={{ mt: 2 }}>
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
                src={`${Fab_4}.webp`}
                fallback={`${Fab_4}.jpg`}
                width="100%"
                lzheight={`auto`}
                style={{ minHeight: '224px' }}
                alt="On The Instant Buy Pieces Curated Just For Your Style"
              />
            </Grid>
            <Grid item xs={12} lg={6} sx={{ my: 'auto' }}>
              <Typography className="darker-sup-extra-bold-title" sx={{ mt: 2 }}>
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
              <Typography className="darker-sup-extra-bold-title" sx={{ mt: 2 }}>
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
                src={`${Fab_4}.webp`}
                fallback={`${Fab_4}.jpg`}
                width="100%"
                lzheight={`auto`}
                style={{ minHeight: '224px' }}
                alt="On The Instant Buy Pieces Curated Just For Your Style"
              />
            </Grid>
          </>
        )}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'relative' }}>
              <Link to="/women">
                <DFnewImgTag
                  src={`${Receive_women}.webp`}
                  fallback={`${Receive_women}.jpg`}
                  width="100%"
                  lzheight={`auto`}
                  style={{ minHeight: '231px' }}
                  alt="Receive a FIT monthly WOMEN"
                />
                <Box className="receive-box">
                  <Typography className="receive-title">WOMEN</Typography>
                  <Typography className="receive-content">Receive a FIT monthly</Typography>
                </Box>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'relative' }}>
              <Link to="/men">
                <DFnewImgTag
                  src={`${Receive_men}.webp`}
                  fallback={`${Receive_men}.jpg`}
                  width="100%"
                  lzheight={`auto`}
                  style={{ minHeight: '231px' }}
                  alt="Receive a FIT monthly MEN"
                />
                <Box className="receive-box">
                  <Typography className="receive-title">MEN</Typography>
                  <Typography className="receive-content">Receive a FIT monthly</Typography>
                </Box>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'relative' }}>
              <Link to="/kids">
                <DFnewImgTag
                  src={`${Receive_kids}.webp`}
                  fallback={`${Receive_kids}.jpg`}
                  width="100%"
                  lzheight={`auto`}
                  style={{ minHeight: '231px' }}
                  alt="Receive a FIT monthly KIDS"
                />
                <Box className="receive-box">
                  <Typography className="receive-title">KIDS</Typography>
                  <Typography className="receive-content">Receive a FIT monthly</Typography>
                </Box>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TellUsOther;
