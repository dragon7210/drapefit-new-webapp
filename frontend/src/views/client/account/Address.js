import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Divider,
  Grid,
  Typography,
  Button,
  useTheme,
  Alert,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogTitle
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';
import { addAddress, deleteAddress, editAddress, defaultAddress, deliverAddress } from 'actions/client/profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import InputForm from 'ui-component/input/InputForm';
import AnimateButton from 'ui-component/extended/AnimateButton';
import NavTabs from '../component/profile/NavTabs';
import { SET_SHIPPING_ADDRESS_ID } from 'actions/common/types';

const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let state = false;
  if (pathname.includes('addressbook')) {
    state = true;
  }

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const defaultAddrData = {
    full_name: '',
    address: '',
    address_line_2: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  };
  const [initVal, setInitVal] = useState(defaultAddrData);
  const showModal = () => {
    setOpen(!open);
  };
  const { allAddress } = useSelector((state) => state.profile);
  return (
    <>
      {state && (
        <>
          <NavTabs />
          <Divider />
        </>
      )}
      <Box className={state ? 'addressbook' : 'overview'}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <span className="overview-sup-title">ADDRESS DETAILS</span>
            <Button
              className="add-new-address"
              onClick={() => {
                setInitVal(defaultAddrData);
                showModal();
              }}
            >
              {matchDownSM ? '+' : 'Add New Address'}
            </Button>
          </Grid>
          {state && (
            <Grid item xs={12} md={6}>
              <AnimateButton>
                <Link to="/welcome/payment">
                  <Button
                    className="set-default-btn"
                    sx={{
                      float: 'right',
                      zIndex: allAddress.length === 0 ? '-1' : '1',
                      opacity: allAddress.length === 0 ? '0.5' : '1',
                      cursor: allAddress.length === 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    NEXT: PAYMENT&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faLongArrowRight} />
                  </Button>
                </Link>
              </AnimateButton>
            </Grid>
          )}
          <Grid item xs={12}>
            <Divider style={{ borderColor: '#ff6c00', marginBottom: '20px' }} />
          </Grid>
          {allAddress.length === 0 ? (
            <Alert severity="error">No valid address. Please add your address.</Alert>
          ) : (
            allAddress.map((item, index) => (
              <Grid item xs={12} md={6} xl={4} key={index}>
                <Box className="address-box">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography className="overview-sup-title">
                        <i>{item.full_name}</i>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-title">Address1: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-content">{item.address}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-title">Address2: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-content">{item.address_line_2}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-title">City: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-content">{item.city}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-title">State: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-content">{item.state}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-title">zipcode: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-content">{item.zipcode}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-title">Country: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-content">{item.country}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-title">Phone: </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography className="overview-content">{item.phone}</Typography>
                    </Grid>
                    <Grid item xs={12} className="h-align-right">
                      <Button
                        className="account-no-btn"
                        onClick={() => {
                          dispatch(deleteAddress({ id: item.id }));
                        }}
                      >
                        DELETE
                      </Button>
                      <Button
                        className="account-yes-btn"
                        onClick={() => {
                          showModal();
                          setInitVal(item);
                        }}
                      >
                        EDIT
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        className="set-default-btn"
                        onClick={() => {
                          dispatch({ type: SET_SHIPPING_ADDRESS_ID, payload: item.id });
                          navigate('/welcome/payment');
                        }}
                      >
                        DELIVER ADDRESS
                      </Button>
                      {item.default_set === 0 && (
                        <Button
                          fullWidth
                          className="set-default-btn"
                          sx={{ mt: '10px' }}
                          onClick={() => dispatch(defaultAddress({ id: item.id }))}
                        >
                          SET IN DEFAULT
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))
          )}
        </Grid>
        <Dialog open={open} onClose={showModal}>
          <DialogTitle>
            <Typography className="dialog-title">Add new address</Typography>
          </DialogTitle>
          <DialogActions>
            <Formik
              initialValues={initVal}
              enableReinitialize
              validationSchema={Yup.object().shape({
                full_name: Yup.string().max(30).required('Name is required'),
                address: Yup.string().max(255).required('Address Line 1 is required'),
                city: Yup.string().max(255).required('City is required'),
                state: Yup.string().max(255).required('Region is required'),
                zipcode: Yup.number().min(10000).max(99999).required('Zipcode Code is required'),
                country: Yup.string().max(255).required('Country is required'),
                phone: Yup.string()
                  .phone(['US', 'IN'], 'Please enter a valid phone number')
                  .required('Please enter phone number')
              })}
              onSubmit={async (values, actions) => {
                if (initVal?.id) {
                  dispatch(editAddress({ ...values, id: initVal?.id }));
                } else {
                  dispatch(addAddress(values));
                }
                actions.resetForm();
                showModal();
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Grid container rowSpacing={2}>
                    <Grid item xs={12}>
                      <InputForm
                        errors={errors}
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        label="Full Name *"
                        name="full_name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputForm
                        errors={errors}
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        label="Address Line 1"
                        name="address"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputForm
                        errors={errors}
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        label="Address Line 2"
                        name="address_line_2"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputForm
                        errors={errors}
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        label="City *"
                        name="city"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputForm
                        errors={errors}
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        label="Region *"
                        name="state"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputForm
                        errors={errors}
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        label="zipcode ( 5 Digit [0 - 9] Pincode ) *"
                        name="zipcode"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputForm
                        errors={errors}
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        label="Country *"
                        name="country"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputForm
                        errors={errors}
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched}
                        label="Phone Number *"
                        name="phone"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box className="h-align-right">
                        <Button key="cancel" className="account-no-btn" onClick={showModal}>
                          Cancel
                        </Button>
                        <Button
                          key="submit"
                          className="account-yes-btn"
                          type="submit"
                          disableElevation
                          disabled={isSubmitting}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Address;
