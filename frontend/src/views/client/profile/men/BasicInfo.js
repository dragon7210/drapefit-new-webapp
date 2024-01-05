import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

import ColorCircular from 'views/client/component/profile/ColorCircular';
import Profession from 'views/client/component/profile/Profession';
import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import ImageSelectorRadioGroup from 'views/client/component/profile/ImageSelectorRadioGroup';
import { mEditBasicInfo, mGetBasicInfo } from 'actions/client/profile';
import GenS3Link from 'utils/GenS3Link';
import { FirstUpper } from 'utils/FirstUpper';
import DFnewImgTag from 'utils/DFnewImgTag';
import { selectProps } from 'constant/other';
import NavTabs from '../../component/profile/NavTabs';
import Left from '../../component/profile/Left';
import {
  iHeightFt,
  iHeightIn,
  iWaistSizeNum,
  iWaistSizeLabel,
  iShirtSizeNo,
  iShirtSizeLabel,
  iBottom,
  iInseam,
  iShoeSizeNum,
  iShoeSizeLabel,
  iBodyShapeLabel,
  iSocialProfile
} from 'constant/basic';

const Basic_Info = GenS3Link('landing/images/client/profile/men/basic-info/basic-info');
const Men_Size_Chart = GenS3Link('landing/images/client/profile/men/men-size-chart');

const BasicInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [viewState, setViewState] = useState(true);
  const { user } = useSelector((state) => state.auth);
  let saveReturn = false;

  useEffect(() => {
    dispatch(mGetBasicInfo());
  }, [dispatch]);

  const { mBasicInfo } = useSelector((state) => state.profile);
  const newBasinInfo = {
    ...mBasicInfo,
    tall_feet: mBasicInfo?.tall_feet === 0 ? '' : mBasicInfo?.tall_feet,
    are_you_a_parent: mBasicInfo?.are_you_a_parent === 1 ? 'Yes' : mBasicInfo?.are_you_a_parent === 2 ? 'No' : ''
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
    tall_feet: '',
    tell_inch: '',
    weight_lb: '',
    birthday: new Date(),
    are_you_a_parent: '',
    waist: '',
    waist_size_run: '--',
    size: '--',
    shirt: '',
    men_bottom: '',
    inseam: '--',
    shoe: '--',
    shoe_medium: '',
    your_occupation: '',
    body_type: 0,
    skin_tone: 0,
    linkdin_profile: '',
    instagram: '',
    twitter: '',
    pinterest: ''
  };
  const year = new Date();
  const minBirthYear = year.getFullYear() - 18;
  const maxBirthYear = year.getFullYear() - 120;
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
                <Link to="/welcome/basic-info/men" style={{ color: '#ff6c00' }}>
                  Basic Information
                </Link>
              </Grid>
              <Grid className={`gray-border breadcrumb-tab ${user?.pStatus < 1 ? 'disabled' : ''}`} item xs={12} sm={3}>
                <Link to="/welcome/style-fit/men" style={{ color: '#232f3e' }}>
                  Style Fit
                </Link>
              </Grid>
              <Grid className={`gray-border breadcrumb-tab ${user?.pStatus < 2 ? 'disabled' : ''}`} item xs={12} sm={3}>
                <Link to="/welcome/price-range/men" style={{ color: '#232f3e' }}>
                  Price Range
                </Link>
              </Grid>
              <Grid className={`gray-border breadcrumb-tab ${user?.pStatus < 3 ? 'disabled' : ''}`} item xs={12} sm={3}>
                <Link to="/welcome/style-custom/men" style={{ color: '#232f3e' }}>
                  Custom Design & Brands
                </Link>
              </Grid>
            </Grid>
          )}
          <Grid container>
            <Formik
              initialValues={mBasicInfo === null ? initVal : newBasinInfo}
              enableReinitialize
              validationSchema={Yup.object().shape({
                tall_feet: Yup.string().required('Please fill the height in feet'),
                weight_lb: Yup.number()
                  .min(10, 'Please enter a value greater than or equal to 10')
                  .max(999, 'Please enter a value less than or equal to 999')
                  .required('Sharing your weight helps us get the right fit'),
                birthday: Yup.date()
                  .min(new Date(`01/01/${maxBirthYear}`), 'Please provide certain age')
                  .max(new Date(`01/01/${minBirthYear}`), 'Please provide certain age')
                  .typeError('Please provide certain age')
                  .required('Please provide certain age')
                // waist_size: Yup.number()
                //   .min(1, 'Please select waist size num')
                //   .required('Please select waist size num'),
                // size: Yup.number()
                //   .min(1, 'Please select shirt size num')
                //   .max(7)
                //   .required('Please select shirt size num'),
                // inseam: Yup.number().min(1, 'Please select inseam size').required('Please select inseam size')
              })}
              onSubmit={async (values) => {
                if (saveReturn) {
                  dispatch(mEditBasicInfo(values));
                  saveReturn = false;
                } else {
                  dispatch(mEditBasicInfo(values, navigate));
                }
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => {
                return (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Grid container columnSpacing={4} padding="20px">
                      {viewState && (
                        <Grid item xs={12}>
                          <Typography className="basic-info-bold-title">Welcome {FirstUpper(user?.name)}</Typography>
                        </Grid>
                      )}
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
                                <FormControl fullWidth error={Boolean(touched.tall_feet && errors.tall_feet)}>
                                  <InputLabel>
                                    ft. <span style={{ color: 'red' }}>*</span>
                                  </InputLabel>
                                  <Select
                                    size="small"
                                    label="ft. *"
                                    value={values.tall_feet}
                                    name="tall_feet"
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
                                <FormControl fullWidth error={Boolean(touched.tell_inch && errors.tell_inch)}>
                                  <InputLabel>in.</InputLabel>
                                  <Select
                                    size="small"
                                    label="in."
                                    value={values.tell_inch}
                                    name="tell_inch"
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
                            <FormControl fullWidth error={Boolean(touched.weight_lb && errors.weight_lb)}>
                              <InputLabel>
                                lbs. <span style={{ color: 'red' }}>*</span>
                              </InputLabel>
                              <OutlinedInput
                                size="small"
                                label="lbs. *"
                                autoFocus={Boolean(touched.weight_lb && errors.weight_lb)}
                                value={values.weight_lb}
                                type="number"
                                name="weight_lb"
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              {touched.weight_lb && errors.weight_lb && (
                                <FormHelperText id="helper-text-weight_lb" error>
                                  {errors.weight_lb}
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
                                <FormHelperText id="helper-text-birthday" error>
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
                              name="are_you_a_parent"
                              value={values.are_you_a_parent}
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
                            <Typography className="basic-info-sub-title">
                              Waist size? <span style={{ color: 'red' }}>*</span>
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <FormControl error={Boolean(touched.waist && errors.waist)} fullWidth>
                                  <Select
                                    size="small"
                                    autoFocus={Boolean(touched.waist && errors.waist)}
                                    name="waist"
                                    value={values.waist || ''}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iWaistSizeNum.map((item, index) => (
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
                                    name="waist_size_run"
                                    value={values.waist_size_run || ''}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iWaistSizeLabel.map((item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                            {touched.waist_size && errors.waist_size && (
                              <FormHelperText id="helper-text-waistSizeNum" error>
                                {errors.waist_size}
                              </FormHelperText>
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography className="basic-info-sub-title">
                              Shirt size? <span style={{ color: 'red' }}>*</span>
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <FormControl error={Boolean(touched.size && errors.size)} fullWidth>
                                  <Select
                                    size="small"
                                    autoFocus={Boolean(touched.size && errors.size)}
                                    name="size"
                                    value={values.size || 0}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iShirtSizeNo.map((item, index) => (
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
                                    name="shirt"
                                    value={values.shirt || ''}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iShirtSizeLabel.map((item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                            {touched.size && errors.size && (
                              <FormHelperText id="helper-text-shirtSizeNo" error>
                                {errors.size}
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
                                <Typography className="basic-info-sub-title">Bottom size?</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    name="men_bottom"
                                    value={values.men_bottom || 0}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iBottom.map((item, index) => (
                                      <MenuItem key={index} value={index}>
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
                                  Inseam size? <span style={{ color: 'red' }}>*</span>
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl error={Boolean(touched.inseam && errors.inseam)} fullWidth>
                                  <Select
                                    size="small"
                                    autoFocus={Boolean(touched.inseam && errors.inseam)}
                                    name="inseam"
                                    value={values.inseam || 0}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iInseam.map((item, index) => (
                                      <MenuItem key={index} value={item}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  {touched.inseam && errors.inseam && (
                                    <FormHelperText id="helper-text-inseamSizeNum" error>
                                      {errors.inseam}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography className="basic-info-sub-title">Shoe size?</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <FormControl fullWidth>
                                  <Select
                                    size="small"
                                    name="shoe"
                                    value={values.shoe || 0}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iShoeSizeNum.map((item, index) => (
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
                                    name="shoe_medium"
                                    value={values.shoe_medium || ''}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iShoeSizeLabel.map((item, index) => (
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
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">What is your profession?</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Profession
                          touched={touched}
                          errors={errors}
                          handleChange={handleChange}
                          value={values.your_occupation || ''}
                          name="your_occupation"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">Tell us your body shape?</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <ImageSelectorRadioGroup
                          content={iBodyShapeLabel}
                          value={values.body_type || 0}
                          setFieldValue={setFieldValue}
                          name="body_type"
                          touched={touched}
                          errors={errors}
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
                          name="skin_tone"
                          value={values.skin_tone || 0}
                          setFieldValue={setFieldValue}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ margin: '20px 0' }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="basic-info-title">
                          You social media profiles will help your personal Stylist to know you better.
                        </Typography>
                      </Grid>
                      {iSocialProfile.map((item, index) => (
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
                      {viewState && (
                        <>
                          <Grid item xs={12}>
                            <Divider sx={{ margin: '20px 0' }} />
                          </Grid>
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
          src={`${Men_Size_Chart}.webp`}
          fallback={`${Men_Size_Chart}.jpg`}
          width="100%"
          lzheight={`auto`}
          style={{ minHeight: '204px' }}
          alt="Men Size Chart"
        />
      </Modal>
    </>
  );
};

export default BasicInfo;
