import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  Paper,
  Grid,
  Typography,
  Tooltip,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { addBlogCategory, delBlogCategory, getBlogCategory, updateBlogCategory } from 'actions/admin/blog';
import InputForm from 'ui-component/input/InputForm';
import DeleteModal from 'ui-component/modal/DeleteModal';
import { DateType } from 'constant/function';

const columns = [
  { accessorKey: 'category_name', header: 'Category Name' },
  { accessorKey: 'createdAt', header: 'Created Date' },
  { accessorKey: 'action', header: 'Action' }
];

const Category = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [initEdit, setInitEdit] = useState({});

  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };

  useEffect(() => {
    dispatch(getBlogCategory());
  }, [dispatch]);

  const { blogCategory } = useSelector((state) => state.blog);

  let updateData = blogCategory.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Edit" arrow>
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              setInitEdit(item);
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
              setId(item.id);
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
      action: action_btn,
      createdAt: DateType(item.created)
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Catetory</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{ category_name: '' }}
          validationSchema={Yup.object().shape({
            category_name: Yup.string().max(30).required('Category Name is required')
          })}
          onSubmit={async (values, actions) => {
            dispatch(addBlogCategory(values));
            actions.resetForm();
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography color="#ff0000">All (*) fields are mandatory</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    errors={errors}
                    values={values}
                    name="category_name"
                    label="Category Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Button className="admin-submit-btn" type="submit" disableElevation disabled={isSubmitting}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
      <Box className="table-border">
        <Table data={updateData} columns={columns} />
      </Box>
      <DeleteModal
        openDelete={openDelete}
        handleDeleteDialog={handleDeleteDialog}
        deleteFunction={() => dispatch(delBlogCategory({ id }))}
      />
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Change Social Media Info</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initEdit}
            enableReinitialize
            validationSchema={Yup.object().shape({
              category_name: Yup.string().max(30).required('Category Name is required')
            })}
            onSubmit={async (values) => {
              dispatch(updateBlogCategory(values));
              handleEditDialog();
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
                      label="Category Name *"
                      name="category_name"
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
    </>
  );
};

export default Category;
