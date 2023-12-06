import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Typography,
  Button,
  ButtonGroup,
  OutlinedInput,
  InputLabel
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import DFnewLogger from 'utils/DFnewLogger';
import { useSelector } from 'react-redux';

const FBIcon = GenS3Link('landing/images/icons/social-facebook');
const MailIcon = GenS3Link('landing/images/icons/social-mail');

const Credit = () => {
  const [genderVal, setGenderValue] = useState('w');
  const [copied, setCopied] = useState(false);
  const { user_id } = useSelector((state) => state.auth.user);

  return (
    <Box className="overview">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className="overview-sup-title">
            ACCOUNT CREDIT
            <span style={{ float: 'right', color: '#232f3e', fontSize: '13px' }}>Credit Balance: $0.00</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider style={{ borderColor: '#ff6c00' }} />
        </Grid>
        <Grid item xs={12}>
          <Typography className="account-common-content">Please redeem your Promo Code and Gift Card here.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ padding: { lg: '20px 1vw', xl: '20px 8vw' } }}>
            <Grid item xs={12} sm={6}>
              <Box className="custom-border">
                <Formik
                  initialValues={{
                    promoCode: ''
                  }}
                  validationSchema={Yup.object().shape({
                    promoCode: Yup.string().min(6).max(20).required('Please input your Promo Code')
                  })}
                  onSubmit={async (values) => {
                    DFnewLogger(values);
                  }}
                >
                  {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <FormControl fullWidth error={Boolean(touched.promoCode && errors.promoCode)}>
                        <InputLabel>redeem your promo code</InputLabel>
                        <OutlinedInput
                          size="small"
                          label="redeem your promo code"
                          value={values.promoCode}
                          type="text"
                          name="promoCode"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.promoCode && errors.promoCode && (
                          <FormHelperText id="helper-text-promoCode" error>
                            {errors.promoCode}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <Button
                        className="profile-gradient-btn"
                        type="submit"
                        disableElevation
                        fullWidth
                        disabled={isSubmitting}
                      >
                        REDEEM PROMO CODE
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className="custom-border">
                <Formik
                  initialValues={{
                    giftCode: ''
                  }}
                  validationSchema={Yup.object().shape({
                    giftCode: Yup.string().min(6).max(20).required('Please input your Gift Code')
                  })}
                  onSubmit={async (values) => {
                    DFnewLogger(values);
                  }}
                >
                  {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <FormControl fullWidth error={Boolean(touched.giftCode && errors.giftCode)}>
                        <InputLabel>redeem your gift code</InputLabel>
                        <OutlinedInput
                          size="small"
                          label="redeem your gift code"
                          value={values.giftCode}
                          type="text"
                          name="giftCode"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.giftCode && errors.giftCode && (
                          <FormHelperText id="helper-text-giftCode" error>
                            {errors.giftCode}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <Button
                        className="profile-gradient-btn"
                        type="submit"
                        disableElevation
                        fullWidth
                        disabled={isSubmitting}
                      >
                        REDEEM GIFT CODE
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="custom-border">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography className="account-common-title" align="center">
                      Invite Friends
                    </Typography>
                    <Typography className="account-common-title" align="center">
                      Get $25
                    </Typography>
                    <Typography align="center">Who are you inviting?</Typography>
                  </Grid>
                  <Grid item xs={12} className="h-align-center">
                    <ButtonGroup size="large" variant="outlined">
                      <Button
                        className="radio-button-group"
                        style={{
                          backgroundColor: genderVal === 'w' ? '#ff6c00' : '#fff',
                          color: '#232f3e'
                        }}
                        onClick={() => {
                          setGenderValue('w');
                          setCopied(false);
                        }}
                      >
                        Women
                      </Button>
                      <Button
                        className="radio-button-group"
                        style={{
                          backgroundColor: genderVal === 'm' ? '#ff6c00' : '#fff',
                          color: '#232f3e'
                        }}
                        onClick={() => {
                          setGenderValue('m');
                          setCopied(false);
                        }}
                      >
                        Men
                      </Button>
                      <Button
                        className="radio-button-group"
                        style={{
                          backgroundColor: genderVal === 'k' ? '#ff6c00' : '#fff',
                          color: '#232f3e'
                        }}
                        onClick={() => {
                          setGenderValue('k');
                          setCopied(false);
                        }}
                      >
                        Kids
                      </Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center">choose a way to share</Typography>
                  </Grid>
                  <Grid item xs={12}>
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
                  <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>Or share via:</span>
                    &nbsp;&nbsp;
                    <Link to="https://mail.google.com">
                      <DFnewImgTag
                        src={`${MailIcon}.svg`}
                        fallback={`${MailIcon}.svg`}
                        width="30"
                        height="30"
                        lzheight={30}
                        alt="CONNECT EMAIL"
                      />
                    </Link>
                    &nbsp;&nbsp;
                    <Link to="https://www.facebook.com">
                      <DFnewImgTag
                        src={`${FBIcon}.svg`}
                        fallback={`${FBIcon}.svg`}
                        width="30"
                        height="30"
                        lzheight={30}
                        alt="CONNECT FACEBOOK"
                      />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography align="center">How Referrals Work</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="account-common-content v-align-center">
                      <span style={{ fontSize: '30px' }}>&#10112;</span>
                      &nbsp;&nbsp;Share your referral link with friends via email or social media.
                    </Typography>
                    <Typography className="account-common-content v-align-center">
                      <span style={{ fontSize: '30px' }}>&#10113;</span>
                      &nbsp;&nbsp;Get $25 credit when they checkout from their first Fit.
                    </Typography>
                    <Typography className="account-common-content v-align-center">
                      <span style={{ fontSize: '30px' }}>&#10114;</span>
                      &nbsp;&nbsp;Enjoy! Credits automatically apply to your future Fits.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Credit;
