import { Link } from 'react-router-dom';
import { Typography, Box, Button, Divider, Grid, Chip } from '@mui/material';
import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

import Map from '../components/Map';
import CAbout from '../components/About';
import ForJob from './ForJob';

const DividerImg = GenS3Link('landing/images/client/divider-img');

const cities = [
  'Houston',
  'Austin',
  'San Antonio',
  'Dallas',
  'Los Angeles',
  'San Francisco',
  'Chicago',
  'New York',
  'Florida',
  'Seattle'
];
const items = [
  {
    title: 'Digital Product',
    cont1:
      'A user-centered product team fueled by data, Digital Product aims to create experiences our customers will love, improving with every build.',
    cont2: 'There are no Digital Product team'
  },
  {
    title: 'Customer Experience',
    cont1:
      'Our Customer Care team loves to hear from our customers! They make connections with our community over the phone, via email, chat, and social channels.',
    cont2: 'There are no Customer Care'
  },
  {
    title: 'Merchandising',
    cont1:
      'The Merch team has a high acumen for trends, using data and consumer insights to design and source an assortment that surprises and delights.',
    cont2: 'There are no Merch team'
  },
  {
    title: 'Operations',
    cont1:
      "Our Marketing teams use data-driven acquisition strategies and community-focused storytelling to share Drape Fit's mission with the world.",
    cont2: 'There are no Marketing team'
  },
  {
    title: 'Growth & Marketing',
    cont1:
      "Our Marketing teams use data-driven acquisition strategies and community-focused storytelling to share Drape Fit's mission with the world.",
    cont2: 'There are no Marketing team'
  },
  {
    title: 'Corporate',
    cont1:
      'Our People and Finance teams come under the Corporate umbrella, powering the business with best-in-class recruitment, HR, programming, and policy.',
    cont2: 'There are no Marketing team'
  },
  {
    title: 'Engineering',
    cont1:
      'We power every part of the business with highly efficient, scalable, and modern software solutions. No off-the-shelf packages, just great code.',
    cont2: 'There are no Marketing team'
  },
  {
    title: 'Data',
    cont1:
      'The Data team uses advanced machine learning techniques to enrich data and deliver on a truly personalized customer experience.',
    cont2: 'There are no Data analysis'
  }
];
const result = {
  link: 'Home',
  typo: 'Careers',
  title: {
    first: '',
    last: 'CAREERS'
  },
  content: (
    <>
      <Typography className="about-content" align="center">
        Drape Fit is the best personal styling service that gives you an effortless styling experience. Our mission is
        to be the customer's go-to destination for head-to-toe styling by crating on-trend{' '}
        <Link to="/about-us/who-we-are">fashion and styling amazing outfits for people</Link> every day. With customers
        in over 90 countries and product assortment in clothing, bags, shoes, accessories and jewelry, we are
        experiencing amazing growth. At Drape Fit, we are always looking for passionate and talented people to join our
        team at our headquarters in Houston, Texas. We offer a creative and collaborative environment with opportunity
        to make a difference and contribute to building a global style. If you're enthusiastic about joining a growing
        start-up that values a true styling experience, exciting new technology, and constant innovation, check out our
        job listing below.
      </Typography>
      <Box>
        <Typography className="about-title">
          <strong>STYLING</strong>
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
      <Typography className="about-content-margin">
        Our Styling team works remotely across the country and is committed to providing customers with handpicked looks
        they'll love.
      </Typography>
      <Typography className="breadcrumb-link" align="center">
        See Team Openings &#8594;
      </Typography>
      <Typography className="breadcrumb-link" align="center">
        Be A Drape Fit Stylist:
      </Typography>
      <Box className="h-align-center">
        <Button className="rounded-gradient-btn">Apply Now</Button>
      </Box>
      <Typography className="about-content" align="center">
        Help make our clients look & feel their best by joining a team of Stylists who are passionate about fashion &
        style!
      </Typography>
      <Typography className="about-content" align="center">
        We hire qualified Stylists
      </Typography>
      <Typography className="about-content" align="center">
        In the following regions:
      </Typography>
      <Grid className="h-align-center" container>
        {cities.map((item, index) => (
          <Chip key={index} className="city-chip" label={item} />
        ))}
      </Grid>
      <Box className="h-align-center">
        <Map />
      </Box>
      {items.map((item, index) => (
        <Box key={index}>
          <Typography className="breadcrumb-link">{item.title}</Typography>
          <Typography className="about-content">{item.cont1}</Typography>
          <Typography className="breadcrumb-typography">See Team Openings &#8594;</Typography>
          <Typography className="about-content">
            {item.cont2} role at the moment, but we're always looking for amazing talent.
          </Typography>
          <Divider sx={{ mb: '20px' }} />
        </Box>
      ))}
    </>
  )
};

const Careers = () => {
  return (
    <>
      <CAbout propsValue={result} />
      <Box className="h-align-center job-box">
        <ForJob />
      </Box>
    </>
  );
};

export default Careers;
