import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faGaugeHigh, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  FormHelperText,
  Tooltip,
  InputLabel,
  Dialog,
  DialogActions,
  DialogTitle
} from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Table from 'ui-component/Table';
import ImageUpload from 'views/client/component/profile/ImageUpload';
import InputForm from 'ui-component/input/InputForm';
import InputTextarea from 'ui-component/input/InputTextarea';
import InputSelect from 'ui-component/input/InputSelect';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, delBlog, getBlog, getBlogCategory, updateBlog } from 'actions/admin/blog';
import Quill from 'ui-component/Quill';
import { DateType } from 'constant/function';
import DeleteModal from 'ui-component/modal/DeleteModal';

const columns = [
  { accessorKey: 'auther_name', header: 'Author Name' },
  { accessorKey: 'blog_title', header: 'Title' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'created', header: 'Created Date' },
  { accessorKey: 'action', header: 'Action' }
];

const Blog = () => {
  const dispatch = useDispatch();
  const [blog_description, setBlog_description] = useState();
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

  const onBlogChange = (e) => {
    setBlog_description(e);
  };

  useEffect(() => {
    dispatch(getBlogCategory());
    dispatch(getBlog());
  }, [dispatch]);

  const { blogCategory, blog } = useSelector((state) => state.blog);
  console.log(blog);
  let updateData = blog.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Edit" arrow>
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              handleEditDialog();
              setInitEdit({ ...item, category: item.blog_category?.category_name });
              setBlog_description(item.blog_description);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <Button
            className="admin-table-btn delete"
            onClick={() => {
              handleDeleteDialog();
              setId(item.id);
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
      category: item.blog_category?.category_name,
      created: DateType(item.created)
    };
  });
  const categoryType = blogCategory.map((item) => item.category_name);
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Add Blog</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            auther_image: '',
            auther_name: '',
            auther_descriptions: '',
            category: '',
            blog_title: '',
            blog_image: ''
          }}
          validationSchema={Yup.object().shape({
            auther_name: Yup.string().min(3).max(30).required('Author Name is required'),
            blog_title: Yup.string().min(3).max(255).required('Blog Title is required'),
            auther_image: Yup.string().required('Please upload Author image'),
            blog_image: Yup.string().required('Please upload Blog image'),
            blog_title: Yup.string().required('Please input the Blog Title'),
            category: Yup.string().required('Please select the Blog Category')
          })}
          onSubmit={async (values, actions) => {
            dispatch(
              addBlog({
                ...values,
                blogCategoryId: blogCategory.filter((item) => item.categoryName === values.category)[0].id,
                blog_description
              })
            );
            actions.resetForm();
            setBlog_description('');
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography color="#ff0000">All (*) fields are mandatory</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Author Image</InputLabel>
                  <Box width="200px">
                    <ImageUpload arg="auther_image" value={values.auther_image} setFieldValue={setFieldValue} />
                    {touched.auther_image && errors.auther_image && (
                      <FormHelperText id="standard-weight-helper-text--signup" error>
                        {errors.auther_image}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Blog Image</InputLabel>
                  <Box width="200px">
                    <ImageUpload arg="blog_image" value={values.blog_image} setFieldValue={setFieldValue} />
                    {touched.blog_image && errors.blog_image && (
                      <FormHelperText id="standard-weight-helper-text--signup" error>
                        {errors.blog_image}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name="auther_name"
                    label="Author Name *"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name="blog_title"
                    label="Blog Title *"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputTextarea
                    placeholder="Author Description"
                    name="auther_descriptions"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    values={values}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputSelect
                    name="category"
                    label="Category *"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched}
                    errors={errors}
                    list={categoryType}
                    values={values}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Quill value={blog_description || ''} onChange={onBlogChange} />
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
        deleteFunction={() => dispatch(delBlog({ id }))}
      />
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Change Blog Info</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initEdit}
            enableReinitialize
            validationSchema={Yup.object().shape({
              auther_name: Yup.string().min(3).max(30).required('Author Name is required'),
              blog_title: Yup.string().min(3).max(255).required('Blog Title is required'),
              auther_image: Yup.string().required('Please upload Author image'),
              blog_image: Yup.string().required('Please upload Blog image'),
              blog_title: Yup.string().required('Please input the Blog Title'),
              category: Yup.string().required('Please select the Blog Category')
            })}
            onSubmit={async (values) => {
              dispatch(
                updateBlog({
                  ...values,
                  blogCategoryId: blogCategory.filter((item) => item.categoryName === values.category)[0].id,
                  blog_description
                })
              );
              handleEditDialog();
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
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Author Image</InputLabel>
                    <Box width="200px">
                      <ImageUpload arg="auther_image" value={values.auther_image} setFieldValue={setFieldValue} />
                      {touched.auther_image && errors.auther_image && (
                        <FormHelperText id="standard-weight-helper-text--signup" error>
                          {errors.auther_image}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Blog Image</InputLabel>
                    <Box width="200px">
                      <ImageUpload arg="blog_image" value={values.blog_image} setFieldValue={setFieldValue} />
                      {touched.blog_image && errors.blog_image && (
                        <FormHelperText id="standard-weight-helper-text--signup" error>
                          {errors.blog_image}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="auther_name"
                      label="Author Name *"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="blog_title"
                      label="Blog Title *"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputTextarea
                      placeholder="Author Description"
                      name="auther_descriptions"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      values={values}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputSelect
                      name="category"
                      label="Category *"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      errors={errors}
                      list={categoryType}
                      values={values}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Quill value={blog_description || ''} onChange={onBlogChange} />
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

export default Blog;
