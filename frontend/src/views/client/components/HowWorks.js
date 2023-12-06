import { Grid, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

import DFnewImgTag from 'utils/DFnewImgTag';

const CHowWorks = ({ propsValue }) => {
  return (
    <>
      <Grid className="how-works" container spacing={2}>
        <Grid item xs={12}>
          <Typography className="orange-bold-title" style={{ padding: '10px' }}>
            How It Works
          </Typography>
        </Grid>
        {propsValue.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} lg={3}>
            <Box className="process-box" sx={{ display: 'block' }}>
              <Box className="process-img">
                <DFnewImgTag
                  src={`${item.image}.webp`}
                  fallback={`${item.image}.jpg`}
                  height="100%"
                  lzheight={'100%'}
                  alt={item.title}
                />
              </Box>
              <Box>
                <Typography className="process-num">{item.num}</Typography>
              </Box>
              <Box>
                <Typography className="process-title">{item.title}</Typography>
              </Box>
              <Box>
                <Typography className="process-content">{item.content}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

CHowWorks.propTypes = {
  propsValue: PropTypes.array
};

export default CHowWorks;
