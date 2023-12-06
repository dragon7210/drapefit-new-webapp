import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, Breadcrumbs } from '@mui/material';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';

const AddManualProduct = () => {
  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDesktop} />
              &nbsp;&nbsp;Home
            </Link>
            <Link to="/dfinventory/manual-return-product" className="home-link">
              Manual Return Product
            </Link>
            <Typography className="home-link current">Add Product</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Add Product</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            firFor: '',
            productCategory: '',
            subCategory: '',
            productName1st: '',
            productName2nd: '',
            heightFt: '',
            heightIn: '',
            weightLbs: ''
          }}
        >
          {({ errors, handleBlur, handleChange, setFieldValue, touched, values }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  This page is stil in progress ⏳
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
};

export default AddManualProduct;
