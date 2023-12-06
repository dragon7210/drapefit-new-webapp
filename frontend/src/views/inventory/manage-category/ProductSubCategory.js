import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Grid,
  Tooltip,
  Paper,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  Dialog,
  DialogTitle,
  DialogActions
} from '@mui/material';
import { Form, Formik } from 'formik';
import { faDesktop, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Yup from 'yup';

import { getProductCategories } from 'actions/inventory/productCategory';
import {
  getProdSubCategories,
  addProdSubCategory,
  editProdSubCategory,
  deleteProdSubCategory
} from 'actions/inventory/prodSubCategory';
import { selectProps, LABEL_SEL_CATEGORY } from 'constant/other';
import DFnewLogger from 'utils/DFnewLogger';
import DeleteModal from 'ui-component/modal/DeleteModal';
import Table from 'ui-component/Table';
import InputForm from 'ui-component/input/InputForm';

const columns = [
  { accessorKey: 'categoryName', header: 'Catetory Name', enableSorting: false },
  { accessorKey: 'subCategoryName', header: 'SubCategory Name', enableSorting: false },
  { accessorKey: 'location_note', header: 'Note' },
  { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
];

const ProductSubCategory = () => {
  const dispatch = useDispatch();
  const [initVal, setInitVal] = useState({});
  const [delId, setDelId] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getProdSubCategories());
  }, [dispatch]);

  const { prodCategories } = useSelector((state) => state.invProductCategory);
  const { tableData } = useSelector((state) => state.invProdSubCategory);

  let updateData = [];

  updateData = tableData.map((item, index) => {
    const action_btn = (
      <div key={index} style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Edit" arrow>
          <Button
            className="admin-table-btn edit"
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
      categoryName: `${item.in_product_type?.product_type} - ${item.in_product_type?.name}`,
      subCategoryName: `${item.rack_number} - ${item.rack_name}`,
      action: action_btn
    };
  });
  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDesktop} />
              &nbsp;&nbsp;Home
            </Link>
            <Typography className="home-link disable">Manage Category</Typography>
            <Typography className="home-link current">Product SubCategory</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Product SubCategory</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            in_product_type_id: '',
            rack_number: '',
            rack_name: '',
            location_note: ''
          }}
          enableReinitialize
          validationSchema={Yup.object().shape({
            in_product_type_id: Yup.string()
              .trim()
              .notOneOf([LABEL_SEL_CATEGORY], 'This field is mandatory')
              .required('Please select category'),
            rack_number: Yup.string()
              .trim()
              .max(35, 'Product sub-category is too long')
              .required('Please enter product sub-category'),
            rack_name: Yup.string().trim().max(35, 'Name is too long').required('Please enter name'),
            location_note: Yup.string().trim().required('Please enter note')
          })}
          onSubmit={async (values, actions) => {
            try {
              dispatch(addProdSubCategory(values));
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
                  <Typography color="#ff0000">All (*) fields are mandatory</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.in_product_type_id && errors.in_product_type_id)}>
                    <InputLabel>
                      Category <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      size="small"
                      label="Category *"
                      name="in_product_type_id"
                      value={values.in_product_type_id}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      MenuProps={selectProps}
                    >
                      {prodCategories.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.product_type + ' ' + item.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.in_product_type_id && errors.in_product_type_id && (
                      <FormHelperText id="helper-text--category" error>
                        {errors.in_product_type_id}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Product SubCategory *"
                    name="rack_number"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Name *"
                    name="rack_name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    errors={errors}
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Note *"
                    name="location_note"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
            Search fields are <strong>Category Name</strong>, <strong>SubCategory Name</strong>, <strong>Note</strong>
          </Typography>
        </Grid>
      </Grid>
      <Box className="table-border no-margin">
        <Table columns={columns} data={updateData} />
      </Box>
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Edit Product SubCategory</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initVal}
            enableReinitialize
            validationSchema={Yup.object().shape({
              in_product_type_id: Yup.string()
                .trim()
                .notOneOf([LABEL_SEL_CATEGORY], 'This field is mandatory')
                .required('Please select category'),
              rack_number: Yup.string()
                .trim()
                .max(35, 'Product sub-category is too long')
                .required('Please enter product sub-category'),
              rack_name: Yup.string().trim().max(35, 'Name is too long').required('Please enter name'),
              location_note: Yup.string().trim().required('Please enter note')
            })}
            onSubmit={async (values, actions) => {
              try {
                dispatch(editProdSubCategory(values));
                actions.resetForm();
                handleEditDialog();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(touched.in_product_type_id && errors.in_product_type_id)}>
                      <InputLabel>
                        Category <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <Select
                        size="small"
                        label="Category *"
                        name="in_product_type_id"
                        value={values.in_product_type_id}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        MenuProps={selectProps}
                      >
                        {prodCategories.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.product_type + ' ' + item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.in_product_type_id && errors.in_product_type_id && (
                        <FormHelperText id="helper-text--category" error>
                          {errors.in_product_type_id}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Product SubCategory *"
                      name="rack_number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Name *"
                      name="rack_name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Note *"
                      name="location_note"
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
        deleteFunction={deleteProdSubCategory({ id: delId })}
      />
    </>
  );
};

export default ProductSubCategory;
