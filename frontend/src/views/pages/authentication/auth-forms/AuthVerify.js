import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, useTheme, FormControl, FormHelperText, TextareaAutosize } from '@mui/material';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { verify } from 'actions/common/auth';

const AuthVerify = ({ ...others }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <>
      <Formik
        initialValues={{ tokenStr: '' }}
        validationSchema={Yup.object().shape({
          tokenStr: Yup.string().max(200).required('Verify-code is required')
        })}
        onSubmit={async (values) => {
          dispatch(verify(values, navigate));
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
                  Verify
                </Button>
              </AnimateButton>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AuthVerify;
