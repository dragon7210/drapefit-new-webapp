import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const TopSlider = () => {
  const { user } = useSelector((state) => state.auth);

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
        <Box className="banner-1">
          <Box className="align-top-left">
            <Typography className="darker-bold-title">Style Delivered To Your Door</Typography>
            <Link to={user ? `${user?.pRoute}` : '/login'}>
              <Button className="custom-btn">TAKE YOUR STYLE QUIZ</Button>
            </Link>
          </Box>
        </Box>
        <Box className="banner-2">
          <Box className="align-top-left">
            <Typography className="darker-bold-title">Build A Look You Love</Typography>
            <Link to={user ? `${user?.pRoute}` : '/login'}>
              <Button className="custom-btn">TAKE YOUR STYLE QUIZ</Button>
            </Link>
          </Box>
        </Box>
        <Box className="banner-3">
          <Box className="align-top-left">
            <Typography className="darker-bold-title">Enjoy Effortless Shopping</Typography>
            <Link to={user ? `${user?.pRoute}` : '/login'}>
              <Button className="custom-btn">TAKE YOUR STYLE QUIZ</Button>
            </Link>
          </Box>
        </Box>
        <Box className="banner-4">
          <Box className="align-top-left">
            <Typography className="darker-bold-title">Experience Styling Service</Typography>
            <Link to={user ? `${user?.pRoute}` : '/login'}>
              <Button className="custom-btn">TAKE YOUR STYLE QUIZ</Button>
            </Link>
          </Box>
        </Box>
      </Carousel>
    </>
  );
};

export default TopSlider;
