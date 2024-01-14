import {
  Grid,
  Divider,
  Typography,
  FormControl,
  TextareaAutosize,
  FormHelperText,
  Button,
  useTheme
} from '@mui/material';
import { Formik, Form } from 'formik';

import NavTabs from 'views/client/component/profile/NavTabs';
import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import DFnewImgTag from 'utils/DFnewImgTag';
import DFnewLogger from 'utils/DFnewLogger';
import { useEffect, useState } from 'react';
import { getUserProducts, reportOrderReview } from 'actions/client/profile';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LikeButtons = ['Keep', 'Exchange', 'Return'];

const OrderReview = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allproducts = useSelector((state) => state.profile.products);
  const [products, setProducts] = useState([]);
  const [initialVal, setInitialVal] = useState({
    entireFIT: '0',
    satisfiedFIT: '0',
    stylistWorked: '0'
  });
  let order = ['1', '2', '3', '4', '5'];

  useEffect(() => {
    const tmp = {
      entireFIT: '0',
      satisfiedFIT: '0',
      stylistWorked: '0'
    };
    const p = allproducts.filter((prod) => prod.checkedout === 'N');
    p.forEach((product, ind) => {
      if (product.exchange_status === 'Y') {
        tmp[`like${ind}`] = LikeButtons[1];
      } else if (product.return_status === 'Y') {
        tmp[`like${ind}`] = LikeButtons[2];
      } else {
        tmp[`like${ind}`] = LikeButtons[0];
      }
    });
    setProducts(p);
    setInitialVal(tmp);
  }, [allproducts]);

  return (
    <>
      <NavTabs />
      <Divider />
      <Grid container className="responsive-padding">
        <Grid item xs={12}>
          <Typography className="overview-sup-title" align="center">
            PLEASE COMPLETE YOUR CHECKOUT
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ borderColor: '#ff6c00' }} />
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={initialVal}
            enableReinitialize
            onSubmit={async (values) => {
              DFnewLogger('Order Review: ', values);
              const productStatus = [];
              for (let i = 0; i < products.length; i++) {
                productStatus.push(3 - LikeButtons.findIndex((v) => v === values[`like${i}`]));
              }
              dispatch(reportOrderReview(products, productStatus, navigate));
            }}
          >
            {({ errors, handleBlur, handleChange, setFieldValue, isSubmitting, touched, values }) => (
              <Form>
                {products.map((item, index) => (
                  <Grid container spacing={4} key={index} padding="20px">
                    <Grid item xs={12} md={4}>
                      <Grid container>
                        <Grid item xs={12} className="order-img-box">
                          <DFnewImgTag
                            src={`https://drapefittest.com/${item.product_image}`}
                            fallback={`https://drapefittest.com/${item.product_image}`}
                            width="70%"
                            lzheight={`auto`}
                            style={{ minHeight: '100px', minWidth: '100px' }}
                            alt="Order Product Image"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography className="account-common-content" align="center">
                            <strong>Name: </strong>
                            {item.product_name_one}
                          </Typography>
                          <Typography className="account-common-content" align="center">
                            <strong>Size: </strong>
                            {item.size}
                          </Typography>
                          <Typography className="account-common-content" align="center">
                            <strong>Color: </strong>
                            {item.color}
                          </Typography>
                          <Typography className="account-common-content" align="center">
                            <strong>Price: </strong>${item.sell_price}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="account-common-content mt-1">
                            What you would like to do with the product?
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <RadioButtonGroup
                            group={LikeButtons}
                            name={`like${index}`}
                            value={values[`like${index}`]}
                            errors={errors}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography className="account-common-content mt-1">How was the like?</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <RadioButtonGroup
                            group={['Perfect', 'Just ok', 'Too big', 'Too small']}
                            name={`likeProduct${index + 1}`}
                            value={values[`likeProduct${index + 1}`]}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography className="account-common-content mt-1">How was the quality?</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <RadioButtonGroup
                            group={['Great', 'Average', 'Poor']}
                            name={`quality${index + 1}`}
                            value={values[`quality${index + 1}`]}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography className="account-common-content mt-1">How was the price?</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <RadioButtonGroup
                            group={['Perfect', 'Too High', 'Just ok']}
                            name={`price${index + 1}`}
                            value={values[`price${index + 1}`]}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography className="account-common-content mt-1">How was the Style FIT?</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <RadioButtonGroup
                            group={['Perfect', 'Like It', 'Hate It']}
                            name={`likeFIT${index + 1}`}
                            value={values[`likeFIT${index + 1}`]}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography className="account-common-content mt-1">Product Review</Typography>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched[`productReview${index + 1}`] && errors[`productReview${index + 1}`])}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <TextareaAutosize
                              placeholder="Add additional comments..."
                              style={{
                                minWidth: '100%',
                                maxWidth: '100%',
                                minHeight: '100px',
                                padding: '15px',
                                borderColor: '#ccc',
                                borderRadius: '12px',
                                fontSize: '14px'
                              }}
                              value={values[`productReview${index + 1}`]}
                              name={`productReview${index + 1}`}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            {touched[`productReview${index + 1}`] && errors[`productReview${index + 1}`] && (
                              <FormHelperText id={`helper-text-productReview${index + 1}`} error>
                                {errors[`productReview${index + 1}`]}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
                ))}
                <Grid container className="h-align-center">
                  <Grid item xs={12} sm={8}>
                    <Typography className="account-common-content mt-1">How was the Entire FIT Box?</Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <RadioButtonGroup
                      group={order}
                      name="entireFIT"
                      value={values.entireFIT}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography className="account-common-content mt-1">You satisfied with this FIT.</Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <RadioButtonGroup
                      group={order}
                      name="satisfiedFIT"
                      value={values.satisfiedFIT}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography className="account-common-content mt-1">
                      How you personal stylist worked for you.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <RadioButtonGroup
                      group={order}
                      name="stylistWorked"
                      value={values.stylistWorked}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Typography className="account-common-content mt-1">Additional Comments</Typography>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <FormControl
                      fullWidth
                      error={Boolean(touched.addComments && errors.addComments)}
                      sx={{ ...theme.typography.customInput }}
                    >
                      <TextareaAutosize
                        placeholder="Add additional comments..."
                        style={{
                          minWidth: '100%',
                          maxWidth: '100%',
                          minHeight: '100px',
                          padding: '15px',
                          borderColor: '#ccc',
                          borderRadius: '12px',
                          fontSize: '14px'
                        }}
                        value={values.addComments}
                        name="addComments"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.addComments && errors.addComments && (
                        <FormHelperText id="helper-text-addComments" error>
                          {errors.addComments}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button className="profile-gradient-btn" type="submit" disableElevation disabled={isSubmitting}>
                      REVIEW YOUR ORDER
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderReview;
