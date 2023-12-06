import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography, Paper, Grid, FormControl, TextareaAutosize } from '@mui/material';
import { Formik, Form } from 'formik';
import Barcode from 'react-barcode';

import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import DFnewImgTag from 'utils/DFnewImgTag';
import GenS3Link from 'utils/GenS3Link';

const Vote = GenS3Link('landing/images/client/post/vote');

const ViewProduct = () => {
  const initVal = {
    doWithProduct: '',
    likeProduct: '',
    quality: '',
    price: '',
    likeFIT: '',
    productReview: '',
    entireFIT: '',
    satisfiedFIT: '',
    stylistWorked: '',
    addComments: ''
  };

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">View Product</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Grid container className="fx-sm-padding">
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Product Name 1:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">women top 3</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Product Name 2:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">women top 3</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Purchase price:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">40</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Sell Price:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">29.99</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Note:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left"></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Customer Purchase Date:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">2023-04-21</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Barcode:</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} className="h-align-right">
                <Barcode value="WA3A31-10-1208-20" height={80} width={1.2} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Style No:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">WA3A31-10-1208-20</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Size:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">10L (10 - 12)</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Color:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">Sky Blue</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Exchange Status:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">NO</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Return Status:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">NO</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Order USPS Tracking NO:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">31231231231231</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Return USPS Tracking NO:</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left">321231231231231</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">
                  <strong>Product Image</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <DFnewImgTag
                  src={`${Vote}.jpg`}
                  width="100%"
                  lzheight={`auto`}
                  style={{ minHeight: '74px' }}
                  alt="Drape Fit News Image"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Box className="admin-page-title-part" sx={{ mt: '30px' }}>
        <Typography className="page-title">Customer Review about this Product</Typography>
      </Box>
      <Paper className="admin-form-container table-border">
        <Box className="fx-lg-padding">
          <Formik initialValues={initVal} enableReinitialize>
            {({ errors, handleBlur, handleChange, setFieldValue, touched, values }) => (
              <Form>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography className="account-common-content mt-1">
                      What you would like to do with the product?
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <RadioButtonGroup
                      disabled
                      group={['Keep', 'Exchange', 'Return']}
                      name="doWithProduct"
                      value={values.doWithProduct}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="account-common-content mt-1">How was the like?</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <RadioButtonGroup
                      disabled
                      group={['Perfect', 'Just ok', 'Too big', 'Too small']}
                      name="likeProduct"
                      value={values.likeProduct}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="account-common-content mt-1">How was the quality?</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <RadioButtonGroup
                      disabled
                      group={['Great', 'Average', 'Poor']}
                      name="quality"
                      value={values.quality}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="account-common-content mt-1">How was the price?</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <RadioButtonGroup
                      disabled
                      group={['Perfect', 'Too High', 'Just ok']}
                      name="price"
                      value={values.price}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="account-common-content mt-1">How was the Style FIT?</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <RadioButtonGroup
                      disabled
                      group={['Perfect', 'Like It', 'Hate It']}
                      name="likeFIT"
                      value={values.likeFIT}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="account-common-content mt-1">Product Review</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextareaAutosize
                        placeholder="product review ..."
                        style={{
                          minWidth: '100%',
                          maxWidth: '100%',
                          minHeight: '100px',
                          padding: '15px',
                          borderColor: '#ccc',
                          borderRadius: '12px',
                          fontSize: '14px'
                        }}
                        value={values.productReview}
                        name="productReview"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography className="account-common-content mt-1">How was the Entire FIT Box?</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <RadioButtonGroup
                      disabled
                      group={['Good / Bad']}
                      name="entireFIT"
                      value={values.entireFIT}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="account-common-content mt-1">You satisfied with this FIT.</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <RadioButtonGroup
                      disabled
                      group={['Good / Bad']}
                      name="satisfiedFIT"
                      value={values.satisfiedFIT}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="account-common-content mt-1">
                      How you personal stylist worked for you.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <RadioButtonGroup
                      disabled
                      group={['Good / Bad']}
                      name="stylistWorked"
                      value={values.stylistWorked}
                      errors={errors}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="account-common-content mt-1">Additional Comments</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <TextareaAutosize
                        placeholder="Add additional comments..."
                        style={{
                          minWidth: '100%',
                          maxWidth: '100%',
                          minHeight: '100px',
                          padding: '15px',
                          borderColor: '#ccc',
                          borderRadius: '12px',
                          fontSize: '14px'
                        }}
                        value={values.addComments}
                        name="addComments"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Paper>
    </>
  );
};

export default ViewProduct;
