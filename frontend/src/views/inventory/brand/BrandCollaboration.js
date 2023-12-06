import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid, Paper, Typography, Breadcrumbs } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';
import { createCollaborationBrand } from 'actions/inventory/brand';
import InputForm from 'ui-component/input/InputForm';

const BrandCollaboration = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfadmin/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link disable">Brand</Typography>
            <Typography className="home-link current">Brand Collaboration</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Brand Collaboration</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{ brandName: '', name: '', email: '', phone: '', website: '' }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(30).required('Name is required'),
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            website: Yup.string().required('Website is required'),
            phone: Yup.string().required('Phone Number is required'),
            brandName: Yup.string().required('Brand Number is required')
          })}
          onSubmit={async (values, actions) => {
            dispatch(createCollaborationBrand(values));
            actions.resetForm();
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography color="#ff0000">All (*) fields are mandatory</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    errors={errors}
                    values={values}
                    touched={touched}
                    label="Brand Name *"
                    name="brandName"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    errors={errors}
                    values={values}
                    touched={touched}
                    label="Email *"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    errors={errors}
                    values={values}
                    touched={touched}
                    label="Name *"
                    name="name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    errors={errors}
                    values={values}
                    touched={touched}
                    label="Phone *"
                    name="phone"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    errors={errors}
                    values={values}
                    touched={touched}
                    label="Website *"
                    name="website"
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Button className="admin-submit-btn" type="submit" disableElevation disabled={isSubmitting}>
                    Create Brand Collaboration
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

export default BrandCollaboration;
