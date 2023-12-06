import { Grid, Typography, Box } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const DividerImg = GenS3Link('landing/images/client/divider-img');
const Rounded_4 = GenS3Link('landing/images/client/how-it-works-8');
const Rounded_5 = GenS3Link('landing/images/client/how-it-works-9');
const Rounded_6 = GenS3Link('landing/images/client/how-it-works-10');

const items = [
  {
    image: Rounded_4,
    number: '01',
    title: 'Find Your Personal Stylist',
    content:
      "If you're wondering to find your style then, discover your style with the help of Drape Fit Styling experts."
  },
  {
    image: Rounded_5,
    number: '02',
    title: 'Enjoy Trying New Things',
    content:
      'Have fun trying new things with the help of Drape Fit Stylists rather than buying the same apparel and same style.'
  },
  {
    image: Rounded_6,
    number: '03',
    title: 'Save Your Valuable Time And Money',
    content:
      'Each second counts, and when you want to save shopping time, then Drape Fit is a one-stop place for your excellent online shopping experience within your budget.'
  }
];

const ReasonStylist = () => {
  return (
    <>
      <Grid className="global-padding" container spacing={4}>
        <Grid item xs={12}>
          <Typography className="about-title">
            REASONS TO TRY A PERSONAL <strong>STYLIST FROM DRAPE FIT</strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box className="h-align-center" sx={{ margin: '-20px 0 10px' }}>
            <DFnewImgTag
              src={`${DividerImg}.webp`}
              fallback={`${DividerImg}.png`}
              height="19"
              lzheight={19}
              alt="divider"
            />
          </Box>
        </Grid>
        {items.map((item, index) => (
          <Grid key={index} className="how-it-item" item xs={12} md={4}>
            <Box className="item-round-image">
              <Typography className="item-num">{item.number}</Typography>
              <Box className="item-image-box">
                <DFnewImgTag
                  className="item-image"
                  src={`${item.image}.webp`}
                  fallback={`${item.image}.jpg`}
                  height="100%"
                  lzheight={'100%'}
                  alt={item.title}
                />
              </Box>
            </Box>
            <Typography className="item-title">{item.title}</Typography>
            <Typography className="item-content">{item.content}</Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ReasonStylist;
