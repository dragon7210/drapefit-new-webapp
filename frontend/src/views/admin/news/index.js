import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  InputLabel,
  FormHelperText
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { addNews, delNews, getNews, updateNews } from 'actions/admin/news';
import { DateType } from 'constant/function';
import DeleteModal from 'ui-component/modal/DeleteModal';
import InputForm from 'ui-component/input/InputForm';
import ImageUpload from 'views/client/component/profile/ImageUpload';
import ShowImg from 'ui-component/ShowImg';

const columns = [
  { accessorKey: 'news_name', header: 'News Name' },
  { accessorKey: 'post_by', header: 'Post By' },
  { accessorKey: 'news_image', header: 'News Image' },
  { accessorKey: 'createdAt', header: 'Created Date' },
  { accessorKey: 'action', header: 'Action' }
];

const News = () => {
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
    dispatch(getNews());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.news);
  let updateData = tableData.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Edit" arrow>
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              handleEditDialog();
              setInitEdit({ ...item, news_image: `https://www.drapefittest.com/files/news/${item.news_image}` });
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
      createdAt: DateType(item.created),
      news_image: <ShowImg url={`https://www.drapefittest.com/files/news/${item.news_image}`} />
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">News</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            news_name: '',
            news_link: '',
            post_by: '',
            news_image: ''
          }}
          validationSchema={Yup.object().shape({
            news_name: Yup.string().min(10).required('PromoCode is required'),
            post_by: Yup.string().min(5).required('Post By is required'),
            news_link: Yup.string().min(5).required('News Link is required')
          })}
          onSubmit={async (values, actions) => {
            dispatch(addNews(values));
            actions.resetForm();
          }}
        >
          {({ errors, setFieldValue, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography color="#ff0000">All (*) fields are mandatory</Typography>
                </Grid>
                <Grid container spacing={2} item xs={12} sm={7}>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      touched={touched}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="news_name"
                      label="News Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      touched={touched}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="news_link"
                      label="News Link"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      touched={touched}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="post_by"
                      label="Post By"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <InputLabel>Blog Image</InputLabel>
                  <Box width="200px">
                    <ImageUpload arg="news_image" value={values.news_image} setFieldValue={setFieldValue} />
                    {touched.news_image && errors.news_image && (
                      <FormHelperText id="standard-weight-helper-text--signup" error>
                        {errors.news_image}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12}>
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
        deleteFunction={() => dispatch(delNews({ id }))}
      />
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Change Career Info</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initEdit}
            enableReinitialize
            validationSchema={Yup.object().shape({
              news_name: Yup.string().min(10).required('PromoCode is required'),
              post_by: Yup.string().min(5).required('Post By is required'),
              news_link: Yup.string().min(5).required('News Link is required')
            })}
            onSubmit={async (values) => {
              console.log(values);
              dispatch(updateNews(values));
              handleEditDialog();
            }}
          >
            {({
              errors,
              setFieldValue,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              isValid,
              dirty
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      touched={touched}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="news_name"
                      label="News Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      touched={touched}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="news_link"
                      label="News Link"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      touched={touched}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="post_by"
                      label="Post By"
                    />
                  </Grid>
                  <Grid item xs={12} className="v-align-center">
                    <Box width="200px">
                      <ImageUpload arg="news_image" value={values.news_image} setFieldValue={setFieldValue} />
                      {touched.news_image && errors.news_image && (
                        <FormHelperText id="standard-weight-helper-text--signup" error>
                          {errors.news_image}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>

                  <Grid item xs={12} className="h-align-right">
                    <Button key="cancel" className="account-no-btn" onClick={handleEditDialog}>
                      Cancel
                    </Button>
                    <Button
                      key="submit"
                      className="account-yes-btn"
                      type="submit"
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

export default News;
