import { Link } from 'react-router-dom';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import InputForm from 'ui-component/input/InputForm';
import { useDispatch } from 'react-redux';
import { addCareer } from 'actions/admin/career';

const CreateCareer = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Create Career</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            school: '',
            degree: '',
            discipline: '',
            about_this_job: ''
          }}
          validationSchema={Yup.object().shape({
            school: Yup.string().max(50).required('School is required'),
            degree: Yup.string().max(50).required('Degree is required'),
            discipline: Yup.string().max(50).required('Discipline is required'),
            about_this_job: Yup.string().max(50).required('aboutThisJob is required')
          })}
          onSubmit={async (values, actions) => {
            dispatch(addCareer(values));
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
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                    name="school"
                    label="School *"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                    name="degree"
                    label="Degree *"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                    name="discipline"
                    label="Discipline *"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                    name="about_this_job"
                    label="About Job *"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button className="admin-submit-btn" type="submit" disableElevation disabled={isSubmitting}>
                    Create Career
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

export default CreateCareer;
