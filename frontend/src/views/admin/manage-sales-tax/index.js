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

import {
  getStateSalesTax,
  addStateSalesTax,
  editStateSalesTax,
  deleteStateSalesTax
} from 'actions/admin/stateSalesTax';
import DFnewLogger from 'utils/DFnewLogger';
import DeleteModal from 'ui-component/modal/DeleteModal';
import InputForm from 'ui-component/input/InputForm';
import Table from 'ui-component/Table';

const columns = [
  { accessorKey: 'state_name', header: 'Name' },
  { accessorKey: 'zip_min', header: 'Zipcode Min' },
  { accessorKey: 'zip_max', header: 'Zipcode Max' },
  { accessorKey: 'tax_rate', header: 'Tax Rate' },
  { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
];

const ManageSalesTax = () => {
  const dispatch = useDispatch();
  const [initVal, setInitVal] = useState({
    state_name: '',
    zip_min: '',
    zip_max: '',
    tax_rate: ''
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
    dispatch(getStateSalesTax());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.stateSalesTax);
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
      action: action_btn
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
            <Typography className="home-link current">Manage Sales Tax</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Manage Sales Tax</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={initVal}
          validationSchema={Yup.object().shape({
            state_name: Yup.string().trim().max(50, 'State name is too long').required('Please enter state name'),
            zip_min: Yup.number()
              .typeError('Please enter number value')
              .min(10000, 'Zipcode must be 5 digits')
              .max(99999, 'Zipcode must be 5 digits')
              .required('Please enter zipcode min'),
            zip_max: Yup.number()
              .typeError('Please enter number value')
              .min(10000, 'Zipcode must be 5 digits')
              .max(99999, 'Zipcode must be 5 digits')
              .required('Please enter zipcode max'),
            tax_rate: Yup.number()
              .typeError('Please enter number value')
              .min(0, 'Tax rate must be greater than or equal to 0')
              .required('Please enter tax rate')
          })}
          onSubmit={async (values, actions) => {
            try {
              await dispatch(addStateSalesTax(values));
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
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    label="State Name *"
                    name="state_name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    touched={touched}
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    label="Tax Rate *"
                    name="tax_rate"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    touched={touched}
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    label="Zipcode Min *"
                    name="zip_min"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    touched={touched}
                    errors={errors}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    label="Zipcode Max *"
                    name="zip_max"
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
            Search fields are <strong>State Name</strong>, <strong>Zipcode Min</strong>, <strong>Zipcode Max</strong>,{' '}
            <strong>Tax Rate</strong>
          </Typography>
        </Grid>
      </Grid>
      <Box className="table-border no-margin">
        <Table columns={columns} data={updateData} />
      </Box>
      {/* Modal Dialogs */}
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Edit Sales Tax</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initVal}
            enableReinitialize
            validationSchema={Yup.object().shape({
              state_name: Yup.string().trim().max(50, 'State name is too long').required('Please enter state name'),
              zip_min: Yup.number()
                .typeError('Please enter number value')
                .min(10000, 'Zipcode must be 5 digits')
                .max(99999, 'Zipcode must be 5 digits')
                .required('Please enter zipcode min'),
              zip_max: Yup.number()
                .typeError('Please enter number value')
                .min(10000, 'Zipcode must be 5 digits')
                .max(99999, 'Zipcode must be 5 digits')
                .required('Please enter zipcode max'),
              tax_rate: Yup.number()
                .typeError('Please enter number value')
                .min(0, 'Tax rate must be greater than or equal to 0')
                .required('Please enter tax rate')
            })}
            onSubmit={async (values, actions) => {
              try {
                dispatch(editStateSalesTax(values));
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
                    <Typography color="#ff0000">All (*) fields are mandatory</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      touched={touched}
                      errors={errors}
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      label="State Name *"
                      name="state_name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      touched={touched}
                      errors={errors}
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      label="Tax Rate *"
                      name="tax_rate"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      touched={touched}
                      errors={errors}
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      label="Zipcode Min *"
                      name="zip_min"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      touched={touched}
                      errors={errors}
                      values={values}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      label="Zipcode Max *"
                      name="zip_max"
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
        deleteFunction={deleteStateSalesTax({ id: delId })}
      />
    </>
  );
};

export default ManageSalesTax;
