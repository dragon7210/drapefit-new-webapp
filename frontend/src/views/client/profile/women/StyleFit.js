import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, Grid, Typography, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

import Left from 'views/client/component/profile/Left';
import NavTabs from 'views/client/component/profile/NavTabs';
import ColorRect from 'views/client/component/profile/ColorRect';
import CustomCheckbox from 'views/client/component/profile/CustomCheckbox';
import CustomCheckboxBtn from 'views/client/component/profile/CustomCheckboxBtn';
import CustomRadioGroup from 'views/client/component/profile/CustomRadioGroup';
import RadioButtonImage from 'views/client/component/profile/RadioButtonImage';
import ImageSelectorCheckboxWide from 'views/client/component/profile/ImageSelectorCheckboxWide';
import ImageSelectorWithRadioGroup from 'views/client/component/profile/ImageSelectorWithRadioGroup';
import ImageSelectorCheckbox from 'views/client/component/profile/ImageSelectorCheckbox';
import { wEditStyleFit, wGetStyleFit } from 'actions/client/profile';
import GenS3Link from 'utils/GenS3Link';
import { FirstUpper } from 'utils/FirstUpper';
import {
  iDressLength,
  iTopHalf,
  iPantLength,
  iPantRise,
  iPantStyle,
  iAppareType,
  iBottomType,
  iTopType,
  iAvoidPattern,
  wOutFit,
  iDenimStyle1,
  iDenimStyle2,
  iDenimStyle3,
  iDenimStyle4,
  iMostlyNeutralsColor,
  iMostlyColorfulColor,
  iMissingFit,
  iDressupOccasion,
  iMissingCloset,
  iMostlyLightsColor,
  iStyleInspiration
} from 'constant/womenStyleFit';

import { arrayToStringValue } from 'constant/function';

const Style_Fit = GenS3Link('landing/images/client/profile/women/style-fit/style-fit');

const StyleFit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewState, setViewState] = useState(true);
  const { user } = useSelector((state) => state.auth);
  let saveReturn = false;

  useEffect(() => {
    dispatch(wGetStyleFit());
  }, [dispatch]);

  const { wStyleFit } = useSelector((state) => state.profile);
  let newWomenStyleFit = {
    ...wStyleFit,
    style_sphere_selections_v2: exceptionValue(wStyleFit?.style_sphere_selections_v2),
    style_sphere_selections_v3_3: exceptionValue(wStyleFit?.style_sphere_selections_v3_3),
    style_sphere_selections_v10: exceptionValue(wStyleFit?.style_sphere_selections_v10),
    wo_dress_length: exceptionValue(wStyleFit?.wo_dress_length),
    wo_top_half: exceptionValue(wStyleFit?.wo_top_half),
    wo_pant_length: exceptionValue(wStyleFit?.wo_pant_length),
    wo_pant_rise: exceptionValue(wStyleFit?.wo_pant_rise),
    wo_pant_style: exceptionValue(wStyleFit?.wo_pant_style),
    wo_appare: exceptionValue(wStyleFit?.wo_appare),
    wo_bottom_style: exceptionValue(wStyleFit?.wo_bottom_style),
    wo_top_style: exceptionValue(wStyleFit?.wo_top_style),
    missing_from_your_fIT: exceptionValue(wStyleFit?.missing_from_your_fIT),
    color_mostly_wear: exceptionValue(wStyleFit?.color_mostly_wear),
    wo_dress_length: exceptionValue(wStyleFit?.wo_dress_length),
    color_prefer: wStyleFit?.color_prefer ? JSON.parse(wStyleFit?.color_prefer) : []
  };

  const left = {
    title: `Hi ${FirstUpper(user?.name)}`,
    content: 'Please complete your style information that will help us to get completed a best FIT',
    image: Style_Fit
  };
  const initVal = {
    style_sphere_selections_v2: [],
    style_sphere_selections_v3_3: [],
    style_sphere_selections_v10: [],
    wo_dress_length: [],
    wo_top_half: [],
    wo_pant_length: [],
    wo_pant_rise: [],
    wo_pant_style: [],
    wo_appare: [],
    wo_bottom_style: [],
    wo_top_style: [],
    color_prefer: [],
    following_occasions: 0,
    missing_from_your_fIT: [],
    color_mostly_wear: [],
    wo_dress_length: [],
    distressed_denim_non: '',
    distressed_denim_minimally: '',
    distressed_denim_fairly: '',
    distressed_denim_heavily: ''
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
                <Link to="/welcome/style-fit/women" style={{ color: '#ff6c00' }}>
                  Style Fit
                </Link>
              </Grid>
              <Grid className={`gray-border breadcrumb-tab ${user?.pStatus < 2 ? 'disabled' : ''}`} item xs={12} sm={3}>
                <Link to="/welcome/price-range/women" style={{ color: '#232f3e' }}>
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

          <Grid container>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Formik
                initialValues={wStyleFit == null ? initVal : newWomenStyleFit}
                enableReinitialize
                validationSchema={Yup.object().shape({
                  style_sphere_selections_v2: Yup.array().min(1, 'Please select Style Inspiration'),
                  avoidPattern: Yup.array().min(1, 'Please select Avoid Pattern'),
                  outFit: Yup.array().min(1, 'Please select OutFit')
                })}
                onSubmit={async (values) => {
                  const StyleSubmitValues = {
                    ...values,
                    wo_dress_length: values?.wo_dress_length.toString(),
                    wo_top_half: values?.wo_top_half.toString(),
                    wo_pant_length: values?.wo_pant_length.toString(),
                    wo_pant_rise: values?.wo_pant_rise.toString(),
                    wo_pant_style: values?.wo_pant_style.toString(),
                    wo_appare: values?.wo_appare.toString(),
                    wo_bottom_style: values?.wo_bottom_style.toString(),
                    wo_top_style: values?.wo_top_style.toString(),
                    missing_from_your_fIT: values?.missing_from_your_fIT.toString(),
                    color_mostly_wear: values?.color_mostly_wear.toString(),
                    style_sphere_selections_v2: values?.style_sphere_selections_v2.toString(),
                    style_sphere_selections_v3_3: values?.style_sphere_selections_v3_3.toString(),
                    style_sphere_selections_v10: values?.style_sphere_selections_v10.toString(),
                    wo_dress_length: values?.wo_dress_length.toString(),
                    color_prefer: arrayToStringValue(values?.color_prefer)
                  };
                  if (saveReturn) {
                    dispatch(wEditStyleFit(StyleSubmitValues));
                    saveReturn = false;
                  } else {
                    dispatch(wEditStyleFit(StyleSubmitValues, navigate));
                  }
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => {
                  return (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Grid container columnSpacing={4} padding="20px">
                        <Grid item xs={12}>
                          <Typography className="basic-info-title" align="center">
                            Style Inspiration <span style={{ color: 'red' }}>*</span>
                          </Typography>
                          <Typography className="basic-info-sup-content" align="center">
                            Are you looking to incorporate more of the styles below into your wardrobe? Select the
                            styles below that you inspire to look like or would like to explore.
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <ImageSelectorCheckbox
                            content={iStyleInspiration}
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="style_sphere_selections_v2"
                            value={values.style_sphere_selections_v2}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <ImageSelectorCheckbox
                            content={iDressLength}
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="wo_dress_length"
                            value={values.wo_dress_length}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <ImageSelectorCheckbox
                            content={iTopHalf}
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="wo_top_half"
                            value={values.wo_top_half}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <ImageSelectorCheckbox
                            content={iPantLength}
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="wo_pant_length"
                            value={values.wo_pant_length}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <ImageSelectorCheckbox
                            content={iPantRise}
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="wo_pant_rise"
                            value={values.wo_pant_rise}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <ImageSelectorCheckbox
                            content={iPantStyle}
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="wo_pant_style"
                            value={values.wo_pant_style}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <ImageSelectorCheckboxWide
                            content={iAppareType}
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="wo_appare"
                            value={values.wo_appare}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <ImageSelectorCheckbox
                            content={iBottomType}
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="wo_bottom_style"
                            value={values.wo_bottom_style}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <ImageSelectorCheckbox
                            content={iTopType}
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="wo_top_style"
                            value={values.wo_top_style}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Please tell us the OutFit you prefer to wear. <span style={{ color: 'red' }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <ImageSelectorWithRadioGroup
                            content={wOutFit}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            setFieldValue={setFieldValue}
                            name="style_sphere_selections_v3_3"
                            rname="style_sphere_selections_v"
                            value={values}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <ImageSelectorCheckbox
                            content={iAvoidPattern}
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="style_sphere_selections_v10"
                            value={values.style_sphere_selections_v10}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <ColorRect
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="color_prefer"
                            value={values.color_prefer || ''}
                            subject="you"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomCheckbox
                            content={iMostlyNeutralsColor}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            name="color_mostly_wear"
                            value={values.color_mostly_wear}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomCheckbox
                            content={iMostlyColorfulColor}
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="color_mostly_wear"
                            value={values.color_mostly_wear}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomCheckbox
                            content={iMostlyLightsColor}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            name="color_mostly_wear"
                            value={values.color_mostly_wear}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            What do you feel is missing from your FIT?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <CustomCheckboxBtn
                            part={iMissingFit}
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="missing_from_your_fIT"
                            value={values.missing_from_your_fIT}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Would you wear any of these denim styles?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} lg={4}>
                              <RadioButtonImage
                                group={iDenimStyle1}
                                name="distressed_denim_non"
                                value={values.distressed_denim_non}
                                touched={touched}
                                errors={errors}
                                setFieldValue={setFieldValue}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                              <RadioButtonImage
                                group={iDenimStyle2}
                                name="distressed_denim_minimally"
                                value={values.distressed_denim_minimally}
                                touched={touched}
                                errors={errors}
                                setFieldValue={setFieldValue}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                              <RadioButtonImage
                                group={iDenimStyle3}
                                name="distressed_denim_fairly"
                                value={values.distressed_denim_fairly}
                                touched={touched}
                                errors={errors}
                                setFieldValue={setFieldValue}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={4}>
                              <RadioButtonImage
                                group={iDenimStyle4}
                                name="distressed_denim_heavily"
                                value={values.distressed_denim_heavily}
                                touched={touched}
                                errors={errors}
                                setFieldValue={setFieldValue}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            How often do you dress up for the following occasions?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <CustomRadioGroup
                            name="following_occasions"
                            value={values.following_occasions}
                            handleChange={handleChange}
                            touched={touched}
                            errors={errors}
                            content={iDressupOccasion}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ margin: '20px 0' }} />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomCheckbox
                            content={iMissingCloset}
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            name="missing_from_your_fIT"
                            value={values.missing_from_your_fIT}
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
                  );
                }}
              </Formik>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default StyleFit;

const exceptionValue = (data) => {
  return data ? data.split(',') : [];
};
