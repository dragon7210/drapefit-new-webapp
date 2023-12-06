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
import * as Yup from 'yup';

import NavTabs from 'views/client/component/profile/NavTabs';
import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import DFnewLogger from 'utils/DFnewLogger';

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

const OrderReview = () => {
  const theme = useTheme();
  const fitFor = localStorage.getItem('fitFor');
  const productList = [
    {
      pImage:
        fitFor === '0'
          ? wOrder_1
          : fitFor === '1'
          ? mOrder_1
          : fitFor === '3'
          ? kgOrder_1
          : fitFor === '4'
          ? kbOrder_1
          : kbOrder_1,
      pName: 'shorts',
      pSize: 'Free Size',
      pColor: 'Blue',
      pPrice: 130.5
    },
    {
      pImage:
        fitFor === '0'
          ? wOrder_2
          : fitFor === '1'
          ? mOrder_2
          : fitFor === '3'
          ? kgOrder_2
          : fitFor === '4'
          ? kbOrder_2
          : kbOrder_2,
      pName: 'outfit',
      pSize: 'Free Size',
      pColor: 'Gray',
      pPrice: 110
    },
    {
      pImage:
        fitFor === '0'
          ? wOrder_3
          : fitFor === '1'
          ? mOrder_3
          : fitFor === '3'
          ? kgOrder_3
          : fitFor === '4'
          ? kbOrder_3
          : kbOrder_3,
      pName: 'cute',
      pSize: 'Free Size',
      pColor: 'Red',
      pPrice: 199.99
    },
    {
      pImage:
        fitFor === '0'
          ? wOrder_4
          : fitFor === '1'
          ? mOrder_4
          : fitFor === '3'
          ? kgOrder_4
          : fitFor === '4'
          ? kbOrder_4
          : kbOrder_4,
      pName: 'cute',
      pSize: 'outFit',
      pColor: 'Red',
      pPrice: 120
    },
    {
      pImage:
        fitFor === '0'
          ? wOrder_5
          : fitFor === '1'
          ? mOrder_5
          : fitFor === '3'
          ? kgOrder_5
          : fitFor === '4'
          ? kbOrder_5
          : kbOrder_5,
      pName: 'cute',
      pSize: 'Free Size',
      pColor: 'Red',
      pPrice: 160.5
    }
  ];
  let initVal = {};
  let valSchema = {};
  let order = [];
  if (!productList.length) {
    //-- TODO exception`
  } else {
    productList.forEach((item, idx) => {
      let _data = {};
      _data[`doWithProduct${idx + 1}`] = '';
      _data[`likeProduct${idx + 1}`] = '';
      _data[`quality${idx + 1}`] = '';
      _data[`price${idx + 1}`] = '';
      _data[`likeFIT${idx + 1}`] = '';
      _data[`productReview${idx + 1}`] = '';
      Object.assign(initVal, _data);
      let _validate = {};
      _validate[`doWithProduct${idx + 1}`] = Yup.number().min(0).max(2).required('Please select item');
      _validate[`likeProduct${idx + 1}`] = Yup.number().min(0).max(3).required('Please select item');
      _validate[`quality${idx + 1}`] = Yup.number().min(0).max(2).required('Please select item');
      _validate[`price${idx + 1}`] = Yup.number().min(0).max(2).required('Please select item');
      _validate[`likeFIT${idx + 1}`] = Yup.number().min(0).max(2).required('Please select item');
      Object.assign(valSchema, _validate);
      order.push(`${idx + 1}`);
    });
    Object.assign(initVal, {
      entireFIT: '',
      satisfiedFIT: '',
      stylistWorked: '',
      addComments: ''
    });
    Object.assign(valSchema, {
      entireFIT: Yup.number().min(0).max(5).required('Please select item'),
      satisfiedFIT: Yup.number().min(0).max(5).required('Please select item'),
      stylistWorked: Yup.number().min(0).max(5).required('Please select item')
    });
  }

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
            initialValues={initVal}
            enableReinitialize
            validationSchema={Yup.object().shape(valSchema)}
            onSubmit={async (values) => {
              DFnewLogger('Order Review: ', values);
            }}
          >
            {({ errors, handleBlur, handleChange, setFieldValue, isSubmitting, touched, values }) => (
              <Form>
                {productList.map((item, index) => (
                  <Grid container spacing={4} key={index} padding="20px">
                    <Grid item xs={12} md={4}>
                      <Grid container>
                        <Grid item xs={12} className="order-img-box">
                          <DFnewImgTag
                            src={`${item.pImage}.webp`}
                            fallback={`${item.pImage}.jpg`}
                            width="70%"
                            lzheight={`auto`}
                            style={{ minHeight: '100px', minWidth: '100px' }}
                            alt="Order Product Image"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography className="account-common-content" align="center">
                            <strong>Name: </strong>
                            {item.pName}
                          </Typography>
                          <Typography className="account-common-content" align="center">
                            <strong>Size: </strong>
                            {item.pSize}
                          </Typography>
                          <Typography className="account-common-content" align="center">
                            <strong>Color: </strong>
                            {item.pColor}
                          </Typography>
                          <Typography className="account-common-content" align="center">
                            <strong>Price: </strong>${item.pPrice}
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
                            group={['Keep', 'Exchange', 'Return']}
                            name={`doWithProduct${index + 1}`}
                            value={values[`doWithProduct${index + 1}`]}
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
                            errors={errors}
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
                            errors={errors}
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
                            errors={errors}
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
                            errors={errors}
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
                      errors={errors}
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
                      errors={errors}
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
                      errors={errors}
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
