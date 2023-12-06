import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  TextareaAutosize,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';

import { getSupplierProfile, editSupplierProfile } from 'actions/supply/profile';
import DFnewLogger from 'utils/DFnewLogger';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.splProduct);
  const [profileInput, setProfileInput] = useState({});
  const [openEditConfirm, setOpenEditConfirm] = useState(false);
  const handleEditConfirmDialog = () => {
    setOpenEditConfirm(!openEditConfirm);
  };

  useEffect(() => {
    dispatch(getSupplierProfile());
  }, [dispatch]);

  return (
    <>
      <Formik
        initialValues={{
          name: profile.name ?? '',
          email: profile.email ?? '',
          phone: profile.phone ?? '',
          address: profile.address ?? ''
        }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .trim()
            .min(3, 'Please enter at least 3 characters')
            .max(50, 'Name is too long')
            .required('Please enter name'),
          email: Yup.string()
            .trim()
            .email('Please enter a valid email address')
            .max(50, 'Email is too long')
            .required('Please enter email address'),
          phone: Yup.string()
            .phone(['US', 'IN'], 'Please enter a valid phone number')
            .required('Please enter phone number'),
          address: Yup.string()
            .trim()
            .min(3, 'Please enter at least 3 characters')
            .max(255, 'Address is too long')
            .required('Please enter address')
        })}
        onSubmit={async (values) => {
          setProfileInput(values);
          handleEditConfirmDialog();
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography color="#ff0000">All (*) fields are mandatory</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ mt: 3 }}>
                    <FormControl fullWidth error={Boolean(touched.name && errors.name)}>
                      <InputLabel>Name (READ-ONLY)</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Name (READ-ONLY)"
                        name="name"
                        value={values.name}
                        disabled //-- READ_ONLY
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.name && errors.name && (
                        <FormHelperText id="helper-text-name" error>
                          {errors.name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                      <InputLabel>Email (READ-ONLY)</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Email (READ-ONLY)"
                        name="email"
                        value={values.email}
                        disabled //-- READ-ONLY
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText id="helper-text-email" error>
                          {errors.email}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                      <InputLabel>
                        Phone <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Phone *"
                        name="phone"
                        value={values.phone}
                        disabled={user?.role !== 107}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.phone && errors.phone && (
                        <FormHelperText id="helper-text-phone" error>
                          {errors.phone}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(touched.address && errors.address)}>
                  <Typography>
                    Address <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <TextareaAutosize
                    placeholder="Please enter Address"
                    style={{
                      minWidth: '100%',
                      maxWidth: '100%',
                      minHeight: '125px',
                      padding: '1em',
                      borderColor: '#ccc',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    name="address"
                    value={values.address}
                    disabled={user?.role !== 107}
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
              {user?.role === 107 && (
                <Grid item xs={12} className="h-align-right">
                  <Button
                    className="admin-submit-btn"
                    type="submit"
                    disableElevation
                    disabled={!isValid || !dirty || isSubmitting}
                  >
                    Update
                  </Button>
                </Grid>
              )}
            </Grid>
          </Form>
        )}
      </Formik>
      {/* Modal Dialogs */}
      <Dialog open={openEditConfirm} onClose={handleEditConfirmDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Are you sure to update?</Typography>
        </DialogTitle>
        <DialogActions>
          <Button key="cancel" className="account-no-btn" onClick={handleEditConfirmDialog}>
            Cancel
          </Button>
          <Button
            key="submit"
            className="account-yes-btn"
            onClick={async () => {
              try {
                await dispatch(editSupplierProfile(profileInput));
                handleEditConfirmDialog();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
