import { useState } from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import PropTypes from 'prop-types';

const CReadMore = ({ propsValue }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Grid className="read-more" container>
        <Grid item xs={12}>
          <Typography className="orange-bold-title">{propsValue.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className="read-more-content" align="center">
            {propsValue.content}
          </Typography>
        </Grid>
        {visible && (
          <Grid item xs={12}>
            <Typography className="read-more-title">Who Does Drape Fit Style?</Typography>
            <Typography className="read-more-content">
              Find the brands and styles you love from more than 300+ brands with Drape Fit. We carry a variety of
              women's sizes, from XS to 3X. Plus sizes, Petite sizes, and maternity styles are available, too. We also
              carry a variety of sizes for men, from XS to 3XL. We also have outfits specifically tailored for big and
              tall men.
            </Typography>
            <Typography className="read-more-title">How Does Drape Fit Find Your Fit and Unique Style?</Typography>
            <Typography className="read-more-content">
              At Drape Fit, we have real people who understand your sense of style. These are stylists who have received
              relevant training and possess many years of styling experience. Your stylist at Drape Fit can assist you
              in creating and completing a look, collaborating on trends, recommending pieces that fit your unique body,
              and incorporating your feedback into each item they send. Before approving any item, you can get a preview
              of how it will look and how you can style it to look flattering to your body type. You can team up with
              your personal stylist and give and receive feedback on the items and looks. You do not need to commit to
              anything before trying it. We ensure the best outfits with perfect fits and endless At Drape Fit, we are
              experts at what we do- helping you find your fit and style. We study the style quiz you take before
              subscribing and work with your feedback as and when you share them. This helps us understand your taste
              and how you like to carry yourself. This also helps us suggest the ongoing trends that resonate the most
              with you. In this way, we do not just customize pieces and clothing subscription boxes for you, but we
              tailor them to suit you and only you. You can also choose to style on your own. After your first Drape Fit
              subscription box, you can surf through the uncountable options on our website and create your own clothing
              box.
            </Typography>
            <Typography className="read-more-title">
              Why Choose Drape Fit for Clothing Subscription Boxes in US?
            </Typography>
            <Typography className="read-more-content">
              Choose your style, fit, and pricing, and get a curated box of clothes for men and women with hand-picked
              apparel delivered straight to your doorstep. And surprisingly, you only keep what you find best for
              yourself. Just answer a few straightforward and simple questions that express your physique and your
              personality, and our stylists will know what to send to you. So get ready for a personalized shopping
              experience tailored to suit you best!
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography></Typography>
        </Grid>
        <Grid item xs={12}>
          <Box className="h-align-center" sx={{ my: 2 }}>
            {visible ? (
              <Button className="custom-btn" variant="contained" onClick={() => setVisible(!visible)}>
                READ LESS
              </Button>
            ) : (
              <Button className="custom-btn" variant="contained" onClick={() => setVisible(!visible)}>
                READ MORE
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

CReadMore.propTypes = {
  propsValue: PropTypes.object
};

export default CReadMore;
