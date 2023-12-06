import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { updatePassword } from 'actions/common/auth';
import { useDispatch, useSelector } from 'react-redux';

const Password = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  let { user } = useSelector((state) => state.auth);
  const initVal = {
    currentPwd: '',
    newPwd: '',
    confirmPwd: ''
  };

  return (
    <Box className="setting-password">
      <Formik
        initialValues={initVal}
        enableReinitialize
        validationSchema={Yup.object().shape({
          currentPwd: Yup.string().min(6).max(255).notRequired(),
          newPwd: Yup.string().min(6).max(255).notRequired(),
          confirmPwd: Yup.string().min(6).max(255).notRequired()
        })}
        onSubmit={async (values, actions) => {
          await dispatch(updatePassword({ ...values, email: user.email }));
          actions.resetForm();
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.currentPwd && errors.currentPwd)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>Current Password</InputLabel>
                  <OutlinedInput
                    value={values.currentPwd}
                    name="currentPwd"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.currentPwd && errors.currentPwd && (
                    <FormHelperText id="helper-text-currentPwd" error>
                      {errors.currentPwd}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.newPwd && errors.newPwd)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>New Password</InputLabel>
                  <OutlinedInput
                    value={values.newPwd}
                    name="newPwd"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.newPwd && errors.newPwd && (
                    <FormHelperText id="helper-text-newPwd" error>
                      {errors.newPwd}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.confirmPwd && errors.confirmPwd)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>Confirm Password</InputLabel>
                  <OutlinedInput
                    value={values.confirmPwd}
                    name="confirmPwd"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.confirmPwd && errors.confirmPwd && (
                    <FormHelperText id="helper-text-confirmPwd" error>
                      {errors.confirmPwd}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} className="h-align-right">
                <Button className="admin-submit-btn" type="submit" disableElevation disabled={isSubmitting}>
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Password;
