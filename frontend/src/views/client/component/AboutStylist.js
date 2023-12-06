import { Grid, Box, Typography, Divider, useTheme, useMediaQuery } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const DividerImg = GenS3Link('landing/images/client/divider-img');
const Stylist_1 = GenS3Link('landing/images/client/about-stylist-1');

const AboutStylist = () => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Grid className="about-stylist" container>
        <Grid item xs={12}>
          <Typography className="about-title">
            HERE'S HOW DRAPE FIT STYLISTS LEARN <strong>ABOUT YOU AND PICK YOUR ITEMS</strong>
          </Typography>
        </Grid>
        <Grid className="h-align-center" item xs={12} sx={{ my: '20px' }}>
          <DFnewImgTag
            src={`${DividerImg}.webp`}
            fallback={`${DividerImg}.png`}
            height="19"
            lzheight={19}
            alt="divider"
          />
        </Grid>
        <Grid item xs={12}>
          {matchesMD ? (
            <Grid container spacing={8}>
              <Grid className="h-align-center" item xs={12} md={4}>
                <DFnewImgTag
                  src={`${Stylist_1}.webp`}
                  fallback={`${Stylist_1}.jpg`}
                  width="100%"
                  lzheight={`auto`}
                  style={{ minHeight: '240px' }}
                  alt="Drape Fit Stylist"
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography className="about-stylist-content">
                  Your celebrity look and style starts with the perfect FIT. We collect microdata from our million-plus
                  clients and use the latest and exclusive technology to narrow down clothing options to FIT your body.
                </Typography>
                <Divider sx={{ margin: '15px 0' }} />
                <Typography className="about-stylist-content">
                  Our dedicated team of professional Stylist experts read your Style profile and choose items that
                  perfectly FIT your size, as well as your look and budget.
                </Typography>
                <Divider sx={{ margin: '15px 0' }} />
                <Typography className="about-stylist-content" sx={{ mb: 2 }}>
                  When you check out, we ask for feedback on the items you received. This helps your stylist get to know
                  you even best over time.
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={8}>
              <Grid item xs={12} md={8}>
                <Typography className="about-stylist-content">
                  Your celebrity look and style starts with the perfect FIT. We collect microdata from our million-plus
                  clients and use the latest and exclusive technology to narrow down clothing options to FIT your body.
                </Typography>
                <Divider sx={{ margin: '12px 0' }} />
                <Typography className="about-stylist-content">
                  Our dedicated team of professional Stylist experts read your Style profile and choose items that
                  perfectly FIT your size, as well as your look and budget.
                </Typography>
                <Divider sx={{ margin: '12px 0' }} />
                <Typography className="about-stylist-content" sx={{ mb: 2 }}>
                  When you check out, we ask for feedback on the items you received. This helps your stylist get to know
                  you even best over time.
                </Typography>
              </Grid>
              <Grid className="h-align-center" item xs={12} md={4}>
                <DFnewImgTag
                  src={`${Stylist_1}.webp`}
                  fallback={`${Stylist_1}.jpg`}
                  width="100%"
                  lzheight={`auto`}
                  style={{ minHeight: '240px' }}
                  alt="Drape Fit Stylist"
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Box className="about-stylist-bg">
        <Box className="about-stylist-box">
          <Typography className="about-stylist-box-title">About The Drape Fit Stylists</Typography>
          <Typography className="about-stylist-box-content">
            We have a massive array of a dedicated team of experienced fashion experts across the U.S. They are the best
            part of our Drape Fit Family. They are very passionate and fashion experts to motivated to learn about your
            tests, needs, and Fits, in order to find the best outfits for you. Once you fill out your style quiz to tell
            us what you like. Our personal Stylist will start putting together the perfect FIT box for your budget. You
            can consult your personal Stylist as per your needs.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default AboutStylist;
