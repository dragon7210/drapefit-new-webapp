import { Grid, List, ListItem, Typography } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const MenFit = GenS3Link('landing/images/client/men-fit-2');
const WomenFit = GenS3Link('landing/images/client/women-fit');

const FitBox = () => {
  return (
    <>
      <Grid className="global-padding fit-box" container>
        <Grid className="totally-center flex-start" item xs={12} lg={3}>
          <DFnewImgTag
            src={`${MenFit}.webp`}
            fallback={`${MenFit}.jpg`}
            className="fit-image"
            height="200"
            lzheight={200}
            alt="Men Fit"
          />
        </Grid>
        <Grid className="fit-box-content-box" item xs={12} lg={6}>
          <Typography className="fit-box-title">What Your Exclusive Stylist Includes in a FIT BOX</Typography>
          <Typography className="fit-box-content">
            Get up to 5 handpicked pieces of clothing by your personal stylist. In a Drape Fit box, there are five types
            of items fabulously packed with:
          </Typography>
          <List
            sx={{
              listStyleType: 'disc',
              pl: '2vw',
              pr: '2vw',
              '& .MuiListItem-root': {
                display: 'list-item'
              }
            }}
          >
            <ListItem>
              <Typography className="fit-box-content">T-shirt</Typography>
            </ListItem>
            <ListItem>
              <Typography className="fit-box-content">Jacket</Typography>
            </ListItem>
            <ListItem>
              <Typography className="fit-box-content">Party Wear Clothes</Typography>
            </ListItem>
            <ListItem>
              <Typography className="fit-box-content">Accessory ( Handbag / Shoes )</Typography>
            </ListItem>
            <ListItem>
              <Typography className="fit-box-content">Jeans / Lower</Typography>
            </ListItem>
          </List>
          <Typography className="fit-box-content">
            <strong>A personal note</strong> is written by your Stylist especially for you
          </Typography>
          <Typography className="fit-box-content">
            <strong>Style Suggestion</strong> on how to wear and pair you new apparels
          </Typography>
          <Typography className="fit-box-content">
            <strong>A prepaid return envelope</strong> (shipping & return are always on us)
          </Typography>
        </Grid>
        <Grid className="totally-center flex-start" item xs={12} lg={3}>
          <DFnewImgTag
            src={`${WomenFit}.webp`}
            fallback={`${WomenFit}.jpg`}
            className="fit-image"
            height="200"
            lzheight={200}
            alt="Women Fit"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default FitBox;
