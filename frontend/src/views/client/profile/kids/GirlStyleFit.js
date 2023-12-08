import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Divider,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  Button
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

import NavTabs from 'views/client/component/profile/NavTabs';
import Left from 'views/client/component/profile/Left';
import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import RadioButtonImage from 'views/client/component/profile/RadioButtonImage';
import { kEditStyleFit, kGetStyleFit } from 'actions/client/kids';
import { FirstUpper } from 'utils/FirstUpper';
import { selectProps } from 'constant/other';
import {
  Style_Fit,
  iTopSize,
  iShoeSize,
  iActivity1,
  iActivity2,
  iActivity3,
  iActivity4,
  iActivity5,
  iActivity6,
  iPrint1,
  iPrint2,
  iPrint3,
  iPrint4,
  iPrint5,
  iPrint6
} from 'constant/kidStyleFit';
import GenS3Link from 'utils/GenS3Link';

const GirlStyleFit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const kid_count = localStorage.getItem('order');
  const [viewState, setViewState] = useState(true);
  const { user } = useSelector((state) => state.auth);
  let saveReturn = false;

  useEffect(() => {
    dispatch(kGetStyleFit({ kid_count }));
  }, [dispatch, kid_count]);

  const { kStyleFit } = useSelector((state) => state.kids);

  const left = {
    title: `Hi ${FirstUpper(user?.kids[kid_count - 1]?.name)}`,
    content: 'Please complete your child style information that will help us to get completed a best FIT',
    image: GenS3Link(Style_Fit)
  };
  const initVal = {
    top_size: '',
    bottom_size: '',
    shoe_size: '',
    body_shape: '',
    shirt_sleeve_length: '',
    kids_fit_challenge_shirt_torso_length: '',
    kids_fit_challenge_shirt_torso_width: '',
    kids_fit_challenge_pant_waist: '',
    kids_fit_challenge_pant_leg_length: '',
    kids_fit_challenge_pant_leg_width: '',
    t_shirts: '',
    top_blouses: '',
    sweats_shirts: '',
    sweaters: '',
    jacket_coats: '',
    dreses_rompers: '',
    shorts: '',
    leggings: '',
    jeans: '',
    pant_wast: '',
    skirts: '',
    accessories: '',
    shoes: '',
    pajamas: '',
    shirts: '',
    kids_frequency_arts_and_crafts: '',
    kids_frequency_kids_frequency_biking: '',
    kids_frequency_dance: '',
    kids_frequency_playing_outside: '',
    kids_frequency_musical_instruments: '',
    kids_frequency_reading: '',
    stripes: '',
    floral: '',
    animal_print: '',
    polkadots: '',
    plaid: '',
    camo: ''
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
            {viewState && (
              <Grid item xs={12}>
                <Grid container>
                  <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                    <Link to={`/welcome/basic-info/kids`} style={{ color: '#232f3e' }}>
                      Basic Information
                    </Link>
                  </Grid>
                  <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                    <Link to="/welcome/style-fit/kids/girls" style={{ color: '#ff6c00' }}>
                      Style Fit
                    </Link>
                  </Grid>
                  <Grid
                    className={`gray-border breadcrumb-tab ${user?.kids[kid_count - 1]?.kStatus < 2 ? 'disabled' : ''}`}
                    item
                    xs={12}
                    sm={3}
                  >
                    <Link to="/welcome/price-range/kids/girls" style={{ color: '#232f3e' }}>
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
              </Grid>
            )}
            <Grid item xs={12}>
              <Formik
                initialValues={kStyleFit === null ? initVal : kStyleFit}
                enableReinitialize
                validationSchema={Yup.object().shape({
                  top_size: Yup.string().required('Please provide top size'),
                  bottom_size: Yup.string().required('Please provide bottom size'),
                  shoe_size: Yup.string().required('Please provide shoe size')
                })}
                onSubmit={async (values) => {
                  if (saveReturn) {
                    dispatch(kEditStyleFit(values));
                    saveReturn = false;
                  } else {
                    dispatch(kEditStyleFit(values, navigate));
                  }
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Grid container padding="20px" columnSpacing={4}>
                      <Grid item xs={12} lg={8.4}>
                        <Typography className="basic-info-title">
                          What sizes do you prefer for your child? <span style={{ color: 'red' }}>*</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} lg={3.6} className="v-center-h-right">
                        <Link className="df-size-chart" onClick={() => showModal()}>
                          Drape Fit Size Chart
                        </Link>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControl error={Boolean(touched.top_size && errors.top_size)} fullWidth>
                              <InputLabel>
                                Tops Size <span style={{ color: 'red' }}>*</span>
                              </InputLabel>
                              <Select
                                size="small"
                                autoFocus={Boolean(touched.top_size && errors.top_size)}
                                name="top_size"
                                value={values.top_size}
                                label="Top Size"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {iTopSize.map((item, index) => (
                                  <MenuItem key={index} value={item.value} disabled={item.type === 0 ? false : true}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                              {touched.top_size && errors.top_size && (
                                <FormHelperText id="standard-weight-helper-text--signup" error>
                                  {errors.top_size}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControl error={Boolean(touched.bottom_size && errors.bottom_size)} fullWidth>
                              <InputLabel>
                                Bottoms Size <span style={{ color: 'red' }}>*</span>
                              </InputLabel>
                              <Select
                                size="small"
                                autoFocus={Boolean(touched.bottom_size && errors.bottom_size)}
                                name="bottom_size"
                                value={values.bottom_size}
                                label="Bottoms Size"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {iTopSize.map((item, index) => (
                                  <MenuItem key={index} value={item.value} disabled={item.type === 0 ? false : true}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                              {touched.bottom_size && errors.bottom_size && (
                                <FormHelperText id="standard-weight-helper-text--signup" error>
                                  {errors.bottom_size}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControl error={Boolean(touched.shoe_size && errors.shoe_size)} fullWidth>
                              <InputLabel>
                                Shoe Size <span style={{ color: 'red' }}>*</span>
                              </InputLabel>
                              <Select
                                size="small"
                                autoFocus={Boolean(touched.shoe_size && errors.shoe_size)}
                                name="shoe_size"
                                label="Shoe Size"
                                value={values.shoe_size}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {iShoeSize.map((item, index) => (
                                  <MenuItem key={index} value={item.value} disabled={item.type === 0 ? false : true}>
                                    {item.value}
                                  </MenuItem>
                                ))}
                              </Select>
                              {touched.shoe_size && errors.shoe_size && (
                                <FormHelperText id="standard-weight-helper-text--signup" error>
                                  {errors.shoe_size}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">Your Child Body Shape?</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonGroup
                          group={['Husky', 'Average', 'Slim']}
                          name="body_shape"
                          value={values.body_shape}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">Does your child have any FIT Issue?</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">SHIRT SLEEVE LENGTH</Typography>
                        <RadioButtonGroup
                          group={['Too short', 'None', 'Too long']}
                          name="shirt_sleeve_length"
                          value={values.shirt_sleeve_length}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">SHIRT TORSO LENGTH</Typography>
                        <RadioButtonGroup
                          group={['Too short', 'None', 'Too long']}
                          name="kids_fit_challenge_shirt_torso_length"
                          value={values.kids_fit_challenge_shirt_torso_length}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">SHIRT TORSO WIDTH</Typography>
                        <RadioButtonGroup
                          group={['Too tight', 'None', 'Too loose']}
                          name="kids_fit_challenge_shirt_torso_width"
                          value={values.kids_fit_challenge_shirt_torso_width}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">PANT WAIST</Typography>
                        <RadioButtonGroup
                          group={['Too tight', 'None', 'Too loose']}
                          name="kids_fit_challenge_pant_waist"
                          value={values.kids_fit_challenge_pant_waist}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">PANT LEGS LENGTH (INSEAM)</Typography>
                        <RadioButtonGroup
                          group={['Too short', 'None', 'Too long']}
                          name="kids_fit_challenge_pant_leg_length"
                          value={values.kids_fit_challenge_pant_leg_length}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">PANT LEGS WIDTH</Typography>
                        <RadioButtonGroup
                          group={['Too tight', 'None', 'Too loose']}
                          name="kids_fit_challenge_pant_leg_width"
                          value={values.kids_fit_challenge_pant_leg_width}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          Please share the following items you like to receive
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">T-SHIRTS</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="t_shirts"
                          value={values.t_shirts}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">TOPS & BLOUSES</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="top_blouses"
                          value={values.top_blouses}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">sweats_shirts</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="sweats_shirts"
                          value={values.sweats_shirts}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">sweaters</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="sweaters"
                          value={values.sweaters}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">JACKETS & COATS</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="jacket_coats"
                          value={values.jacket_coats}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">DRESSES & ROMPERS</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="dreses_rompers"
                          value={values.dreses_rompers}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">SHORTS</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="shorts"
                          value={values.shorts}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">LEGGINGS</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="leggings"
                          value={values.leggings}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">JEANS</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="jeans"
                          value={values.jeans}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">PANTS</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="pants"
                          value={values.pants}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">SKIRTS</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="skirts"
                          value={values.skirts}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">accessories</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="accessories"
                          value={values.accessories}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">SHOES</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="shoes"
                          value={values.shoes}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">PAJAMAS</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="pajamas"
                          value={values.pajamas}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          How often does your child do the following activities?
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iActivity1}
                          name="kids_frequency_arts_and_crafts"
                          value={values.kids_frequency_arts_and_crafts}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iActivity2}
                          name="kids_frequency_biking"
                          value={values.kids_frequency_biking}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iActivity3}
                          name="kids_frequency_dance"
                          value={values.kids_frequency_dance}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iActivity4}
                          name="kids_frequency_playing_outside"
                          value={values.kids_frequency_playing_outside}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iActivity5}
                          name="kids_frequency_musical_instruments"
                          value={values.kids_frequency_musical_instruments}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iActivity6}
                          name="kids_frequency_reading"
                          value={values.kids_frequency_reading}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          What type of prints does your child prefer?
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iPrint1}
                          name="stripes"
                          value={values.stripes}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iPrint2}
                          name="floral"
                          value={values.floral}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iPrint3}
                          name="animal_print"
                          value={values.animal_print}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iPrint4}
                          name="polkadots"
                          value={values.polkadots}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iPrint5}
                          name="plaid"
                          value={values.plaid}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={iPrint6}
                          name="camo"
                          value={values.camo}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
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

export default GirlStyleFit;
