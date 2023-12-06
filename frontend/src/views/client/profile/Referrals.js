import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Chip,
  Divider,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  ButtonGroup,
  Button,
  OutlinedInput,
  useTheme,
  TextareaAutosize
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import DFnewLogger from 'utils/DFnewLogger';
import NavTabs from '../component/profile/NavTabs';
import { useSelector } from 'react-redux';

library.add(fab);

const Referrals = () => {
  const theme = useTheme();
  const [genderVal, setGenderValue] = useState('w');
  const [copied, setCopied] = useState(false);
  const { user_id } = useSelector((state) => state.auth.user);
  const onSubmit = (data) => {
    try {
      data.e.preventDefault();
      DFnewLogger(data.values);
    } catch (e) {
      DFnewLogger(e?.message);
    }
  };

  return (
    <>
      <NavTabs />
      <Divider />
      <Box className="referrals">
        <Typography className="referrals-title">Get $25 when friends try Drape Fit!</Typography>
        <Typography className="referrals-content padding-20" align="center">
          We currently support one shipping address and one credit card per family. Any styling fees or items kept will
          be charged to the credit card on file, which can be changed in your account settings. Please confirm the
          address where you'll receive all Fixes.
        </Typography>
        <Grid container className="referrals-container">
          <Grid item xs={12} className="padding-12">
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography className="referrals-sub-title">I'm sharing my link with:</Typography>
                <Typography className="referrals-content">(This can help us personal their experience)</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <ButtonGroup size="large" variant="outlined">
                    <Button
                      className="radio-button-group"
                      style={{ backgroundColor: genderVal === 'w' ? '#ff6c00' : '#fff', color: '#232f3e' }}
                      onClick={() => {
                        setGenderValue('w');
                        setCopied(false);
                      }}
                    >
                      Women
                    </Button>
                    <Button
                      className="radio-button-group"
                      style={{ backgroundColor: genderVal === 'm' ? '#ff6c00' : '#fff', color: '#232f3e' }}
                      onClick={() => {
                        setGenderValue('m');
                        setCopied(false);
                      }}
                    >
                      Men
                    </Button>
                    <Button
                      className="radio-button-group"
                      style={{ backgroundColor: genderVal === 'k' ? '#ff6c00' : '#fff', color: '#232f3e' }}
                      onClick={() => {
                        setGenderValue('k');
                        setCopied(false);
                      }}
                    >
                      Kids
                    </Button>
                  </ButtonGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className="padding-12">
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography className="referrals-sub-title">I'm sharing my link with:</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <OutlinedInput
                  size="small"
                  fullWidth
                  value={`https://www.drapefittest.com/invite/qqqq-${user_id}?sod=${genderVal}`}
                  endAdornment={
                    copied ? (
                      <Button className="link-copy-btn copied">Copied</Button>
                    ) : (
                      <CopyToClipboard
                        text={`https://www.drapefittest.com/invite/qqqq-${user_id}?sod=${genderVal}`}
                        onCopy={() => setCopied(true)}
                      >
                        <Button className="link-copy-btn">Copy</Button>
                      </CopyToClipboard>
                    )
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className="padding-12">
            <Divider>
              <Chip label=" OR " />
            </Divider>
          </Grid>
          <Grid item xs={12} className="padding-12">
            <Typography className="referrals-sub-title">Enter email addresses separated by comma(,)</Typography>
            <Typography className="referrals-content">
              (We use your contacts only to help you send referral links)
            </Typography>{' '}
            <Formik
              initialValues={{
                message: '',
                submit: null
              }}
              validationSchema={Yup.object().shape({
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
                <Form noValidate onSubmit={(e) => onSubmit({ e, values })}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.message && errors.message)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <TextareaAutosize
                      placeholder="Message *"
                      style={{
                        minWidth: '100%',
                        maxWidth: '100%',
                        minHeight: '160px',
                        padding: '20px 20px',
                        borderColor: '#b1b1b1',
                        borderRadius: '12px',
                        fontSize: '14px'
                      }}
                      value={values.message}
                      name="message"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputprops={{}}
                    />
                    {touched.message && errors.message && (
                      <FormHelperText id="helper-text-message" error>
                        {errors.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <Box sx={{ float: 'left' }}>
                    <Button
                      className="create-link-btn"
                      type="submit"
                      disableElevation
                      disabled={isSubmitting}
                      variant="contained"
                    >
                      CREATE MY REFERRAL LINK
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Grid>
          <Grid item xs={12} className="padding-12">
            <Divider>
              <Chip label=" OR " />
            </Divider>
          </Grid>
          <Grid item xs={12} className="padding-12 h-align-center">
            <Box>
              <Link to="" className="twitter link-btn">
                <FontAwesomeIcon icon={['fab', 'twitter']} />
                <span>&nbsp;Tweet</span>
              </Link>
              <Link to="" className="facebook link-btn">
                <FontAwesomeIcon icon={['fab', 'facebook']} />
                <span>&nbsp;Like</span>
              </Link>
              <Link to="" className="linkedin link-btn">
                <FontAwesomeIcon icon={['fab', 'linkedin']} />
                <span>&nbsp;Share</span>
              </Link>
              <Link to="" className="pinterest link-btn">
                <FontAwesomeIcon icon={['fab', 'pinterest']} />
                <span>&nbsp;Pin it</span>
              </Link>
              <Link to="" className="whatsapp link-btn">
                <FontAwesomeIcon icon={['fab', 'whatsapp']} />
                <span>&nbsp;WhatsApp</span>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Referrals;
