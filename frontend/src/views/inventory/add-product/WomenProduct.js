import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  OutlinedInput,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Button,
  TextareaAutosize,
  Box,
  Divider
} from '@mui/material';
import { Form, Formik } from 'formik';
import { Select as AntdSelect } from 'antd';
import * as Yup from 'yup';

import ImageUpload from 'views/client/component/profile/ImageUpload';
import ImageSelectorCheckboxAdmin from 'views/client/component/profile/ImageSelectorCheckboxAdmin';
import ImageSelectorCheckboxSmall from 'views/client/component/profile/ImageSelectorCheckboxSmall';
import CustomRadio from 'views/client/component/profile/CustomRadio';
import ColorCircularAdmin from 'views/client/component/profile/ColorCircularAdmin';
import { getProductCategories } from 'actions/inventory/productCategory';
import { getProdSubCategories, getProductSubCategories } from 'actions/inventory/prodSubCategory';
import {
  professionListWomen,
  occasionsList,
  dressLengthList,
  pantRaiseList,
  topHalfList,
  denimStylesList,
  topSizeNoList,
  shoesStyleLabelList,
  heelHeightLabelList,
  availableStatusList,
  selectProps,
  profileList,
  LABEL_SEL_CATEGORY,
  LABEL_SEL_CATEGORY_FIRST,
  LABEL_SEL_SUB_CATEGORY
} from 'constant/other';
import {
  iBottomSize,
  iBraSizeLabel,
  iBraSizeNum,
  iDressSizeLabel,
  iHeightFt,
  iHeightIn,
  iJacketSize,
  iJeansSize,
  iPantsSize,
  iShoeSizeLabel,
  iSizeArms,
  iSkirtSize,
  iWaistSizeLabel
} from 'constant/basic';
import { exceptionValue } from 'constant/function';
import DFnewLogger from 'utils/DFnewLogger';
import { wiBodyShapeLabel } from 'constant/basic';
import { getColor } from 'actions/inventory/color';
import { getBrand } from 'actions/inventory/brand';
import { addProduct, editProduct } from 'actions/inventory/product';
import {
  iAppareType,
  iAvoidPattern,
  iBottomType,
  iMissingFit,
  iPantLength,
  iPantStyle,
  iTopType,
  wOutFitList
} from 'constant/womenStyleFit';
import { womenWears } from 'constant/price';
import { iShoeSize } from 'constant/kidStyleFit';

const WomenProduct = ({ data }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(2);
  const isEdit = location.pathname.includes('edit');
  const isView = location.pathname.includes('view');
  const { prodCategories } = useSelector((state) => state.invProductCategory);
  const prodColors = useSelector((state) => state.invColor).tableData;
  const { tableData } = useSelector((state) => state.invBrand);
  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getColor());
    dispatch(getBrand());
  }, [dispatch]);

  const [initVal, setInitVal] = useState({
    product_type: '',
    prodSubCategoryId: '',
    product_name_one: '',
    product_name_two: '',
    tall_feet: '',
    tall_inch: '',
    tall_feet2: '',
    tall_inch2: '',
    best_fit_for_weight: '',
    best_fit_for_weight1: '',
    age1: '',
    age2: '',
    profession: [],
    occasional_dress: [],
    better_body_shape: [],
    skin_tone: [],
    sizeType: '',
    best_size_fit: '',
    pants_size: '',
    bra_size_num: '',
    bra_size_label: '',
    appare_type: '',
    skirt_size: '',
    jeans_size: '',
    active_wear_size: '',
    jacket_size: '',
    bottom_size: '',
    dress_size_no: '',
    dress_size_label: '',
    shirt_blouse_size_no: '',
    shirt_blouse_size_label: '',
    shoe_size_num: '',
    heel_height_label: '',
    shoes_style_label: '',
    top_size_no: '',
    top_size_label: '',
    style_inspiration: [],
    dress_length: '',
    wo_top_half: [],
    pant_length: '',
    pant_raise: '',
    pant_style: '',
    bottoms_type: '',
    top_type: '',
    patterns_type: '',
    denim_styles: [],
    missing_from_fit: '',
    outfit_prefer: [],
    budget_type: '',
    budget_tops: '',
    budget_bottoms: '',
    budget_outerwear: '',
    budget_jeans: '',
    budget_jewelry: '',
    budget_accessories: '',
    budget_dress: '',
    size_shoulders: '',
    size_arms: '',
    size_hips: '',
    size_legs: '',
    purchase_price: '',
    sale_price: '',
    quantity: '',
    available_status: '',
    product_image: '',
    note: '',
    brand_id: '',
    color: '',
    budget_value: ''
  });
  useEffect(() => {
    if (isView || isEdit) {
      dispatch(getProdSubCategories());
      setInitVal({
        ...data,
        prodSubCategoryId: data?.rack,
        outfit_prefer: exceptionValue(data?.outfit_prefer),
        wo_top_half: exceptionValue(data?.wo_top_half),
        denim_styles: exceptionValue(data?.denim_styles),
        wo_style_insp: exceptionValue(data?.wo_style_insp),
        better_body_shape: exceptionValue(data?.better_body_shape),
        skin_tone: exceptionValue(data?.skin_tone),
        profession: exceptionValue(data?.profession),
        occasional_dress: exceptionValue(data?.profession),
        sizeType: 1
      });
    }
  }, [data, isView, isEdit, dispatch]);

  let prodSubCategories = [];
  prodSubCategories = useSelector((state) => state.invProdSubCategory).prodSubCategories;
  let temp = useSelector((state) => state.invProdSubCategory).tableData;
  if (isView || isEdit) {
    prodSubCategories = temp;
  }
  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDesktop} />
              &nbsp;&nbsp;Home
            </Link>
            {isEdit && (
              <Link to="/dfinventory/product-list" className="home-link">
                Product List
              </Link>
            )}
            <Typography className="home-link current">{isEdit ? `Edit` : `Add`} Product</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">
            {isEdit && 'Edit'} {isView && 'View'} Product For Women{' '}
          </Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography color="#ff0000">All (*) fields are mandatory</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Select
                size="small"
                name="profile"
                placeholder="Women"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                MenuProps={selectProps}
              >
                {profileList.map((item, index) => (
                  <MenuItem key={index} value={index + 1} style={{ padding: '0' }}>
                    <Link
                      to={`/dfinventory/add-product/${item.value}`}
                      style={{ width: '100%', height: '100%', padding: '6px 16px', color: '#232f3e' }}
                    >
                      {item.title}
                    </Link>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={initVal}
              enableReinitialize
              validationSchema={Yup.object().shape({
                product_name_one: Yup.string()
                  .trim()
                  .max(50, 'Product name 1 is too long')
                  .required('Please enter product name 1'),
                product_name_two: Yup.string()
                  .trim()
                  .max(50, 'Product name 2 is too long')
                  .required('Please enter product name 2'),
                sale_price: Yup.number()
                  .typeError('Please enter number value')
                  .min(0, 'Sale price must be greater than or equal to 0')
                  .required('Please enter sale price'),
                quantity: Yup.number()
                  .typeError('Please enter number value')
                  .min(1, 'Quantity must be greater than or equal to 1')
                  .required('Please enter quantity')
              })}
              onSubmit={async (values, actions) => {
                try {
                  if (isEdit) {
                    dispatch(editProduct({ ...values, profile_type: profile }));
                    actions.resetForm();
                    navigate('/dfinventory/product-list');
                  } else {
                    dispatch(addProduct({ ...values, profile_type: profile }));
                    actions.resetForm();
                  }
                } catch (err) {
                  DFnewLogger(err?.message);
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                touched,
                values,
                isValid,
                dirty
              }) => {
                return (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Grid container columnSpacing={4} rowSpacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">
                          Product Category <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <FormControl fullWidth error={Boolean(touched.product_type && errors.product_type)}>
                          <Select
                            size="small"
                            name="product_type"
                            autoFocus={Boolean(touched.product_type && errors.product_type)}
                            value={values.product_type}
                            onBlur={handleBlur}
                            disabled={isView ? true : false}
                            onChange={(evt) => {
                              try {
                                handleChange(evt);
                                const _categoryId = evt.target.value;
                                dispatch(getProductSubCategories(_categoryId));
                                if (_categoryId === LABEL_SEL_CATEGORY) {
                                  setFieldValue('prodSubCategoryId', LABEL_SEL_CATEGORY_FIRST);
                                } else {
                                  setFieldValue('prodSubCategoryId', LABEL_SEL_SUB_CATEGORY);
                                }
                              } catch (err) {
                                DFnewLogger(err?.message);
                              }
                            }}
                            MenuProps={selectProps}
                          >
                            {prodCategories.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item?.product_type + ' ' + item?.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched.product_type && errors.product_type && (
                            <FormHelperText id="helper-text-product_type" error>
                              {errors.product_type}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">
                          Sub-category <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <FormControl fullWidth error={Boolean(touched.prodSubCategoryId && errors.prodSubCategoryId)}>
                          <Select
                            size="small"
                            name="prodSubCategoryId"
                            value={values.prodSubCategoryId}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {prodSubCategories.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.rack_number + ' ' + item.rack_name}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched.prodSubCategoryId && errors.prodSubCategoryId && (
                            <FormHelperText id="helper-text-prodSubCategoryId" error>
                              {errors.prodSubCategoryId}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">
                          Product Name 1 <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <FormControl fullWidth error={Boolean(touched.product_name_one && errors.product_name_one)}>
                          <OutlinedInput
                            size="small"
                            placeholder="Please enter Product Name 1"
                            name="product_name_one"
                            value={values.product_name_one}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            disabled={isView ? true : false}
                          />
                          {touched.product_name_one && errors.product_name_one && (
                            <FormHelperText id="helper-text-product_name_one" error>
                              {errors.product_name_one}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">
                          Product Name 2 <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <FormControl fullWidth error={Boolean(touched.product_name_two && errors.product_name_two)}>
                          <OutlinedInput
                            size="small"
                            placeholder="Please enter Product Name 2"
                            name="product_name_two"
                            value={values.product_name_two}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            disabled={isView ? true : false}
                          />
                          {touched.product_name_two && errors.product_name_two && (
                            <FormHelperText id="helper-text-product_name_two" error>
                              {errors.product_name_two}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Height Range</Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6} md={2.8}>
                            <FormControl fullWidth>
                              <InputLabel>ft.</InputLabel>
                              <Select
                                size="small"
                                label="ft."
                                name="tall_feet"
                                value={values.tall_feet}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                                disabled={isView ? true : false}
                              >
                                {iHeightFt.map((item, index) => (
                                  <MenuItem key={index} value={index + 1}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6} md={2.8}>
                            <FormControl fullWidth>
                              <InputLabel>in.</InputLabel>
                              <Select
                                size="small"
                                label="in."
                                name="tall_inch"
                                value={values.tall_inch}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                                disabled={isView ? true : false}
                              >
                                {iHeightIn.map((item, index) => (
                                  <MenuItem key={index} value={index + 1}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={0.8} className="form-item-to">
                            <Typography>to</Typography>
                          </Grid>
                          <Grid item xs={6} md={2.8}>
                            <FormControl fullWidth>
                              <InputLabel>ft.</InputLabel>
                              <Select
                                size="small"
                                label="ft."
                                name="tall_feet2"
                                value={values.tall_feet2}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                                disabled={isView ? true : false}
                              >
                                {iHeightFt.map((item, index) => (
                                  <MenuItem key={index} value={index + 1}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={6} md={2.8}>
                            <FormControl fullWidth>
                              <InputLabel>in.</InputLabel>
                              <Select
                                size="small"
                                label="in."
                                name="tall_inch2"
                                value={values.tall_inch2}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {iHeightIn.map((item, index) => (
                                  <MenuItem key={index} value={index + 1}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Weight Range</Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={5.6}>
                            <FormControl
                              fullWidth
                              error={Boolean(touched.best_fit_for_weight && errors.best_fit_for_weight)}
                            >
                              <OutlinedInput
                                size="small"
                                placeholder="Please enter weight"
                                name="best_fit_for_weight"
                                value={values.best_fit_for_weight ?? ''}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                disabled={isView ? true : false}
                              />
                              {touched.best_fit_for_weight && errors.best_fit_for_weight && (
                                <FormHelperText id="helper-text-best_fit_for_weight" error>
                                  {errors.best_fit_for_weight}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={0.8} className="form-item-to">
                            <Typography>to</Typography>
                          </Grid>
                          <Grid item xs={12} md={5.6}>
                            <FormControl
                              fullWidth
                              error={Boolean(touched.best_fit_for_weight1 && errors.best_fit_for_weight1)}
                            >
                              <OutlinedInput
                                size="small"
                                placeholder="Please enter weight"
                                name="best_fit_for_weight1"
                                value={values.best_fit_for_weight1 ?? ''}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                disabled={isView ? true : false}
                              />
                              {touched.best_fit_for_weight1 && errors.best_fit_for_weight1 && (
                                <FormHelperText id="helper-text-best_fit_for_weight1" error>
                                  {errors.best_fit_for_weight1}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Age Range</Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={5.6}>
                            <FormControl fullWidth error={Boolean(touched.age1 && errors.age1)}>
                              <OutlinedInput
                                size="small"
                                placeholder="Please enter age"
                                name="age1"
                                value={values.age1 ?? ''}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                disabled={isView ? true : false}
                              />
                              {touched.age1 && errors.age1 && (
                                <FormHelperText id="helper-text-age1" error>
                                  {errors.age1}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={0.8} className="form-item-to">
                            <Typography>to</Typography>
                          </Grid>
                          <Grid item xs={12} md={5.6}>
                            <FormControl fullWidth error={Boolean(touched.age2 && errors.age2)}>
                              <OutlinedInput
                                size="small"
                                placeholder="Please enter age"
                                name="age2"
                                value={values.age2 ?? ''}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                disabled={isView ? true : false}
                              />
                              {touched.age2 && errors.age2 && (
                                <FormHelperText id="helper-text-age2" error>
                                  {errors.age2}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6} />
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Profession</Typography>
                        <FormControl fullWidth>
                          <AntdSelect
                            mode="multiple"
                            size="large"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="--"
                            defaultValue={values.profession}
                            onChange={(e) => (values.profession = e)}
                            options={professionListWomen}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Occasions</Typography>
                        <FormControl fullWidth>
                          <AntdSelect
                            mode="multiple"
                            size="large"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="--"
                            defaultValue={values.occasional_dress}
                            onChange={(e) => (values.occasional_dress = e)}
                            options={occasionsList}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={7} lg={6}>
                        <Typography className="form-item-title">Body Type</Typography>
                        <ImageSelectorCheckboxAdmin
                          content={wiBodyShapeLabel}
                          touched={touched}
                          errors={errors}
                          name="better_body_shape"
                          value={values.better_body_shape}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={5} lg={6}>
                        <Typography className="form-item-title">Skin Tone</Typography>
                        <ColorCircularAdmin
                          touched={touched}
                          errors={errors}
                          name="skin_tone"
                          value={values.skin_tone}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">
                          Brand Name <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <FormControl fullWidth error={Boolean(touched.brand_name && errors.brand_name)}>
                          <Select
                            size="small"
                            name="brand_id"
                            value={values.brand_id}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {tableData.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.brand_name}
                              </MenuItem>
                            ))}
                          </Select>
                          {touched.brand_name && errors.brand_name && (
                            <FormHelperText id="helper-text-brand_name" error>
                              {errors.brand_name}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Color</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="color"
                            value={values.color}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {prodColors.map((item, index) => (
                              <MenuItem key={index} value={item.id}>
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <RadioGroup name="sizeType" value={values.sizeType} onChange={handleChange}>
                          <Grid container columnSpacing={4} rowSpacing={2}>
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={<CustomRadio />}
                                value={'0'}
                                label={
                                  <Typography>
                                    <strong>Free Size (Best Size Fit)</strong>
                                  </Typography>
                                }
                              />
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="best_size_fit"
                                  value={values.best_size_fit}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                  disabled={isView ? true : false}
                                >
                                  {iWaistSizeLabel.map((item, index) => (
                                    <MenuItem key={index} value={index + 1}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={<CustomRadio />}
                                value={'1'}
                                label={
                                  <Typography>
                                    <strong>PANTS</strong>
                                  </Typography>
                                }
                              />
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="pants_size"
                                  value={values.pants_size}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                  disabled={isView ? true : false}
                                >
                                  {iPantsSize.map((item, index) => (
                                    <MenuItem key={index} value={index + 1} disabled={item.type === 0 ? false : true}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={<CustomRadio />}
                                value={'2'}
                                label={
                                  <Typography>
                                    <strong>BRA SIZE</strong>
                                  </Typography>
                                }
                              />
                              <Grid container spacing={1}>
                                <Grid item xs={4}>
                                  <FormControl fullWidth>
                                    <Select
                                      size="small"
                                      name="best_size_fit"
                                      value={values.best_size_fit}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      MenuProps={selectProps}
                                      disabled={isView ? true : false}
                                    >
                                      {iBraSizeNum.map((item, index) => (
                                        <MenuItem key={index} value={index + 1}>
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
                                      name="bra_size_label"
                                      value={values.bra_size_label}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      MenuProps={selectProps}
                                      disabled={isView ? true : false}
                                    >
                                      {iBraSizeLabel.map((item, index) => (
                                        <MenuItem key={index} value={index + 1}>
                                          {item}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={<CustomRadio />}
                                value={'3'}
                                label={
                                  <Typography>
                                    <strong>SKIRT SIZE</strong>
                                  </Typography>
                                }
                              />
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="skirt_size"
                                  value={values.skirt_size}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                  disabled={isView ? true : false}
                                >
                                  {iSkirtSize.map((item, index) => (
                                    <MenuItem key={index} value={index + 1}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={<CustomRadio />}
                                value={'4'}
                                label={
                                  <Typography>
                                    <strong>JEANS SIZE</strong>
                                  </Typography>
                                }
                              />
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="jeans_size"
                                  value={values.jeans_size}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                  disabled={isView ? true : false}
                                >
                                  {iJeansSize.map((item, index) => (
                                    <MenuItem key={index} value={index + 1} disabled={item.type === 0 ? false : true}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={<CustomRadio />}
                                value={'5'}
                                label={
                                  <Typography>
                                    <strong>ACTIVE WEAR SIZE</strong>
                                  </Typography>
                                }
                              />
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="active_wear_size"
                                  value={values.active_wear_size}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                  disabled={isView ? true : false}
                                >
                                  {iSizeArms.map((item, index) => (
                                    <MenuItem key={index} value={index + 1}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={<CustomRadio />}
                                value={'6'}
                                label={
                                  <Typography>
                                    <strong>JACKET SIZE</strong>
                                  </Typography>
                                }
                              />
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="jacket_size"
                                  value={values.jacket_size}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                  disabled={isView ? true : false}
                                >
                                  {iJacketSize.map((item, index) => (
                                    <MenuItem key={index} value={index + 1}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={<CustomRadio />}
                                value={'7'}
                                label={
                                  <Typography>
                                    <strong>BOTTOM SIZE</strong>
                                  </Typography>
                                }
                              />
                              <FormControl fullWidth>
                                <Select
                                  size="small"
                                  name="bottom_size"
                                  value={values.bottom_size}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                  disabled={isView ? true : false}
                                >
                                  {iBottomSize.map((item, index) => (
                                    <MenuItem key={index} value={index + 1}>
                                      {item}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={<CustomRadio />}
                                value={'8'}
                                label={
                                  <Typography>
                                    <strong>DRESS SIZE</strong>
                                  </Typography>
                                }
                              />
                              <Grid container spacing={1}>
                                <Grid item xs={4}>
                                  <FormControl fullWidth>
                                    <Select
                                      size="small"
                                      name="dress_size_no"
                                      value={values.dress_size_no}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      MenuProps={selectProps}
                                      disabled={isView ? true : false}
                                    >
                                      {iJeansSize.map((item, index) => (
                                        <MenuItem
                                          key={index}
                                          value={index + 1}
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
                                      name="dress_size_label"
                                      value={values.dress_size_label}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      MenuProps={selectProps}
                                      disabled={isView ? true : false}
                                    >
                                      {iDressSizeLabel.map((item, index) => (
                                        <MenuItem
                                          key={index}
                                          value={index + 1}
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
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={<CustomRadio />}
                                value={'9'}
                                label={
                                  <Typography>
                                    <strong>SHIRT & BLOUSE</strong>
                                  </Typography>
                                }
                              />
                              <Grid container spacing={1}>
                                <Grid item xs={4}>
                                  <FormControl fullWidth>
                                    <Select
                                      disabled={values.sizeType === '9' ? false : true}
                                      size="small"
                                      name="shirt_blouse_size_no"
                                      value={values.shirt_blouse_size_no}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      MenuProps={selectProps}
                                    >
                                      {iJeansSize.map((item, index) => (
                                        <MenuItem
                                          key={index}
                                          value={index + 1}
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
                                      disabled={values.sizeType === '9' ? false : true}
                                      size="small"
                                      name="shirt_blouse_size_label"
                                      value={values.shirt_blouse_size_label}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      MenuProps={selectProps}
                                    >
                                      {iBraSizeLabel.map((item, index) => (
                                        <MenuItem
                                          key={index}
                                          value={index + 1}
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
                            <Grid item xs={12}>
                              <FormControlLabel
                                control={<CustomRadio />}
                                value={'10'}
                                label={
                                  <Typography>
                                    <strong>SHOES</strong>
                                  </Typography>
                                }
                              />
                              <Grid container spacing={1}>
                                <Grid item xs={4}>
                                  <Typography>What is your shoe size?</Typography>
                                  <FormControl fullWidth>
                                    <Select
                                      disabled={values.sizeType === '10' ? false : true}
                                      size="small"
                                      name="shoe_size_num"
                                      value={values.shoe_size_num}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      MenuProps={selectProps}
                                    >
                                      {iShoeSize.map((item, index) => (
                                        <MenuItem key={index} value={index + 1}>
                                          {item}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography>Which heel height do you prefer?</Typography>
                                  <FormControl fullWidth>
                                    <Select
                                      size="small"
                                      disabled={values.sizeType === '10' ? false : true}
                                      name="heel_height_label"
                                      value={values.heel_height_label}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      MenuProps={selectProps}
                                    >
                                      {heelHeightLabelList.map((item, index) => (
                                        <MenuItem key={index} value={index + 1}>
                                          {item}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography>Which style of shoes?</Typography>
                                  <FormControl fullWidth>
                                    <Select
                                      size="small"
                                      disabled={values.sizeType === '10' ? false : true}
                                      name="shoes_style_label"
                                      value={values.shoes_style_label}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      MenuProps={selectProps}
                                    >
                                      {shoesStyleLabelList.map((item, index) => (
                                        <MenuItem key={index} value={index + 1}>
                                          {item}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={<CustomRadio />}
                                value={'11'}
                                label={
                                  <Typography>
                                    <strong>TOP SIZE</strong>
                                  </Typography>
                                }
                              />
                              <Grid container spacing={1}>
                                <Grid item xs={4}>
                                  <FormControl fullWidth>
                                    <Select
                                      size="small"
                                      disabled={values.sizeType === '11' ? false : true}
                                      name="top_size_no"
                                      value={values.top_size_no}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      MenuProps={selectProps}
                                    >
                                      {topSizeNoList.map((item, index) => (
                                        <MenuItem key={index} value={index + 1}>
                                          {item}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={8}>
                                  <FormControl fullWidth>
                                    <Select
                                      disabled={values.sizeType === '11' ? false : true}
                                      size="small"
                                      name="top_size_label"
                                      value={values.top_size_label}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      MenuProps={selectProps}
                                    >
                                      {iShoeSizeLabel.map((item, index) => (
                                        <MenuItem key={index} value={index + 1}>
                                          {item}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Style Inspiration</Typography>
                        {/* <FormControl fullWidth>
                          <AntdSelect
                            mode="multiple"
                            size="large"
                            allowClear
                            style={{ width: '100%' }}
                            defaultValue={values.wo_style_insp}
                            onChange={(e) => (values.wo_style_insp = e)}
                            options={iWaistSizeLabel}
                          />
                        </FormControl> */}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Dress Length</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="dress_length"
                            value={values.dress_length}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {dressLengthList.map((item, index) => (
                              <MenuItem key={index} value={index + 1}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Top Half</Typography>
                        <FormControl fullWidth>
                          <AntdSelect
                            mode="multiple"
                            size="large"
                            allowClear
                            style={{ width: '100%' }}
                            defaultValue={values.wo_top_half}
                            onChange={(e) => (values.wo_top_half = e)}
                            options={topHalfList}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Pant Length</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="pant_length"
                            value={values.pant_length}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {iPantLength.gallery.map((item, index) => (
                              <MenuItem key={index} value={index + 1}>
                                {item.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Pant Raise</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="pant_raise"
                            value={values.pant_raise}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {pantRaiseList.map((item, index) => (
                              <MenuItem key={index} value={index + 1}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Pant Style</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="pant_style"
                            value={values.pant_style}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {iPantStyle.gallery.map((item, index) => (
                              <MenuItem key={index} value={index + 1}>
                                {item.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Appare Type</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="appare_type"
                            value={values.appare_type}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {iAppareType.gallery.map((item, index) => (
                              <MenuItem key={index} value={index + 1}>
                                {item.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Bottoms Type</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="bottoms_type"
                            value={values.bottoms_type}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {iBottomType.gallery.map((item, index) => (
                              <MenuItem key={index} value={index + 1}>
                                {item.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Top Type</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="top_type"
                            value={values.top_type}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {iTopType.gallery.map((item, index) => (
                              <MenuItem key={index} value={index + 1}>
                                {item.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Patterns Type</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="patterns_type"
                            value={values.patterns_type}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {iAvoidPattern.gallery.map((item, index) => (
                              <MenuItem key={index} value={index + 1}>
                                {item.title}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Denim Styles</Typography>
                        <FormControl fullWidth>
                          <AntdSelect
                            mode="multiple"
                            size="large"
                            allowClear
                            style={{ width: '100%' }}
                            defaultValue={values.denim_styles}
                            onChange={(e) => (values.denim_styles = e)}
                            options={denimStylesList}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Missing from Fit / your closet?</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="missing_from_fit"
                            value={values.missing_from_fit}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                          >
                            {iMissingFit.map((item, index) => (
                              <MenuItem key={index} value={index + 1}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className="form-item-title">OutFit prefer to wear</Typography>
                        <ImageSelectorCheckboxSmall
                          content={wOutFitList}
                          touched={touched}
                          errors={errors}
                          name="outfit_prefer"
                          value={values.outfit_prefer}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <RadioGroup name="budget_type" value={values.budget_type} onChange={handleChange}>
                          <Grid container columnSpacing={4} rowSpacing={2}>
                            {womenWears.map((item, index) => (
                              <Grid key={index} item xs={12} sm={6}>
                                <FormControlLabel
                                  control={<CustomRadio />}
                                  value={`${index}`}
                                  label={
                                    <Typography>
                                      <strong>{item.title}</strong>
                                    </Typography>
                                  }
                                />
                                <FormControl fullWidth>
                                  <Select
                                    disabled={values.budget_type === `${index}` ? false : true}
                                    size="small"
                                    value={values.budget_type === `${index}` ? Number(values.budget_value) : 0}
                                    name={'budget_value'}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {item.prices.map((item, index) => (
                                      <MenuItem key={index} value={index}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            ))}
                          </Grid>
                        </RadioGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Shoulders</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="size_shoulders"
                            value={values.size_shoulders}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {iJeansSize.map((item, index) => (
                              <MenuItem key={index} value={index + 1} disabled={item.type === 0 ? false : true}>
                                {item.value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Arms</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="size_arms"
                            value={values.size_arms}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {iSizeArms.map((item, index) => (
                              <MenuItem key={index} value={index + 1}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Hips</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="size_hips"
                            value={values.size_hips}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {iJeansSize.map((item, index) => (
                              <MenuItem key={index} value={index + 1} disabled={item.type === 0 ? false : true}>
                                {item.value}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Legs</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="size_legs"
                            value={values.size_legs}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {iBraSizeNum.map((item, index) => (
                              <MenuItem key={index} value={index + 1}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Purchase Price</Typography>
                        <FormControl fullWidth error={Boolean(touched.purchase_price && errors.purchase_price)}>
                          <OutlinedInput
                            size="small"
                            placeholder="Please enter Purchase Price"
                            name="purchase_price"
                            value={values.purchase_price ?? ''}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {touched.purchase_price && errors.purchase_price && (
                            <FormHelperText id="helper-text-purchase_price" error>
                              {errors.purchase_price}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">
                          Sale Price <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <FormControl fullWidth error={Boolean(touched.sale_price && errors.sale_price)}>
                          <OutlinedInput
                            size="small"
                            placeholder="Please enter Sale Price"
                            name="sale_price"
                            value={values.sale_price}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            disabled={isView ? true : false}
                          />
                          {touched.sale_price && errors.sale_price && (
                            <FormHelperText id="helper-text-sale_price" error>
                              {errors.sale_price}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">
                          Quantity <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <FormControl fullWidth error={Boolean(touched.quantity && errors.quantity)}>
                          <OutlinedInput
                            size="small"
                            placeholder="Please enter Quantity"
                            name="quantity"
                            value={values.quantity}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            disabled={isView ? true : false}
                          />
                          {touched.quantity && errors.quantity && (
                            <FormHelperText id="helper-text-quantity" error>
                              {errors.quantity}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      {isEdit ? (
                        <Grid item xs={12} sm={6} />
                      ) : (
                        <Grid item xs={12} sm={6}>
                          <Typography className="form-item-title">Available Status</Typography>
                          <FormControl fullWidth>
                            <Select
                              size="small"
                              name="available_status"
                              value={values.available_status}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              MenuProps={selectProps}
                              disabled={isView ? true : false}
                            >
                              {availableStatusList.map((item, index) => (
                                <MenuItem key={index} value={index + 1}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      )}
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Product Image</Typography>
                        <Box width="200px">
                          <ImageUpload arg="product_image" value={values.product_image} setFieldValue={setFieldValue} />
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Note</Typography>
                        <FormControl fullWidth>
                          <TextareaAutosize
                            style={{
                              minWidth: '100%',
                              maxWidth: '100%',
                              minHeight: '170px',
                              padding: '15px',
                              borderColor: '#ccc',
                              borderRadius: '12px',
                              fontSize: '14px'
                            }}
                            placeholder="Please enter Note"
                            name="note"
                            value={values.note ?? ''}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            disabled={isView ? true : false}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Button
                          type="submit"
                          className="admin-submit-btn"
                          disabled={!isValid || !dirty || isSubmitting}
                        >
                          SAVE
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
WomenProduct.propTypes = {
  data: PropTypes.object
};
export default WomenProduct;
