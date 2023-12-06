import { Link } from 'react-router-dom';
import { Button, Box, Paper, Grid, Typography, Select, MenuItem, InputLabel } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import InputForm from 'ui-component/input/InputForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getEmails } from 'actions/common/auth';
import { useState } from 'react';
import { getSelPaymentRefundInfo, updateSelPaymentRefundInfo } from 'actions/admin/customer';

const ChargeClient = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState();
  useEffect(() => {
    dispatch(getEmails());
  }, [dispatch]);

  const { emails } = useSelector((state) => state.auth);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    let data = emails.filter((item) => item.email === email)[0];
    setUserId(data?.id);
    dispatch(getSelPaymentRefundInfo({ user_id: data?.id }));
  }, [email, emails, dispatch]);
  const { paymentRefundInfo } = useSelector((state) => state.customer);

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Client Manual Charge</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Grid container spacing={2} marginBottom={4}>
          <Grid item xs={12}>
            <Typography color="#ff0000">All (*) fields are mandatory</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select size="small" name="email" value={email} onChange={handleEmail} fullWidth>
              {emails.map((item, index) => (
                <MenuItem key={index} value={item.email}>
                  {item.email}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Formik
          initialValues={{ price: '' }}
          enableReinitialize
          validationSchema={Yup.object().shape({
            price: Yup.number().required('Price is required')
          })}
          onSubmit={async (values, actions) => {
            dispatch(updateSelPaymentRefundInfo({ user_id: userId, price: values.price }));
            actions.resetForm();
            setEmail('');
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputForm
                    errors={errors}
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Price *"
                    name="price"
                  />
                </Grid>
                {paymentRefundInfo !== 'success' && (
                  <>
                    <Grid item xs={6}>
                      <InputLabel>Card Details</InputLabel>
                      <Typography>{paymentRefundInfo[0]?.card_number}</Typography>
                      <Typography>{paymentRefundInfo[0]?.card_expire}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel>Address Details</InputLabel>
                      <Typography>{paymentRefundInfo[0]?.user?.user_detail?.address}</Typography>
                      <Typography>{paymentRefundInfo?.cardExpiry}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel>Name</InputLabel>
                      <Typography>{paymentRefundInfo[0]?.card_name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel>Email</InputLabel>
                      <Typography>{paymentRefundInfo[0]?.user?.email}</Typography>
                    </Grid>
                  </>
                )}
                <Grid item xs={12} className="h-align-right">
                  <Button
                    key="submit"
                    className="account-yes-btn"
                    type="submit"
                    disableElevation
                    disabled={!isValid || !dirty || isSubmitting}
                  >
                    Refund
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
};

export default ChargeClient;
