import { Box, Divider, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Overview = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Box className="overview">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography className="overview-title">LOGIN DETAILS</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography className="overview-content">{user?.email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className="overview-title">YOUR ADDRESS</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography className="overview-content">Address Not Available</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className="overview-title">PAYMENT DETAILS</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography className="overview-content">Debit and credit cards info</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className="overview-title">MANAGE FIT SETTING</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography className="overview-content">You are currently receiving Fits on demand</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className="overview-title">ACCOUNT CREDIT</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography className="overview-content">$0.00</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className="overview-title">EMAIL PREFERENCE</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography className="overview-content">
            Currently receiving exclusive offers, news, styling tips and more
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className="overview-title">MANAGE FACEBOOK SETTING</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography className="overview-content">Sign into Drape Fit with Facebook—no password required</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className="overview-title">MANAGE CONTACT SETTING</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography className="overview-content">
            You can connect your address book to more easily refer your friends to use Fit
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
