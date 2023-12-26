import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import MyEnvConfig from 'configs/MyEnvConfig';
import CheckoutForm from '../component/profile/PayCheckoutForm';
import 'assets/scss/_stripe.scss';
import { createCustomerSecretMethod } from 'actions/payment';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(`${MyEnvConfig.stripe.pbKey}`);

const AddCard = () => {
  const appearance = {
    theme: 'stripe'
  };

  const [options, setOptions] = useState({
    // passing the client secret obtained from the server
    appearance
  });

  const [userId, setUserId] = useState('');

  useEffect(() => {
    (async () => {
      const body = await createCustomerSecretMethod();
      console.log(body);
      const options = {
        clientSecret: body.clientSecret,
        appearance
      };
      setOptions(options);
      setUserId(res?.user?.id);
    })();
  }, []);

  return (
    <div className="stripe">
      {options.clientSecret && (
        <Elements options={options} stripe={stripePromise} style={{ width: '100%' }}>
          <CheckoutForm userId={userId} />
        </Elements>
      )}
    </div>
  );
};

export default AddCard;
