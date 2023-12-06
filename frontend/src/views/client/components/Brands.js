import { Grid, Typography } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import { iBrands, kBrands } from 'constant/brand';

const CBrands = ({ type }) => {
  return (
    <>
      <Grid container spacing={4} className="brands">
        <Grid item xs={12}>
          <Typography className="orange-bold-title">Brands Are Ready For You</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className="brands-content">
            We are working with many brands. According to your selection we will ship a complete FIT Box that will FIT
            under your budget.
          </Typography>
        </Grid>
        {(type === 'kid' ? kBrands : iBrands).map((item, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <DFnewImgTag
              src={`${GenS3Link('landing/images/client/brands/' + item)}.webp`}
              fallback={`${GenS3Link('landing/images/client/brands/' + item)}.png`}
              width="100%"
              alt="Brand - Penguin"
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CBrands;
