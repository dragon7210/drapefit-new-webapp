import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  Tooltip,
  Paper,
  Typography,
  Breadcrumbs,
  Dialog,
  DialogTitle,
  DialogActions
} from '@mui/material';
import { Form, Formik } from 'formik';
import { faDesktop, faEdit, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Yup from 'yup';

import {
  addProductCategory,
  editProductCategory,
  deleteProductCategory,
  getProductCategories
} from 'actions/inventory/productCategory';
import DFnewLogger from 'utils/DFnewLogger';
import DeleteModal from 'ui-component/modal/DeleteModal';
import InputForm from 'ui-component/input/InputForm';
import Table from 'ui-component/Table';

const columns = [
  { accessorKey: 'categoryName', header: 'Category Name', enableSorting: false },
  { accessorKey: 'note', header: 'Note' },
  { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
];

const ProductCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initVal, setInitVal] = useState({
    product_type: '',
    name: '',
    note: ''
  });
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
  }, [dispatch]);

  const { prodCategories } = useSelector((state) => state.invProductCategory);
  let updateData = [];
  updateData = prodCategories.map((item, index) => {
    const action_btn = (
      <div key={index} style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Add" arrow>
          <Button
            className="admin-table-btn password"
            onClick={() => navigate(`/dfinventory/manage-category/product-sub-category/${item.id}`)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Tooltip>
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
      categoryName: `${item.product_type} - ${item.name}`,
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
            <Typography className="home-link current">Product Category</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Product Category</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            product_type: '',
            name: '',
            note: ''
          }}
          validationSchema={Yup.object().shape({
            product_type: Yup.string()
              .trim()
              .max(35, 'Product category is too long')
              .required('Please enter product category'),
            name: Yup.string().trim().max(50, 'Product name is too long').required('Please enter product name'),
            note: Yup.string().trim().max(255, 'Note is too long').required('Please enter note')
          })}
          onSubmit={async (values, actions) => {
            try {
              dispatch(addProductCategory(values));
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
                  <InputForm
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Product Category *"
                    name="product_type"
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Name *"
                    name="name"
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    values={values}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Note *"
                    name="note"
                    errors={errors}
                  />
                </Grid>
                <Grid item xs={12} sm={6} />
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
            Search fields are <strong>Category Name</strong>, <strong>Note</strong>
          </Typography>
        </Grid>
      </Grid>
      <Box className="table-border no-margin">
        <Table columns={columns} data={updateData} />
      </Box>
      {/* Modal Dialogs */}
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Edit Product Category</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initVal}
            enableReinitialize
            validationSchema={Yup.object().shape({
              product_type: Yup.string()
                .trim()
                .max(35, 'Product category is too long')
                .required('Please enter product category'),
              name: Yup.string().trim().max(50, 'Product name is too long').required('Please enter product name'),
              note: Yup.string().trim().max(255, 'Note is too long').required('Please enter note')
            })}
            onSubmit={async (values, actions) => {
              try {
                dispatch(editProductCategory(values));
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
                    <InputForm
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Product Category *"
                      name="product_type"
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Name *"
                      name="name"
                      errors={errors}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Note *"
                      name="note"
                      errors={errors}
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
        deleteFunction={deleteProductCategory({ id: delId })}
      />
    </>
  );
};

export default ProductCategory;
