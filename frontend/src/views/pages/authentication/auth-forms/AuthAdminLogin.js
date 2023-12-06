import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { loginAdmin } from 'actions/common/auth';

const AuthAdminLogin = ({ ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [remChecked, setRemChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (evt) => {
    evt.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .trim()
            .email('Please enter a valid email address')
            .max(255, 'Email is too long')
            .required('Please enter email address'),
          password: Yup.string()
            .min(6, 'Please enter at least 6 characters')
            .max(50, 'Password is too long')
            .required('Please enter password')
        })}
        onSubmit={async (values) => {
          dispatch(loginAdmin(values, remChecked, navigate));
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
          <Form noValidate onSubmit={handleSubmit} {...rest}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel>
                Email <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <OutlinedInput
                type="email"
                label="Email *"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.email && errors.email && (
                <FormHelperText id="helper-text-email-login" error>
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel>
                Password <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <OutlinedInput
                label="Password *"
                type={showPassword ? 'text' : 'password'}
                autoComplete="off"
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
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
                <FormHelperText id="helper-text-password-login" error>
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="remChecked"
                    checked={remChecked}
                    onChange={(evt) => setRemChecked(evt.target.checked)}
                    style={{ color: '#232f3ed9' }}
                  />
                }
                label="Remember me"
              />
              <Link to="/dfadmin/forgot-pwd">
                <Typography style={{ color: '#232f3e', textDecoration: 'underline' }}>Forgot Password?</Typography>
              </Link>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText id="helper-text-submit" error>
                  {errors.submit}
                </FormHelperText>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  size="large"
                  className="sign-btn"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disableElevation
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AuthAdminLogin;
