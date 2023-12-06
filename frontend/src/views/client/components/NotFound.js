import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Breadcrumbs, Typography, Box } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const DividerImg = GenS3Link('landing/images/client/divider-img');

const CNotFound = ({ propsValue }) => {
  return (
    <>
      <Box className="notfound-bg h-align-center"></Box>
      <Box className="h-align-center">
        <Box className="notfound-box">
          <Box className="h-align-center">
            <Breadcrumbs separator={<NavigateNext className="breadcrumb-icon" />} aria-label="breadcrumb">
              <Link className="breadcrumb-link" key="1" to="/">
                {propsValue.link}
              </Link>
              <Typography className="breadcrumb-typography" key="3" color="text.primary">
                {propsValue.typo}
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box>
            <Typography className="about-title">
              {propsValue.title?.first} <strong>{propsValue.title?.last}</strong>
            </Typography>
          </Box>
          <Box className="h-align-center" sx={{ my: '20px' }}>
            <DFnewImgTag
              src={`${DividerImg}.webp`}
              fallback={`${DividerImg}.png`}
              height="19"
              lzheight={19}
              alt="divider"
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>{propsValue.content}</Box>
        </Box>
      </Box>
    </>
  );
};

CNotFound.propTypes = {
  propsValue: PropTypes.object
};

export default CNotFound;
