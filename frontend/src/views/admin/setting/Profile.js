import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  TextareaAutosize,
  useTheme,
  Grid
} from '@mui/material';
import { loadUser, updateProfile } from 'actions/common/auth';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import 'yup-phone-lite';

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const theme = useTheme();
  let { user } = useSelector((state) => state.auth);
  const initialValues = {
    name: user.name || '',
    email: user.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string().min(3, 'Name is too short').max(30, 'Name is too long').required('Please input your Name'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        phone: Yup.string().required('Please enter phone number'),
        address: Yup.string()
          .min(3, 'Address is too short')
          .max(1000, 'Address is too long')
          .required('Please input your Address')
      })}
      onSubmit={async (values) => {
        dispatch(updateProfile(values));
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.name && errors.name)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>Name</InputLabel>
                  <OutlinedInput value={values.name} name="name" onBlur={handleBlur} onChange={handleChange} />
                  {touched.name && errors.name && (
                    <FormHelperText id="helper-text-name" error>
                      {errors.name}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>Email</InputLabel>
                  <OutlinedInput
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    readOnly
                  />
                  {touched.email && errors.email && (
                    <FormHelperText id="helper-text-email" error>
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.phone && errors.phone)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel>Phone</InputLabel>
                  <OutlinedInput name="phone" value={values.phone} onBlur={handleBlur} onChange={handleChange} />
                  {touched.phone && errors.phone && (
                    <FormHelperText id="helper-text-phone" error>
                      {errors.phone}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                error={Boolean(touched.address && errors.address)}
                sx={{ ...theme.typography.customInput }}
              >
                <TextareaAutosize
                  placeholder="Address"
                  style={{
                    minWidth: '100%',
                    maxWidth: '100%',
                    minHeight: '190px',
                    padding: '1em',
                    borderColor: '#ccc',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  value={values.address}
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.address && errors.address && (
                  <FormHelperText id="helper-text-address" error>
                    {errors.address}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} className="h-align-right">
              <Button className="admin-submit-btn" type="submit" disableElevation disabled={isSubmitting}>
                Update
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default Profile;
