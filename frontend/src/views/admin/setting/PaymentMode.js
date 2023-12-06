import { Button, Grid, RadioGroup, Typography, FormControlLabel, FormHelperText } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import CustomRadio from 'views/client/component/profile/CustomRadio';
import DFnewLogger from 'utils/DFnewLogger';

const PaymentMode = () => {
  return (
    <Formik
      initialValues={{ paymentMode: 0 }}
      enableReinitialize
      validationSchema={Yup.object().shape({
        paymentMode: Yup.number().required('Please select like or dislike to receive Email')
      })}
      onSubmit={async (values) => {
        DFnewLogger(values);
      }}
    >
      {({ errors, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <RadioGroup
            aria-labelledby="demo-customized-radios"
            name="paymentMode"
            value={values.paymentMode}
            onChange={handleChange}
          >
            {touched.paymentMode && errors.paymentMode && (
              <FormHelperText id="standard-weight-helper-text--signup" error>
                {errors.paymentMode}
              </FormHelperText>
            )}
            <Grid container spacing={2}>
              {['Live Mode', 'Sandbox Mode'].map((item, index) => (
                <Grid key={index} item xs={12}>
                  <FormControlLabel
                    className="profession-radio-btn"
                    style={{ margin: '-6px 0' }}
                    value={index}
                    control={<CustomRadio />}
                    label={<Typography className="account-common-content">{item}</Typography>}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button className="account-yes-btn" type="submit" disableElevation disabled={isSubmitting}>
                  UPDATE
                </Button>
              </Grid>
            </Grid>
          </RadioGroup>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentMode;
