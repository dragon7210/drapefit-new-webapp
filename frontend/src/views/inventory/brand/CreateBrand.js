import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Breadcrumbs,
  TextareaAutosize
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';

import { addBrand } from 'actions/inventory/brand';
import { strengthColor, strengthIndicator } from 'utils/PwdStrength';
import DFnewLogger from 'utils/DFnewLogger';

const CreateBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [strengthPwd, setStrengthPwd] = useState(0);
  const [levelPwd, setLevelPwd] = useState();
  const handleClickShowPwd = () => {
    setShowPwd(!showPwd);
  };
  const handleMouseDownPwd = (event) => {
    event.preventDefault();
  };
  const changePwd = (value) => {
    const data = strengthIndicator(value);
    setStrengthPwd(data);
    setLevelPwd(strengthColor(data));
  };

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDesktop} />
              &nbsp;&nbsp;Home
            </Link>
            <Typography className="home-link disable">Brand</Typography>
            <Typography className="home-link current">Create Brand</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Create Brand</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            email: '',
            brand_name: '',
            password: '',
            confirmPwd: '',
            address: '',
            phone: ''
          }}
          validationSchema={Yup.object().shape({
            first_name: Yup.string().trim().max(50, 'First name is too long').required('Please enter first name'),
            last_name: Yup.string().trim().max(50, 'Last name is too long').required('Please enter last name'),
            email: Yup.string()
              .trim()
              .email('Please enter a valid email address')
              .max(255, 'Email is too long')
              .required('Please enter email address'),
            brand_name: Yup.string().trim().max(255, 'Brand name is too long').required('Please enter brand name'),
            password: Yup.string()
              .min(6, 'Please enter at least 6 characters')
              .max(50, 'Password is too long')
              .required('Please enter password'),
            confirmPwd: Yup.string()
              .min(6, 'Please enter at least 6 characters')
              .max(50, 'Password is too long')
              .oneOf([Yup.ref('password'), null], 'Confirm password does not match new password')
              .required('Please confirm password'),
            phone: Yup.string()
              .phone(['US', 'IN'], 'Please enter a valid phone number')
              .required('Please enter phone number')
          })}
          onSubmit={async (values, actions) => {
            try {
              await dispatch(addBrand(values));
              actions.resetForm();
              setStrengthPwd(0);
              setShowPwd(false);
              navigate('/dfinventory/brand/view-brand');
            } catch (err) {
              DFnewLogger(err?.message);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography color="#ff0000">All (*) fields are mandatory</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.first_name && errors.first_name)}>
                    <InputLabel>
                      First Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="First Name *"
                      name="first_name"
                      value={values.first_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.first_name && errors.first_name && (
                      <FormHelperText id="helper-text-first_name" error>
                        {errors.first_name}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.last_name && errors.last_name)}>
                    <InputLabel>
                      Last Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Last Name *"
                      name="last_name"
                      value={values.last_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.last_name && errors.last_name && (
                      <FormHelperText id="helper-text-last_name" error>
                        {errors.last_name}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                    <InputLabel>
                      Email <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Email *"
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText id="helper-text-email" error>
                        {errors.email}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.brand_name && errors.brand_name)}>
                    <InputLabel>
                      Brand Name <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Brand Name *"
                      name="brand_name"
                      value={values.brand_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.brand_name && errors.brand_name && (
                      <FormHelperText id="helper-text-brand_name" error>
                        {errors.brand_name}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                    <InputLabel>
                      Password <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Password *"
                      autoComplete=""
                      type={showPwd ? 'text' : 'password'}
                      name="password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changePwd(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPwd}
                            onMouseDown={handleMouseDownPwd}
                            edge="end"
                            size="large"
                          >
                            {showPwd ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {touched.password && errors.password && (
                      <FormHelperText id="standard-weight-helper-text-password-signup" error>
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                  {strengthPwd !== 0 && (
                    <FormControl fullWidth>
                      <Box sx={{ mb: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item>
                            <Box
                              style={{ backgroundColor: levelPwd?.color }}
                              sx={{ width: 85, height: 8, borderRadius: '7px' }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" fontSize="0.75rem">
                              {levelPwd?.label}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </FormControl>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.confirmPwd && errors.confirmPwd)}>
                    <InputLabel>
                      Confirm Password <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Confirm Password *"
                      autoComplete=""
                      type="password"
                      name="confirmPwd"
                      value={values.confirmPwd}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.confirmPwd && errors.confirmPwd && (
                      <FormHelperText id="helper-confirm-password" error>
                        {errors.confirmPwd}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextareaAutosize
                      placeholder="Please enter address"
                      style={{
                        minWidth: '100%',
                        maxWidth: '100%',
                        height: '100px',
                        minHeight: '80px',
                        padding: '1em',
                        borderColor: '#ccc',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                      name="address"
                      value={values.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                    <InputLabel>
                      Phone <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Phone *"
                      name="phone"
                      value={values.phone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.phone && errors.phone && (
                      <FormHelperText id="helper-text-phone" error>
                        {errors.phone}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    className="admin-submit-btn"
                    type="submit"
                    disableElevation
                    disabled={!isValid || !dirty || isSubmitting}
                  >
                    Create Brand
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

export default CreateBrand;
