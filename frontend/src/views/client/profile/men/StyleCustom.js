import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, Grid, Button, Typography, FormControl, useTheme, TextareaAutosize } from '@mui/material';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { mGetStyleCustom, mEditStyleCustom } from 'actions/client/profile';
import { FirstUpper } from 'utils/FirstUpper';
import NavTabs from '../../component/profile/NavTabs';
import Left from '../../component/profile/Left';
import ImageUpload from '../../component/profile/ImageUpload';
import { Style_Custom, iBrands } from 'constant/brand';
import BrandSelector from 'views/client/component/profile/BrandSelector';
import GenS3Link from 'utils/GenS3Link';

const StyleCustom = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewState, setViewState] = useState(true);
  const { user } = useSelector((state) => state.auth);
  let saveReturn = false;

  useEffect(() => {
    dispatch(mGetStyleCustom());
  }, [dispatch]);
  const { mStyleCustom } = useSelector((state) => state.profile);

  let newMStyleCustom = {
    ...mStyleCustom,
    mens_brands: mStyleCustom?.mens_brands ? mStyleCustom?.mens_brands.split(',') : []
  };
  const left = {
    title: `Hi ${FirstUpper(user?.name)}`,
    content: 'We are working with hundreds of brands and will help you FIT you under your budget.',
    image: GenS3Link(Style_Custom)
  };
  const initVal = {
    mens_brands: [],
    profile_note: '',
    dsgnImgUrl1st: '',
    dsgnImgUrl2nd: '',
    dsgnImgUrl3rd: ''
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
                <Link to="/welcome/basic-info/men" style={{ color: '#232f3e' }}>
                  Basic Information
                </Link>
              </Grid>
              <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                <Link to="/welcome/style-fit/men" style={{ color: '#232f3e' }}>
                  Style Fit
                </Link>
              </Grid>
              <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                <Link to="/welcome/price-range/men" style={{ color: '#232f3e' }}>
                  Price Range
                </Link>
              </Grid>
              <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                <Link to="/welcome/style-custom/men" style={{ color: '#ff6c00' }}>
                  Custom Design & Brands
                </Link>
              </Grid>
            </Grid>
          )}
          <Formik
            initialValues={mStyleCustom === null ? initVal : newMStyleCustom}
            enableReinitialize
            onSubmit={async (values) => {
              if (saveReturn) {
                dispatch(mEditStyleCustom({ ...values, mens_brands: values.mens_brands.toString() }));
                saveReturn = false;
              } else {
                dispatch(mEditStyleCustom({ ...values, mens_brands: values.mens_brands.toString() }, navigate));
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
                        <ImageUpload arg="dsgnImgUrl1st" value={values.dsgnImgUrl1st} setFieldValue={setFieldValue} />
                        <Typography className="basic-info-sub-title" align="center">
                          First Design
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <ImageUpload arg="dsgnImgUrl2nd" value={values.dsgnImgUrl2nd} setFieldValue={setFieldValue} />
                        <Typography className="basic-info-sub-title" align="center">
                          Second Design
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <ImageUpload arg="dsgnImgUrl3rd" value={values.dsgnImgUrl3rd} setFieldValue={setFieldValue} />
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
                    <Typography className="basic-info-title">Brand or store you prefer to shop</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <BrandSelector
                      brands={iBrands}
                      name="mens_brands"
                      value={values.mens_brands}
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

export default StyleCustom;
