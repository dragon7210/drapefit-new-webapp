import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, Typography, Button, Box } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const Keep_1 = GenS3Link('landing/images/client/landing/keep-icon1');
const Keep_2 = GenS3Link('landing/images/client/landing/keep-icon2');
const Keep_3 = GenS3Link('landing/images/client/landing/keep-icon3');

const HowItWorks = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Grid className="how-it-works" container spacing={8}>
        <Grid item xs={12}>
          <Typography className="orange-bold-title">How It Works</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="align-center-margin">
            <DFnewImgTag
              src={`${Keep_1}.webp`}
              fallback={`${Keep_1}.png`}
              width="200"
              height="151"
              lzheight={151}
              alt="FILL OUT YOUR STYLE QUIZ"
            />
          </Box>
          <Typography className="darker-sub-bold-title">01. FILL OUT YOUR STYLE QUIZ</Typography>
          <Typography className="light-center-content">
            Share your style, price, size and style preferences with your personal stylist.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="align-center-margin">
            <DFnewImgTag
              src={`${Keep_2}.webp`}
              fallback={`${Keep_2}.png`}
              width="200"
              height="151"
              lzheight={151}
              alt="REQUEST A FIT BOX"
            />
          </Box>
          <Typography className="darker-sub-bold-title">02. REQUEST A FIT BOX</Typography>
          <Typography className="light-center-content">
            Get up to 5 hand-picked pieces of clothing by your personal stylist delivered to your home, monthly or
            quarterly. Save money and time.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="align-center-margin">
            <DFnewImgTag
              src={`${Keep_3}.webp`}
              fallback={`${Keep_3}.png`}
              width="200"
              height="151"
              lzheight={151}
              alt="KEEP WHAT LOVE"
            />
          </Box>
          <Typography className="darker-sub-bold-title">03. KEEP WHAT LOVE</Typography>
          <Typography className="light-center-content">
            Keep which fits you. Send back rest. You're only billed for what you keep, and your styling fee is applied
            to your purchase. Shipping is free both ways.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box className="align-center-margin">
            <Link to={user ? `${user?.pRoute}` : '/login'}>
              <Button className="custom-btn">TAKE YOUR STYLE QUIZ</Button>
            </Link>
          </Box>
          {!user && (
            <Typography className="darker-sub-semibold-title">
              Already have an acount?
              <Link className="light-semibold-content" to="/login">
                Sign in
              </Link>
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default HowItWorks;
