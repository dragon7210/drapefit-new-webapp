import React, { useEffect, useState } from 'react';
import NavTabs from 'views/client/component/profile/NavTabs';
import { Grid, Divider, Button, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getTaxRate } from 'actions/client/profile';
import { useNavigate } from 'react-router-dom';
import { SET_LOADING } from 'actions/common/types';
import { payForProducts } from 'actions/payment';

const CustomerOrderReview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.profile.products);
  const { allAddress, shippingAddressId } = useSelector((state) => state.profile);

  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingAddress, setShippingAddress] = useState();
  const { payMethods } = useSelector((state) => state.payment);
  const [discount, setDiscounted] = useState(0.75);

  useEffect(() => {
    let tmp = 0;
    products.forEach((element) => {
      if (element.checkedout === 'N' && element.keep_status === 3) {
        tmp += element.sell_price;
      }
    });
    setTotalPrice(tmp);

    setDiscounted(products.filter((p) => p.keep_status === 3).length === products.length ? 0.75 : 1);
  }, [products]);

  useEffect(() => {
    (async () => {
      if (allAddress.length === 0) return;
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

      const address = allAddress.find((e) => e.id === addressId);
      setShippingAddress(address);
      const taxRate = await getTaxRate(address.zipcode);
      setTax(taxRate);
    })();
  }, [shippingAddressId, allAddress]);

  useEffect(() => {
    console.log(payMethods);
  }, [payMethods]);

  const handleSubmit = () => {
    dispatch({ type: SET_LOADING });
    dispatch(
      payForProducts(
        {
          paymentMethod: payMethods[0].id,
          shippingAddressId,
          products,
          stylistPicksSubtotal: totalPrice,
          salesTax: tax * discount * totalPrice,
          orderTotal: tax * discount * totalPrice + totalPrice * discount
        },
        navigate
      )
    );
  };

  return (
    <>
      <NavTabs />
      <Divider />
      <Container fixed sx={{ py: '40px' }} maxWidth="xl">
        <Button className="back-button-box" onClick={() => navigate('/order-review')}>
          Back
        </Button>
        <h1 className="order-review-title">Order Review</h1>
        <Grid container rowGap={2}>
          <Grid item sm={12} md={4} lg={3} className="Address-details">
            <h3>
              Shipping address
              {/* <button>Change</button> */}
            </h3>
            <div>
              {shippingAddress?.full_name}
              <br />
              {shippingAddress?.address}
              <br />
              {shippingAddress?.city}
              <br />
              {shippingAddress?.state}
              <br /> {shippingAddress?.country}
              <br /> Phone {shippingAddress?.phone}
            </div>
          </Grid>
          <Grid item sm={12} md={4} lg={3} className="Address-details">
            <h3>
              Payment method
              {/* <button>Change</button> */}
            </h3>
            <div>ending in {payMethods[0]?.card?.last4}</div>
          </Grid>
          <Grid item sm={12} md={4} lg={3} className="Address-details">
            <h3>
              Billing address
              {/* <button>Change</button> */}
            </h3>
            <div>
              {shippingAddress?.full_name}
              <br />
              {shippingAddress?.address}
              <br />
              {shippingAddress?.city}
              <br />
              {shippingAddress?.state}
              <br /> {shippingAddress?.country}
              <br /> Phone {shippingAddress?.phone}
            </div>
          </Grid>
          <Grid item sm={12} md={12} lg={3}>
            <div className="place-your-order">
              <Button className="back-button-box" onClick={handleSubmit}>
                place your order
              </Button>
              <h5>Order Summary</h5>
              <ul>
                <li>
                  Stylist Picks Subtotal<span> ${totalPrice.toFixed(2)}</span>
                </li>

                <li>
                  Order Subtotal<span>${(totalPrice * discount).toFixed(2)}</span>
                </li>

                <li>
                  Account Credit<span>$0.00</span>
                </li>
                <li>
                  <ul id="promo_applied"></ul>
                </li>

                <li>
                  Sales tax<span id="total_sales_tax">+${(tax * discount * totalPrice).toFixed(2)}</span>
                </li>

                <li>
                  Including tax{' '}
                  <span id="including_sales_tax">
                    ${(tax * discount * totalPrice + totalPrice * discount).toFixed(2)}
                  </span>
                </li>

                <li id="promsg"></li>
                <li id="giftmsg"></li>
              </ul>
              <h4>
                Order Total
                <span id="totalSpan">${(tax * discount * totalPrice + totalPrice * discount).toFixed(2)}</span>
              </h4>
            </div>
          </Grid>
        </Grid>

        <div>
          <table className="customer-order-review-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Details </th>
                <th>Price</th>
                <th>What would you like to do with this Product ?</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((prod) => prod.checkedout === 'N')
                .map((prod, index) => (
                  <tr key={index}>
                    <td data-th="Image">
                      <img src={`https://www.drapefittest.com/${prod.product_image}`} alt="Active Women Cotton" />
                    </td>
                    <td data-th="Product Details">{prod.product_name_one}</td>
                    <td data-th="Price" style={{ width: 100 }} className="text-center">
                      ${prod.sell_price}
                    </td>
                    <td>
                      {prod.customer_purchase_status === 'Y'
                        ? 'Keep'
                        : prod.exchange_status === 'Y'
                        ? 'Exchange'
                        : prod.return_status === 'Y'
                        ? 'Return'
                        : '-'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
};

export default CustomerOrderReview;
