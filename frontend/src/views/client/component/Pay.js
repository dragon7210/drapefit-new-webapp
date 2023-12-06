import { Grid, Typography } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const DividerImg = GenS3Link('landing/images/client/divider-img');
const ClothesCost = GenS3Link('landing/images/client/clothescost');

const Pay = () => {
  return (
    <>
      <Grid className="global-padding our-pricing" container>
        <Grid item xs={12}>
          <Typography className="about-title">
            WHAT YOU PAY <strong>AND WHEN</strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className="recommended-top-content">
            The styling fee is the only charge you'll see before the shipment arrives. There are no subscription costs
            and no obligation to buy.
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
          <Grid container spacing={8}>
            <Grid className="h-align-center" item xs={12} md={6}>
              <DFnewImgTag
                src={`${ClothesCost}.webp`}
                fallback={`${ClothesCost}.jpg`}
                width="100%"
                lzheight={`auto`}
                style={{ minHeight: '269px' }}
                alt="Clothes Cost"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className="our-pricing-title" style={{ fontSize: '21px', textAlign: 'start' }}>
                1. SCHEDULE A FIT BOX DELIVERY
              </Typography>
              <Typography className="our-pricing-content" style={{ textAlign: 'start' }}>
                Let us know what you like to receive and save your credit details. You won't be charged till the Styling
                team gets into Styling.
              </Typography>
              <Typography className="our-pricing-title" style={{ fontSize: '21px', textAlign: 'start' }}>
                2. OUR PROFESSIONAL STYLING TEAM GETS TO WORK
              </Typography>
              <Typography className="our-pricing-content" style={{ textAlign: 'start' }}>
                You'll be charged $20 once we start styling you.
              </Typography>
              <Typography className="our-pricing-title" style={{ fontSize: '21px', textAlign: 'start' }}>
                3. GET YOU DELIVERY & BUY WHAT YOU WANT
              </Typography>
              <Typography className="our-pricing-content" style={{ textAlign: 'start' }}>
                Check out online to buy what you want to keep. If you keep all the items, you can save up to 25%.
              </Typography>
              <Typography className="our-pricing-title" style={{ fontSize: '21px', textAlign: 'start' }}>
                4. FREE SHIPPING, RETURNS & EXCHANGES
              </Typography>
              <Typography className="our-pricing-content" style={{ textAlign: 'start' }}>
                If you'd like to exchange an item, let us know when you check out. Shipping is always on us both the
                ways.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Pay;
