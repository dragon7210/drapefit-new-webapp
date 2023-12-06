import { Link } from 'react-router-dom';
import { Grid, Typography, List, ListItem } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const PlusSize = GenS3Link('landing/images/client/plus-size-women');

const StyleFit = () => {
  return (
    <Grid className="style-fit" container>
      <Grid item xs={12} lg={6} sx={{ my: 'auto' }}>
        <Typography className="darker-sup-extra-bold-title" sx={{ mt: '20px' }}>
          What A Fit For Plus Size
        </Typography>
        <List
          sx={{
            listStyleType: 'disc',
            pl: '3vw',
            pr: '3vw',
            '& .MuiListItem-root': {
              display: 'list-item',
              lineHeight: '150%'
            }
          }}
        >
          <ListItem className="darker-center-content">
            Drape Fit Plus Size outfits allow everyone to dream and dare to be different, as experts in personal style
            service value your needs. Drape Fit offer different styles and trends in plus size outfits up to 24W & 3X.
            Your stylist find a perfect flawlessly styled and fitted hand picked outfits for you as per your size, age
            and budget. <Link>See our full men's sizes »</Link>
          </ListItem>
          <ListItem className="darker-center-content">
            Our stylists send you a perfect FIT Box near to your door steps as per your shipping date. Enjoy hassle-free
            shopping!
          </ListItem>
          <ListItem className="darker-center-content">
            Try before Buy and save your time and money. It not only saves your time, money and effort, but it allows
            experts to create and style the fancied requirements, be it outfits, accessories.
          </ListItem>
          <ListItem className="darker-center-content">
            Our expert stylists, with their expertise and the latest technology, help you to transform and evolve your
            personal styles on Plus size.
          </ListItem>
          <ListItem className="darker-center-content">
            Receive a box monthly or quarterly. Choose your frequency. Skip or cancel anytime.
          </ListItem>
          <ListItem className="darker-center-content">
            Shipping is free both ways. Pick your delivery date. You have 5 days to buy or return. After 5 days, you are
            only charged for what you keep.
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} lg={6} className="totally-center flex-start">
        <DFnewImgTag
          src={`${PlusSize}.webp`}
          fallback={`${PlusSize}.jpg`}
          width="100%"
          lzheight={`auto`}
          style={{ minHeight: '333px', maxWidth: '600px' }}
          alt="What A Fit For Plus Size"
        />
      </Grid>
    </Grid>
  );
};

export default StyleFit;
