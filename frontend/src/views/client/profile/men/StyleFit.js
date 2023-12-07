import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Grid, Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import ImageSelectorCheckbox from 'views/client/component/profile/ImageSelectorCheckbox';
import CustomCheckboxBtn from 'views/client/component/profile/CustomCheckboxBtn';
import ColorRect from 'views/client/component/profile/ColorRect';
import { mEditStyleFit, mGetStyleFit } from 'actions/client/profile';
import GenS3Link from 'utils/GenS3Link';
import { FirstUpper } from 'utils/FirstUpper';
import NavTabs from '../../component/profile/NavTabs';
import Left from '../../component/profile/Left';
import {
  iTypicallyWear2Work,
  iCasualShirts,
  iBtnUpShirts,
  iJeans,
  iBottoms,
  iShorts,
  iOutfits,
  iFitIssues
} from 'constant/menStyleFit';
import { exceptionValue } from 'constant/function';

const Style_Fit = GenS3Link('landing/images/client/profile/men/style-fit/style-fit');

const StyleFit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewState, setViewState] = useState(true);
  const { user } = useSelector((state) => state.auth);
  let saveReturn = false;

  useEffect(() => {
    dispatch(mGetStyleFit());
  }, [dispatch]);

  const { mStyleFit } = useSelector((state) => state.profile);
  const newMStyle = {
    shirt_shoulder: mStyleFit?.shirt_shoulder.split(','),
    casual_shirts_to_fit: mStyleFit?.casual_shirts_to_fit.split(','),
    button_up_shirts_to_fit: mStyleFit?.button_up_shirts_to_fit.split(','),
    jeans_to_fit: mStyleFit?.jeans_to_fit.split(','),
    tuck_in_a_button_up_shirt: mStyleFit?.tuck_in_a_button_up_shirt.split(','),
    your_pants_to_fit: mStyleFit?.your_pants_to_fit.split(','),
    prefer_color: exceptionValue(mStyleFit?.prefer_color),
    prefer_your_shorts: mStyleFit?.prefer_your_shorts.split(','),
    take_note_of: mStyleFit?.take_note_of.split(',')
  };

  const left = {
    title: `Hi ${FirstUpper(user?.name)}`,
    content: 'Please complete your style information that will help us to get completed a best FIT',
    image: Style_Fit
  };
  const initVal = {
    shirt_shoulder: [],
    casual_shirts_to_fit: [],
    button_up_shirts_to_fit: [],
    jeans_to_fit: [],
    tuck_in_a_button_up_shirt: [],
    your_pants_to_fit: [],
    prefer_color: [],
    prefer_your_shorts: [],
    take_note_of: []
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
          <Grid container>
            <Grid item xs={12}>
              {viewState && (
                <Grid container>
                  <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                    <Link to="/welcome/basic-info/men" style={{ color: '#232f3e' }}>
                      Basic Information
                    </Link>
                  </Grid>
                  <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                    <Link to="/welcome/style-fit/men" style={{ color: '#ff6c00' }}>
                      Style Fit
                    </Link>
                  </Grid>
                  <Grid
                    className={`gray-border breadcrumb-tab ${user?.pStatus < 2 ? 'disabled' : ''}`}
                    item
                    xs={12}
                    sm={3}
                  >
                    <Link to="/welcome/price-range/men" style={{ color: '#232f3e' }}>
                      Price Range
                    </Link>
                  </Grid>
                  <Grid
                    className={`gray-border breadcrumb-tab ${user?.pStatus < 3 ? 'disabled' : ''}`}
                    item
                    xs={12}
                    sm={3}
                  >
                    <Link to="/welcome/style-custom/men" style={{ color: '#232f3e' }}>
                      Custom Design & Brands
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <Formik
                initialValues={mStyleFit == null ? initVal : newMStyle}
                enableReinitialize
                validationSchema={Yup.object().shape({
                  casual_shirts_to_fit: Yup.array().min(1, 'Please select Casual Shirts'),
                  button_up_shirts_to_fit: Yup.array().min(1, 'Please select Button-up Shirts'),
                  jeans_to_fit: Yup.array().min(1, 'Please select Jeans'),
                  tuck_in_a_button_up_shirt: Yup.array().min(1, 'Please select Bottoms'),
                  your_pants_to_fit: Yup.array().min(1, 'Please select Shorts'),
                  prefer_your_shorts: Yup.array().min(1, 'Please select OutFits')
                })}
                onSubmit={async (values) => {
                  if (saveReturn) {
                    dispatch(mEditStyleFit(values));
                    saveReturn = false;
                  } else {
                    dispatch(mEditStyleFit(values, navigate));
                  }
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Grid container columnSpacing={4} padding="20px">
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iTypicallyWear2Work}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="shirt_shoulder"
                          value={values.shirt_shoulder}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iCasualShirts}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="casual_shirts_to_fit"
                          value={values.casual_shirts_to_fit}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iBtnUpShirts}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="button_up_shirts_to_fit"
                          value={values.button_up_shirts_to_fit}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iJeans}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="jeans_to_fit"
                          value={values.jeans_to_fit}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iBottoms}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="tuck_in_a_button_up_shirt"
                          value={values.tuck_in_a_button_up_shirt}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iShorts}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="your_pants_to_fit"
                          value={values.your_pants_to_fit}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ColorRect
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="prefer_color"
                          value={values.prefer_color}
                          subject="you"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorCheckbox
                          content={iOutfits}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="prefer_your_shorts"
                          value={values.prefer_your_shorts}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">Any fit issues to take note of?</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckboxBtn
                          part={iFitIssues}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="take_note_of"
                          value={values.take_note_of}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      {viewState && (
                        <>
                          <Grid className="h-align-center" item xs={12}>
                            <Button
                              className="profile-gradient-btn"
                              type="submit"
                              disableElevation
                              disabled={isSubmitting}
                            >
                              NEXT: PRICE RANGE&nbsp;&nbsp;&nbsp;
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
        </Grid>
      </Grid>
    </>
  );
};

export default StyleFit;
