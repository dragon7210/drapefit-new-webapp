import { Link } from 'react-router-dom';
import { Grid, Typography, List, ListItem } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const Maternity = GenS3Link('landing/images/client/maternity-women');

const StyleFit = () => {
  return (
    <Grid className="style-fit" container>
      <Grid item xs={12} lg={6} sx={{ my: 'auto' }}>
        <Typography className="darker-sup-extra-bold-title" sx={{ mt: '20px' }}>
          What A Fit For Maternity Period
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
            Drape Fit Stylist helps you to create personal styled outfits for moms to be.
          </ListItem>
          <ListItem className="darker-center-content">
            We carry Women's size. <Link>See our full women's sizes »</Link>
          </ListItem>
          <ListItem className="darker-center-content">
            Outfits are available for all trimesters and even for post-pregnancy. Our Personal Stylist keep the
            essential details like-fabric, comfort lining, airy and stretchy materials in mind and select the best
            pieces to complete your look.
          </ListItem>
          <ListItem className="darker-center-content">
            Happily flaunt your baby bump by leaving behind your anxieties to be taken care of by our experienced
            Stylists and the selected items will be delivered to your doorstep.
          </ListItem>
          <ListItem className="darker-center-content">Try out new looks by saving time, money and energy.</ListItem>
          <ListItem className="darker-center-content">
            The well-designed unique outfits, along with other accessories are hand picked by our Stylist, allows a new
            makeover.
          </ListItem>
          <ListItem className="darker-center-content">
            Select the time and date for your FIT Box to be delivered at your convenience.
          </ListItem>
          <ListItem className="darker-center-content">
            Pamper yourself with what you want and return rest within 5 days.
          </ListItem>
          <ListItem className="darker-center-content">
            No shipping charges for return, but explore more options.
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} lg={6} className="totally-center flex-start">
        <DFnewImgTag
          src={`${Maternity}.webp`}
          fallback={`${Maternity}.jpg`}
          width="100%"
          lzheight={`auto`}
          style={{ minHeight: '355px', maxWidth: '600px' }}
          alt="What A Fit For Maternity Period"
        />
      </Grid>
    </Grid>
  );
};

export default StyleFit;
