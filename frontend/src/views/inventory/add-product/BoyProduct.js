import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import * as Yup from 'yup';

import ImageUpload from 'views/client/component/profile/ImageUpload';
import CustomRadio from 'views/client/component/profile/CustomRadio';
import { getProductCategories } from 'actions/inventory/productCategory';
import { getProdSubCategories, getProductSubCategories } from 'actions/inventory/prodSubCategory';
import { typeOfPrintList, availableStatusList, selectProps, profileList } from 'constant/other';
import DFnewLogger from 'utils/DFnewLogger';
import { getColor } from 'actions/inventory/color';
import { getBrand } from 'actions/inventory/brand';
import { addProduct, editProduct } from 'actions/inventory/product';
import { iBodyShapeLabel, iHeightFt, iHeightIn, iWaistSizeLabel } from 'constant/basic';
import { iShoeSize, iTopSize } from 'constant/kidStyleFit';

const BoyProduct = ({ data }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(3);
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
    best_fit_for_weight: '',
    sizeType: '',
    best_size_fit: '',
    color: '',
    top_size: '',
    bottom_size: '',
    shoe_size: '',
    kid_body_shape: '',
    p_type: '',
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
            {isEdit && 'Edit'} {isView && 'View'}Product For Boy Kids
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
                placeholder="Boy Kids"
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
                best_fit_for_weight: Yup.number()
                  .typeError('Please enter number value')
                  .min(0, 'This field value must be greater than or equal to 0')
                  .nullable(),
                purchase_price: Yup.number()
                  .typeError('Please enter number value')
                  .min(0, 'Purchase price must be greater than or equal to 0')
                  .nullable(),
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
                        <Typography className="form-item-title">Child Height</Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
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
                          <Grid item xs={6}>
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
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Child Weight</Typography>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.best_fit_for_weight && errors.best_fit_for_weight)}
                        >
                          <OutlinedInput
                            size="small"
                            placeholder="Please enter Child Weight"
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
                                disabled={isView ? true : false}
                                value={'0'}
                                label={
                                  <Typography>
                                    <strong>Free Size (Best Size Fit)</strong>
                                  </Typography>
                                }
                              />
                              <FormControl fullWidth>
                                <Select
                                  disabled={values.sizeType === '0' ? false : true}
                                  size="small"
                                  name="best_size_fit"
                                  value={values.best_size_fit}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
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
                                disabled={isView ? true : false}
                                value={'1'}
                                label={
                                  <Typography>
                                    <strong>TOPS SIZE</strong>
                                  </Typography>
                                }
                              />
                              <FormControl fullWidth>
                                <Select
                                  disabled={values.sizeType === '1' ? false : true}
                                  size="small"
                                  name="top_size"
                                  value={values.top_size}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iTopSize.map((item, index) => (
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
                                disabled={isView ? true : false}
                                value={'2'}
                                label={
                                  <Typography>
                                    <strong>BOTTOMS SIZE</strong>
                                  </Typography>
                                }
                              />
                              <FormControl fullWidth>
                                <Select
                                  disabled={values.sizeType === '2' ? false : true}
                                  size="small"
                                  name="bottom_size"
                                  value={values.bottom_size}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iTopSize.map((item, index) => (
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
                                disabled={isView ? true : false}
                                value={'3'}
                                label={
                                  <Typography>
                                    <strong>SHOE SIZE</strong>
                                  </Typography>
                                }
                              />
                              <FormControl fullWidth>
                                <Select
                                  disabled={values.sizeType === '3' ? false : true}
                                  size="small"
                                  value={values.shoe_size}
                                  name="shoe_size"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  MenuProps={selectProps}
                                >
                                  {iShoeSize.map((item, index) => (
                                    <MenuItem key={index} value={index + 1} disabled={item.type === 0 ? false : true}>
                                      {item.value}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </RadioGroup>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Body Shape</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="kid_body_shape"
                            value={values.kid_body_shape}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {iBodyShapeLabel.map((item, index) => (
                              <MenuItem key={index} value={index + 1}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">Type of Print</Typography>
                        <FormControl fullWidth>
                          <Select
                            size="small"
                            name="p_type"
                            value={values.p_type}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            MenuProps={selectProps}
                            disabled={isView ? true : false}
                          >
                            {typeOfPrintList.map((item, index) => (
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
                            disabled={isView ? true : false}
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
                      <Grid item xs={12} sm={6}>
                        <Typography className="form-item-title">
                          Brand Name <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <FormControl fullWidth error={Boolean(touched.brand_name && errors.brand_name)}>
                          <Select
                            size="small"
                            name="brand_id"
                            value={values.brand_id}
                            disabled={isView ? true : false}
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
                      <Grid item xs={12} sm={6} />
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
BoyProduct.propTypes = {
  data: PropTypes.object
};
export default BoyProduct;
