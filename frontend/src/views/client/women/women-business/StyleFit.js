import { Link } from 'react-router-dom';
import { Grid, Typography, List, ListItem } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const Business = GenS3Link('landing/images/client/business-women');

const StyleFit = () => {
  return (
    <Grid className="style-fit" container>
      <Grid item xs={12} lg={6} sx={{ my: 'auto' }}>
        <Typography className="darker-sup-extra-bold-title" sx={{ mt: '20px' }}>
          A Style For The Women Business Fit
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
            Drape Fit offers you to concentrate more on your work than your work wear. The expert fashion stylists at
            Drape Fit take care of your business professional and casual style.
          </ListItem>
          <ListItem className="darker-center-content">
            We carry Women's size <Link>See our full women's sizes »</Link>
          </ListItem>
          <ListItem className="darker-center-content">
            As per your shared details, our Stylists will pick the most professional Outfit for you. It will help in
            providing you a complete new professional look for your workplace.
          </ListItem>
          <ListItem className="darker-center-content">
            Other than styling your perfect 9-5 wardrobe for you. The experienced professional stylist will also select
            the matching accessories for you. So that to pair up with your professional look.
          </ListItem>
          <ListItem className="darker-center-content">
            You can make a professional mark on your business meetings with your best look. Thus, it will help in
            creating an impression on your business clients.
          </ListItem>
          <ListItem className="darker-center-content">
            You can even customize your work FIT as per your needs. Such as a look for a professional-client meeting, a
            business function, annual business meeting, or casual Friday.
          </ListItem>
          <ListItem className="darker-center-content">
            Choose your own shipping date of your new professional FIT Box and get new looks everyday 9-5 outfits. Save
            your time and money.
          </ListItem>
          <ListItem className="darker-center-content">
            You can even experiment with many more casual and professional business look with our personal styling
            service.
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} lg={6} className="totally-center flex-start">
        <DFnewImgTag
          src={`${Business}.webp`}
          fallback={`${Business}.jpg`}
          width="100%"
          lzheight={`auto`}
          style={{ minHeight: '403px', maxWidth: '600px' }}
          alt="A Style For The Women Business Fit"
        />
      </Grid>
    </Grid>
  );
};

export default StyleFit;
