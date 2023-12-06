import { Link } from 'react-router-dom';
import { Grid, Typography, List, ListItem } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const MenFit = GenS3Link('landing/images/client/men-fit');

const StyleFit = () => {
  return (
    <Grid className="style-fit" container>
      <Grid item xs={12} lg={6} sx={{ my: 'auto' }}>
        <Typography className="darker-sup-extra-bold-title" sx={{ mt: '20px' }}>
          What A Fit For Men
        </Typography>
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
            Get a new look every month! Discover latest fashion brands. Risk Free!
          </ListItem>
          <ListItem className="darker-center-content">
            We carry Men's size{` `}
            <Link>See our full men's sizes »</Link>
          </ListItem>
          <ListItem className="darker-center-content">Expert Stylists with better styling advice.</ListItem>
          <ListItem className="darker-center-content">
            Take our quiz to tell us about your age, size and budget. Your personal stylist will start putting together
            the perfect FIT Box of looks.
          </ListItem>
          <ListItem className="darker-center-content">
            Delivered right to your door, you can try on each item conveniently at home. Keep only what you want.
          </ListItem>
          <ListItem className="darker-center-content">
            Shipping is free both ways. Pick your delivery date. You have 5 days to buy or return. After 5 days, you are
            only charged for what you keep.
          </ListItem>
          <ListItem className="darker-center-content">
            Receive a box monthly or quarterly. Choose your frequency. Skip or cancel anytime.
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} lg={6} className="totally-center flex-start">
        <DFnewImgTag
          src={`${MenFit}.webp`}
          fallback={`${MenFit}.jpg`}
          width="100%"
          lzheight={`auto`}
          style={{ minHeight: '269px', maxWidth: '600px' }}
          alt="What A Fit For Men"
        />
      </Grid>
    </Grid>
  );
};

export default StyleFit;
