import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Typography,
  Radio,
  RadioGroup,
  useMediaQuery,
  useTheme,
  styled
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { signup } from 'actions/common/auth';
import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import DFnewLogger from 'utils/DFnewLogger';
import { strengthColor, strengthIndicator } from 'utils/PwdStrength';

const Google = GenS3Link('landing/images/icons/social-google');
const Facebook = GenS3Link('landing/images/icons/social-facebook');

const BpIcon = styled('span')(({}) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: '#f5f8fa',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2
  },
  'input:hover ~ &': '#ebf1f5',
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)'
  }
}));
const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#232f3e',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#ff6c00,#ff6c00 28%,transparent 32%)',
    content: '""'
  }
});
const BpRadio = (props) => {
  return <Radio disableRipple color="default" checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} {...props} />;
};

const AuthSignup = ({ ...others }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const googleHandler = async () => {
    DFnewLogger('Sign up with Google...');
  };
  const facebookHandler = async () => {
    DFnewLogger('Sign up with Facebook...');
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };
  const navigate = useNavigate();

  useEffect(() => {
    changePassword('123456');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          fitFor: '',
          agree: false
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().trim().max(50, 'First name is too long').required('Please enter first name'),
          lastName: Yup.string().trim().max(50, 'Last name is too long').required('Please enter last name'),
          email: Yup.string()
            .trim()
            .email('Please enter a valid email')
            .max(255, 'Email is too long')
            .required('Please enter email address'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .max(255, 'Password is too long')
            .required('Please enter password'),
          fitFor: Yup.number().min(0).max(2).required('Please select FIT Mode'),
          agree: Yup.boolean().isTrue('Please agree with Terms of Use')
        })}
        onSubmit={async (values) => {
          DFnewLogger(values);
          signup(values, navigate);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <Form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.firstName && errors.firstName)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>First Name</InputLabel>
                  <OutlinedInput
                    name="firstName"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.firstName && errors.firstName && (
                    <FormHelperText id="standard-weight-helper-text--signup" error>
                      {errors.firstName}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.lastName && errors.lastName)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>Last Name</InputLabel>
                  <OutlinedInput name="lastName" value={values.lastName} onBlur={handleBlur} onChange={handleChange} />
                  {touched.lastName && errors.lastName && (
                    <FormHelperText id="standard-weight-helper-text--signup" error>
                      {errors.lastName}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel>Email Address</InputLabel>
              <OutlinedInput name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} />
              {touched.email && errors.email && (
                <FormHelperText id="standard-weight-helper-text--signup" error>
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
                autoComplete=""
                type={showPassword ? 'text' : 'password'}
                name="password"
                label="Password"
                value={values.password}
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
            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        style={{ backgroundColor: level?.color }}
                        sx={{ width: 85, height: 8, borderRadius: '7px' }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}
            <Grid container columnSpacing={1}>
              <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography className="fit-for-label">I need FIT for</Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-customized-radios"
                    name="fitFor"
                    value={values.fitFor}
                    onChange={handleChange}
                  >
                    <FormControlLabel value={1} control={<BpRadio />} label="Men" />
                    <FormControlLabel value={2} control={<BpRadio />} label="Women" />
                    <FormControlLabel value={3} control={<BpRadio />} label="Kids" />
                  </RadioGroup>
                  {touched.fitFor && errors.fitFor && (
                    <FormHelperText id="standard-weight-helper-text--signup" error>
                      {errors.fitFor}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onBlur={handleBlur}
                        value={values.agree}
                        onChange={handleChange}
                        checked={values.agree}
                        name="agree"
                        style={{ color: '#232f3ed9' }}
                      />
                    }
                    label={
                      <>
                        <span variant="subtitle1">Agree with&nbsp;&nbsp;&nbsp;</span>
                        <Typography
                          variant="subtitle1"
                          component={Link}
                          to="/terms-and-conditions"
                          target="_blank"
                          style={{ textDecoration: 'underline' }}
                        >
                          Terms of Use
                        </Typography>
                      </>
                    }
                  />
                  {touched.agree && errors.agree && (
                    <FormHelperText id="standard-weight-helper-text--signup" error>
                      {errors.agree}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
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
                  className="sign-btn"
                  style={{ borderRadius: '6px' }}
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Sign up
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
              color: `${theme.palette.grey[900]}!important`,
              fontWeight: 500
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
                  alt="Sign up with Google"
                />
              </Box>
              Sign up with Google
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
                  alt="Sign up with Facebook"
                />
              </Box>
              Sign up with Facebook
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthSignup;
