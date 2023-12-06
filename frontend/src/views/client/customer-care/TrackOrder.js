import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

import CAbout from '../components/About';

const result = {
  link: 'Home',
  typo: 'Track Order',
  title: {
    first: 'TRACK',
    last: 'ORDER'
  },
  content: (
    <>
      <Typography className="breadcrumb-link">Does Fit Box have a tracking number?</Typography>
      <Typography className="about-content">
        You'll receive an email with a tracking number once your Fit Box has shipped. Within 24 hours of receiving this
        notification, you should be able to track your Fit Box. We don't provide a way to track your returns once you've
        sent them back to us — we'll get in touch with you if there are any issues.
      </Typography>
      <Typography className="breadcrumb-link">Which carriers does Drape Fit use?</Typography>
      <Typography className="about-content">
        Drape Fit clients enjoy free shipping both ways as a benefit of using our service! We use USPS to ship packages
        to you. Returns are easy. When you're done trying things on, just return the fits you don't want into the
        prepaid envelope we included in your shipment and drop it off at any USPS mailbox or pickup location.
      </Typography>
      <Typography className="breadcrumb-link">Can you ship via USPS all the time?</Typography>
      <Typography className="about-content">
        At this time, the carrier we use for you is determined by region and zip code. As we grow, we hope to provide
        more <Link to="#">flexible shipping options to our clients</Link>.
      </Typography>
      <Typography className="breadcrumb-link">How do I update my shipping address?</Typography>
      <Typography className="about-content">
        You can update your shipping address anytime from your Signin page. If you experience any errors saving your
        information, please try accessing the site from a different web browser or device. If your package has already
        shipped and you need to change your address. Please email us
        <Link to="mailto:support@drapefit.com">support@drapefit.com</Link>.
      </Typography>
      <Typography className="breadcrumb-link">Do you guarantee the arrival date?</Typography>
      <Typography className="about-content">
        We try to have your Fit Box arrive as close as possible to the date you've selected. However, due to various
        factors in putting all items and shipping an order, we can't guarantee an exact arrival date. If your shipment
        doesn't arrive within five days of your requested date, please email us{' '}
        <Link to="mailto:support@drapefit.com">support@drapefit.com</Link>.
      </Typography>
    </>
  )
};

const TrackOrder = () => {
  return <CAbout propsValue={result} />;
};

export default TrackOrder;
