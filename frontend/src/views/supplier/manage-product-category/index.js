import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Box,
  Paper,
  Grid,
  Typography,
  Tooltip,
  Dialog,
  DialogActions,
  DialogTitle,
  Breadcrumbs
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { addSplCategory, deleteSplCategory, editSplCategory, getSplCategory } from 'actions/supply/prodCategory';
import DFnewLogger from 'utils/DFnewLogger';
import DeleteModal from 'ui-component/modal/DeleteModal';
import InputForm from 'ui-component/input/InputForm';
import Table from 'ui-component/Table';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
];

const ManageProductCategory = () => {
  const dispatch = useDispatch();
  const [initVal, setInitVal] = useState({ name: '' });
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
    dispatch(getSplCategory());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.splProdCategory);
  const { email } = useSelector((state) => state.auth.user);

  let updateData = [];
  updateData = tableData.map((item, index) => {
    let action_btn = null;
    action_btn = (
      <div key={index}>
        <Tooltip title="Edit" arrow>
          <Button
            className="admin-table-btn edit margin"
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
            className="admin-table-btn delete margin"
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
            <Typography className="home-link current">Manage Product Category</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Add Supplier Product Category</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{ name: '' }}
          validationSchema={Yup.object().shape({
            name: Yup.string().trim().max(35, 'Category name is too long').required('Please enter category name')
          })}
          onSubmit={async (values, actions) => {
            try {
              await dispatch(addSplCategory({ ...values, email: email }));
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
                    touched={touched}
                    errors={errors}
                    values={values}
                    label="Name *"
                    name="name"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                </Grid>
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
            Search fields are <strong>Name</strong>
          </Typography>
        </Grid>
      </Grid>
      <Box className="table-border no-margin">
        <Table columns={columns} data={updateData} />
      </Box>
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Edit Supplier Product Category</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initVal}
            validationSchema={Yup.object().shape({
              name: Yup.string().trim().max(35, 'Category name is too long').required('Please enter category name')
            })}
            onSubmit={async (values, actions) => {
              try {
                await dispatch(editSplCategory(values));
                handleEditDialog();
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
                      touched={touched}
                      errors={errors}
                      values={values}
                      label="Name *"
                      name="name"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
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
        deleteFunction={deleteSplCategory({ id: delId })}
      />
    </>
  );
};

export default ManageProductCategory;
