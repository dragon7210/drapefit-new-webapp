import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faPlus, faMinus, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  Tooltip,
  Select,
  MenuItem,
  TextareaAutosize,
  Breadcrumbs,
  Dialog,
  DialogActions,
  DialogTitle
} from '@mui/material';
import { Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
import 'yup-phone-lite';

import ImageUpload from 'views/client/component/profile/ImageUpload';
import {
  addSplProduct,
  checkSplProdBeforeUpsert,
  editSplProduct,
  deleteSplProduct,
  getSplProducts,
  addSplProdStock,
  manualDeductSplProdStock
} from 'actions/supply/product';
import DFnewLogger from 'utils/DFnewLogger';
import ShowImg from 'ui-component/ShowImg';
import DeleteModal from 'ui-component/modal/DeleteModal';
import InputForm from 'ui-component/input/InputForm';
import Table from 'ui-component/Table';
import { getSplCategory } from 'actions/supply/prodCategory';

const columns = [
  { accessorKey: 'product_name', header: 'Name' },
  { accessorKey: 'supProductImgUrl', header: 'Image', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'price', header: 'Price', enableColumnFilter: false },
  { accessorKey: 'quantity', header: 'Quantity', enableColumnFilter: false },
  { accessorKey: 'used', header: 'Used', enableColumnFilter: false },
  { accessorKey: 'current_stock', header: 'In Stock', enableColumnFilter: false },
  { accessorKey: 'dynamic_deduct', header: 'Deduct', enableColumnFilter: false },
  { accessorKey: 'supplier_name', header: 'Supplier Name' },
  { accessorKey: 'supplier_email', header: 'Supplier Email' },
  { accessorKey: 'supplier_phone', header: 'Supplier Phone' },
  { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
];

const ManageProduct = () => {
  const dispatch = useDispatch();

  const [initVal, setInitVal] = useState({
    name: '',
    category: '',
    product_photo: '',
    description: '',
    quantity: '',
    price: '',
    used: '',
    supplier_name: '',
    supplier_address: '',
    supplier_email: '',
    supplier_phone: '',
    dynamic_deduct: '',
    current_stock: ''
  });
  const [initItem, setInitItem] = useState({
    id: '',
    count: ''
  });
  const [maxDeduct, setMaxDeduct] = useState(0);
  const [delId, setDelId] = useState('');
  const [openPlus, setOpenPlus] = useState(false);
  const [openMinus, setOpenMinus] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handlePlusDialog = () => {
    setOpenPlus(!openPlus);
  };
  const handleMinusDialog = () => {
    setOpenMinus(!openMinus);
  };
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };

  useEffect(() => {
    dispatch(getSplCategory());
    dispatch(getSplProducts());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.splProduct);
  const prodCategories = useSelector((state) => state.splProdCategory).tableData;

  let updateData = [];
  updateData = tableData.map((item, index) => {
    const action_btn = (
      <div key={index} style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Add" arrow>
          <Button
            className="admin-table-btn password"
            onClick={() => {
              setInitItem({ id: item.id, count: '' });
              handlePlusDialog();
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Tooltip>
        <Tooltip title="Deduct" arrow>
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              setInitItem({ id: item.id, count: '' });
              setMaxDeduct(item.current_stock);
              handleMinusDialog();
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Button>
        </Tooltip>
        <Tooltip title="Edit" arrow>
          <Button
            className="admin-table-btn deactive"
            onClick={() => {
              setInitVal(item);
              handleEditDialog();
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <Button
            className="admin-table-btn delete"
            onClick={() => {
              setDelId(item.id);
              handleDeleteDialog();
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Tooltip>
      </div>
    );
    return {
      ...item,
      supProductImgUrl: <ShowImg url={item.product_photo} />,
      action: action_btn
    };
  });

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfsupplier/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDesktop} />
              &nbsp;&nbsp;Home
            </Link>
            <Typography className="home-link current">Manage Product</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Add Supplier Product</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            name: '',
            category: '',
            dynamicDeduct: '',
            description: '',
            quantity: '',
            price: '',
            supplier_name: '',
            supplier_address: '',
            supplier_email: '',
            supplier_phone: '',
            dynamic_deduct: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .trim()
              .min(3, 'Please enter at least 3 characters')
              .max(35, 'Product name is too long')
              .required('Please enter product name'),
            category: Yup.string().required('Please select product catetory'),
            dynamicDeduct: Yup.string().required('Please upload product image'),
            quantity: Yup.number()
              .min(0, 'Product quantity must be greater than or equal to 0')
              .required('Please enter product quantity'),
            price: Yup.number().min(0, 'Product price is invalid').required('Please enter product price'),
            supplier_name: Yup.string()
              .trim()
              .min(3, 'Please enter at least 3 characters')
              .max(50, 'Supplier name is too long')
              .required('Please enter supplier name'),
            supplier_address: Yup.string()
              .trim()
              .min(3, 'Please enter at least 3 characters')
              .max(50, 'Supplier address is too long')
              .required('Please enter supplier address'),
            supplier_email: Yup.string()
              .trim()
              .email('Please enter a valid email address')
              .max(50, 'Supplier email is too long')
              .required('Please enter supplier email'),
            supplier_phone: Yup.string()
              .phone('Please enter a valid phone number')
              .required('Please enter phone number'),
            dynamic_deduct: Yup.number()
              .typeError('Please enter number value')
              .min(0, 'Dynamic deduct must be greater than or equal to 0')
              .nullable()
          })}
          onSubmit={async (values, actions) => {
            try {
              await dispatch(addSplProduct(values, actions));
              actions.resetForm();
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
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography color="#ff0000">All (*) fields are mandatory</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Name *"
                    name="name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.category && errors.category)}>
                    <InputLabel>
                      Category <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      size="small"
                      label="Category *"
                      name="category"
                      value={values.category}
                      onBlur={handleBlur}
                      onChange={(evt) => {
                        handleChange(evt);
                        checkSplProdBeforeUpsert({ category: evt.target.value });
                      }}
                    >
                      {prodCategories.map((item, index) => (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.category && errors.category && (
                      <FormHelperText id="standard-weight-helper-text--signup" error>
                        {errors.category}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box width="200px">
                    <ImageUpload arg="product_photo" value={values.product_photo} setFieldValue={setFieldValue} />
                    {touched.product_photo && errors.product_photo && (
                      <FormHelperText id="standard-weight-helper-text--signup" error>
                        {errors.product_photo}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextareaAutosize
                      placeholder="Please enter product description"
                      style={{
                        minWidth: '100%',
                        maxWidth: '100%',
                        minHeight: '170px',
                        padding: '15px',
                        borderColor: '#ccc',
                        borderRadius: '12px',
                        fontSize: '14px'
                      }}
                      name="description"
                      value={values.description}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Quantity *"
                    name="quantity"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Price *"
                    name="price"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Supplier Name *"
                    name="supplier_name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Supplier Address *"
                    name="supplier_address"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Supplier Email *"
                    name="supplier_email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Supplier Phone *"
                    name="supplier_phone"
                  />
                </Grid>
                {prodCategories.map((item, index) => {
                  if (item.name !== values.category) {
                    return null;
                  }
                  if (item.isDefault) {
                    return (
                      <Grid item xs={12} sm={6} key={index}>
                        <InputForm
                          errors={errors}
                          values={values}
                          touched={touched}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                          label="Dynamic Deduct"
                          name="dynamic_deduct"
                        />
                      </Grid>
                    );
                  }
                  return null;
                })}
                <Grid item xs={12}>
                  <Button
                    className="admin-submit-btn"
                    type="submit"
                    disableElevation
                    disabled={!isValid || !dirty || isSubmitting}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
          <Typography color="#ff0000">
            Search fields are <strong>Name</strong>, <strong>Supplier Name</strong>, <strong>Supplier Email</strong>,{' '}
            <strong>Supplier Phone</strong>
          </Typography>
        </Grid>
      </Grid>
      <Box className="table-border no-margin">
        <Table columns={columns} data={updateData} />
      </Box>
      {/* Modal Dialogs */}
      <Dialog open={openPlus} onClose={handlePlusDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Add More Stocks</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initItem}
            validationSchema={Yup.object().shape({
              count: Yup.number()
                .min(0, 'Count of stocks must be greater than or equal to 0')
                .required('Please enter count of stocks to add')
            })}
            onSubmit={async (values, actions) => {
              try {
                await dispatch(addSplProdStock(values));
                handlePlusDialog();
                actions.resetForm();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Count *"
                      name="count"
                    />
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button key="cancel" className="account-no-btn" onClick={handlePlusDialog}>
                      Cancel
                    </Button>
                    <Button
                      key="submit"
                      className="account-yes-btn"
                      type="submit"
                      disableElevation
                      disabled={!isValid || !dirty || isSubmitting}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogActions>
      </Dialog>
      <Dialog open={openMinus} onClose={handleMinusDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Deduct Stock Manually</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initItem}
            validationSchema={Yup.object().shape({
              count: Yup.number()
                .min(0, 'Stock count must be greater than or equal to 0')
                .max(maxDeduct, 'Count to deduct cannot be greater than current in-stock')
                .required('Please enter stock count to deduct manually')
            })}
            onSubmit={async (values) => {
              try {
                await dispatch(manualDeductSplProdStock(values));
                handleMinusDialog();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Count *"
                      name="count"
                    />
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button key="cancel" className="account-no-btn" onClick={handleMinusDialog}>
                      Cancel
                    </Button>
                    <Button
                      key="submit"
                      className="account-yes-btn"
                      type="submit"
                      disableElevation
                      disabled={!isValid || !dirty || isSubmitting}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Edit Supplier Product</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initVal}
            validationSchema={Yup.object().shape({
              product_name: Yup.string()
                .trim()
                .min(3, 'Please enter at least 3 characters')
                .max(35, 'Product name is too long')
                .required('Please enter product name'),
              category: Yup.string().required('Please select product category'),
              product_photo: Yup.string().required('Please upload product image'),
              price: Yup.number()
                .typeError('Please enter number value')
                .min(0, 'Product price is invalid')
                .required('Please enter product price'),
              supplier_name: Yup.string()
                .trim()
                .min(3, 'Please enter at least 3 characters')
                .max(50, 'Supplier name is too long')
                .required('Please enter supplier name'),
              supplier_address: Yup.string()
                .trim()
                .min(3, 'Please enter at least 3 characters')
                .max(50, 'Supplier address is too long')
                .required('Please enter supplier address'),
              supplier_email: Yup.string()
                .trim()
                .email('Please enter a valid email address')
                .max(50, 'Supplier email is too long')
                .required('Please enter supplier email'),
              supplier_phone: Yup.string()
                .phone(['US', 'IN'], 'Please enter a valid phone number')
                .required('Please enter phone number'),
              dynamic_deduct: Yup.number()
                .typeError('Please enter number value')
                .min(0, 'Dynamic deduct must be greater than or equal to 0')
                .nullable(),
              current_stock: Yup.number()
                .min(0, 'Current in-stock must be greater than or equal to 0')
                .required('Please enter current in-stock')
            })}
            onSubmit={async (values) => {
              try {
                dispatch(editSplProduct(values));
                handleEditDialog();
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
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography color="#ff0000">All (*) fields are mandatory</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Name *"
                      name="product_name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(touched.category && errors.category)}>
                      <InputLabel>
                        Category <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <Select
                        size="small"
                        label="Category *"
                        name="category"
                        value={values.category}
                        onBlur={handleBlur}
                        onChange={(evt) => {
                          handleChange(evt);
                          checkSplProdBeforeUpsert({ category: evt.target.value });
                        }}
                      >
                        {prodCategories.map((item, index) => (
                          <MenuItem key={index} value={index}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.category && errors.category && (
                        <FormHelperText id="standard-weight-helper-text--signup" error>
                          {errors.category}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box width="200px">
                      <ImageUpload arg="product_photo" value={values.product_photo} setFieldValue={setFieldValue} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextareaAutosize
                        placeholder="Please enter description"
                        style={{
                          minWidth: '100%',
                          maxWidth: '100%',
                          minHeight: '170px',
                          padding: '15px',
                          borderColor: '#ccc',
                          borderRadius: '12px',
                          fontSize: '14px'
                        }}
                        name="description"
                        value={values.description}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Price *"
                      name="price"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Supplier Name *"
                      name="supplier_name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Supplier Address *"
                      name="supplier_address"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Supplier Email *"
                      name="supplier_email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Supplier Phone *"
                      name="supplier_phone"
                    />
                  </Grid>
                  {prodCategories.map((item, index) => {
                    if (item.name !== values.category) {
                      return null;
                    }
                    if (item.isDefault) {
                      return (
                        <Grid item xs={12} sm={6} key={index}>
                          <InputForm
                            errors={errors}
                            values={values}
                            touched={touched}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            label="Dynamic Deduct"
                            name="dynamic_deduct"
                          />
                        </Grid>
                      );
                    }
                    return null;
                  })}
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Current In-Stock *"
                      name="current_stock"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Quantity (READ-ONLY)"
                      name="quantity"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Used (READ-ONLY)"
                      name="used"
                    />
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button key="cancel" className="account-no-btn" onClick={handleEditDialog}>
                      Cancel
                    </Button>
                    <Button
                      key="submit"
                      className="account-yes-btn"
                      type="submit"
                      disableElevation
                      disabled={!isValid || !dirty || isSubmitting}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogActions>
      </Dialog>
      <DeleteModal
        openDelete={openDelete}
        handleDeleteDialog={handleDeleteDialog}
        deleteFunction={deleteSplProduct({ id: delId })}
      />
    </>
  );
};

export default ManageProduct;
