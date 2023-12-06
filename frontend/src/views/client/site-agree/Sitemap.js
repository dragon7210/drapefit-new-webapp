import { Link } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';

import CAbout from '../components/About';
import ThreeWords from '../component/ThreeWords';

const result = {
  link: 'Home',
  typo: 'Site Map',
  title: {
    first: '',
    last: 'SITE MAP'
  },
  content: (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography className="sitemap-title">SERVICE</Typography>
          <Link className="sitemap-link" to="/men">
            Men's Clothing
          </Link>
          <Link className="sitemap-link" to="/men/big-tall">
            Big & Tall Men's Clothing
          </Link>
          <Link className="sitemap-link" to="/women">
            Women's Clothing
          </Link>
          <Link className="sitemap-link" to="/women/plus-size">
            Plus Size Clothing
          </Link>
          <Link className="sitemap-link" to="/women/women-jeans">
            Women Jeans Clothing
          </Link>
          <Link className="sitemap-link" to="/women/women-business">
            Women Business Clothing
          </Link>
          <Link className="sitemap-link" to="/women/activewear">
            Women's Activewear
          </Link>
          <Link className="sitemap-link" to="/women/maternity/activewear">
            Maternity Activewear
          </Link>
          <Link className="sitemap-link" to="/women/plus/activewear">
            Plus Activewear
          </Link>
          <Link className="sitemap-link" to="/kids">
            Kids Clothing Box
          </Link>
          <Link className="sitemap-link" to="/women">
            Size Inclusive Clothing
          </Link>
          <Link className="sitemap-link" to="/recommended/how-drape-fit-works">
            How Drape Fit Works
          </Link>
          <Link className="sitemap-link" to="/recommended/fit-box-pricing">
            Fit Box Pricing
          </Link>
          <Link className="sitemap-link" to="/recommended/personal-stylist">
            Personal Stylist
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography className="sitemap-title">CUSTOMER CARE</Typography>
          <Link className="sitemap-link" to="/customer-care/faq">
            FAQ
          </Link>
          <Link className="sitemap-link" to="/customer-care/gift-card">
            Gift Card
          </Link>
          <Link className="sitemap-link" to="/customer-care/return-and-exchange">
            Return & Exchange
          </Link>
          <Link className="sitemap-link" to="/customer-care/track-order">
            Track Order
          </Link>
          <Link className="sitemap-link" to="/customer-care/help-center">
            Help Center
          </Link>
          <Link className="sitemap-link" to="/customer-care/contact-us">
            Contact Us
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography className="sitemap-title">COMPANY</Typography>
          <Link className="sitemap-link" to="/the-company/news">
            News
          </Link>
          <Link className="sitemap-link" to="/the-company/investors-relation">
            Investors Relation
          </Link>
          <Link className="sitemap-link" to="/the-company/careers">
            Careers
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography className="sitemap-title">WOMEN STYLE</Typography>
          <Link className="sitemap-link" to="/women">
            Women's Clothing
          </Link>
          <Link className="sitemap-link" to="/women/plus-size">
            Plus Size Clothing
          </Link>
          <Link className="sitemap-link" to="/women/women-jeans">
            Women Jeans Clothing
          </Link>
          <Link className="sitemap-link" to="/women/women-business">
            Women Business Clothing
          </Link>
          <Link className="sitemap-link" to="/women/activewear">
            Women's Activewear
          </Link>
          <Link className="sitemap-link" to="/women/maternity/activewear">
            Maternity Activewear
          </Link>
          <Link className="sitemap-link" to="/women/plus/activewear">
            Plus Activewear
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography className="sitemap-title">MENS STYLE</Typography>
          <Link className="sitemap-link" to="/men">
            Men's Clothing
          </Link>
          <Link className="sitemap-link" to="/men/big-tall">
            Big & Tall Men's Clothing
          </Link>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography className="sitemap-title">RECOMMENDED</Typography>
          <Link className="sitemap-link" to="/recommended/how-drape-fit-works">
            How Drape Fit Works
          </Link>
          <Link className="sitemap-link" to="/recommended/fit-box-pricing">
            Fit Box Pricing
          </Link>
          <Link className="sitemap-link" to="/recommended/personal-stylist">
            Personal Stylist
          </Link>
        </Grid>
      </Grid>
    </>
  )
};

const Sitemap = () => {
  return (
    <>
      <CAbout propsValue={result} />
      <ThreeWords />
    </>
  );
};

export default Sitemap;
