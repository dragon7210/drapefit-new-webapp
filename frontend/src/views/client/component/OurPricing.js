import { Grid, Typography, Divider } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const DividerImg = GenS3Link('landing/images/client/divider-img');
const FitBox = GenS3Link('landing/images/client/our-pricing');

const OurPricing = () => {
  return (
    <>
      <Grid className="global-padding our-pricing" container>
        <Grid item xs={12}>
          <Typography className="about-title">
            ABOUT OUR <strong>PRICING</strong>
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
        <Grid item xs={12} sx={{ mb: '20px' }}>
          <Typography className="recommended-top-content">Pay for what you spend on each delivery</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <Typography className="our-pricing-title">PERSONALIZED PRICING</Typography>
              <Typography className="our-pricing-content">
                You pay on what you spend in each clothing category. Your personal Stylist will send you outfits only
                within the price ranges you set.
              </Typography>
              <Divider className="custom-divider" />
              <Typography className="our-pricing-title">STYLING FEE</Typography>
              <Typography className="our-pricing-content">
                Each FIT Box has a $20 styling fees and you're only billed for what you keep. It's Free Shipping!
                Prepaid return envelope included.
              </Typography>
              <Divider className="custom-divider" />
              <Typography className="our-pricing-title">TRY BEFORE YOU BUY</Typography>
              <Typography className="our-pricing-content">
                Try your apparels before you decide to keep them. Keep what you like and return what doesn't FIT you.
              </Typography>
            </Grid>
            <Grid className="h-align-center" item xs={12} md={6}>
              <DFnewImgTag
                src={`${FitBox}.webp`}
                fallback={`${FitBox}.jpg`}
                width="100%"
                lzheight={`auto`}
                style={{ minHeight: '311px' }}
                alt="Fit Box"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default OurPricing;
