import React from 'react';
import NavTabs from 'views/client/component/profile/NavTabs';
import { Grid, Divider, Button, Container } from '@mui/material';
import { useSelector } from 'react-redux';

const CustomerOrderReview = () => {
  const products = useSelector((state) => state.profile.products);
  return (
    <>
      <NavTabs />
      <Divider />
      <Container fixed sx={{ py: '40px' }} maxWidth="xl">
        <Button className="back-button-box">Back</Button>
        <h1 className="order-review-title">Order Review</h1>
        <Grid container rowGap={2}>
          <Grid item sm={12} md={4} lg={3} className="Address-details">
            <h3>
              Shipping address <button>Change</button>
            </h3>
            <div>
              First Last
              <br />
              161 Trumpeter Ave 99669
              <br />
              Soldotna
              <br />
              Alaska
              <br /> United states
              <br /> Phone 9072622578
            </div>
          </Grid>
          <Grid item sm={12} md={4} lg={3} className="Address-details">
            <h3>
              Payment method <button>Change</button>
            </h3>
            <div>ending in 1111</div>
          </Grid>
          <Grid item sm={12} md={4} lg={3} className="Address-details">
            <h3>
              Billing address <button>Change</button>
            </h3>
            <div>
              First Last
              <br />
              161 Trumpeter Ave 99669
              <br />
              Soldotna
              <br />
              Alaska
              <br /> United states
              <br /> Phone 9072622578
            </div>
          </Grid>
          <Grid item sm={12} md={12} lg={3}>
            <div className="place-your-order">
              <Button className="back-button-box">place your order</Button>
              <h5>Order Summary</h5>
              <ul>
                <li>
                  Stylist Picks Subtotal<span> $23.00</span>
                </li>

                <li>
                  Order Subtotal<span>$23.00</span>
                </li>

                <li>
                  Account Credit<span>$0.00</span>
                </li>
                <li>
                  <ul id="promo_applied"></ul>
                </li>

                <li>
                  Sales tax<span id="total_sales_tax">+$0.40</span>
                </li>

                <li>
                  Including tax <span id="including_sales_tax"> $23.40</span>
                </li>

                <li id="promsg"></li>
                <li id="giftmsg"></li>
              </ul>
              <h4>
                Order Total<span id="totalSpan">$23.40</span>
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
              {products.map((prod, index) => (
                <tr key={index}>
                  <td data-th="Image">
                    <img src={`https://www.drapefittest.com/${prod.product_image}`} alt="Active Women Cotton" />
                  </td>
                  <td data-th="Product Details">{prod.product_name_one}</td>
                  <td data-th="Price" style={{ width: 100 }} class="text-center">
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
