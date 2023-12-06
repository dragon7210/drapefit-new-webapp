import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const DividerImg = GenS3Link('landing/images/client/divider-img');

const Recommended = ({ propsValue }) => {
  return (
    <>
      <Box className="about-bg"></Box>
      <Box className="h-align-center global-padding">
        <Box className="rounded-box">
          <Typography className="about-title">
            {propsValue.title.first} <strong>{propsValue.title.last}</strong>
          </Typography>
          <Typography className="recommended-top-sub-title">{propsValue.subtitle}</Typography>
          <Box className="h-align-center" sx={{ my: '20px' }}>
            <DFnewImgTag
              src={`${DividerImg}.webp`}
              fallback={`${DividerImg}.png`}
              height="19"
              lzheight={19}
              alt="divider"
            />
          </Box>
          <Box>{propsValue.content}</Box>
        </Box>
      </Box>
    </>
  );
};

Recommended.propTypes = {
  propsValue: PropTypes.object
};

export default Recommended;
