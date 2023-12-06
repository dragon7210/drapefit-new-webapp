import { Typography, Grid } from '@mui/material';
import PropTypes from 'prop-types';

import DFnewImgTag from 'utils/DFnewImgTag';

const Left = ({ propsValue }) => {
  return (
    <>
      <Grid container padding="10px 30px">
        <Grid item xs={12} sm={8} md={12}>
          <Typography className="basic-info-title" sx={{ textAlign: { xs: 'center', sm: 'start', md: 'center' } }}>
            {propsValue.title}
          </Typography>
          <Typography className="basic-info-content" sx={{ textAlign: { xs: 'center', sm: 'start', md: 'center' } }}>
            {propsValue.content}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={12}>
          <DFnewImgTag
            src={`${propsValue.image}.webp`}
            fallback={`${propsValue.image}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '125px', border: '2px solid #232f3e' }}
            alt="best FIT for you"
          />
        </Grid>
      </Grid>
    </>
  );
};

Left.propTypes = {
  propsValue: PropTypes.object.isRequired
};

export default Left;
