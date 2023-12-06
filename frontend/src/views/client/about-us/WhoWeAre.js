import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

import CAbout from '../components/About';

const result = {
  link: 'Home',
  typo: 'Who We Are',
  title: {
    first: 'WHO WE',
    last: 'ARE'
  },
  content: (
    <>
      <Typography className="about-content">
        DRAPE FIT is a personal styling service that sends you a FIT Box of hand-picked styles right to your door every
        month. We Do The Best Fit. Save your time and money. Keep what you love and return what you don't. It's free
        shipping both ways. Choose your frequency. Choose your own style and consult with our personal stylist. Save 25%
        when you buy all. We do <Link to="/about-us/who-we-are">personalized style selection</Link> for Men, Women and
        Kids.
      </Typography>
    </>
  )
};

const WhoWeAre = () => {
  return <CAbout propsValue={result} />;
};

export default WhoWeAre;
