import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Grid, Typography, Button, RadioGroup, FormControl, FormControlLabel } from '@mui/material';

import { setAlert } from 'actions/common/alert';
import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import AddZeroPrefix from 'utils/AddZeroPrefix';
import CustomRadio from '../component/profile/CustomRadio';

const CreditCards = GenS3Link('landing/images/client/profile/card/credit-cards');

const Payment = () => {
  const dispatch = useDispatch();
  const [card, setCard] = useState(null);
  const { payMethods } = useSelector((state) => state.payment);

  return (
    <Box className="overview">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className="overview-sup-title">PAYMENT DETAILS</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ borderColor: '#ff6c00' }} />
        </Grid>
        <Grid item xs={12}>
          <Grid container className="saved-card">
            <Grid item xs={12} md={8}>
              <Typography className="payment-sub-title">Your saved debit and credit cards</Typography>
            </Grid>
            <Grid item xs={12} md={2} className="v-align-center down-lg-hidden">
              <Typography>Name</Typography>
            </Grid>
            <Grid item xs={12} md={2} className="v-align-center down-lg-hidden">
              <Typography>Expires date</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ margin: '10px 0' }} />
            </Grid>
            <Grid item xs={12}>
              <FormControl className="card-group">
                <RadioGroup name="radio-buttons-group">
                  {payMethods.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={index}
                      control={<CustomRadio />}
                      onClick={() => setCard(item)}
                      label={
                        <Grid container>
                          <Grid item xs={6.5} md={4} className="v-align-center">
                            <DFnewImgTag
                              src={`${CreditCards}.webp`}
                              fallback={`${CreditCards}.png`}
                              height="30"
                              lzheight={32}
                              alt="Credit Card"
                            />
                            <Typography>&nbsp;&nbsp;{item.card.brand.toUpperCase()}</Typography>
                          </Grid>
                          <Grid item xs={5.5} md={4} className="v-align-center">
                            <Typography>xxxxxxxxxxxx{item.card.last4}</Typography>
                          </Grid>
                          <Grid item xs={6} md={2} className="v-align-center">
                            <Typography>{item.billing_details.name}</Typography>
                          </Grid>
                          <Grid item xs={6} md={2} className="v-align-center">
                            <Typography>
                              {item.card.exp_year}-{AddZeroPrefix(item.card.exp_month)}
                            </Typography>
                          </Grid>
                        </Grid>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Link to="/add-card/payment" className="add-card-link">
            Add a card
          </Link>
        </Grid>
        <Grid item xs={12} className="h-align-right">
          <Button
            className="profile-gradient-btn"
            disableElevation
            style={{
              opacity: card ? 1 : 0.65,
              zIndex: card ? 1 : -1,
              cursor: card ? 'pointer' : 'not-allowed'
            }}
            onClick={() => setAlert('TEST TODO: Successfully set to default', 'error')}
          >
            SET IN DEFAULT
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Payment;
