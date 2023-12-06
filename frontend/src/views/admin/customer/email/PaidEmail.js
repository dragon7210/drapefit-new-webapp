import { Link } from 'react-router-dom';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import Quill from 'ui-component/Quill';
import DFnewLogger from 'utils/DFnewLogger';

const EmailNotPaidList = () => {
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Email: john@doe.com</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            title: '',
            content: ''
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().min(6).max(30).required('Title is required'),
            content: Yup.string().min(30).max(3000).required('Content is required')
          })}
          onSubmit={async (values) => {
            DFnewLogger(values);
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography color="#ff0000">All (*) fields are mandatory</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={Boolean(touched.title && errors.title)}>
                    <InputLabel>
                      Title <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <OutlinedInput
                      size="small"
                      label="Title *"
                      name="title"
                      value={values.title}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.title && errors.title && (
                      <FormHelperText id="helper-text-title" error>
                        {errors.title}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={Boolean(touched.content && errors.content)}>
                    <Quill />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button className="admin-submit-btn" type="submit" disableElevation disabled={isSubmitting}>
                    Send Email
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
};

export default EmailNotPaidList;
