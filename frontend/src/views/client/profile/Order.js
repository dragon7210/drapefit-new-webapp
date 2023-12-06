import { Divider, Typography, Box, Grid } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import NavTabs from '../component/profile/NavTabs';

const mOrder_1 = GenS3Link('landing/images/client/profile/men/order/order-1');
const mOrder_2 = GenS3Link('landing/images/client/profile/men/order/order-2');
const mOrder_3 = GenS3Link('landing/images/client/profile/men/order/order-3');
const mOrder_4 = GenS3Link('landing/images/client/profile/men/order/order-4');
const mOrder_5 = GenS3Link('landing/images/client/profile/men/order/order-5');
const wOrder_1 = GenS3Link('landing/images/client/profile/women/order/order-1');
const wOrder_2 = GenS3Link('landing/images/client/profile/women/order/order-2');
const wOrder_3 = GenS3Link('landing/images/client/profile/women/order/order-3');
const wOrder_4 = GenS3Link('landing/images/client/profile/women/order/order-4');
const wOrder_5 = GenS3Link('landing/images/client/profile/women/order/order-5');
const kgOrder_1 = GenS3Link('landing/images/client/profile/kids/order/girl/order-1');
const kgOrder_2 = GenS3Link('landing/images/client/profile/kids/order/girl/order-2');
const kgOrder_3 = GenS3Link('landing/images/client/profile/kids/order/girl/order-3');
const kgOrder_4 = GenS3Link('landing/images/client/profile/kids/order/girl/order-4');
const kgOrder_5 = GenS3Link('landing/images/client/profile/kids/order/girl/order-5');
const kbOrder_1 = GenS3Link('landing/images/client/profile/kids/order/boy/order-1');
const kbOrder_2 = GenS3Link('landing/images/client/profile/kids/order/boy/order-2');
const kbOrder_3 = GenS3Link('landing/images/client/profile/kids/order/boy/order-3');
const kbOrder_4 = GenS3Link('landing/images/client/profile/kids/order/boy/order-4');
const kbOrder_5 = GenS3Link('landing/images/client/profile/kids/order/boy/order-5');

const Order = () => {
  const fitFor = localStorage.getItem('fitFor');
  const details = `Discover Your Style with Our Clothing Boxes for Men and Women.
            Discover Your Style with Our Clothing Boxes for Men and Women.
            Discover Your Style with Our Clothing Boxes for Men and Women.
            Discover Your Style with Our Clothing Boxes for Men and Women.
            Discover Your Style with Our Clothing Boxes for Men and Women.`;
  const orderList = [
    {
      title: 'second FIT',
      date: '24 / 3 / 2023',
      content: [
        {
          image:
            fitFor === '0'
              ? wOrder_1
              : fitFor === '1'
              ? mOrder_1
              : fitFor === '3'
              ? kgOrder_1
              : fitFor === '4'
              ? kbOrder_1
              : kbOrder_1,
          detail: details,
          price: 125.5
        },
        {
          image:
            fitFor === '0'
              ? wOrder_2
              : fitFor === '1'
              ? mOrder_2
              : fitFor === '3'
              ? kgOrder_2
              : fitFor === '4'
              ? kbOrder_2
              : kbOrder_2,
          detail: details,
          price: 172.0
        },
        {
          image:
            fitFor === '0'
              ? wOrder_3
              : fitFor === '1'
              ? mOrder_3
              : fitFor === '3'
              ? kgOrder_3
              : fitFor === '4'
              ? kbOrder_3
              : kbOrder_3,
          detail: details,
          price: 136.5
        },
        {
          image:
            fitFor === '0'
              ? wOrder_4
              : fitFor === '1'
              ? mOrder_4
              : fitFor === '3'
              ? kgOrder_4
              : fitFor === '4'
              ? kbOrder_4
              : kbOrder_4,
          detail: details,
          price: 190.5
        },
        {
          image:
            fitFor === '0'
              ? wOrder_5
              : fitFor === '1'
              ? mOrder_5
              : fitFor === '3'
              ? kgOrder_5
              : fitFor === '4'
              ? kbOrder_5
              : kbOrder_5,
          detail: details,
          price: 180.5
        }
      ]
    },
    {
      title: 'first FIT',
      date: '23 / 2 / 2023',
      content: [
        {
          image:
            fitFor === '0'
              ? wOrder_1
              : fitFor === '1'
              ? mOrder_1
              : fitFor === '3'
              ? kgOrder_1
              : fitFor === '4'
              ? kbOrder_1
              : kbOrder_1,
          detail: details,
          price: 125.5
        },
        {
          image:
            fitFor === '0'
              ? wOrder_2
              : fitFor === '1'
              ? mOrder_2
              : fitFor === '3'
              ? kgOrder_2
              : fitFor === '4'
              ? kbOrder_2
              : kbOrder_2,
          detail: details,
          price: 172.0
        },
        {
          image:
            fitFor === '0'
              ? wOrder_3
              : fitFor === '1'
              ? mOrder_3
              : fitFor === '3'
              ? kgOrder_3
              : fitFor === '4'
              ? kbOrder_3
              : kbOrder_3,
          detail: details,
          price: 136.5
        },
        {
          image:
            fitFor === '0'
              ? wOrder_4
              : fitFor === '1'
              ? mOrder_4
              : fitFor === '3'
              ? kgOrder_4
              : fitFor === '4'
              ? kbOrder_4
              : kbOrder_4,
          detail: details,
          price: 190.5
        },
        {
          image:
            fitFor === '0'
              ? wOrder_5
              : fitFor === '1'
              ? mOrder_5
              : fitFor === '3'
              ? kgOrder_5
              : fitFor === '4'
              ? kbOrder_5
              : kbOrder_5,
          detail: details,
          price: 180.5
        }
      ]
    }
  ];

  return (
    <>
      <NavTabs />
      <Divider />
      <Box className="order">
        <Typography className="order-title">Your Orders</Typography>
        <Divider className="divider" />
        {orderList ? (
          <>
            {orderList.map((item, index) => (
              <Grid container key={index}>
                <Grid item xs={12}>
                  <Typography className="overview-sup-title">
                    {item.title}
                    <span style={{ float: 'right' }}>{item.date}</span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider style={{ borderColor: '#ff6c00' }} />
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={4} sm={5} md={4} className="order-img-box">
                      <Typography className="account-common-content mt-1">
                        <strong>Image</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={5} md={6} className="order-img-box">
                      <Typography className="account-common-content mt-1">
                        <strong>Product Details</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} className="order-img-box">
                      <Typography className="account-common-content mt-1">
                        <strong>Price</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      {item.content.map((item, index) => (
                        <Grid container marginBottom="20px" key={index}>
                          <Grid item xs={12} sm={5} md={3} className="order-img-box">
                            <DFnewImgTag
                              src={`${item.image}.webp`}
                              fallback={`${item.image}.jpg`}
                              width="60%"
                              lzheight={`auto`}
                              style={{ minHeight: '100px', minWidth: '100px' }}
                              alt="Order Product Image"
                            />
                          </Grid>
                          <Grid item xs={9} sm={5} md={7} className="order-img-box">
                            <Typography className="account-common-content">{item.detail}</Typography>
                          </Grid>
                          <Grid item xs={3} sm={2} md={2} className="order-img-box">
                            <Typography className="account-common-content">${item.price}</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Divider sx={{ mt: '15px' }} />
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </>
        ) : (
          <Typography className="order-content">No orders are found!</Typography>
        )}
      </Box>
    </>
  );
};

export default Order;
