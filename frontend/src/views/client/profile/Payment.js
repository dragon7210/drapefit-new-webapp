import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Grid, Button, Typography, FormControl, FormControlLabel, RadioGroup } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CustomRadio from 'views/client/component/profile/CustomRadio';
import MyEnvConfig from 'configs/MyEnvConfig';
import { createPayIntentOfStyleFee, getPaymentMethods } from 'actions/payment';
import { SET_LOADING } from 'actions/common/types';
import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import AddZeroPrefix from 'utils/AddZeroPrefix';
import NavTabs from '../component/profile/NavTabs';
import 'assets/scss/_paymentForm.scss';

const FitBox = GenS3Link('landing/images/client/profile/men/add-card/fit-box');
const CreditCards = GenS3Link('landing/images/client/profile/card/credit-cards');
const stripePromise = loadStripe(`${MyEnvConfig.stripe.pbKey}`);

const PaymentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { payMethods } = useSelector((state) => state.payment);
  const [card, setCard] = useState(null);
  const { allAddress, shippingAddressId } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getPaymentMethods());
  }, [dispatch]);

  const handleSubmit = () => {
    dispatch({ type: SET_LOADING });

    let addressId = shippingAddressId;
    if (!shippingAddressId) {
      allAddress.forEach((ele) => {
        if (ele.default_set) {
          addressId = ele.id;
        }
      });
      if (!addressId) {
        addressId = allAddress[0].id;
      }
    }
    dispatch(createPayIntentOfStyleFee({ paymentMethod: card.id, shippingAddressId: addressId }, navigate));
  };

  return (
    <>
      <NavTabs />
      <Divider />
      <Grid container className="payment-method">
        <Grid item xs={12}>
          <Typography className="payment-title">Select Payment Method</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <Grid container className="saved-card">
                <Grid item xs={12} md={8}>
                  <Typography className="payment-sub-title">Your saved debit & credit cards</Typography>
                </Grid>
                <Grid item xs={12} md={2} className="v-align-center down-md-hidden">
                  <Typography>Name</Typography>
                </Grid>
                <Grid item xs={12} md={2} className="v-align-center down-md-hidden">
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
                          onClick={() => {
                            setCard(item);
                          }}
                          label={
                            <Grid container>
                              <Grid item xs={6.5} md={4} className="v-align-center">
                                <DFnewImgTag
                                  src={`${CreditCards}.webp`}
                                  fallback={`${CreditCards}.png`}
                                  height="30"
                                  lzheight={32}
                                  alt="Card"
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
            <Grid item xs={12} md={3}>
              <Grid container className="saved-card">
                <Grid item xs={12}>
                  <Button
                    className="card-list-continue-btn"
                    style={{
                      opacity: card ? 1 : 0.65,
                      zIndex: card ? 1 : -1,
                      cursor: card ? 'pointer' : 'not-allowed'
                    }}
                    onClick={() => handleSubmit()}
                  >
                    CONTINUE
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography className="pay-continue-title">
                    Shipping & returns
                    <span className="pay-continue-content">Free</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className="pay-continue-title">
                    Styling fees
                    <span className="pay-continue-content">$20</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className="pay-continue-title">
                    <strong>Includes:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className="pay-continue-title">&#8728;&nbsp;Handle-selected Fits from stylist</Typography>
                  <Typography className="pay-continue-title">&#8728;&nbsp;Styling advice</Typography>
                  <Typography className="pay-continue-title">&#8728;&nbsp;Free return envelope</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ margin: '10px 0' }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography className="pay-continue-title bolder">
                    <strong>Total:</strong>
                    <span className="pay-continue-content">$20</span>
                  </Typography>
                </Grid>
              </Grid>
              <DFnewImgTag
                src={`${FitBox}.webp`}
                fallback={`${FitBox}.jpg`}
                width="100%"
                lzheight={`auto`}
                style={{ minHeight: '197px' }}
                alt="Drape FIT Box"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const Payment = () => {
  const appearance = {
    theme: 'stripe'
  };
  const options = {
    appearance
  };

  return (
    <Elements options={options} stripe={stripePromise} style={{ width: '100%' }}>
      <PaymentList />
    </Elements>
  );
};

export default Payment;
