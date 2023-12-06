import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import Recommended from '../component/Recommended';
import HowItWorks from '../component/HowItWorks';
import FinallySign from '../component/FinallySign';
import ReasonStylist from '../component/ReasonStylist';
import AboutStylist from '../component/AboutStylist';
import FitBox from '../component/FitBox';

const Rounded_1 = GenS3Link('landing/images/client/how-it-works-6');
const Rounded_2 = GenS3Link('landing/images/client/how-it-works-2');
const Rounded_3 = GenS3Link('landing/images/client/how-it-works-7');
const SignImg = GenS3Link('landing/images/client/finally-sign');

const info = {
  title: {
    first: 'PERSONAL',
    last: 'STYLIST'
  },
  subtitle: 'Get Your Celebrity Look With A Personal Stylist',
  content: (
    <Typography className="recommended-top-content">
      DRAPE FIT is a <Link to="#">personal styling service</Link> that sends you a FIT box of hand-picked styles right
      to your door every month. Discover your trendy style with the help of our professional Stylists!
    </Typography>
  )
};
const roundedImage = [
  {
    image: Rounded_1,
    number: '01',
    title: 'Fill Out Your Style Quiz',
    content:
      'Take a quiz at Drape Fit to tell about your shape, style, price and other styling preferences with your personal stylist.'
  },
  {
    image: Rounded_2,
    number: '02',
    title: 'Request A FIT Box Delivery',
    content: 'Get up to 5 hand-picked pieces of clothing by our Stylist delivered to your home, monthly or quarterly.'
  },
  {
    image: Rounded_3,
    number: '03',
    title: 'Keep What You Love',
    content: 'Try before at home, keep your favorites and send back the rest. Free delivery and returns.'
  }
];
const finallySign = {
  image: SignImg,
  title: {
    first: 'WE DO',
    last: 'BEST FIT'
  },
  content: (
    <Typography className="recommended-top-content">
      We are the best online personal style provider. We do give our client with plenty of options to get a best FIT.
      Upgrade your style in easy steps.
    </Typography>
  )
};

const PersonalStylist = () => {
  return (
    <>
      <Recommended propsValue={info} />
      <HowItWorks propsValue={roundedImage} />
      <AboutStylist />
      <ReasonStylist />
      <FitBox />
      <FinallySign propsValue={finallySign} />
    </>
  );
};

export default PersonalStylist;
