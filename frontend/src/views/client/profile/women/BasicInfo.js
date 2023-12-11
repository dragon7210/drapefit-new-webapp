import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Divider,
  Grid,
  Button,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';

import ImageSelectorRadioGroup from 'views/client/component/profile/ImageSelectorRadioGroup';
import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import Profession from 'views/client/component/profile/Profession';
import ColorCircular from 'views/client/component/profile/ColorCircular';
import { wEditBasicInfo, wGetBasicInfo } from 'actions/client/profile';
import GenS3Link from 'utils/GenS3Link';
import { FirstUpper } from 'utils/FirstUpper';
import DFnewImgTag from 'utils/DFnewImgTag';
import { selectProps } from 'constant/other';
import NavTabs from '../../component/profile/NavTabs';
import Left from '../../component/profile/Left';
import CustomCheckboxBtn from '../../component/profile/CustomCheckboxBtn';
import CustomCheckboxLarge from '../../component/profile/CustomCheckboxLarge';
import {
  wiBodyShapeLabel,
  iMaternityPants,
  iHeightFt,
  iHeightIn,
  iBraSizeNum,
  iBraSizeLabel,
  iJacketSize,
  iDressSizeNo,
  iDressSizeLabel,
  iSkirtSize,
  iPantsSize,
  iJeansSize,
  iBottomSize,
  wiShoeSizeNum,
  iShoesStyleLabel,
  iHeelHeightLabel,
  wiSocialProfile,
  iBodyPart,
  iShirtBlouseSizeNo,
  iShirtBlouseSizeLabel,
  iSizeArms
} from 'constant/basic';

const Basic_Info = GenS3Link('landing/images/client/profile/women/basic-info/basic-info');
const Women_Size_Chart = GenS3Link('landing/images/client/profile/women/women-size-chart');

const BasicInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [viewState, setViewState] = useState(true);
  const { user } = useSelector((state) => state.auth);
  let saveReturn = false;

  useEffect(() => {
    dispatch(wGetBasicInfo());
  }, [dispatch]);

  const { wBasicInfo } = useSelector((state) => state.profile);
  let newWBasicInfo = {
    ...wBasicInfo,
    pants: wBasicInfo?.pants === null ? '' : wBasicInfo?.pants,
    height: wBasicInfo?.height?.split(','),
    brands: wBasicInfo?.brands?.split(','),
    comfortable_showing_off: wBasicInfo?.comfortable_showing_off?.split(','),
    keep_covered: wBasicInfo?.keep_covered?.split(',')
  };
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
    title: `Hi ${FirstUpper(user?.name)}`,
    content: 'Please complete your basic information that will help us get started to have a best FIT for you',
    image: Basic_Info
  };
  const initVal = {
    tell_in_feet: '',
    tell_in_inch: '',
    weight_lbs: 0,
    birthday: new Date(),
    parent: 0,
    body_type: 0,
    skin_tone: 0,
    bra: '--',
    bra_recomend: '--',
    shirt_blouse: '--',
    shirt_blouse_recomend: '--',
    jacket_size: '',
    dress: '',
    dress_recomended: '--',
    skirt: '',
    pants: '',
    jeans: 0,
    pantsr1: '',
    shoe: '',
    brands: [],
    height: [],
    occupation_v2: '',
    comfortable_showing_off: [],
    keep_covered: [],
    proportion_arms: '--',
    proportion_shoulders: '--',
    proportion_legs: '--',
    proportion_hips: '--',
    pregnant: 0,
    iexpected_due_date: new Date(),
    is_prefer_maternity: '--',
    loose_fitted: '--',
    is_pregnant: '',
    linkdin_profile: '',
    instagram: '',
    twitter: '',
    pinterest: ''
  };
  const year = new Date();
  const minBirthYear = year.getFullYear() - 18;
  const maxBirthYear = year.getFullYear() - 120;
  // const miniexpected_due_date = AddDays(new Date(), -1);
  // const maxiexpected_due_date = AddDays(new Date(), 280);
  const iMaternityForm = ['--', '7', '8', '9', '10'];
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
            <Divider orientation="horizontal" style={{ backgroundColor: '#eee', width: '1px' }} />
          </>
        )}
        <Grid item xs={12} md={viewState ? 8 : 12}>
          {viewState && (
            <Grid container>
              <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                <Link to="/welcome/basic-info/women" style={{ color: '#ff6c00' }}>
                  Basic Information
                </Link>
              </Grid>
              <Grid className={`gray-border breadcrumb-tab ${user?.pStatus < 1 ? 'disabled' : ''}`} item xs={12} sm={3}>
                <Link to="/welcome/style-fit/women" style={{ color: '#232f3e' }}>
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
            <Formik
              initialValues={wBasicInfo === null ? initVal : newWBasicInfo}
              enableReinitialize
              validationSchema={Yup.object().shape({
                tell_in_feet: Yup.number()
                  .min(4, 'Please fill the height in feet')
                  .max(6)
                  .required('Please fill the height in feet'),
                weight_lbs: Yup.number()
                  .min(10, 'Please enter a value greater than or equal to 10')
                  .max(999, 'Please enter a value less than or equal to 999')
                  .required('Sharing your weight helps us get the right fit'),
                birthday: Yup.date()
                  .min(new Date(`01/01/${maxBirthYear}`), 'Please provide certain age')
                  .max(new Date(`12/31/${minBirthYear}`), 'Please provide certain age')
                  .typeError('Please provide certain age')
                  .required('Please provide certain age')
              })}
              onSubmit={async (values) => {
                const valueToSubmit = {
                  ...values,
                  height: values.height?.toString(),
                  brands: values.brands?.toString(),
                  comfortable_showing_off: values.comfortable_showing_off?.toString(),
                  keep_covered: values.keep_covered?.toString(),
                  pregnant: values.pregnant === 'Yes' ? 0 : 1
                };

                if (saveReturn) {
                  dispatch(wEditBasicInfo({ ...valueToSubmit }));
                  saveReturn = false;
                } else {
                  dispatch(wEditBasicInfo({ ...valueToSubmit }, navigate));
                }
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => {
                return (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Grid container columnSpacing={4} padding="20px">
                      <Grid item xs={12}>
                        <Typography className="basic-info-bold-title">Welcome {FirstUpper(user?.name)}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography className="basic-info-title">
                              What is your height? <span style={{ color: 'red' }}>*</span>
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={6}>
                                <FormControl fullWidth error={Boolean(touched.tell_in_feet && errors.tell_in_feet)}>
                                  <InputLabel>
                                    ft. <span style={{ color: 'red' }}>*</span>
                                  </InputLabel>
                                  <Select
                                    size="small"
                                    label="ft. *"
                                    autoFocus={Boolean(touched.tell_in_feet && errors.tell_in_feet)}
                                    value={values.tell_in_feet}
                                    name="tell_in_feet"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iHeightFt.map((item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={6}>
                                <FormControl fullWidth>
                                  <InputLabel>in.</InputLabel>
                                  <Select
                                    size="small"
                                    label="in."
                                    value={values.tell_in_inch}
                                    name="tell_in_inch"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iHeightIn.map((item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                            {touched.tell_in_feet && errors.tell_in_feet && (
                              <FormHelperText id="standard-weight-helper-text--signup" error>
                                {errors.tell_in_feet}
                              </FormHelperText>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography className="basic-info-title">
                              What is your weight? <span style={{ color: 'red' }}>*</span>
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl fullWidth error={Boolean(touched.weight_lbs && errors.weight_lbs)}>
                              <InputLabel>
                                lbs. <span style={{ color: 'red' }}>*</span>
                              </InputLabel>
                              <OutlinedInput
                                size="small"
                                label="lbs. *"
                                autoFocus={Boolean(touched.weight_lbs && errors.weight_lbs)}
                                value={values.weight_lbs}
                                type="number"
                                name="weight_lbs"
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              {touched.weight_lbs && errors.weight_lbs && (
                                <FormHelperText id="standard-weight-helper-text--signup" error>
                                  {errors.weight_lbs}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography className="basic-info-title">
                              Your birthday? <span style={{ color: 'red' }}>*</span>
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl error={Boolean(touched.birthday && errors.birthday)} fullWidth>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  className="small-date-picker"
                                  autoFocus={Boolean(touched.birthday && errors.birthday)}
                                  name="birthday"
                                  value={values.birthday}
                                  onChange={(value) => {
                                    const date = new Date(Date.parse(value));
                                    setFieldValue('birthday', date);
                                  }}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </LocalizationProvider>
                              {touched.birthday && errors.birthday && (
                                <FormHelperText id="standard-weight-helper-text--signup" error>
                                  {errors.birthday}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography className="basic-info-title">Are you a parent?</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <RadioButtonGroup
                              group={['Yes', 'No']}
                              name="parent"
                              value={values.parent || 0}
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
                        <Typography className="basic-info-title">What is your body type?</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorRadioGroup
                          content={wiBodyShapeLabel}
                          value={values.body_type}
                          setFieldValue={setFieldValue}
                          name="body_type"
                          touched={touched}
                          errors={errors}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <Typography className="basic-info-title">What size do you prefer?</Typography>
                      </Grid>
                      <Grid item xs={12} sm={5} className="v-center-h-right">
                        <Link className="df-size-chart" onClick={() => showModal()}>
                          Drape Fit Size Chart
                        </Link>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography className="basic-info-sub-title">Bra size?</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    name="bra"
                                    value={values.bra || 0}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iBraSizeNum.map((item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    name="bra_recomend"
                                    value={values.bra_recomend || ''}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iBraSizeLabel.map((item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography className="basic-info-sub-title">
                              Shirt & Blouse size? <span style={{ color: 'red' }}>*</span>
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <FormControl error={Boolean(touched.shirt_blouse && errors.shirt_blouse)} fullWidth>
                                  <Select
                                    size="small"
                                    autoFocus={Boolean(touched.shirt_blouse && errors.shirt_blouse)}
                                    name="shirt_blouse"
                                    value={values.shirt_blouse || 0}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iShirtBlouseSizeNo.map((item, index) => (
                                      <MenuItem
                                        key={index}
                                        value={item.value}
                                        disabled={item.type === 0 ? false : true}
                                      >
                                        {item.value}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    name="shirt_blouse_recomend"
                                    value={values.shirt_blouse_recomend || ''}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iShirtBlouseSizeLabel.map((item, index) => (
                                      <MenuItem
                                        key={index}
                                        value={item.value}
                                        disabled={item.type === 0 ? false : true}
                                      >
                                        {item.value}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                            {touched.shirt_blouse && errors.shirt_blouse && (
                              <FormHelperText id="standard-weight-helper-text--signup" error>
                                {errors.shirt_blouse}
                              </FormHelperText>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography className="basic-info-sub-title">Jacket size?</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl fullWidth>
                              <Select
                                size="small"
                                name="jacket_size"
                                value={values.jacket_size || ''}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {iJacketSize.map((item, index) => (
                                  <MenuItem key={index} value={index}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography className="basic-info-sub-title">
                              Dress size? <span style={{ color: 'red' }}>*</span>
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <FormControl error={Boolean(touched.dress && errors.dress)} fullWidth>
                                  <Select
                                    size="small"
                                    autoFocus={Boolean(touched.dress && errors.dress)}
                                    name="dress"
                                    value={values.dress}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iDressSizeNo.map((item, index) => (
                                      <MenuItem
                                        key={index}
                                        value={item.value}
                                        disabled={item.type === 0 ? false : true}
                                      >
                                        {item.value}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    name="dress_recomended"
                                    value={values.dress_recomended}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iDressSizeLabel.map((item, index) => (
                                      <MenuItem
                                        key={index}
                                        value={item.value}
                                        disabled={item.type === 0 ? false : true}
                                      >
                                        {item.value}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                            {touched.dress && errors.dress && (
                              <FormHelperText id="standard-weight-helper-text--signup" error>
                                {errors.dress}
                              </FormHelperText>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography className="basic-info-sub-title">Skirt size?</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    name="skirt"
                                    value={values.skirt}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iSkirtSize.map((item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography className="basic-info-sub-title">
                                  Pants size? <span style={{ color: 'red' }}>*</span>
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl error={Boolean(touched.pants && errors.pants)} fullWidth>
                                  <Select
                                    size="small"
                                    autoFocus={Boolean(touched.pants && errors.pants)}
                                    name="pants"
                                    value={values.pants}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iPantsSize.map((item, index) => (
                                      <MenuItem
                                        key={index}
                                        value={item.value}
                                        disabled={item.type === 0 ? false : true}
                                      >
                                        {item.value}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  {touched.pants && errors.pants && (
                                    <FormHelperText id="standard-weight-helper-text--signup" error>
                                      {errors.pants}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography className="basic-info-sub-title">Jeans size?</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    name="jeans"
                                    value={values.jeans}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iJeansSize.map((item, index) => (
                                      <MenuItem
                                        key={index}
                                        value={item.value}
                                        disabled={item.type === 0 ? false : true}
                                      >
                                        {item.value}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography className="basic-info-sub-title">
                                  Bottom size <span style={{ color: 'red' }}>*</span>
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl error={Boolean(touched.pantsr1 && errors.pantsr1)} fullWidth>
                                  <Select
                                    size="small"
                                    name="pantsr1"
                                    autoFocus={Boolean(touched.pantsr1 && errors.pantsr1)}
                                    value={values.pantsr1 || ''}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iBottomSize.map((item, index) => (
                                      <MenuItem key={index} value={index}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  {touched.pantsr1 && errors.pantsr1 && (
                                    <FormHelperText id="standard-weight-helper-text--signup" error>
                                      {errors.pantsr1}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography className="basic-info-title">What is your shoe size?</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl fullWidth>
                              <Select
                                size="small"
                                name="shoe"
                                value={values.shoe}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {wiShoeSizeNum.map((item, index) => (
                                  <MenuItem key={index} value={index}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckboxLarge
                          content={iShoesStyleLabel}
                          touched={touched}
                          errors={errors}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          name="brands"
                          value={values.brands || []}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckboxLarge
                          content={iHeelHeightLabel}
                          touched={touched}
                          errors={errors}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          name="height"
                          value={values.height || []}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">What is your profession?</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Profession
                          touched={touched}
                          errors={errors}
                          handleChange={handleChange}
                          value={values.occupation_v2 || ''}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">Tell us your skin tone?</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <ColorCircular
                          touched={touched}
                          errors={errors}
                          value={values.skin_tone}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          What parts of your body are you comfortable showing off?
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckboxBtn
                          part={iBodyPart}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="comfortable_showing_off"
                          value={values.comfortable_showing_off || []}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          What parts of your body do you like to keep covered?
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <CustomCheckboxBtn
                          part={iBodyPart}
                          touched={touched}
                          errors={errors}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          name="keep_covered"
                          value={values.keep_covered || []}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12} sm={7}>
                        <Typography className="basic-info-title">What size do you prefer?</Typography>
                      </Grid>
                      <Grid item xs={12} sm={5} className="v-center-h-right">
                        <Link className="df-size-chart" onClick={() => showModal()}>
                          Drape Fit Size Chart
                        </Link>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xs={6} sm={3}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography className="basic-info-sub-title">Shoulders?</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    name="proportion_shoulders"
                                    value={values.proportion_shoulders}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iJeansSize.map((item, index) => (
                                      <MenuItem
                                        key={index}
                                        value={item.value}
                                        disabled={item.type === 0 ? false : true}
                                      >
                                        {item.value}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography className="basic-info-sub-title">Arms?</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    name="proportion_arms"
                                    value={values.proportion_arms}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iSizeArms.map((item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography className="basic-info-sub-title">Hips?</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    name="proportion_hips"
                                    value={values.proportion_hips}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iJeansSize.map((item, index) => (
                                      <MenuItem
                                        key={index}
                                        value={item.value}
                                        disabled={item.type === 0 ? false : true}
                                      >
                                        {item.value}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} sm={3}>
                            <Grid container>
                              <Grid item xs={12}>
                                <Typography className="basic-info-sub-title">Legs?</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    name="proportion_legs"
                                    value={values.proportion_legs}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iBraSizeNum.map((item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography className="basic-info-title">Are you pregnant?</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <RadioButtonGroup
                              group={['Yes', 'No']}
                              name="pregnant"
                              value={values.pregnant}
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
                      {(values.pregnant === 0 || values.pregnant === 'Yes') && (
                        <>
                          <Grid item xs={12}>
                            <Typography className="basic-info-title">What is your due date?</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  className="small-date-picker"
                                  name="iexpected_due_date"
                                  value={values.iexpected_due_date}
                                  onChange={(value) => {
                                    const date = new Date(Date.parse(value));
                                    setFieldValue('iexpected_due_date', date);
                                  }}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </LocalizationProvider>
                              {touched.iexpected_due_date && errors.iexpected_due_date && (
                                <FormHelperText id="standard-weight-helper-text--signup" error>
                                  {errors.iexpected_due_date}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <Divider sx={{ margin: '20px 0' }} />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography className="basic-info-title">Your maternity fit?</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                              <Select
                                size="small"
                                name="is_prefer_maternity"
                                value={values.is_prefer_maternity}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {iMaternityForm.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <Divider sx={{ margin: '20px 0' }} />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography className="basic-info-title">Loose Fitted mix of both</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                              <Select
                                size="small"
                                name="loose_fitted"
                                value={values.loose_fitted}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {iMaternityForm.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <Divider sx={{ margin: '20px 0' }} />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography className="basic-info-title">
                              Please select the maternity pants style you prefer to wear?
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <ImageSelectorRadioGroup
                              content={iMaternityPants}
                              value={values.is_pregnant}
                              setFieldValue={setFieldValue}
                              name="is_pregnant"
                              touched={touched}
                              errors={errors}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Divider sx={{ margin: '20px 0' }} />
                          </Grid>
                        </>
                      )}
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          You social media profiles will help your personal Stylist to know you better.
                        </Typography>
                      </Grid>
                      {wiSocialProfile.map((item, index) => (
                        <Grid key={index} item xs={12}>
                          <Grid container>
                            <Grid item xs={12}>
                              <Typography className="basic-info-sub-title">{item.title}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography>{item.content}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth>
                                <OutlinedInput
                                  size="small"
                                  type="text"
                                  name={item.value}
                                  value={values[item.value] || ''}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
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
                              NEXT: STYLE FIT&nbsp;&nbsp;&nbsp;
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
      <Modal
        open={open}
        title="Drape Fit Size Chart"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="700px"
      >
        <DFnewImgTag
          src={`${Women_Size_Chart}.webp`}
          fallback={`${Women_Size_Chart}.jpg`}
          width="100%"
          lzheight={`auto`}
          style={{ minHeight: '173px' }}
          alt="Women Size Chart"
        />
      </Modal>
    </>
  );
};

export default BasicInfo;
