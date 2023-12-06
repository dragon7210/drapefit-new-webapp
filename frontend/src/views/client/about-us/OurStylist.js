import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

import CAbout from '../components/About';

const result = {
  link: 'Home',
  typo: 'Our Stylist',
  title: {
    first: 'OUR',
    last: 'STYLIST'
  },
  content: (
    <>
      <Typography className="about-content">
        Introducing our dedicated team of professional stylists love to help you to get unique style, one FIT Box at a
        time. They are the best part of our <Link to="/">Drape Fit</Link> Family. They are very passionate and fashion
        experts to motivated to learn about your tests, needs and Fits, in order to find the best outfits for you. Once
        you fill out your style quiz to tell us what you like. Your personal stylist will start putting together the{' '}
        <Link to="/about-us/executive-team">perfect FIT Box for your budget</Link>. You can consult your personal
        stylist as per your need.
      </Typography>
    </>
  )
};

const OurStylist = () => {
  return <CAbout propsValue={result} />;
};

export default OurStylist;
