import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, useTheme } from '@mui/material';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { forgotPwd } from 'actions/common/auth';

const AuthForgotPwd = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
        })}
        onSubmit={async (values) => {
          forgotPwd(values, navigate);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <Form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel>Email Address</InputLabel>
              <OutlinedInput
                type="email"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {touched.email && errors.email && (
                <FormHelperText id="standard-weight-helper-text--signup" error>
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
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

export default AuthForgotPwd;
