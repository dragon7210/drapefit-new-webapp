import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Dialog, DialogTitle, DialogActions, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { getInventoryValueSet, editInventoryValueSet } from 'actions/inventory/product';
import DFnewLogger from 'utils/DFnewLogger';
import InputForm from 'ui-component/input/InputForm';

const ValueSet = () => {
  const dispatch = useDispatch();
  const { valueSet } = useSelector((state) => state.invProduct);
  const [valueSetInput, setValueSetInput] = useState({});
  const [openEditConfirm, setOpenEditConfirm] = useState(false);
  const handleEditConfirmDialog = () => {
    setOpenEditConfirm(!openEditConfirm);
  };

  useEffect(() => {
    dispatch(getInventoryValueSet());
  }, [dispatch]);

  return (
    <>
      <Formik
        initialValues={{
          parentCheckoutTimeFee: valueSet.parentCheckoutTimeFee ?? '',
          kidCheckoutTimeFee: valueSet.kidCheckoutTimeFee ?? '',
          salesTax100: valueSet.salesTax100 ?? '',
          parentStyleFees: valueSet.parentStyleFees ?? '',
          kidStyleFee: valueSet.kidStyleFee ?? '',
          inviteFriendBonus: valueSet.inviteFriendBonus ?? '',
          toHelpBatch: valueSet.toHelpBatch ?? '',
          toHelp: valueSet.toHelp ?? '',
          to_email: valueSet.to_email ?? '',
          from_email: valueSet.from_email ?? ''
        }}
        enableReinitialize
        validationSchema={Yup.object().shape({
          parentCheckoutTimeFee: Yup.number()
            .typeError('Please enter number value')
            .min(0, 'This field value must be greater than or equal to 0')
            .nullable(),
          kidCheckoutTimeFee: Yup.number()
            .typeError('Please enter number value')
            .min(0, 'This field value must be greater than or equal to 0')
            .nullable(),
          salesTax100: Yup.number()
            .typeError('Please enter number value')
            .min(0, 'Sales tax must be greater than or equal to 0')
            .nullable(),
          parentStyleFees: Yup.number()
            .typeError('Please enter number value')
            .min(0, 'Styling fees must be greater than or equal to 0')
            .nullable(),
          kidStyleFee: Yup.number()
            .typeError('Please enter number value')
            .min(0, 'Style fee must be greater than or equal to 0')
            .nullable(),
          inviteFriendBonus: Yup.number()
            .typeError('Please enter number value')
            .min(0, 'This field value must be greater than or equal to 0')
            .nullable(),
          toHelpBatch: Yup.string().trim().email('Please enter a valid email address').max(50, 'Email is too long'),
          toHelp: Yup.string().trim().email('Please enter a valid email address').max(50, 'Email is too long'),
          to_email: Yup.string().trim().email('Please enter a valid email address').max(50, 'Email is too long'),
          from_email: Yup.string().trim().email('Please enter a valid email address').max(50, 'Email is too long')
        })}
        onSubmit={async (values) => {
          setValueSetInput(values);
          handleEditConfirmDialog();
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="Styling Fees Adjustment With Checkout Time (M & W)"
                      name="parentCheckoutTimeFee"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="Styling Fees Adjustment With Checkout Time (Kid)"
                      name="kidCheckoutTimeFee"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="Sales tax for $100"
                      name="salesTax100"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="Men & Women Styling Fees"
                      name="parentStyleFees"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="Kid Style Fee"
                      name="kidStyleFee"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="Invite Friends"
                      name="inviteFriendBonus"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="TO HELP BATCH"
                      name="toHelpBatch"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="TO HELP"
                      name="toHelp"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="To Email"
                      name="to_email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="From Email"
                      name="from_email"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} className="h-align-right" sx={{ mt: 2 }}>
                  <Button
                    className="admin-submit-btn"
                    type="submit"
                    disableElevation
                    disabled={!isValid || !dirty || isSubmitting}
                  >
                    SAVE
                  </Button>
                </Grid>
              </Grid>
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
                await dispatch(editInventoryValueSet(valueSetInput));
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

export default ValueSet;
