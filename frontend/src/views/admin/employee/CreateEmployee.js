import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
  Breadcrumbs
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';

import { addEmployee } from 'actions/common/employee';
import { strengthColor, strengthIndicator } from 'utils/PwdStrength';
import { userEmployeeTypes } from 'constant/other';
import DFnewLogger from 'utils/DFnewLogger';
import InputForm from 'ui-component/input/InputForm';
import InputTextarea from 'ui-component/input/InputTextarea';
import InputSelectValue from 'ui-component/input/InputSelectValue';

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [strengthPwd, setStrengthPwd] = useState(0);
  const [levelPwd, setLevelPwd] = useState();
  const handleClickShowPwd = () => {
    setShowPwd(!showPwd);
  };
  const handleMouseDownPwd = (evt) => {
    evt.preventDefault();
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
            type: 0,
            about: '',
            address: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().trim().max(50, 'Name is too long').required('Please enter name'),
            email: Yup.string()
              .trim()
              .email('Please enter a valid email address')
              .max(255, 'Email is too long')
              .required('Please enter email address'),
            password: Yup.string()
              .min(6, 'Please enter at least 6 characters')
              .max(50, 'Password is too long')
              .required('Please enter password'),
            confirmPwd: Yup.string()
              .min(6, 'Please enter at least 6 characters')
              .max(50, 'Password is too long')
              .oneOf([Yup.ref('password'), null], 'Confirm password does not match password')
              .required('Please confirm password'),
            phone: Yup.string()
              .phone(['US', 'IN'], 'Please enter a valid phone number')
              .required('Please enter phone number'),
            type: Yup.string().required('Please select user type')
          })}
          onSubmit={async (values, actions) => {
            try {
              await dispatch(addEmployee(values));
              actions.resetForm();
              setStrengthPwd(0);
              setShowPwd(false);
              navigate('/dfadmin/employee/view-employee');
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
                  <InputForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Name *"
                    name="name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Email *"
                    name="email"
                  />
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
                  <InputForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Phone *"
                    name="phone"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputSelectValue
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    values={values}
                    touched={touched}
                    list={userEmployeeTypes}
                    label="Account Type *"
                    name="type"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputTextarea
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name="about"
                    placeholder="Please describe about the employee"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputTextarea
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name="address"
                    placeholder="Please enter address"
                  />
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
