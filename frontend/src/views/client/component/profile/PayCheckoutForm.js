import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Typography, Button } from '@mui/material';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';

import { attachPaymentMethod } from 'actions/payment';
import DFnewLogger from 'utils/DFnewLogger';
import 'assets/scss/_addPayMethod.scss';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [cardInfo, setCardInfo] = useState({
    name: '',
    expiry: '',
    number: '',
    address: {
      line: '',
      postal_code: ''
    }
  });
  const [locations, setLocations] = useState({
    countries: '',
    states: '',
    cities: ''
  });
  const [selectedLocation, setSelectedLocation] = useState({
    country: '',
    city: '',
    state: ''
  });
  const handleChangeName = (e) => {
    const { value } = e.target;
    setCardInfo((prev) => {
      return { ...prev, name: value };
    });
  };
  const parseForSelect = (arr) => {
    return arr.map((item) => ({
      label: item.name,
      value: item.isoCode ? item.isoCode : item.name
    }));
  };
  const handleSelectCountry = (country) => {
    const states = State.getStatesOfCountry(country.value);
    setSelectedLocation((prev) => {
      return { ...prev, country };
    });
    setLocations((prev) => ({ ...prev, states: parseForSelect(states) }));
  };
  const handleSelectState = (state) => {
    const cities = City.getCitiesOfState(selectedLocation.country.value, state.value);
    setSelectedLocation((prev) => {
      return { ...prev, state };
    });
    setLocations((prev) => ({ ...prev, cities: parseForSelect(cities) }));
  };
  const handleSelectCity = (city) => {
    setSelectedLocation((prev) => {
      return { ...prev, city };
    });
  };
  async function handleSubmit() {
    const address = cardInfo.address;
    const billingDetails = {
      name: cardInfo.name,
      address: {
        country: address.country,
        state: address.state,
        city: address.city,
        line1: address.line
      }
    };
    stripe
      .createPaymentMethod({
        type: 'card',
        billing_details: billingDetails,
        card: elements.getElement(CardElement)
      })
      .then((resp) => {
        DFnewLogger(resp);
        attachPaymentMethod({ paymentMethod: resp.paymentMethod }, navigate);
      })
      .catch((err) => {
        DFnewLogger(err);
      });
  }

  useEffect(() => {
    const allCountry = Country.getAllCountries();
    setLocations((prev) => {
      return { ...prev, countries: parseForSelect(allCountry) };
    });
  }, []);

  return (
    <>
      <div id="payment-form" style={{ marginBottom: '100px', maxWidth: '700px' }}>
        <Button className="add-card-close-btn" onClick={() => navigate('/welcome/payment')}>
          Close
        </Button>
        <Typography className="billing-info-title">Billing Information</Typography>
        <div className="wrapper">
          <div className="innerWrapper">
            <div className="row">
              <label htmlFor="pay-name">Cardholder Name</label>
              <input
                id="pay-name"
                onChange={handleChangeName}
                type="text"
                name="name"
                placeholder="Enter card holder name"
              />
            </div>
            <label htmlFor="pay-card">Card Details</label>
            <div className="rowPaymentInput">
              <CardElement />
            </div>
            <div className="addressWrapper">
              <div className="rowSelect">
                <div>
                  <label htmlFor="pay-country">Country</label>
                  <Select
                    id="pay-country"
                    isClearable={true}
                    isSearchable={true}
                    name="country"
                    value={selectedLocation.country}
                    options={locations.countries}
                    onChange={handleSelectCountry}
                  />
                </div>
                <div>
                  <label htmlFor="pay-state">State</label>
                  <Select
                    id="pay-state"
                    isClearable={true}
                    isSearchable={true}
                    name="state"
                    value={selectedLocation.state}
                    options={locations.states}
                    onChange={handleSelectState}
                  />
                </div>
              </div>
              <div className="rowSelect">
                <div>
                  <label htmlFor="pay-city">City</label>
                  <Select
                    id="pay-city"
                    isClearable={true}
                    isSearchable={true}
                    name="city"
                    value={selectedLocation.city}
                    options={locations.cities}
                    onChange={handleSelectCity}
                  />
                </div>
              </div>
              <div className="btnContainer">
                <button className="paynow add-card-submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
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
