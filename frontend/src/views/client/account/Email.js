import { useSelector } from 'react-redux';
import { Box, Button, Divider, Grid, RadioGroup, Typography, FormControlLabel, FormHelperText } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import DFnewLogger from 'utils/DFnewLogger';
import CustomRadio from '../component/profile/CustomRadio';

const Email = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Box className="overview">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className="overview-sup-title">EMAIL PREFERENCES</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ borderColor: '#ff6c00' }} />
        </Grid>
        <Grid item xs={12}>
          <Typography className="account-common-content">
            Your email address on file is: <strong>{user?.email}</strong>
          </Typography>
          <Typography className="account-common-content">I'd like to receive</Typography>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={{
              receiveEmail: 0
            }}
            enableReinitialize
            validationSchema={Yup.object().shape({
              receiveEmail: Yup.number().required('Please select like or dislike to receive Email')
            })}
            onSubmit={async (values) => {
              DFnewLogger(values);
            }}
          >
            {({ errors, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <RadioGroup
                  aria-labelledby="demo-customized-radios"
                  name="receiveEmail"
                  value={values.receiveEmail}
                  onChange={handleChange}
                >
                  {touched.receiveEmail && errors.receiveEmail && (
                    <FormHelperText id="standard-weight-helper-text--signup" error>
                      {errors.receiveEmail}
                    </FormHelperText>
                  )}
                  <Grid container spacing={2}>
                    {['Exclusive offers, news, styling, tips and more!', 'No emails, please'].map((item, index) => (
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
                    <Grid item xs={12} className="h-align-right">
                      <Button className="account-no-btn">CANCEL</Button>
                      <Button className="account-yes-btn" type="submit" disableElevation disabled={isSubmitting}>
                        SAVE
                      </Button>
                    </Grid>
                  </Grid>
                </RadioGroup>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Email;
