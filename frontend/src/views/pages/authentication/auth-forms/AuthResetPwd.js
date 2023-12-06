import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextareaAutosize,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { resetPwd } from 'actions/common/auth';
import DFnewLogger from 'utils/DFnewLogger';
import { strengthColor, strengthIndicator } from 'utils/PwdStrength';

const AuthResetPwd = ({ ...others }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
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
          tokenStr: '',
          newPwd: ''
        }}
        validationSchema={Yup.object().shape({
          tokenStr: Yup.string().trim().max(255, 'Verify-code is too long').required('Please enter verify-code'),
          newPwd: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .max(255, 'Password is too long')
            .required('Please enter password')
        })}
        onSubmit={async (values) => {
          resetPwd(values, navigate);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <Form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.tokenStr && errors.tokenStr)}
              sx={{ ...theme.typography.customInput }}
            >
              <TextareaAutosize
                placeholder="verify-code *"
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
                value={values.tokenStr}
                name="tokenStr"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.tokenStr && errors.tokenStr && (
                <FormHelperText id="helper-text-tokenStr" error>
                  {errors.tokenStr}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              error={Boolean(touched.newPwd && errors.newPwd)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                autoComplete=""
                type={showPassword ? 'text' : 'password'}
                name="newPwd"
                label="Password"
                value={values.newPwd}
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
              {touched.newPwd && errors.newPwd && (
                <FormHelperText id="standard-weight-helper-text-password-signup" error>
                  {errors.newPwd}
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
                  type="submit"
                  style={{ borderRadius: '6px' }}
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                >
                  Submit
                </Button>
              </AnimateButton>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AuthResetPwd;
