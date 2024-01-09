import { useNavigate } from 'react-router';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Typography, Button } from '@mui/material';

// import DFnewLogger from 'utils/DFnewLogger';
import 'assets/scss/_addPayMethod.scss';
import DFnewLogger from 'utils/DFnewLogger';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addCardDetails } from 'actions/payment';

const CheckoutForm = ({ userId }) => {
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        redirect: 'if_required'
      });

      dispatch(addCardDetails(setupIntent));
      setTimeout(() => navigate('/welcome/payment'), 2000);

      if (error) {
        DFnewLogger(error);
      }
    },
    [userId, stripe]
  );

  return (
    <>
      <div id="payment-form" style={{ marginBottom: '100px', maxWidth: '700px' }}>
        <Button className="add-card-close-btn" onClick={() => navigate('/welcome/payment')}>
          Close
        </Button>
        <Typography className="billing-info-title">Billing Information</Typography>
        <div className="wrapper">
          <div className="innerWrapper">
            <label htmlFor="pay-card">Card Details</label>
            <form onSubmit={handleSubmit}>
              <PaymentElement />
              {/* <div className="addressElement">
                    <AddressElement options={{ mode: 'shipping' }} />
                  </div> */}
              <div className="addressWrapper">
                <div className="btnContainer">
                  <button className="paynow add-card-submit" id="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <span>
          By providing your card information, you allow Drape Fit to charge your card for future payments in accordance
          with their terms.
        </span>
      </div>
    </>
  );
};

export default CheckoutForm;
