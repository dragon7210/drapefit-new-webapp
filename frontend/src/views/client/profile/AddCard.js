import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import MyEnvConfig from 'configs/MyEnvConfig';
import CheckoutForm from '../component/profile/PayCheckoutForm';
import 'assets/scss/_stripe.scss';

const stripePromise = loadStripe(`${MyEnvConfig.stripe.pbKey}`);

const AddCard = () => {
  const appearance = {
    theme: 'stripe'
  };
  const options = {
    appearance
  };

  return (
    <div className="stripe">
      <Elements options={options} stripe={stripePromise} style={{ width: '100%' }}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default AddCard;
