import { Link } from 'react-router-dom';
import { Grid, Typography, List, ListItem } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const BigTall = GenS3Link('landing/images/client/men-big-tall');

const StyleFit = () => {
  return (
    <Grid className="style-fit" container>
      <Grid item xs={12} lg={6} sx={{ my: 'auto' }}>
        <Typography className="darker-sup-extra-bold-title">A Style For The Big And Tall Fit</Typography>
        <List
          sx={{
            listStyleType: 'disc',
            pl: '3vw',
            pr: '3vw',
            '& .MuiListItem-root': {
              display: 'list-item',
              mb: '12px',
              lineHeight: '200%'
            }
          }}
        >
          <ListItem className="darker-center-content">
            Drape Fit Stylist knew how difficult it is to get the best fitting, especially if you are a big and tall
            sized man. But don't worry now as our expert Stylists will personally select the outfits meeting your big
            and tall size, included.
          </ListItem>
          <ListItem className="darker-center-content">
            We carry Men's sizes XS-3XL, 28-48-inch waists, 28-36-inch inseams, and shirts and blazers in tall sizes.{' '}
            <Link>See our full men's sizes »</Link>
          </ListItem>
          <ListItem className="darker-center-content">
            With Drape Fit, you don't have to compromise on your styling due to your tall size. You will receive the
            perfect outfit in accordance to your style, shape and budget.
          </ListItem>
          <ListItem className="darker-center-content">
            With the perfect attire, you can be more confident in your own self. Our experienced stylist will provide
            you the overall look as they also handpicked the matching accessories goes well with your perfect Fit.
          </ListItem>
          <ListItem className="darker-center-content">
            You can try out the different looks more confidently with our professional Stylists as they advise or picks
            the best for you.
          </ListItem>
          <ListItem className="darker-center-content">
            Save your money on alterations, save your energy on finding the Perfect Fit for your big and tall size with
            our Drape Fit Stylists.
          </ListItem>
          <ListItem className="darker-center-content">Wear your best FIT as per the season and occasions.</ListItem>
          <ListItem className="darker-center-content">
            You can even select your own shipping date and time for your FIT Box to reach.
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} lg={6} className="totally-center flex-start">
        <DFnewImgTag
          src={`${BigTall}.webp`}
          fallback={`${BigTall}.jpg`}
          width="100%"
          lzheight={`auto`}
          style={{ minHeight: '404px', maxWidth: '600px' }}
          alt="A Style For The Big And Tall Fit"
        />
      </Grid>
    </Grid>
  );
};

export default StyleFit;
