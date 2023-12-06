import { Link } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from '@mui/material/styles';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import Copyright from './Copyright';

const Logo = GenS3Link('landing/images/logo_full');

library.add(fab);

const Footer = () => {
  const theme = useTheme();
  return (
    <>
      <Grid className="footer" container spacing={2} display="flex" justifyContent="space-around">
        <Grid item lg={3} xs={12}>
          <Grid container direction="column" alignContent="center">
            <Grid item marginTop="30px">
              <Link to="/">
                <DFnewImgTag
                  src={`${Logo}.webp`}
                  fallback={`${Logo}.png`}
                  className="img-logo-full"
                  height="45"
                  lzheight={45}
                  alt="Drape Fit Inc."
                />
              </Link>
            </Grid>
            <Grid item>
              <Typography className="footer-do-best">WE DO BEST FIT</Typography>
            </Grid>
            <Grid item>
              <Link className="footer-usa">United States</Link>
            </Grid>
            <Grid item>
              <Typography className="footer-follow-us">Follow Us&nbsp;:</Typography>
            </Grid>
            <Grid item>
              <Link to="https://www.facebook.com/drapefitinc" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className="footer-social-icon" icon={['fab', 'facebook']} />
              </Link>
              <Link to="https://twitter.com/drapefitinc" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className="footer-social-icon" icon={['fab', 'twitter']} />
              </Link>
              <Link to="https://www.instagram.com/drapefitinc/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className="footer-social-icon" icon={['fab', 'instagram']} />
              </Link>
              <Link to="https://www.pinterest.com/drapefitinc/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className="footer-social-icon" icon={['fab', 'pinterest']} />
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={9} xs={12}>
          <Grid
            container
            justifyContent="space-around"
            sx={{ [theme.breakpoints.down('lg')]: { direction: 'column' } }}
          >
            <Grid item lg={2} xs={12}>
              <Grid
                container
                rowSpacing={1.2}
                direction="column"
                sx={{
                  [theme.breakpoints.down('lg')]: {
                    marginLeft: '36vw',
                    maxWidth: '160px'
                  },
                  [theme.breakpoints.down('sm')]: {
                    marginLeft: '100px'
                  }
                }}
              >
                <Grid item sx={{ marginTop: '30px' }}>
                  <Link className="footer-link-title">ABOUT US</Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/about-us/who-we-are">
                    Who We Are
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/about-us/our-mission">
                    Our Mission
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/about-us/our-stylist">
                    Our Stylist
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/about-us/executive-team">
                    Excutive Team
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={2} xs={12}>
              <Grid
                container
                rowSpacing={1.2}
                direction="column"
                sx={{
                  [theme.breakpoints.down('lg')]: {
                    marginLeft: '36vw',
                    maxWidth: '160px'
                  },
                  [theme.breakpoints.down('sm')]: {
                    marginLeft: '100px'
                  }
                }}
              >
                <Grid item sx={{ marginTop: '30px' }}>
                  <Link className="footer-link-title">SERVICE</Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/men">
                    Men
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/men/big-tall">
                    Big & Tall
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/women">
                    Women
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/women/plus-size">
                    Plus size Fits
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/women/maternity">
                    Maternity Fits
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/women/petite">
                    Petite
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/women/women-jeans">
                    Women Jeans
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/women/women-business">
                    Women Business Fits
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/kids">
                    Kids
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={2} xs={12}>
              <Grid
                container
                rowSpacing={1.2}
                direction="column"
                sx={{
                  [theme.breakpoints.down('lg')]: {
                    marginLeft: '36vw',
                    maxWidth: '160px'
                  },
                  [theme.breakpoints.down('sm')]: {
                    marginLeft: '100px'
                  }
                }}
              >
                <Grid item sx={{ marginTop: '30px' }}>
                  <Link className="footer-link-title">THE COMPANY</Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/the-company/news">
                    News
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/the-company/careers">
                    Careers
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={2} xs={12}>
              <Grid
                container
                rowSpacing={1.2}
                direction="column"
                sx={{
                  [theme.breakpoints.down('lg')]: {
                    marginLeft: '36vw',
                    maxWidth: '160px'
                  },
                  [theme.breakpoints.down('sm')]: {
                    marginLeft: '100px'
                  }
                }}
              >
                <Grid item sx={{ marginTop: '30px' }}>
                  <Link className="footer-link-title">RECOMMENDED</Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/recommended/how-drape-fit-works">
                    How Drape Fit Works
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/recommended/fit-box-pricing">
                    FIT Box Pricing
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/recommended/personal-stylist">
                    Personal Stylist
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={2} xs={12}>
              <Grid
                container
                rowSpacing={1.2}
                direction="column"
                sx={{
                  [theme.breakpoints.down('lg')]: {
                    marginLeft: '36vw',
                    maxWidth: '160px'
                  },
                  [theme.breakpoints.down('sm')]: {
                    marginLeft: '100px'
                  }
                }}
              >
                <Grid item sx={{ marginTop: '30px' }}>
                  <Link className="footer-link-title">CUSTOMER CARE</Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/customer-care/faq">
                    FAQ
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/customer-care/return-and-exchange">
                    Return & Exchange
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/customer-care/track-order">
                    Track Order
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/customer-care/help-center">
                    Help Center
                  </Link>
                </Grid>
                <Grid item>
                  <Link className="footer-link-item" to="/customer-care/contact-us">
                    Contact Us
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Copyright />
    </>
  );
};

export default Footer;
