import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { resetInventoryPwd } from 'actions/inventory/product';
import { strengthColor, strengthIndicator } from 'utils/PwdStrength';
import DFnewLogger from 'utils/DFnewLogger';

const Password = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [formActions, setFormActions] = useState();
  const [pwdInput, setPwdInput] = useState({});
  const [openChangePwd, setOpenChangePwd] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const handleClickShowPwd = () => {
    setShowPwd(!showPwd);
  };
  const handleMouseDownPwd = (evt) => {
    evt.preventDefault();
  };
  const changePwd = (value) => {
    const data = strengthIndicator(value);
    setStrength(data);
    setLevel(strengthColor(data));
  };
  const handleChangePwdDialog = () => {
    setOpenChangePwd(!openChangePwd);
  };
  const initVal = {
    currentPwd: '',
    newPwd: '',
    confirmPwd: ''
  };

  return (
    <>
      <Box className="setting-password">
        <Formik
          initialValues={initVal}
          enableReinitialize
          validationSchema={Yup.object().shape({
            currentPwd: Yup.string()
              .min(6, 'Please enter at least 6 characters')
              .max(50, 'Current password is too long')
              .required('Please enter current password'),
            newPwd: Yup.string()
              .min(6, 'Please enter at least 6 characters')
              .max(50, 'New password is too long')
              .required('Please enter new password'),
            confirmPwd: Yup.string()
              .min(6, 'Please enter at least 6 characters')
              .max(50, 'Confirm password is too long')
              .oneOf([Yup.ref('newPwd'), null], 'Confirm password does not match new password')
              .required('Please confirm new password')
          })}
          onSubmit={async (values, actions) => {
            setPwdInput(values);
            setFormActions(actions);
            handleChangePwdDialog();
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography color="#ff0000">All (*) fields are mandatory</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={Boolean(touched.currentPwd && errors.currentPwd)}>
                    <InputLabel>
                      Current Password <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Current Password *"
                      type="password"
                      name="currentPwd"
                      value={values.currentPwd}
                      disabled={user?.role !== 104}
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
                  <FormControl fullWidth error={Boolean(touched.newPwd && errors.newPwd)}>
                    <InputLabel>
                      New Password <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="New Password *"
                      type={showPwd ? 'text' : 'password'}
                      name="newPwd"
                      value={values.newPwd}
                      disabled={user?.role !== 104}
                      onBlur={handleBlur}
                      onChange={(evt) => {
                        handleChange(evt);
                        changePwd(evt.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPwd}
                            onMouseDown={handleMouseDownPwd}
                            edge="end"
                            size="large"
                          >
                            {showPwd ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {touched.newPwd && errors.newPwd && (
                      <FormHelperText id="helper-text-newPwd" error>
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
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={Boolean(touched.confirmPwd && errors.confirmPwd)}>
                    <InputLabel>
                      Confirm Password <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Confirm Password *"
                      type="password"
                      name="confirmPwd"
                      value={values.confirmPwd}
                      disabled={user?.role !== 104}
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
                {user?.role === 104 && (
                  <Grid item xs={12} className="h-align-right">
                    <Button
                      className="admin-submit-btn"
                      type="submit"
                      disableElevation
                      disabled={!isValid || !dirty || isSubmitting}
                    >
                      Change Password
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
      {/* Modal Dialogs */}
      <Dialog open={openChangePwd} onClose={handleChangePwdDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Are you sure to change?</Typography>
        </DialogTitle>
        <DialogActions>
          <Button key="cancel" className="account-no-btn" onClick={handleChangePwdDialog}>
            Cancel
          </Button>
          <Button
            key="submit"
            className="account-yes-btn"
            onClick={async () => {
              try {
                await dispatch(resetInventoryPwd(pwdInput));
                formActions.resetForm();
                setStrength(0);
                setShowPwd(false);
                handleChangePwdDialog();
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

export default Password;
