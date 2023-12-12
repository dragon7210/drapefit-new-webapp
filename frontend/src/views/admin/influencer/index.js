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
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  Breadcrumbs
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone-lite';

import { getInfluencer, addInfluencer, deleteInfluencer, editInfluencer } from 'actions/admin/influencer';
import DFnewLogger from 'utils/DFnewLogger';
import DeleteModal from 'ui-component/modal/DeleteModal';
import InputForm from 'ui-component/input/InputForm';
import InputTextarea from 'ui-component/input/InputTextarea';
import Table from 'ui-component/Table';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Phone number' },
  { accessorKey: 'link', header: 'Link' },
  { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
];

const Influencer = () => {
  const dispatch = useDispatch();
  const [initVal, setInitVal] = useState({
    name: '',
    email: '',
    phone: '',
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
    dispatch(getInfluencer());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.influencer);
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
      action: action_btn,
      link: 'https://www.drapefittest.com/influencer/' + item?.uniq_id
    };
  });

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfadmin/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link current">Influencer</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Manage Influencer</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={initVal}
          validationSchema={Yup.object().shape({
            name: Yup.string().trim().max(35, 'Name is too long').required('Please enter name'),
            email: Yup.string()
              .trim()
              .email('Please enter a valid email address')
              .max(255, 'Email is too long')
              .required('Please enter email address'),
            phone: Yup.string()
              .phone(['US', 'IN'], 'Please enter a valid phone number')
              .required('Please enter phone number')
          })}
          onSubmit={async (values, actions) => {
            try {
              await dispatch(addInfluencer(values));
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
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Name *"
                    name="name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Email *"
                    name="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label="Phone *"
                    name="phone"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputTextarea
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    placeholder="Please enter note"
                    name="note"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className="admin-submit-btn"
                    type="submit"
                    disableElevation
                    disabled={!isValid || !dirty || isSubmitting}
                  >
                    Create Influencer
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
            Search fields are <strong>Name</strong>, <strong>Email</strong>, <strong>Phone number</strong>,{' '}
            <strong>Link</strong>
          </Typography>
        </Grid>
      </Grid>
      <Box className="table-border no-margin">
        <Table columns={columns} data={updateData} />
      </Box>
      {/* Modal Dialogs */}
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Edit Influencer Info</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initVal}
            enableReinitialize
            validationSchema={Yup.object().shape({
              name: Yup.string().trim().max(35, 'Name is too long').required('Please enter name'),
              email: Yup.string()
                .trim()
                .email('Please enter a valid email address')
                .max(255, 'Email is too long')
                .required('Please enter email address'),
              phone: Yup.string()
                .phone(['US', 'IN'], 'Please enter a valid phone number')
                .required('Please enter phone number')
            })}
            onSubmit={async (values) => {
              try {
                dispatch(editInfluencer(values));
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
                    <Typography color="#ff0000">All (*) fields are mandatory</Typography>
                  </Grid>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Email (READ-ONLY)"
                      name="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Phone *"
                      name="phone"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputTextarea
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      values={values}
                      name="note"
                      placeholder="Please enter note"
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
        deleteFunction={deleteInfluencer({ id: delId })}
      />
    </>
  );
};

export default Influencer;
