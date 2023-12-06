import { Link } from 'react-router-dom';
import { Box, Divider, Grid, Button, Typography } from '@mui/material';

const Contact = () => {
  return (
    <Box className="overview">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className="overview-sup-title">MANAGE CONTACT SETTINGS</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ borderColor: '#ff6c00' }} />
        </Grid>
        <Grid item xs={12}>
          <Typography className="account-common-title">Contact Settings</Typography>
          <Typography className="account-common-content">
            Drape Fit stores your contacts to make it easier to send referral emails and for other purposes as stated in
            our privacy policy. You may modify your contact settings at any time from here.
          </Typography>
          <Typography className="account-common-content">
            You don't currently have an address book connected. You can connect your address book to more easily refer
            your friends to use Fit.
          </Typography>
        </Grid>
        <Grid item xs={12} className="h-align-right">
          <Button className="account-no-btn">CANCEL</Button>
          <Link to="/clients/referrals">
            <Button className="account-yes-btn long">
              <Typography sx={{ display: { xs: 'none', sm: 'contents' } }}>
                <strong>CONNECT</strong>
              </Typography>
              &nbsp;ADDRESS&nbsp;
              <Typography sx={{ display: { xs: 'none', sm: 'contents' } }}>
                <strong>BOOK</strong>
              </Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
