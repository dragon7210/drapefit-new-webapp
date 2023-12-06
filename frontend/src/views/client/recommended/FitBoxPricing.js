import { Typography } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import Recommended from '../component/Recommended';
import HowItWorks from '../component/HowItWorks';
import FinallySign from '../component/FinallySign';
import Expect from '../component/Expect';
import OurPricing from '../component/OurPricing';
import Pay from '../component/Pay';

const Rounded_1 = GenS3Link('landing/images/client/how-it-works-4');
const Rounded_2 = GenS3Link('landing/images/client/how-it-works-2');
const Rounded_3 = GenS3Link('landing/images/client/how-it-works-5');
const ClothesCost = GenS3Link('landing/images/client/clothescost');

const info = {
  title: {
    first: 'FIT BOX',
    last: 'PRICING'
  },
  subtitle: '',
  content: (
    <Typography className="recommended-top-content">
      Our dedicated team of professional Stylists work within your budget to provide you fabulous new outfits at the
      prices you set. Take a style quiz to tell us what your needs and budget, and your personal Stylist will connect
      with you.
    </Typography>
  )
};
const roundedImage = [
  {
    image: Rounded_1,
    number: '01',
    title: 'Create A Style Profile',
    content:
      'Take a quiz at Drape Fit to tell about your shape, style, price and other styling preferences with your personal Stylist.'
  },
  {
    image: Rounded_2,
    number: '02',
    title: 'Request A FIT Box Delivery',
    content: 'Get hand-picked pieces of clothing by your Stylist delivered to your home, monthly or quarterly.'
  },
  {
    image: Rounded_3,
    number: '03',
    title: 'Keep What You Love',
    content:
      'Take 5 days to FIT, Choose and think and connect with your personal Stylist for any queries. Try before and keep what you love.'
  }
];
const finallySign = {
  image: ClothesCost,
  title: {
    first: 'WHAT OUR',
    last: 'CLOTHES COST'
  },
  content: (
    <Typography className="recommended-top-content">
      Our high-quality items range in price from $20 - $600, with an average cost of $55 per item. No matter what your
      budget is, with endless styles and more than 1,000 brands at our fingertips, we'll always discover something
      special for you.
    </Typography>
  )
};

const FitBoxPricing = () => {
  return (
    <>
      <Recommended propsValue={info} />
      <HowItWorks propsValue={roundedImage} />
      <OurPricing />
      <Expect />
      <Pay />
      <FinallySign propsValue={finallySign} />
    </>
  );
};

export default FitBoxPricing;
