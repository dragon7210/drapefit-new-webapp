import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, useTheme } from '@mui/material';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { forgotPwd } from 'actions/common/auth';
import DFnewLogger from 'utils/DFnewLogger';

const AuthInventoryForgotPwd = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .trim()
            .email('Please enter a valid email address')
            .max(255, 'Email is too long')
            .required('Please enter email address')
        })}
        onSubmit={async (values) => {
          DFnewLogger(values);
          //-- TODO
          // forgotPwd(values, navigate);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
          <Form noValidate onSubmit={handleSubmit} {...others}>
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
                <FormHelperText id="standard-weight-helper-text--signup" error>
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  size="large"
                  className="sign-btn"
                  fullWidth
                  style={{ borderRadius: '6px' }}
                  variant="contained"
                  color="secondary"
                  disableElevation
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting}
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

export default AuthInventoryForgotPwd;
