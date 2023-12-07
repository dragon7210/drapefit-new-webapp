import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, Grid, Button, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

import PriceRadioGroup from 'views/client/component/profile/PriceRadioGroup';
import { wEditPriceRange, wGetPriceRange } from 'actions/client/profile';
import GenS3Link from 'utils/GenS3Link';
import { FirstUpper } from 'utils/FirstUpper';
import NavTabs from '../../component/profile/NavTabs';
import Left from '../../component/profile/Left';
import { womenWears } from 'constant/price';

const Price_Range = GenS3Link('landing/images/client/profile/women/price-range/price-range');

const PriceRange = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewState, setViewState] = useState(true);
  const { user } = useSelector((state) => state.auth);

  let saveReturn = false;

  useEffect(() => {
    dispatch(wGetPriceRange());
  }, [dispatch]);

  const { wPriceRange } = useSelector((state) => state.profile);

  const left = {
    title: `Hi ${FirstUpper(user?.name)}`,
    content: 'Please complete your price range you are looking for that will help us have a best FIT under your budget',
    image: Price_Range
  };
  const initVal = {
    tops: '',
    bottoms: '',
    outwear: '',
    jeans: '',
    jewelry: '',
    accessproes: '',
    dress: ''
  };

  return (
    <>
      {viewState && (
        <>
          <NavTabs />
          <Divider />
        </>
      )}
      <Grid className="profile" container>
        {viewState && (
          <>
            <Grid item xs={12} md={3}>
              <Left propsValue={left} />
            </Grid>
          </>
        )}
        <Divider orientation="horizontal" style={{ backgroundColor: '#eee', width: '1px' }} />
        <Grid item xs={12} md={viewState ? 8 : 12}>
          {viewState && (
            <Grid container>
              <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                <Link to="/welcome/basic-info/women" style={{ color: '#232f3e' }}>
                  Basic Information
                </Link>
              </Grid>
              <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                <Link to="/welcome/style-fit/women" style={{ color: '#232f3e' }}>
                  Style Fit
                </Link>
              </Grid>
              <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                <Link to="/welcome/price-range/women" style={{ color: '#ff6c00' }}>
                  Price Range
                </Link>
              </Grid>
              <Grid className={`gray-border breadcrumb-tab ${user?.pStatus < 3 ? 'disabled' : ''}`} item xs={12} sm={3}>
                <Link to="/welcome/style-custom/women" style={{ color: '#232f3e' }}>
                  Custom Design & Brands
                </Link>
              </Grid>
            </Grid>
          )}
          <Formik
            initialValues={wPriceRange == null ? initVal : wPriceRange}
            enableReinitialize
            onSubmit={async (values) => {
              if (saveReturn) {
                dispatch(wEditPriceRange(values));
                saveReturn = false;
              } else {
                dispatch(wEditPriceRange(values, navigate));
              }
            }}
          >
            {({ errors, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container padding="20px">
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">Help Us Know your Budget</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <PriceRadioGroup
                      wears={womenWears}
                      value={values}
                      touched={touched}
                      errors={errors}
                      handleChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                  {viewState && (
                    <>
                      <Grid className="h-align-center" item xs={12}>
                        <Button className="profile-gradient-btn" type="submit" disableElevation disabled={isSubmitting}>
                          NEXT: CUSTOM DESIGN & BRANDS&nbsp;&nbsp;&nbsp;
                          <FontAwesomeIcon icon={faLongArrowRight} />
                        </Button>
                      </Grid>
                      <Grid className="h-align-center" item xs={12}>
                        <Typography
                          className="save-return"
                          onClick={() => {
                            saveReturn = true;
                            handleSubmit();
                          }}
                        >
                          SAVE AND RETURN &rsaquo;&rsaquo;
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default PriceRange;
