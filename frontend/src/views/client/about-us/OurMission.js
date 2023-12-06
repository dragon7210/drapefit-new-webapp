import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

import CAbout from '../components/About';

const result = {
  link: 'Home',
  typo: 'Our Mission',
  title: {
    first: 'OUR',
    last: 'MISSION'
  },
  content: (
    <>
      <Typography className="about-content-orange-big">
        "Our mission is to inspire people to be their best styles. Both our clients and our employee's relationship
        built on trust and feedback. It only works if they get value from us and us from them."
      </Typography>
      <Typography className="about-content-uppercase-bold">SUKHENDU MUKHERJEE, CEO & CO-FOUNDER</Typography>
      <Typography className="about-content">
        Our Mission to provide effortless personal styling experience to{' '}
        <Link to="/about-us/our-mission">get best Fit and new look where styles</Link> blend with your daily life. Age,
        Budget and Size doesn' t matter for us. We are providing unique products to your individual tests, needs and
        fits. To save your time and money we are sending <Link to="/about-us/our-mission">high quality trendy</Link>{' '}
        hand picked outfits right to your door steps every month. There' s no risk, because if you don' t like anything
        you can return everything very easily. It' s an experience that allows personal styling to be accessible. It' s
        not to say people need styling, but you can think Drape Fit as your personal shopper.
      </Typography>
    </>
  )
};

const OurMission = () => {
  return <CAbout propsValue={result} />;
};

export default OurMission;
