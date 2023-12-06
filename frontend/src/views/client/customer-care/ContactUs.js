import { Link } from 'react-router-dom';
import { Divider, Typography } from '@mui/material';

import CAbout from '../components/About';
import ContactForm from './ContactForm';

const result = {
  link: 'Home',
  typo: 'Contact Us',
  title: {
    first: 'CONTACT',
    last: 'US'
  },
  content: (
    <>
      <Typography className="contact-us-title">Drape Fit Inc.</Typography>
      <Typography className="contact-us-content">14090 Southwest Frwy Ste 300,</Typography>
      <Typography className="contact-us-content">Sugarland, Texas, 77478,</Typography>
      <Typography className="contact-us-content">United States of America</Typography>
      <Typography className="contact-us-content">
        Email: <Link to="mailto:support@drapefit.com">support@drapefit.com</Link>{' '}
      </Typography>
      <Typography className="contact-us-content">
        Customer Care: <Link to="tel:469-502-3617">469-502-3617</Link>
      </Typography>
      <Typography className="contact-us-question">Still Need Help?</Typography>
      <Typography className="contact-form-title">MAKE AN INQUIRY</Typography>
      <Divider className="contact-us-divider" />
      <ContactForm />
    </>
  )
};

const ContactUs = () => {
  return <CAbout propsValue={result} />;
};

export default ContactUs;
