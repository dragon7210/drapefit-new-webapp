import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
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
  TextareaAutosize,
  Breadcrumbs
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';

import { addSupplierEmployee } from 'actions/common/employee';
import { strengthColor, strengthIndicator } from 'utils/PwdStrength';
import { supplierEmployeeTypes } from 'constant/other';
import InputForm from 'ui-component/input/InputForm';
import InputSelect from 'ui-component/input/InputSelect';
import InputTextarea from 'ui-component/input/InputTextarea';

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [strengthPassword, setStrengthPassword] = useState(0);
  const [levelPassword, setLevelPassword] = useState();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const data = strengthIndicator(value);
    setStrengthPassword(data);
    setLevelPassword(strengthColor(data));
  };
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [strengthConfirmPwd, setStrengthConfirmPwd] = useState(0);
  const [levelConfirmPwd, setLevelConfirmPwd] = useState();
  const handleClickShowConfirmPwd = () => {
    setShowConfirmPwd(!showConfirmPwd);
  };
  const handleMouseDownConfirmPwd = (event) => {
    event.preventDefault();
  };
  const changeConfirmPwd = (value) => {
    const data = strengthIndicator(value);
    setStrengthConfirmPwd(data);
    setLevelConfirmPwd(strengthColor(data));
  };

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfadmin/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link disable">Employee</Typography>
            <Typography className="home-link current">Create Employee</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Create Employee</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPwd: '',
            phone: '',
            type: '',
            about: '',
            address: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(35).required('Name is required'),
            email: Yup.string().email('Must be a valid email').max(50).required('Email is required'),
            password: Yup.string().min(6).max(50).required('Password is required'),
            confirmPwd: Yup.string()
              .min(6)
              .max(50)
              .oneOf([Yup.ref('password'), null], 'Confirm password must be the same as Password')
              .required('Confirm Password is required'),
            phone: Yup.string().required('Phone Number is required'),
            type: Yup.string().required('Please select type')
          })}
          onSubmit={async (values) => {
            dispatch(addSupplierEmployee(values));
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography color="#ff0000">All (*) fields are mandatory</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Name *"
                    name="name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Email *"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                    <InputLabel htmlFor="outlined-adornment-password-signup">
                      Password <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Password *"
                      id="outlined-adornment-password-signup"
                      autoComplete=""
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
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
                  {strengthPassword !== 0 && (
                    <FormControl fullWidth>
                      <Box sx={{ mb: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item>
                            <Box
                              style={{ backgroundColor: levelPassword?.color }}
                              sx={{ width: 85, height: 8, borderRadius: '7px' }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" fontSize="0.75rem">
                              {levelPassword?.label}
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
                      id="confirm-password"
                      autoComplete=""
                      type={showConfirmPwd ? 'text' : 'password'}
                      value={values.confirmPwd}
                      name="confirmPwd"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changeConfirmPwd(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPwd}
                            onMouseDown={handleMouseDownConfirmPwd}
                            edge="end"
                            size="large"
                          >
                            {showConfirmPwd ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {touched.confirmPwd && errors.confirmPwd && (
                      <FormHelperText id="helper-confirm-password" error>
                        {errors.confirmPwd}
                      </FormHelperText>
                    )}
                  </FormControl>
                  {strengthConfirmPwd !== 0 && (
                    <FormControl fullWidth>
                      <Box sx={{ mb: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item>
                            <Box
                              style={{ backgroundColor: levelConfirmPwd?.color }}
                              sx={{ width: 85, height: 8, borderRadius: '7px' }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" fontSize="0.75rem">
                              {levelConfirmPwd?.label}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </FormControl>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Phone *"
                    name="phone"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputSelect
                    list={supplierEmployeeTypes}
                    touched={touched}
                    errors={errors}
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Select employee type *"
                    name="type"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputTextarea
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name="about"
                    placeholder="About"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextareaAutosize
                      placeholder="Address"
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
                      value={values.address}
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    className="admin-submit-btn"
                    type="submit"
                    disableElevation
                    disabled={!isValid || !dirty || isSubmitting}
                  >
                    Create Employee
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

export default CreateEmployee;
