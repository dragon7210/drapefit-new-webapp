import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Dialog, DialogActions, DialogTitle, Divider, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { editLoginDetails } from 'actions/common/auth';
import InputForm from 'ui-component/input/InputForm';

const Login = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(!open);
  };

  const initVal = {
    first_name: user?.user_detail?.first_name,
    last_name: user?.user_detail?.last_name,
    email: user?.email,
    currentPwd: '',
    newPwd: '',
    confirmPwd: ''
  };
  return (
    <Box className="overview">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className="overview-sup-title">LOGIN DETAILS</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ borderColor: '#ff6c00' }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className="overview-title">Full Name</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography className="overview-content">
            {user?.user_detail?.first_name} {user?.user_detail?.last_name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className="overview-title">Email</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography className="overview-content">{user?.email}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} className="h-align-right">
          <Button className="account-yes-btn" onClick={() => showModal(true)}>
            EDIT
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={showModal}>
        <DialogTitle>
          <Typography className="dialog-title">Change User Info</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initVal}
            enableReinitialize
            validationSchema={Yup.object().shape({
              first_name: Yup.string().min(1).max(20).required('Please input your FirstName'),
              last_name: Yup.string().min(1).max(20).required('Please input your LastName'),
              currentPwd: Yup.string().min(6).max(255).notRequired(),
              newPwd: Yup.string().min(6).max(255).notRequired(),
              confirmPwd: Yup.string().min(6).max(255).notRequired()
            })}
            onSubmit={async (values) => {
              dispatch(editLoginDetails(values));
              showModal();
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="first_name"
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="last_name"
                      label="Last Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="email"
                      label="Email"
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Current Password"
                      name="currentPwd"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="New Password"
                      name="newPwd"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Confirm Password"
                      name="confirmPwd"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button key="cancel" className="account-no-btn" onClick={showModal}>
                      Cancel
                    </Button>
                    <Button
                      key="submit"
                      className="account-yes-btn"
                      type="submit"
                      disableElevation
                      disabled={!isValid || !dirty || isSubmitting}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Login;
