import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, Grid, Button, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

import PriceRadioGroup from 'views/client/component/profile/PriceRadioGroup';
import { kEditPriceRange, kGetPriceRange } from 'actions/client/kids';
import GenS3Link from 'utils/GenS3Link';
import { FirstUpper } from 'utils/FirstUpper';
import NavTabs from '../../component/profile/NavTabs';
import Left from '../../component/profile/Left';

const Price_Range = GenS3Link('landing/images/client/profile/kids/price-range/girl/price-range');

const GirlPriceRange = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const kid_count = localStorage.getItem('order');
  const [viewState, setViewState] = useState(true);
  const { user } = useSelector((state) => state.auth);
  let saveReturn = false;

  useEffect(() => {
    dispatch(kGetPriceRange({ kid_count }));
  }, [dispatch, kid_count]);

  const { kPriceRange } = useSelector((state) => state.kids);
  const left = {
    title: `Hi ${FirstUpper(user?.name)}`,
    content:
      'Please complete your child price range you are looking for that will help us have a best FIT under your budget',
    image: Price_Range
  };
  const initVal = {
    casual_shirts: '',
    skirts_shorts: '',
    leggings: '',
    jeans: '',
    dresses: '',
    sweaters: '',
    blouses: '',
    jaket: '',
    shoes: ''
  };
  const wears = [
    { title: 'CASUAL SHIRTS', value: 'casual_shirts', prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+'] },
    { title: 'SKIRTS & SHORTS', value: 'skirts_shorts', prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+'] },
    { title: 'LEGGINGS', value: 'leggings', prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+'] },
    { title: 'JEANS', value: 'jeans', prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+'] },
    { title: 'DRESSES', value: 'dresses', prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+'] },
    { title: 'SWEATERS', value: 'sweaters', prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+'] },
    { title: 'BLOUSES', value: 'blouses', prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+'] },
    { title: 'jaket', value: 'jaket', prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+'] },
    { title: 'SHOES', value: 'shoes', prices: ['$20 - $30', '$30 - $40', '$40 - $50', '$50+'] }
  ];

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
          <Grid item xs={12} md={3}>
            <Left propsValue={left} />
          </Grid>
        )}
        <Divider orientation="horizontal" style={{ backgroundColor: '#eee', width: '1px' }} />
        <Grid item xs={12} md={viewState ? 8 : 12}>
          {viewState && (
            <Grid container>
              <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                <Link to="/welcome/basic-info/kids" style={{ color: '#232f3e' }}>
                  Basic Information
                </Link>
              </Grid>
              <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                <Link to="/welcome/style-fit/kids/girls" style={{ color: '#232f3e' }}>
                  Style Fit
                </Link>
              </Grid>
              <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                <Link to="/welcome/price-range/kids/girls" style={{ color: '#ff6c00' }}>
                  Price Range
                </Link>
              </Grid>
              <Grid
                className={`gray-border breadcrumb-tab ${user?.kids[kid_count - 1]?.kStatus < 3 ? 'disabled' : ''}`}
                item
                xs={12}
                sm={3}
              >
                <Link to="/welcome/style-custom/kids/girls" style={{ color: '#232f3e' }}>
                  Custom Design & Brands
                </Link>
              </Grid>
            </Grid>
          )}
          <Formik
            initialValues={kPriceRange == null ? initVal : kPriceRange}
            enableReinitialize
            onSubmit={async (values) => {
              if (saveReturn) {
                dispatch(kEditPriceRange(values, kid_count));
                saveReturn = false;
              } else {
                dispatch(kEditPriceRange(values, kid_count, navigate));
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
                      wears={wears}
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

export default GirlPriceRange;
