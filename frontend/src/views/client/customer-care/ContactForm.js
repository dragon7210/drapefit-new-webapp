import { useRef } from 'react';
import {
  Grid,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  TextareaAutosize
} from '@mui/material';
import { Formik } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import * as Yup from 'yup';
import 'yup-phone-lite';

import AnimateButton from 'ui-component/extended/AnimateButton';
import MyEnvConfig from 'configs/MyEnvConfig';
import DFnewLogger from 'utils/DFnewLogger';

const ContactForm = () => {
  const captchaRef = useRef(null);
  const captchaSiteKey = MyEnvConfig.gcaptcha.siteKey;
  const onSubmit = (data) => {
    try {
      data.e.preventDefault();
      // const token = captchaRef.current.getValue();
    } catch (e) {
      DFnewLogger(e?.message);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          subject: '',
          message: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().max(20).required('First Name is required'),
          lastName: Yup.string().max(20).required('Last Name is required'),
          phone: Yup.string()
            .phone(['US', 'IN'], 'Please enter a valid phone number')
            .required('Please enter phone number'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          subject: Yup.string().max(255).required('Subject is required'),
          message: Yup.string().max(1000).required('Message is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            DFnewLogger(err?.message);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={(e) => onSubmit({ e, values })}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)}>
                  <InputLabel>
                    First Name <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    label="First Name *"
                    value={values.firstName}
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.firstName && errors.firstName && (
                    <FormHelperText id="helper-text-firstName" error>
                      {errors.firstName}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)}>
                  <InputLabel>
                    Last Name <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    label="Last Name *"
                    value={values.lastName}
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.lastName && errors.lastName && (
                    <FormHelperText id="helper-text-lastName" error>
                      {errors.lastName}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                  <InputLabel>
                    Phone Number <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    label="Phone Number *"
                    value={values.phone}
                    name="phone"
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
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                  <InputLabel>
                    Email Address <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    label="Email Address *"
                    value={values.email}
                    name="email"
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
                <FormControl fullWidth error={Boolean(touched.subject && errors.subject)}>
                  <InputLabel>
                    Subject <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <OutlinedInput
                    size="small"
                    label="Subject *"
                    value={values.subject}
                    name="subject"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.subject && errors.subject && (
                    <FormHelperText id="helper-text-subject" error>
                      {errors.subject}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth error={Boolean(touched.message && errors.message)}>
                  <TextareaAutosize
                    placeholder="Message *"
                    style={{
                      minWidth: '100%',
                      maxWidth: '100%',
                      minHeight: '240px',
                      padding: '30px 20px',
                      borderColor: '#ccc',
                      borderRadius: '12px',
                      fontSize: '14px'
                    }}
                    value={values.message}
                    name="message"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.message && errors.message && (
                    <FormHelperText id="helper-text-message" error>
                      {errors.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <ReCAPTCHA sitekey={captchaSiteKey} ref={captchaRef} />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText id="helper-text-submit" error>
                  {errors.submit}
                </FormHelperText>
              </Box>
            )}
            <Box sx={{ float: 'right' }}>
              <AnimateButton>
                <Button
                  className="rounded-gradient-btn"
                  type="submit"
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  variant="contained"
                  color="secondary"
                >
                  SUBMIT
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
