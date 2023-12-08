import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, Grid, Button, Typography, FormControl, useTheme, TextareaAutosize } from '@mui/material';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

import BrandSelector from 'views/client/component/profile/BrandSelector';
import { kEditStyleCustom, kGetStyleCustom } from 'actions/client/kids';
import { FirstUpper } from 'utils/FirstUpper';
import NavTabs from '../../component/profile/NavTabs';
import Left from '../../component/profile/Left';
import ImageUpload from '../../component/profile/ImageUpload';
import { Brand_Image, kBrands } from 'constant/brand';
import GenS3Link from 'utils/GenS3Link';

const GirlStyleCustom = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const kid_count = localStorage.getItem('order');
  const [viewState, setViewState] = useState(true);
  const { user } = useSelector((state) => state.auth);
  let saveReturn = false;

  useEffect(() => {
    dispatch(kGetStyleCustom({ kid_count }));
  }, [dispatch, kid_count]);

  const { kStyleCustom } = useSelector((state) => state.kids);

  let newKStyleCustom = {
    ...kStyleCustom,
    brands: kStyleCustom?.brands ? kStyleCustom?.brands.split(',') : []
  };
  const left = {
    title: `Hi ${FirstUpper(user?.name)}`,
    content: 'We are working with hundreds of brands and will help you FIT you under your budget.',
    image: GenS3Link(Brand_Image)
  };
  const initVal = {
    brands: [],
    profile_note: '',
    img1: '',
    img2: '',
    img3: ''
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
                <Link to="/welcome/price-range/kids/girls" style={{ color: '#232f3e' }}>
                  Price Range
                </Link>
              </Grid>
              <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                <Link to="/welcome/style-custom/kids/girls" style={{ color: '#ff6c00' }}>
                  Custom Design & Brands
                </Link>
              </Grid>
            </Grid>
          )}
          <Formik
            initialValues={kStyleCustom == null ? initVal : newKStyleCustom}
            enableReinitialize
            onSubmit={async (values) => {
              if (saveReturn) {
                dispatch(kEditStyleCustom({ ...values, brands: values.brands.toString() }, kid_count));
                saveReturn = false;
              } else {
                dispatch(kEditStyleCustom({ ...values, brands: values.brands.toString() }, kid_count, navigate));
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container padding="20px">
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">
                      Please do click to upload any reference images / design you want your stylist to work for you
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6} md={4}>
                        <ImageUpload arg="img1" value={values.img1} setFieldValue={setFieldValue} />
                        <Typography className="basic-info-sub-title" align="center">
                          First Design
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <ImageUpload arg="img2" value={values.img2} setFieldValue={setFieldValue} />
                        <Typography className="basic-info-sub-title" align="center">
                          Second Design
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <ImageUpload arg="img3" value={values.img3} setFieldValue={setFieldValue} />
                        <Typography className="basic-info-sub-title" align="center">
                          Third Design
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">
                      Brand or store you prefer to shop for your child
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <BrandSelector
                      brands={kBrands}
                      name="brands"
                      value={values.brands}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className="basic-info-title">Add additional comments</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
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
                        value={values.profile_note}
                        name="profile_note"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ margin: '20px 0' }} />
                  </Grid>
                  {viewState && (
                    <>
                      <Grid className="h-align-center" item xs={12}>
                        <Button className="profile-gradient-btn" type="submit" disableElevation disabled={isSubmitting}>
                          NEXT: MANAGE YOUR FIT SETTINGS&nbsp;&nbsp;&nbsp;
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

export default GirlStyleCustom;
