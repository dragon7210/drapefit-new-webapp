import { Typography, Rating, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import PropTypes from 'prop-types';

const CFeedbacks = ({ propsValue }) => {
  return (
    <>
      <Carousel
        autoplay={true}
        swipe={true}
        indicators={false}
        duration={500}
        animation="slide"
        cycleNavigation={true}
        navButtonsAlwaysInvisible={true}
      >
        {propsValue.map((item, index) => (
          <Grid
            key={index}
            className="feedback"
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            sx={{ width: '100%', height: '60vh', backgroundColor: '#273342' }}
          >
            <Grid item>
              <Rating value={item.star} readOnly />
            </Grid>
            <Grid item>
              <Typography className="feedback-content">{item.content}</Typography>
            </Grid>
            <Grid item>
              <Typography className="feedback-name">- {item.name}</Typography>
            </Grid>
            <Grid item>
              <Typography className="feedback-address">{item.address}</Typography>
            </Grid>
          </Grid>
        ))}
      </Carousel>
    </>
  );
};

CFeedbacks.propTypes = {
  propsValue: PropTypes.array
};

export default CFeedbacks;
