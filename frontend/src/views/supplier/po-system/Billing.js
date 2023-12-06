import { TextField, Grid, Typography } from '@mui/material';
import 'assets/scss/_addPayMethod.scss';

const Billing = ({ bankInfo, handleChange }) => {
  return (
    <div>
      <Typography className="billing-info-title">Billing Information</Typography>
      <Grid container padding={2}>
        <Grid container spacing={4} marginTop={2}>
          <Grid item xs={6} sm={4}>
            <TextField
              id="outlined-basic"
              label="Beneficiary Bank Name"
              value={bankInfo.bankName}
              name="bankName"
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              id="outlined-basic"
              label="Beneficiary Bank Address"
              value={bankInfo.bankAddress}
              name="bankAddress"
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              id="outlined-basic"
              label="Swift Code"
              value={bankInfo.swiftCode}
              name="swiftCode"
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              id="outlined-basic"
              label="Beneficiary Bank Code"
              value={bankInfo.bankCode}
              name="bankCode"
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              id="outlined-basic"
              label="Beneficiary Name"
              value={bankInfo.name}
              name="name"
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              id="outlined-basic"
              label="Beneficiary Account"
              value={bankInfo.account}
              name="account"
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={12}>
            <TextField
              id="outlined-basic"
              label="Payment Link"
              value={bankInfo.link}
              name="link"
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Billing;
