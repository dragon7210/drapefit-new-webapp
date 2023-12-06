import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  useTheme,
  Grid
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { getScanProduct } from 'actions/admin/product';
import { useDispatch, useSelector } from 'react-redux';
import Scaned from './scaned';
import { useState } from 'react';

const ScanProducts = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [scanValue, setScanValue] = useState();

  const { scanProduct } = useSelector((state) => state.product);

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Scan Products</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{ product: '' }}
          validationSchema={Yup.object().shape({
            product: Yup.string().max(30, 'Product Name is too long').required('Product Name is required')
          })}
          onSubmit={async (values) => {
            dispatch(getScanProduct(values));
            setScanValue(values);
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container className="h-align-center">
                <Grid item xs={12} sm={6} md={4} lg={3} className="h-align-center">
                  <FormControl
                    fullWidth
                    error={Boolean(touched.product && errors.product)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel>Product Scan</InputLabel>
                    <OutlinedInput name="product" value={values.product} onBlur={handleBlur} onChange={handleChange} />
                    {touched.product && errors.product && (
                      <FormHelperText id="helper-text-product" error>
                        {errors.product}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} className="h-align-center">
                  <Grid item xs={12} sm={6} md={4} lg={3} className="h-align-right">
                    <Button className="admin-submit-btn" type="submit" disableElevation disabled={isSubmitting}>
                      Scan
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
      {scanProduct.length > 0 && (
        <Box>
          <h1 className="scan-title">Please Complete Your Checkout</h1>
          {scanProduct.map((item, index) => (
            <Scaned data={item} key={index} scanValue={scanValue} />
          ))}
        </Box>
      )}
    </>
  );
};

export default ScanProducts;
