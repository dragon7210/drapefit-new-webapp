import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { login } from 'actions/common/auth';
import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import DFnewLogger from 'utils/DFnewLogger';

const Google = GenS3Link('landing/images/icons/social-google');
const Facebook = GenS3Link('landing/images/icons/social-facebook');

const AuthLogin = ({ ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const [remChecked, setRemChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (evt) => {
    evt.preventDefault();
  };
  const googleHandler = async () => {
    DFnewLogger('Sign in with Google...');
  };
  const facebookHandler = async () => {
    DFnewLogger('Sign in with Facebook...');
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
          dispatch(login(values, remChecked, navigate));
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <Form noValidate onSubmit={handleSubmit} {...rest}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                label="Email"
                type="email"
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
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                label="Password"
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
              <Link to="/forgot-pwd">
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
                  disableElevation
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                  color="secondary"
                >
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </Form>
        )}
      </Formik>
      <Grid item xs={12}>
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          <Button
            variant="outlined"
            sx={{
              cursor: 'unset',
              m: 2,
              py: 0.1,
              px: 7,
              borderColor: `${theme.palette.grey[300]} !important`,
              color: `${theme.palette.grey[900]} !important`
            }}
            disableRipple
            disabled
          >
            OR
          </Button>
          <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
        </Box>
      </Grid>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              className="sign-google-btn"
              disableElevation
              fullWidth
              onClick={googleHandler}
              size="large"
              variant="outlined"
            >
              <Box sx={{ mr: { xs: 2, sm: 3, width: 20 }, display: 'flex', alignItems: 'center' }}>
                <DFnewImgTag
                  src={`${Google}.svg`}
                  fallback={`${Google}.svg`}
                  width="16"
                  height="16"
                  lzheight={20}
                  style={{ marginRight: matchDownMD ? 8 : 16 }}
                  alt="Sign in with Google"
                />
              </Box>
              Sign in with Google
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              className="sign-facebook-btn"
              disableElevation
              fullWidth
              onClick={facebookHandler}
              size="large"
              variant="outlined"
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 }, display: 'flex', alignItems: 'center' }}>
                <DFnewImgTag
                  src={`${Facebook}.svg`}
                  fallback={`${Facebook}.svg`}
                  width="22"
                  height="22"
                  lzheight={22}
                  style={{ marginRight: matchDownMD ? 8 : 16 }}
                  alt="Sign in with Facebook"
                />
              </Box>
              Sign in with Facebook
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthLogin;
