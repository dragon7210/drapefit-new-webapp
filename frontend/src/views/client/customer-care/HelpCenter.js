import { Link } from 'react-router-dom';
import { Grid, Typography, Divider } from '@mui/material';

import CAbout from '../components/About';

const result = {
  link: 'Home',
  typo: 'Help Center',
  title: {
    first: 'HELP',
    last: 'CENTER'
  },
  content: (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography className="help-center-title">What Can We Help You With?</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography className="help-center-sub-title">About Drape Fit</Typography>
          <Divider className="custom-divider" />
          <Link className="help-center-content">What is Drape Fit & How it works</Link>
          <Link className="help-center-content">Drape Fit vs Online shopping or in a store shopping</Link>
          <Link className="help-center-content">About Drape Fit Clothing</Link>
          <Link className="help-center-content">Price range of Drape Fit Clothing</Link>
          <Link className="help-center-content">Extra Fits</Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography className="help-center-sub-title">Style Profile</Typography>
          <Divider className="custom-divider" />
          <Link className="help-center-content">About Style Profile</Link>
          <Link className="help-center-content">Find Your Size</Link>
          <Link className="help-center-content">Whom we can style</Link>
          <Link className="help-center-content">FAQ about stylists</Link>
          <Link className="help-center-content">More Styles</Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography className="help-center-sub-title">General Questions</Typography>
          <Divider className="custom-divider" />
          <Link className="help-center-content">Schedule your Shipment</Link>
          <Link className="help-center-content">Order History</Link>
          <Link className="help-center-content">Customer service</Link>
          <Link className="help-center-content">Security</Link>
          <Link className="help-center-content">More Services</Link>
        </Grid>
      </Grid>
    </>
  )
};

const HelpCenter = () => {
  return <CAbout propsValue={result} />;
};

export default HelpCenter;
