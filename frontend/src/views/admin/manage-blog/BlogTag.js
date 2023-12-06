import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faGaugeHigh, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Box, Button, Grid, Paper, Typography, Tooltip, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { addBlogTag, delBlogTag, getBlog, getBlogTag, updateBlogTag } from 'actions/admin/blog';
import InputForm from 'ui-component/input/InputForm';
import InputSelect from 'ui-component/input/InputSelect';
import DeleteModal from 'ui-component/modal/DeleteModal';

const columns = [
  { accessorKey: 'tag_name', header: 'Tag Name' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'action', header: 'Action' }
];

const BlogTag = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [initEdit, setInitEdit] = useState({});

  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };

  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };

  useEffect(() => {
    dispatch(getBlog());
    dispatch(getBlogTag());
  }, [dispatch]);

  const { blog, blogTag } = useSelector((state) => state.blog);
  const selectBlogType = blog.map((item) => item?.blog_title);
  let updateData = blogTag.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Edit" arrow>
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              setInitEdit({ ...item, blog_title: item.blog?.blog_title });
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
    return { ...item, action: action_btn, category: item.blog?.blog_title };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Add Blog Tag</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            tag_name: '',
            blog_title: ''
          }}
          validationSchema={Yup.object().shape({
            tag_name: Yup.string().min(3).max(30).required('Author Name is required'),
            blog_title: Yup.string().min(3).max(255).required('Blog Title is required')
          })}
          onSubmit={async (values, actions) => {
            dispatch(
              addBlogTag({ ...values, blog_id: blog.filter((item) => item.blog_title === values.blog_title)[0].id })
            );
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
                    values={values}
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched}
                    name="tag_name"
                    label="Tag Name *"
                  />
                  <Typography>
                    <span style={{ color: '#ff0000' }}>Note: </span>For multiple name please use comma(,)
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputSelect
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                    errors={errors}
                    touched={touched}
                    name="blog_title"
                    label="Select Blog"
                    list={selectBlogType}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button className="admin-submit-btn" type="submit" disableElevation disabled={isSubmitting}>
                    Submit
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
        deleteFunction={() => dispatch(delBlogTag({ id }))}
      />
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Change Blog Tag Info</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initEdit}
            enableReinitialize
            validationSchema={Yup.object().shape({
              tag_name: Yup.string().min(3).max(30).required('Author Name is required'),
              blog_title: Yup.string().min(3).max(255).required('Blog Title is required')
            })}
            onSubmit={async (values) => {
              dispatch(
                updateBlogTag({
                  ...values,
                  blog_id: blog.filter((item) => item.blog_title === values.blog_title)[0].id
                })
              );
              handleEditDialog();
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="tag_name"
                      label="Tag Name *"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputSelect
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      values={values}
                      errors={errors}
                      touched={touched}
                      name="blog_title"
                      label="Select Blog"
                      list={selectBlogType}
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

export default BlogTag;
