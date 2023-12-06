import { Link } from 'react-router-dom';
import { Grid, Typography, List, ListItem } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const Petite = GenS3Link('landing/images/client/petite-women');

const StyleFit = () => {
  return (
    <Grid className="style-fit" container>
      <Grid item xs={12} lg={6} sx={{ my: 'auto' }}>
        <Typography className="darker-sup-extra-bold-title" sx={{ mt: '20px' }}>
          The Style For The Women Petite Fit
        </Typography>
        <List
          sx={{
            listStyleType: 'disc',
            pl: '3vw',
            pr: '3vw',
            '& .MuiListItem-root': {
              display: 'list-item',
              mb: '4px',
              lineHeight: '200%'
            }
          }}
        >
          <ListItem className="darker-center-content">
            Drape Fit offers you the best and unique among the variety of styles and trends available in Petite sizes
            from XS and 0, as well as petite plus sizes.
          </ListItem>
          <ListItem className="darker-center-content">
            We carry Women's size. <Link>See our full women's sizes »</Link>
          </ListItem>
          <ListItem className="darker-center-content">
            Your fashion stylist will choose an ideal Outfit. In accordance with your shared taste and preference size
            meeting your petite sizes.
          </ListItem>
          <ListItem className="darker-center-content">
            Your Drape Fit stylist knew precisely the best fabric and petite style for you. Thus, they will select the
            best petite designs with narrower shoulders and shorter sleeves. So that to provide you the complete look.
          </ListItem>
          <ListItem className="darker-center-content">
            You can additionally receive the petite styling tips from the personal stylist to get the new makeover.
          </ListItem>
          <ListItem className="darker-center-content">
            Proclaim your petite style with the matching and perfect accessories that are handpicked by your stylist. So
            that to embellish your unique designed Outfit.
          </ListItem>
          <ListItem className="darker-center-content">
            Wear the petite designs in your constraint budget with the Drape Fit.
          </ListItem>
          <ListItem className="darker-center-content">
            Receive the Petite style as per your convenience, either monthly or quarterly.
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} lg={6} className="totally-center flex-start">
        <DFnewImgTag
          src={`${Petite}.webp`}
          fallback={`${Petite}.jpg`}
          width="100%"
          lzheight={`auto`}
          style={{ minHeight: '354px', maxWidth: '600px' }}
          alt="The Style For The Women Petite Fit"
        />
      </Grid>
    </Grid>
  );
};

export default StyleFit;
