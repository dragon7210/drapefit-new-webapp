import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography, Paper, Grid, Divider, TextareaAutosize, Button, FormControl } from '@mui/material';
import Barcode from 'react-barcode';
import { Formik, Form } from 'formik';

import ImageUpload from 'views/client/component/profile/ImageUpload';

const Catelog = () => {
  const initVal = {
    comments: '',
    suggestionImg1st: '',
    suggestionImg2nd: '',
    suggestionImg3rd: '',
    suggestionImg4th: '',
    suggestionImg5th: '',
    suggestionImg6th: ''
  };

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Catelog</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Box className="h-align-right">
          <Barcode value="john@doe.com" height={100} width={1.5} />
        </Box>
        <Box className="fx-sm-padding">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography className="orange-bold-title">Hello, John Doe</Typography>
            </Grid>
            <Grid item xs={12}>
              <Formik initialValues={initVal} enableReinitialize>
                {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <TextareaAutosize
                            placeholder="comments"
                            style={{
                              minWidth: '100%',
                              maxWidth: '100%',
                              minHeight: '100px',
                              padding: '15px',
                              borderColor: '#ccc',
                              borderRadius: '12px',
                              fontSize: '14px'
                            }}
                            value={values.comments}
                            name="comments"
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="darker-extra-bold-title">Your FIT Suggestions</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Grid container spacing={1}>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg1st"
                              value={values.suggestionImg1st}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg2nd"
                              value={values.suggestionImg2nd}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg3rd"
                              value={values.suggestionImg3rd}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg4th"
                              value={values.suggestionImg4th}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg5th"
                              value={values.suggestionImg5th}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg6th"
                              value={values.suggestionImg6th}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>Alic Blue</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>Alic Blue Simona Henley Blouse</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Grid container spacing={1}>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg1st"
                              value={values.suggestionImg1st}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg2nd"
                              value={values.suggestionImg2nd}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg3rd"
                              value={values.suggestionImg3rd}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg4th"
                              value={values.suggestionImg4th}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg5th"
                              value={values.suggestionImg5th}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg6th"
                              value={values.suggestionImg6th}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>Alic Blue</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>Alic Blue Simona Henley Blouse</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Grid container spacing={1}>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg1st"
                              value={values.suggestionImg1st}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg2nd"
                              value={values.suggestionImg2nd}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg3rd"
                              value={values.suggestionImg3rd}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg4th"
                              value={values.suggestionImg4th}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg5th"
                              value={values.suggestionImg5th}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg6th"
                              value={values.suggestionImg6th}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>Alic Blue</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>Alic Blue Simona Henley Blouse</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Grid container spacing={1}>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg1st"
                              value={values.suggestionImg1st}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg2nd"
                              value={values.suggestionImg2nd}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg3rd"
                              value={values.suggestionImg3rd}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg4th"
                              value={values.suggestionImg4th}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg5th"
                              value={values.suggestionImg5th}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <ImageUpload
                              arg="suggestionImg6th"
                              value={values.suggestionImg6th}
                              setFieldValue={setFieldValue}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>Alic Blue</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>Alic Blue Simona Henley Blouse</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Box>
        <Button className="account-no-btn">Print</Button>
        <Button className="account-yes-btn">Back</Button>
      </Paper>
    </>
  );
};

export default Catelog;
