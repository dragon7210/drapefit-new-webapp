import { Grid, Typography } from '@mui/material';

const Footer = () => {
  return (
    <>
      <Grid className="footer" container spacing={2} display="flex" justifyContent="space-around">
        <Grid item md={2} xs={12}>
          <Typography>Hello</Typography>
        </Grid>
        <Grid item sm={2} xs={12}>
          Hi
        </Grid>
        <Grid item sm={2} xs={12}>
          Hi
        </Grid>
        <Grid item sm={2} xs={12}>
          Hi
        </Grid>
        <Grid item sm={2} xs={12}>
          Hi
        </Grid>
        <Grid item sm={2} xs={12}>
          Hi
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
