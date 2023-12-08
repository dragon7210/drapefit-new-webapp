import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

import NavTabs from 'views/client/component/profile/NavTabs';
import Left from 'views/client/component/profile/Left';
import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import RadioButtonImage from 'views/client/component/profile/RadioButtonImage';
import { kEditStyleFit, kGetStyleFit } from 'actions/client/kids';
import GenS3Link from 'utils/GenS3Link';
import { FirstUpper } from 'utils/FirstUpper';
import DFnewLogger from 'utils/DFnewLogger';
import DFnewImgTag from 'utils/DFnewImgTag';
import { selectProps } from 'constant/other';
import {
  iTopSize,
  iShoeSize,
  bActivity1,
  bActivity2,
  bActivity3,
  bActivity4,
  bActivity5,
  bActivity6,
  bPrint1,
  bPrint2,
  bPrint3,
  bPrint4,
  bPrint5,
  bPrint6
} from 'constant/kidStyleFit';

const Style_Fit = GenS3Link('landing/images/client/profile/kids/style-fit/boy/style-fit');
const Kids_Size_Chart = GenS3Link('landing/images/client/profile/kids/kids-size-chart');

const BoyStyleFit = () => {
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

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const left = {
    title: `Hi ${FirstUpper(user?.kids[kid_count - 1]?.name)}`,
    content: 'Please complete your child style information that will help us to get completed a best FIT',
    image: Style_Fit
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
    sweats_shirts: '',
    polo_shirts: '',
    button_downs: '',
    sweaters: '',
    jacket_coats: '',
    shorts: '',
    jeans: '',
    trousers_chino: '',
    sweatspaint: '',
    shoes: '',
    pajamas: '',
    kids_frequency_arts_and_crafts: '',
    kids_frequency_biking: '',
    kids_frequency_dance: '',
    kids_frequency_playing_outside: '',
    kids_frequency_musical_instruments: '',
    kids_frequency_reading: '',
    stripes: '',
    plaid: '',
    gingham: '',
    novelty: '',
    polkadots: '',
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
                    <Link to="/welcome/basic-info/kids" style={{ color: '#232f3e' }}>
                      Basic Information
                    </Link>
                  </Grid>
                  <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                    <Link to="/welcome/style-fit/kids/boys" style={{ color: '#ff6c00' }}>
                      Style Fit
                    </Link>
                  </Grid>
                  <Grid
                    className={`gray-border breadcrumb-tab ${user?.kids[kid_count - 1]?.kStatus < 2 ? 'disabled' : ''}`}
                    item
                    xs={12}
                    sm={3}
                  >
                    <Link to="/welcome/price-range/kids/boys" style={{ color: '#232f3e' }}>
                      Price Range
                    </Link>
                  </Grid>
                  <Grid
                    className={`gray-border breadcrumb-tab ${user?.kids[kid_count - 1]?.kStatus < 3 ? 'disabled' : ''}`}
                    item
                    xs={12}
                    sm={3}
                  >
                    <Link to="/welcome/style-custom/kids/boys" style={{ color: '#232f3e' }}>
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
                  top_size: Yup.string().required('Please select Tops Size'),
                  bottom_size: Yup.string().required('Please select Bottoms Size'),
                  shoe_size: Yup.string().required('Please select Shoe Size')
                })}
                onSubmit={async (values) => {
                  DFnewLogger('Boy Style Fit/submit:', values);
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
                                label="Top Size *"
                                autoFocus={Boolean(touched.top_size && errors.top_size)}
                                name="top_size"
                                value={values.top_size}
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
                                label="Bottoms Size *"
                                autoFocus={Boolean(touched.bottom_size && errors.bottom_size)}
                                name="bottom_size"
                                value={values.bottom_size}
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
                                label="Shoe Size *"
                                autoFocus={Boolean(touched.shoe_size && errors.shoe_size)}
                                name="shoe_size"
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
                        <Typography className="basic-info-sub-title">SWEAT SHIRTS</Typography>
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
                        <Typography className="basic-info-sub-title">POLO SHIRTS</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="polo_shirts"
                          value={values.polo_shirts}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">BUTTON-DOWNS</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="button_downs"
                          value={values.button_downs}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">SWEATERS</Typography>
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
                        <Typography className="basic-info-sub-title">TROUSERS & CHINOS</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="trousers_chino"
                          value={values.trousers_chino}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="basic-info-sub-title">sweatspaint</Typography>
                        <RadioButtonGroup
                          group={['Often', 'Sometimes', 'Rarely']}
                          name="sweatspaint"
                          value={values.sweatspaint}
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
                          group={bActivity1}
                          name="kids_frequency_arts_and_crafts"
                          value={values.kids_frequency_arts_and_crafts}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={bActivity2}
                          name="kids_frequency_biking"
                          value={values.kids_frequency_biking}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={bActivity3}
                          name="kids_frequency_dance"
                          value={values.kids_frequency_dance}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={bActivity4}
                          name="kids_frequency_playing_outside"
                          value={values.kids_frequency_playing_outside}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={bActivity5}
                          name="kids_frequency_musical_instruments"
                          value={values.kids_frequency_musical_instruments}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={bActivity6}
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
                          group={bPrint1}
                          name="stripes"
                          value={values.stripes}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={bPrint2}
                          name="plaid"
                          value={values.plaid}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={bPrint3}
                          name="gingham"
                          value={values.gingham}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={bPrint4}
                          name="novelty"
                          value={values.novelty}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={bPrint5}
                          name="polkadots"
                          value={values.polkadots}
                          touched={touched}
                          errors={errors}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <RadioButtonImage
                          group={bPrint6}
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
      <Modal
        open={open}
        title="Drape Fit Size Chart"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="700px"
      >
        <DFnewImgTag
          src={`${Kids_Size_Chart}.webp`}
          fallback={`${Kids_Size_Chart}.jpg`}
          width="100%"
          lzheight={`auto`}
          style={{ minHeight: '152px' }}
          alt="Kids Size Chart"
        />
      </Modal>
    </>
  );
};

export default BoyStyleFit;
