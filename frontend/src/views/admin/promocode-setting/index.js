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
  DialogTitle,
  Checkbox
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faEnvelope, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import Table from 'ui-component/Table';
import DFnewLogger from 'utils/DFnewLogger';
import InputForm from 'ui-component/input/InputForm';
import InputTextarea from 'ui-component/input/InputTextarea';
import { useDispatch, useSelector } from 'react-redux';
import { addPromocode, getPromocode, updatePromocode, delPromocode } from 'actions/admin/promocode';
import { DateType } from 'constant/function';
import DeleteModal from 'ui-component/modal/DeleteModal';
import { getEmails } from 'actions/common/auth';

const columns = [
  { accessorKey: 'promocode', header: 'PromoCode' },
  { accessorKey: 'price', header: 'Price' },
  { accessorKey: 'createdAt', header: 'Created Date' },
  { accessorKey: 'expiry_date', header: 'Expiry Date' },
  { accessorKey: 'comments', header: 'Comment' },
  { accessorKey: 'action', header: 'Action' }
];

const PromocodeSetting = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [editInit, setEditInit] = useState({
    promocode: '',
    price: '',
    comments: '',
    created_dt: new Date(),
    expiry_date: new Date()
  });

  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  const handleEmailDialog = () => {
    setOpenEmail(!openEmail);
  };

  useEffect(() => {
    dispatch(getPromocode());
    dispatch(getEmails());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.promocode);
  const { emails } = useSelector((state) => state.auth);
  const [checkMail, setCheckMail] = useState([]);

  useEffect(() => {
    let init = [...emails].fill(false);
    setCheckMail(init);
  }, [emails]);

  const SelMail = (i) => {
    let temp = [...checkMail];
    temp[i] = !checkMail[i];
    setCheckMail(temp);
  };

  const Submit = () => {
    let mailList = [];
    checkMail.map((item, index) => {
      if (item) {
        mailList.push(emails[index].email);
      }
    });
    handleEmailDialog();
  };

  let updateData = tableData.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Email" arrow>
          <Button
            className="admin-table-btn password"
            onClick={() => {
              handleEmailDialog();
              setEditInit(item);
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </Button>
        </Tooltip>
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
      createdAt: DateType(item.created_dt),
      expiry_date: DateType(item.expiry_date)
    };
  });
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Promocode Listing</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            promocode: '',
            price: '',
            createdAt: new Date(),
            expiry_date: new Date(),
            comments: ''
          }}
          validationSchema={Yup.object().shape({
            promocode: Yup.string().min(5).max(20).required('PromoCode is required'),
            price: Yup.number().min(0, 'Price is too low, try again').required('Please input Price'),
            createdAt: Yup.date().typeError('Please select Created Date').required('Please select Created Date'),
            expiry_date: Yup.date().typeError('Please select Expiry Date').required('Please select Expiry Date')
          })}
          onSubmit={async (values) => {
            dispatch(addPromocode(values));
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
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    name="promocode"
                    label="Promocode *"
                    values={values}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                    name="price"
                    label="Price *"
                    values={values}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.createdAt && errors.createdAt)}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="createdAt"
                        label="Created Date"
                        value={values.createdAt}
                        onChange={(value) => {
                          const date = new Date(Date.parse(value));
                          setFieldValue('createdAt', date);
                        }}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </LocalizationProvider>
                    {touched.createdAt && errors.createdAt && (
                      <FormHelperText id="helper-text-createdAt" error>
                        {errors.createdAt}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.expiry_date && errors.expiry_date)}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="expiry_date"
                        label="Expiry Date"
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
                    name="comments"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    placeholder="comments"
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
        deleteFunction={() => dispatch(delPromocode({ id }))}
      />
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Edit Promocode Setting</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={editInit}
            enableReinitialize
            validationSchema={Yup.object().shape({
              promocode: Yup.string().min(5).max(20).required('PromoCode is required'),
              price: Yup.number().min(0, 'Price is too low, try again').required('Please input Price'),
              created_dt: Yup.date().typeError('Please select Created Date').required('Please select Created Date'),
              expiry_date: Yup.date().typeError('Please select Expiry Date').required('Please select Expiry Date')
            })}
            onSubmit={async (values, actions) => {
              try {
                dispatch(updatePromocode(values));
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
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      name="promocode"
                      label="Promocode *"
                      values={values}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched}
                      errors={errors}
                      name="price"
                      label="Price *"
                      values={values}
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
                      name="comments"
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      placeholder="comments"
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
      <Dialog open={openEmail} onClose={handleEmailDialog}>
        <div className="email-title">
          <h2>Promocode : {editInit.promocode}</h2>
          <h2>Price : {editInit.price}</h2>
          <h2>Users List</h2>
        </div>
        <div className="email-list">
          {emails.map((item, index) => {
            return (
              <div key={index} className="all">
                <div className="email-checkbox" onClick={() => SelMail(index)}>
                  <Checkbox checked={checkMail[index] ? true : false} />
                  <p>{item.email}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="email-submit">
          <Button key="submit" className="account-yes-btn" onClick={Submit}>
            Submit
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default PromocodeSetting;
