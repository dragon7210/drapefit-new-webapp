import { Link } from 'react-router-dom';
import { Grid, Typography, List, ListItem } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const Jeans = GenS3Link('landing/images/client/jeans-women');

const StyleFit = () => {
  return (
    <Grid className="style-fit" container>
      <Grid item xs={12} lg={6} sx={{ my: 'auto' }}>
        <Typography className="darker-sup-extra-bold-title" sx={{ mt: '20px' }}>
          A Style For The Women Jeans Fit
        </Typography>
        <List
          sx={{
            listStyleType: 'disc',
            pl: '3vw',
            pr: '3vw',
            '& .MuiListItem-root': {
              display: 'list-item',
              lineHeight: '160%'
            }
          }}
        >
          <ListItem className="darker-center-content">
            To get the complete look, it is essential to wear the best fitted jeans, suiting your size and shape. Thus,
            leave the guesswork out of your wardrobe in finding that perfect denim fit for you with Drape Fit.
          </ListItem>
          <ListItem className="darker-center-content">
            We carry Women's size. <Link>See our full women's sizes »</Link>
          </ListItem>
          <ListItem className="darker-center-content">
            The Drape Fit Stylists knew precisely which fabric and brand will meet your jeans fit. The experts will
            assess your details to find a pair of jeans to suit you the best.
          </ListItem>
          <ListItem className="darker-center-content">
            The professional Stylists will select the perfect pair of women jeans from the huge list of jean types. Such
            a boyfriend jeans, flared jeans, skinny jeans, straight fit jeans and more.
          </ListItem>
          <ListItem className="darker-center-content">
            Flaunt your style statement with the ideal pair of jeans Fit matching your body type and size. It is crucial
            to wear the perfect jeans to get comfort for all day.
          </ListItem>
          <ListItem className="darker-center-content">
            The Drape Fit Stylists will choose the pair of your best jeans from the leading brands within your budget.
          </ListItem>
          <ListItem className="darker-center-content">
            Set your own time or date for receiving the delivery of the FIT Box.
          </ListItem>
          <ListItem className="darker-center-content">
            Gift yourself the comfort of the best Outfit with Free Shipping and Returns. Return envelope included.
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} lg={6} className="totally-center flex-start">
        <DFnewImgTag
          src={`${Jeans}.webp`}
          fallback={`${Jeans}.jpg`}
          width="100%"
          lzheight={`auto`}
          style={{ minHeight: '379px', maxWidth: '600px' }}
          alt="A Style For The Women Jeans Fit"
        />
      </Grid>
    </Grid>
  );
};

export default StyleFit;
