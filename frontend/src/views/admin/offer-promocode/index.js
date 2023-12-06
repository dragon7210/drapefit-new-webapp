import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  Paper,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  Tooltip,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import Table from 'ui-component/Table';
import DFnewLogger from 'utils/DFnewLogger';
import { useDispatch, useSelector } from 'react-redux';
import {
  addOfferPromocode,
  delOfferPromocode,
  getOfferPromocode,
  updateOfferPromocode
} from 'actions/admin/offerPromocode';
import InputForm from 'ui-component/input/InputForm';
import InputTextarea from 'ui-component/input/InputTextarea';
import DeleteModal from 'ui-component/modal/DeleteModal';
import { DateType } from 'constant/function';

const columns = [
  { accessorKey: 'code', header: 'OfferCode' },
  { accessorKey: 'minimum_purchase', header: 'Minimum Purchase' },
  { accessorKey: 'price', header: 'Price' },
  { accessorKey: 'created_dt', header: 'Created Date' },
  { accessorKey: 'expiry_date', header: 'Expiry Date' },
  { accessorKey: 'comments', header: 'Comments' },
  { accessorKey: 'action', header: 'Action' }
];

const PromocodeSetting = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editInit, setEditInit] = useState({
    code: '',
    price: '',
    created_dt: new Date(),
    expiry_date: new Date(),
    comments: ''
  });

  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };

  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };

  useEffect(() => {
    dispatch(getOfferPromocode());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.offerPromocode);

  let updateData = tableData.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Edit" arrow>
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              setEditInit(item);
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
      created_dt: DateType(item.created_dt),
      expiry_date: DateType(item.expiry_date)
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Offer Promocode</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            code: '',
            price: '',
            created_dt: new Date(),
            expiry_date: new Date(),
            comments: ''
          }}
          validationSchema={Yup.object().shape({
            code: Yup.string().min(5).max(20).required('PromoCode is required'),
            price: Yup.number().min(0, 'Price is too low, try again').required('Please input Price'),
            created_dt: Yup.date().typeError('Please select Created Date').required('Please select Created Date'),
            expiry_date: Yup.date().typeError('Please select Expiry Date').required('Please select Expiry Date'),
            minimum_purchase: Yup.number()
              .min(0, 'Minimum Purchase Price is too low, try again')
              .required('Please input Minimum Purchase Price')
          })}
          onSubmit={async (values) => {
            dispatch(addOfferPromocode(values));
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
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
                    name="code"
                    label="Promocode *"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    values={values}
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched}
                    name="price"
                    label="Price *"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.created_dt && errors.created_dt)}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="created_dt"
                        label="Created Date *"
                        value={values.created_dt}
                        onChange={(value) => {
                          const date = new Date(Date.parse(value));
                          setFieldValue('created_dt', date);
                        }}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </LocalizationProvider>
                    {touched.created_dt && errors.created_dt && (
                      <FormHelperText id="helper-text-created_dt" error>
                        {errors.created_dt}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.expiry_date && errors.expiry_date)}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="expiry_date"
                        label="Expiry Date *"
                        value={values.expiry_date}
                        onChange={(value) => {
                          const date = new Date(Date.parse(value));
                          setFieldValue('expiry_date', date);
                        }}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </LocalizationProvider>
                    {touched.expiry_date && errors.expiry_date && (
                      <FormHelperText id="helper-text-expiry_date" error>
                        {errors.expiry_date}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputTextarea
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    placeholder="comments"
                    name="comments"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    values={values}
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched}
                    name="minimum_purchase"
                    label="Minimum Purchase Price *"
                  />
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
        deleteFunction={() => dispatch(delOfferPromocode({ id }))}
      />
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Change Offer Promocode Info</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={editInit}
            enableReinitialize
            validationSchema={Yup.object().shape({
              code: Yup.string().min(5).max(20).required('PromoCode is required'),
              price: Yup.number().min(0, 'Price is too low, try again').required('Please input Price'),
              created_dt: Yup.date().typeError('Please select Created Date').required('Please select Created Date'),
              expiry_date: Yup.date().typeError('Please select Expiry Date').required('Please select Expiry Date'),
              minimum_purchase: Yup.number()
                .min(0, 'Minimum Purchase Price is too low, try again')
                .required('Please input Minimum Purchase Price')
            })}
            onSubmit={async (values, actions) => {
              try {
                dispatch(updateOfferPromocode(values));
                actions.resetForm();
                handleEditDialog();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      name="code"
                      label="Promocode *"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      name="price"
                      label="Price *"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(touched.created_dt && errors.created_dt)}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          name="created_dt"
                          value={values.created_dt}
                          onChange={(value) => {
                            const date = new Date(Date.parse(value));
                            setFieldValue('created_dt', date);
                          }}
                          renderInput={(params) => <TextField {...params} size="small" />}
                        />
                      </LocalizationProvider>
                      {touched.created_dt && errors.created_dt && (
                        <FormHelperText id="helper-text-created_dt" error>
                          {errors.created_dt}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(touched.expiry_date && errors.expiry_date)}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          name="expiry_date"
                          value={values.expiry_date}
                          onChange={(value) => {
                            const date = new Date(Date.parse(value));
                            setFieldValue('expiry_date', date);
                          }}
                          renderInput={(params) => <TextField {...params} size="small" />}
                        />
                      </LocalizationProvider>
                      {touched.expiry_date && errors.expiry_date && (
                        <FormHelperText id="helper-text-expiry_date" error>
                          {errors.expiry_date}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <InputTextarea
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      placeholder="comments"
                      name="comments"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      name="minimum_purchase"
                      label="Minimum Purchase Price *"
                    />
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button key="cancel" className="account-no-btn" onClick={handleEditDialog}>
                      Cancel
                    </Button>
                    <Button key="submit" className="account-yes-btn" type="submit">
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

export default PromocodeSetting;
