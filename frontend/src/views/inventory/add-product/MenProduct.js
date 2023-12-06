import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
import CustomCheckboxBtn from 'views/client/component/profile/CustomCheckboxBtn';
import { getProductCategories } from 'actions/inventory/productCategory';
import { getProdSubCategories, getProductSubCategories } from 'actions/inventory/prodSubCategory';
import { addProduct, editProduct } from 'actions/inventory/product';
import { professionListMen, availableStatusList, selectProps, profileList } from 'constant/other';
import {
  iHeightFt,
  iHeightIn,
  iBodyShapeLabel,
  iShirtSizeNo,
  iShirtSizeLabel,
  iShoeSizeNum,
  iShoeSizeLabel,
  iWaistSizeLabel,
  iWaistSizeNum,
  iInseam,
  iBottom
} from 'constant/basic';
import {
  iOutfits,
  iFitIssues,
  iTypicallyWear2Work,
  iCasualShirts,
  iBtnUpShirts,
  iJeans,
  iBottoms,
  iShorts
} from 'constant/menStyleFit';
import { menWears } from 'constant/price';
import { exceptionValue } from 'constant/function';
import DFnewLogger from 'utils/DFnewLogger';
import { getColor } from 'actions/inventory/color';
import InputForm from 'ui-component/input/InputForm';
import InputSelect from 'ui-component/input/InputSelect';
import { getBrand } from 'actions/inventory/brand';

const MenProduct = ({ data }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(1);
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
    tall_inch: '',
    tall_feet: '',
    tall_inch2: '',
    tall_feet2: '',
    best_fit_for_weight: '',
    best_fit_for_weight1: '',
    age1: '',
    age2: '',
    profession: [],
    sizeType: 0,
    best_size_fit: 0,
    waist_size: 0,
    waist_size_run: 0,
    shirt_size: 0,
    shirt_size_run: 0,
    bottom_up_shirt_fit: '',
    inseam_size: 0,
    shoe_size: 0,
    shoe_size_run: '',
    better_body_shape: [],
    skin_tone: [],
    sizeType: '',
    work_type: '',
    casual_shirts_type: '',
    men_bottom_prefer: '',
    jeans_Fit: '',
    shorts_long: '',
    color: '',
    men_bottom: 0,
    outfit_prefer: [],
    outfit_matches: [],
    budget_type: '',
    budget_value: '',
    nonBudget: 0,
    purchase_price: '',
    sale_price: '',
    quantity: '',
    brand_id: '',
    available_status: '',
    product_image: '',
    note: ''
  });
  useEffect(() => {
    if (isView || isEdit) {
      dispatch(getProdSubCategories());
      setInitVal({
        ...data,
        better_body_shape: exceptionValue(data?.better_body_shape),
        skin_tone: exceptionValue(data?.skin_tone),
        outfit_prefer: exceptionValue(data?.outfit_prefer),
        outfit_matches: exceptionValue(data?.outfit_matches),
        profession: exceptionValue(data?.profession),
        prodSubCategoryId: data?.rack,
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
            {isEdit && `Edit`} {isView && 'View'} Product For Men
          </Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography color="#ff0000">All (*) fields are mandatory</Typography>
          </Grid>
          {!isView && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Select
                  size="small"
                  name="profile"
                  placeholder="Men"
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
          )}
          <Grid item xs={12}>
            <Formik
              initialValues={initVal}
              enableReinitialize
              validationSchema={Yup.object().shape({
                product_type: Yup.number().required('Please select product category'),
                prodSubCategoryId: Yup.number().required('Please select product sub-category'),
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
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                isSubmitting,
                touched,
                values,
                isValid,
                dirty,
                errors
              }) => (
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
                          value={values?.product_type}
                          onBlur={handleBlur}
                          disabled={isView ? true : false}
                          onChange={(evt) => {
                            try {
                              handleChange(evt);
                              const _categoryId = evt.target.value;
                              dispatch(getProductSubCategories(_categoryId));
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
                          value={values?.prodSubCategoryId}
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
                      <InputForm
                        errors={errors}
                        values={values}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="product_name_one"
                        disabled={isView ? true : false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Product Name 2 <span style={{ color: 'red' }}>*</span>
                      </Typography>
                      <InputForm
                        errors={errors}
                        values={values}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="product_name_two"
                        disabled={isView ? true : false}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">Height Range</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={2.8}>
                          <InputSelect
                            list={iHeightFt}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            values={values}
                            errors={errors}
                            touched={touched}
                            label="ft"
                            name="tall_feet"
                          />
                        </Grid>
                        <Grid item xs={6} md={2.8}>
                          <InputSelect
                            list={iHeightIn}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            values={values}
                            errors={errors}
                            touched={touched}
                            label="in."
                            name="tall_inch"
                          />
                        </Grid>
                        <Grid item xs={12} md={0.8} className="form-item-to">
                          <Typography>to</Typography>
                        </Grid>
                        <Grid item xs={6} md={2.8}>
                          <FormControl fullWidth>
                            <InputSelect
                              list={iHeightFt}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                              values={values}
                              errors={errors}
                              touched={touched}
                              name="tall_feet2"
                              label="ft"
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={6} md={2.8}>
                          <FormControl fullWidth>
                            <InputSelect
                              list={iHeightIn}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                              values={values}
                              errors={errors}
                              touched={touched}
                              name="tall_inch2"
                              label="in."
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">Weight Range</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={5.6}>
                          <InputForm
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="best_fit_for_weight"
                          />
                        </Grid>
                        <Grid item xs={12} md={0.8} className="form-item-to">
                          <Typography>to</Typography>
                        </Grid>
                        <Grid item xs={12} md={5.6}>
                          <InputForm
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="best_fit_for_weight2"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">Age Range</Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={5.6}>
                          <InputForm
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="age1"
                          />
                        </Grid>
                        <Grid item xs={12} md={0.8} className="form-item-to">
                          <Typography>to</Typography>
                        </Grid>
                        <Grid item xs={12} md={5.6}>
                          <InputForm
                            values={values}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            name="age2"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">Profession</Typography>
                      <FormControl fullWidth>
                        <AntdSelect
                          mode="multiple"
                          size="large"
                          allowClear
                          style={{ width: '100%' }}
                          defaultValue={values.profession}
                          onChange={(e) => (values.profession = e)}
                          options={professionListMen}
                        />
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
                              disabled={isView ? true : false}
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
                                disabled={!isView ? false : true}
                                size="small"
                                name="best_size_fit"
                                value={values.best_size_fit}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {iWaistSizeLabel.map((item, index) => (
                                  <MenuItem key={index} value={index}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={<CustomRadio />}
                              disabled={isView ? true : false}
                              value={'1'}
                              label={
                                <Typography>
                                  <strong>Waist Size</strong>
                                </Typography>
                              }
                            />
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <FormControl fullWidth>
                                  <Select
                                    disabled={values.sizeType === '1' ? false : true}
                                    size="small"
                                    name="waist_size"
                                    value={values.waist_size}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iWaistSizeNum.map((item, index) => (
                                      <MenuItem key={index} value={index}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl fullWidth>
                                  <Select
                                    disabled={values.sizeType === '1' ? false : true}
                                    size="small"
                                    name="waist_size_run"
                                    value={values.waist_size_run}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iWaistSizeLabel.map((item, index) => (
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
                            <FormControlLabel
                              control={<CustomRadio />}
                              disabled={isView ? true : false}
                              value={'2'}
                              label={
                                <Typography>
                                  <strong>Shirt Size</strong>
                                </Typography>
                              }
                            />
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <FormControl fullWidth>
                                  <Select
                                    disabled={!isView ? false : true}
                                    size="small"
                                    name="shirt_size"
                                    value={values.shirt_size}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iShirtSizeNo.map((item, index) => (
                                      <MenuItem key={index} value={index}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl fullWidth>
                                  <Select
                                    disabled={!isView ? false : true}
                                    size="small"
                                    name="shirt_size_run"
                                    value={values.shirt_size_run}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iShirtSizeLabel.map((item, index) => (
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
                            <FormControlLabel
                              control={<CustomRadio />}
                              disabled={isView ? true : false}
                              value={'3'}
                              label={
                                <Typography>
                                  <strong>Inseam Size</strong>
                                </Typography>
                              }
                            />
                            <FormControl fullWidth>
                              <Select
                                disabled={!isView ? false : true}
                                size="small"
                                name="inseam_size"
                                value={values.inseam_size}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                MenuProps={selectProps}
                              >
                                {iInseam.map((item, index) => (
                                  <MenuItem key={index} value={index}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={<CustomRadio />}
                              disabled={isView ? true : false}
                              value={'4'}
                              label={
                                <Typography>
                                  <strong>Bottom Size</strong>
                                </Typography>
                              }
                            />
                            <FormControl fullWidth>
                              <Select
                                disabled={!isView ? false : true}
                                size="small"
                                name="men_bottom"
                                value={values.men_bottom}
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
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={<CustomRadio />}
                              disabled={isView ? true : false}
                              value={'5'}
                              label={
                                <Typography>
                                  <strong>Shoe Size</strong>
                                </Typography>
                              }
                            />
                            <Grid container spacing={1}>
                              <Grid item xs={4}>
                                <FormControl fullWidth>
                                  <Select
                                    disabled={!isView ? false : true}
                                    size="small"
                                    name="shoe_size"
                                    value={Number(values.shoe_size)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iShoeSizeNum.map((item, index) => (
                                      <MenuItem key={index} value={index}>
                                        {item}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={8}>
                                <FormControl fullWidth>
                                  <Select
                                    disabled={!isView ? false : true}
                                    size="small"
                                    name="shoe_size_run"
                                    value={values.shoe_size_run}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    MenuProps={selectProps}
                                  >
                                    {iShoeSizeLabel.map((item, index) => (
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
                      </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12} md={7} lg={6}>
                      <Typography className="form-item-title">Body Shape</Typography>
                      <ImageSelectorCheckboxAdmin
                        content={iBodyShapeLabel}
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
                      <Typography className="form-item-title">Typically wear to work</Typography>
                      <FormControl fullWidth>
                        <AntdSelect
                          mode="multiple"
                          disabled={isView ? true : false}
                          size="large"
                          allowClear
                          style={{ width: '100%' }}
                          defaultValue={values.work_type}
                          onChange={(e) => (values.work_type = e)}
                          options={iTypicallyWear2Work.gallery}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">Casual shirts to Fit</Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="casual_shirts_type"
                          disabled={isView ? true : false}
                          value={values.casual_shirts_type}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {iCasualShirts.gallery.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">Button up shirt to Fit</Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="bottom_up_shirt_fit"
                          value={values.bottom_up_shirt_fit}
                          disabled={isView ? true : false}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {iBtnUpShirts.gallery.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">Jeans to Fit</Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="jeans_Fit"
                          value={values.jeans_Fit}
                          disabled={isView ? true : false}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {iJeans.gallery.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">Shorts long</Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="shorts_long"
                          disabled={isView ? true : false}
                          value={values.shorts_long}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {iShorts.gallery.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">Color</Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="color"
                          disabled={isView ? true : false}
                          value={values.color}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
                        >
                          {prodColors.map((item, index) => (
                            <MenuItem key={index} value={item.id}>
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">Bottom Fit</Typography>
                      <FormControl fullWidth>
                        <Select
                          size="small"
                          name="men_bottom_prefer"
                          value={values.men_bottom_prefer}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isView ? true : false}
                          MenuProps={selectProps}
                        >
                          {iBottoms.gallery.map((item, index) => (
                            <MenuItem key={index} value={index}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="form-item-title">
                        Tell us which of these outfits you would prefer to wear
                      </Typography>
                      <ImageSelectorCheckboxSmall
                        content={iOutfits?.gallery}
                        touched={touched}
                        disabled={isView ? true : false}
                        errors={errors}
                        name="outfit_prefer"
                        value={values.outfit_prefer}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className="form-item-title">Any Fit issues to take note of?</Typography>
                      <CustomCheckboxBtn
                        part={iFitIssues}
                        touched={touched}
                        disabled={isView ? true : false}
                        errors={errors}
                        name="outfit_matches"
                        value={values.outfit_matches}
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
                          {menWears.map((item, index) => (
                            <Grid key={index} item xs={12} sm={6}>
                              <FormControlLabel
                                disabled={!isView ? false : true}
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
                                  size="small"
                                  value={values.budget_type === `${index}` ? Number(values.budget_value) : 0}
                                  disabled={!isView ? false : true}
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
                      <Typography className="form-item-title">Purchase Price</Typography>
                      <InputForm
                        values={values}
                        disabled={isView ? true : false}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="purchase_price"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Sale Price <span style={{ color: 'red' }}>*</span>
                      </Typography>
                      <InputForm
                        values={values}
                        disabled={isView ? true : false}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="sale_price"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Quantity <span style={{ color: 'red' }}>*</span>
                      </Typography>
                      <InputForm
                        values={values}
                        disabled={isView ? true : false}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="quantity"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} />
                    <Grid item xs={12} sm={6}>
                      <Typography className="form-item-title">
                        Brand Name <span style={{ color: 'red' }}>*</span>
                      </Typography>
                      <FormControl fullWidth error={Boolean(touched.brand_name && errors.brand_name)}>
                        <Select
                          size="small"
                          name="brand_id"
                          disabled={isView ? true : false}
                          value={values.brand_id}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={selectProps}
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
                    {isEdit ? (
                      <Grid item xs={12} sm={6} />
                    ) : (
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Available Status</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="available_status"
                            disabled={isView ? true : false}
                            value={values.available_status}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
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
                          disabled={isView ? true : false}
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
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button type="submit" className="admin-submit-btn" disabled={!isValid || !dirty || isSubmitting}>
                        SAVE
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
MenProduct.propTypes = {
  data: PropTypes.object
};
export default MenProduct;
