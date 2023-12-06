import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Grid, Typography, Box } from '@mui/material';

const ExpectFromUs = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Grid className="expect-from-us" container spacing={6}>
        <Grid item xs={12}>
          <Typography className="orange-bold-title">What To Expect From Us</Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'start' } }}>
            <Typography className="expect-from-us-item-num" sx={{ borderRadius: { xs: '50%', md: '20%' } }}>
              01
            </Typography>
          </Box>
          <Typography className="expect-from-us-item-title" sx={{ textAlign: { xs: 'center', md: 'start' } }}>
            ORDER ON DEMAND
          </Typography>
          <Typography className="expect-from-us-item-content" sx={{ textAlign: { xs: 'center', md: 'start' } }}>
            You can {` `}
            <Link to={user ? `${user?.pRoute}` : '/login'}>order your FIT Box</Link>
            {` `} on your need. Schedule oline and cancel any time.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'start' } }}>
            <Typography className="expect-from-us-item-num" sx={{ borderRadius: { xs: '50%', md: '20%' } }}>
              02
            </Typography>
          </Box>
          <Typography className="expect-from-us-item-title" sx={{ textAlign: { xs: 'center', md: 'start' } }}>
            TRY IN HOME
          </Typography>
          <Typography className="expect-from-us-item-content" sx={{ textAlign: { xs: 'center', md: 'start' } }}>
            A FIT Box will be delivered in your door. Try at home and return if you don't like. You have 5 days to buy
            or return. It's that easy.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'start' } }}>
            <Typography className="expect-from-us-item-num" sx={{ borderRadius: { xs: '50%', md: '20%' } }}>
              03
            </Typography>
          </Box>
          <Typography className="expect-from-us-item-title" sx={{ textAlign: { xs: 'center', md: 'start' } }}>
            SAVE UP TO 25%
          </Typography>
          <Typography className="expect-from-us-item-content" sx={{ textAlign: { xs: 'center', md: 'start' } }}>
            Plenty options to save. If you keep all items you can save up to 25%.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'start' } }}>
            <Typography className="expect-from-us-item-num" sx={{ borderRadius: { xs: '50%', md: '20%' } }}>
              04
            </Typography>
          </Box>
          <Typography className="expect-from-us-item-title" sx={{ textAlign: { xs: 'center', md: 'start' } }}>
            FREE SHIPPING AND RETURNS
          </Typography>
          <Typography className="expect-from-us-item-content" sx={{ textAlign: { xs: 'center', md: 'start' } }}>
            Free shipping both the ways. Keep what you like. Return what doesn't FIT you.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ExpectFromUs;
