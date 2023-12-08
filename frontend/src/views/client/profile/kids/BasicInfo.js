import { useEffect, useState } from 'react';
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

import RadioButtonGroup from 'views/client/component/profile/RadioButtonGroup';
import CustomCheckbox from 'views/client/component/profile/CustomCheckbox';
import ColorRect from 'views/client/component/profile/ColorRect';
import { kEditBasicInfo, kGetBasicInfo } from 'actions/client/kids';
import GenS3Link from 'utils/GenS3Link';
import { FirstUpper } from 'utils/FirstUpper';
import DFnewImgTag from 'utils/DFnewImgTag';
import { selectProps } from 'constant/other';
import { exceptionValue } from 'constant/function';
import NavTabs from '../../component/profile/NavTabs';
import { iHeightIn, iHeightFt, iChildPersonality } from 'constant/basic';
import InputForm from 'ui-component/input/InputForm';

const Basic_Info = GenS3Link('landing/images/client/profile/kids/basic-info/basic-info');
const Basic_Info_Boy = GenS3Link('landing/images/client/profile/kids/basic-info/basic-info-boy');
const Basic_Info_Girl = GenS3Link('landing/images/client/profile/kids/basic-info/basic-info-girl');

const BasicInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const kid_count = localStorage.getItem('order');
  const [viewState, setViewState] = useState(true);
  const { user } = useSelector((state) => state.auth);
  let saveReturn = false;

  useEffect(() => {
    dispatch(kGetBasicInfo({ kid_count }));
  }, [dispatch, kid_count]);
  const { kBasicInfo } = useSelector((state) => state.kids);

  let newBasicInfo = {
    ...kBasicInfo,
    size_prefer_wear:
      kBasicInfo?.size_prefer_wear === 0
        ? 'Bottom Size'
        : kBasicInfo?.size_prefer_wear === 1
        ? 'Top Size'
        : 'Shoe Size',
    kids_clothing_gender: kBasicInfo?.kids_clothing_gender === 'girls' ? `Girl's Product` : `Boy's Product`,
    child_personality: kBasicInfo?.child_personality.split(','),
    prefer_color: exceptionValue(kBasicInfo?.prefer_color)
  };
  const year = new Date();
  const maxBirthYear = year.getFullYear() - 18;
  year.setDate(year.getDate() - 1);

  const initVal = {
    child_personality: [],
    kids_birthdate: '',
    kids_clothing_gender: '',
    kids_first_name: '',
    kids_relationship_to_child: '',
    prefer_color: null,
    size_prefer_wear: '',
    tall_feet: 0,
    tell_inch: 0,
    weight_lb: 0
  };

  return (
    <>
      {viewState && (
        <>
          <NavTabs />
          <Divider />
        </>
      )}
      <Formik
        initialValues={kBasicInfo === null ? initVal : newBasicInfo}
        enableReinitialize
        validationSchema={Yup.object().shape({
          kids_first_name: Yup.string().required('Please fill the kid name'),
          kids_birthdate: Yup.date()
            .min(new Date(`01/01/${maxBirthYear}`), 'Please provide certain age')
            .max(year, 'Please provide certain age')
            .typeError('Please provide certain age')
            .required('Please provide certain age'),
          tall_feet: Yup.number()
            .min(1, 'Please fill the height in feet')
            .max(6)
            .required('Please fill the height in feet'),
          weight_lb: Yup.number()
            .min(10, 'Please enter a value greater than or equal to 10')
            .max(999, 'Please enter a value less than or equal to 999')
            .required('Sharing weight helps us get the right fit'),
          kids_clothing_gender: Yup.string().required('Please provide kid gender'),
          kids_relationship_to_child: Yup.string().required('Please provide relation child')
        })}
        onSubmit={async (values) => {
          if (saveReturn) {
            dispatch(kEditBasicInfo(values));
            saveReturn = false;
          } else {
            dispatch(kEditBasicInfo(values, navigate));
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Grid className="profile" container>
              {viewState && (
                <Grid item xs={12} md={3}>
                  <Grid container padding="10px 30px">
                    <Grid item xs={12} sm={8} md={12}>
                      <Typography
                        className="basic-info-title"
                        sx={{ textAlign: { xs: 'center', sm: 'start', md: 'center' } }}
                      >
                        Hi ${FirstUpper(user?.kids[kid_count - 1]?.name)}
                      </Typography>
                      <Typography
                        className="basic-info-content"
                        sx={{ textAlign: { xs: 'center', sm: 'start', md: 'center' } }}
                      >
                        Please complete your child basic information that will help us get started to have a best FIT
                        for you
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={12}>
                      <DFnewImgTag
                        src={`${
                          values.kids_clothing_gender === `Girl's Product`
                            ? Basic_Info_Girl
                            : values.kids_clothing_gender === `Boy's Product`
                            ? Basic_Info_Boy
                            : Basic_Info
                        }.webp`}
                        fallback={`${
                          values.kids_clothing_gender === `Girl's Product`
                            ? Basic_Info_Girl
                            : values.kids_clothing_gender === `Boy's Product`
                            ? Basic_Info_Boy
                            : Basic_Info
                        }.jpg`}
                        width="100%"
                        lzheight={`auto`}
                        style={{
                          minHeight: '118px',
                          border: '2px solid #232f3e'
                        }}
                        alt="best FIT for you"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Divider orientation="horizontal" style={{ backgroundColor: '#eee', width: '1px' }} />
              <Grid item xs={12} md={viewState ? 8 : 12}>
                {viewState && (
                  <Grid container>
                    <Grid className="gray-border breadcrumb-tab" item xs={12} sm={3}>
                      <Link to="/welcome/basic-info/kids" style={{ color: '#ff6c00' }}>
                        Basic Information
                      </Link>
                    </Grid>
                    <Grid
                      className={`gray-border breadcrumb-tab ${
                        user?.kids[kid_count - 1]?.kStatus < 1 ? 'disabled' : ''
                      }`}
                      item
                      xs={12}
                      sm={3}
                    >
                      <Link
                        to={`/welcome/style-fit/kids/${kBasicInfo?.kids_clothing_gender}`}
                        style={{ color: '#232f3e' }}
                      >
                        Style Fit
                      </Link>
                    </Grid>
                    <Grid
                      className={`gray-border breadcrumb-tab ${
                        user?.kids[kid_count - 1]?.kStatus < 2 ? 'disabled' : ''
                      }`}
                      item
                      xs={12}
                      sm={3}
                    >
                      <Link
                        to={`/welcome/price-range/kids/${kBasicInfo?.kids_clothing_gender}`}
                        style={{ color: '#232f3e' }}
                      >
                        Price Range
                      </Link>
                    </Grid>
                    <Grid
                      className={`gray-border breadcrumb-tab ${
                        user?.kids[kid_count - 1]?.kStatus < 3 ? 'disabled' : ''
                      }`}
                      item
                      xs={12}
                      sm={3}
                    >
                      <Link
                        to={`/welcome/style-custom/kids/${kBasicInfo?.kids_clothing_gender}`}
                        style={{ color: '#232f3e' }}
                      >
                        Custom Design & Brands
                      </Link>
                    </Grid>
                  </Grid>
                )}
                <Grid container>
                  <Grid container columnSpacing={4} padding="20px">
                    {viewState && (
                      <Grid item xs={12}>
                        <Typography className="basic-info-bold-title">Welcome Your first child</Typography>
                      </Grid>
                    )}
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Your Child Name? <span style={{ color: 'red' }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <InputForm
                            errors={errors}
                            values={values}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            label="Kids Name *"
                            name="kids_first_name"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Your Child kids_birthdate? <span style={{ color: 'red' }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl error={Boolean(touched.kids_birthdate && errors.kids_birthdate)} fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                className="small-date-picker"
                                autoFocus={Boolean(touched.kids_birthdate && errors.kids_birthdate)}
                                name="kids_birthdate"
                                value={values.kids_birthdate}
                                onChange={(value) => {
                                  const date = new Date(Date.parse(value));
                                  setFieldValue('kids_birthdate', date);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                              />
                            </LocalizationProvider>
                            {touched.kids_birthdate && errors.kids_birthdate && (
                              <FormHelperText id="helper-text-kids_birthdate" error>
                                {errors.kids_birthdate}
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
                            FIT you are looking for? <span style={{ color: 'red' }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <RadioButtonGroup
                            group={["Girl's Product", "Boy's Product"]}
                            name="kids_clothing_gender"
                            value={values.kids_clothing_gender}
                            touched={touched}
                            errors={errors}
                            setFieldValue={setFieldValue}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            kids_relationship_to_child with your child? <span style={{ color: 'red' }}>*</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <RadioButtonGroup
                            group={['Father', 'Mother', 'Other']}
                            name="kids_relationship_to_child"
                            value={values.kids_relationship_to_child}
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
                    <Grid item xs={12} sm={6}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            Your Child Height? <span style={{ color: 'red' }}>*</span>
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
                                  autoFocus={Boolean(touched.tall_feet && errors.tall_feet)}
                                  value={values.tall_feet}
                                  name="tall_feet"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iHeightFt.map((item, index) => (
                                    <MenuItem key={index} value={index}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                                {touched.tall_feet && errors.tall_feet && (
                                  <FormHelperText id="helper-text-tall_feet" error>
                                    {errors.tall_feet}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl fullWidth>
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
                                    <MenuItem key={index} value={index}>
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
                            Your Child Weight? <span style={{ color: 'red' }}>*</span>
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
                    <Grid item xs={12}>
                      <CustomCheckbox
                        content={iChildPersonality}
                        touched={touched}
                        errors={errors}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        name="child_personality"
                        value={values.child_personality}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ margin: '20px 0' }} />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography className="basic-info-title">
                            What size does your child prefer to wear?
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <RadioButtonGroup
                            group={['Bottom Size', 'Top Size', 'Shoe Size']}
                            name="size_prefer_wear"
                            value={values.size_prefer_wear}
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
                      <ColorRect
                        touched={touched}
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="prefer_color"
                        value={values.prefer_color}
                        subject="your child"
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
                            onClick={() => {
                              saveReturn = false;
                            }}
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
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BasicInfo;
