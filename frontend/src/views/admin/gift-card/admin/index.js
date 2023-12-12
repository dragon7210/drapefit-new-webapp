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
  TextField,
  Tooltip,
  Dialog,
  DialogActions,
  DialogTitle,
  Checkbox
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEdit, faTrashCan, faMultiply, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { DateType } from 'constant/function';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { addGiftcard, getGiftcard, delGiftcard, updateGiftcard, activeGiftcard } from 'actions/admin/giftcard';
import DeleteModal from 'ui-component/modal/DeleteModal';
import { getEmails } from 'actions/common/auth';
import InputForm from 'ui-component/input/InputForm';
import InputTextarea from 'ui-component/input/InputTextarea';
import DFnewLogger from 'utils/DFnewLogger';
import { FirstUpper } from 'utils/FirstUpper';

const columns = [
  { accessorKey: 'giftcode', header: 'Gift Code' },
  { accessorKey: 'price', header: 'Price' },
  { accessorKey: 'createdDate', header: 'Created Date' },
  { accessorKey: 'expiry_date', header: 'Expiry Date' },
  { accessorKey: 'msg', header: 'comments' },
  { accessorKey: 'action', header: 'Action' }
];

const GiftCardAdmin = () => {
  const today = new Date();
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openToggleActive, setOpenToggleActive] = useState(false);
  const [editInit, setEditInit] = useState({
    giftcode: '',
    price: '',
    comments: '',
    createdDate: new Date(),
    expiry_date: new Date()
  });
  const [toggleMsg, setToggleMsg] = useState('');

  const handleToggleActiveDialog = () => {
    setOpenToggleActive(!openToggleActive);
  };

  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };

  const handleEmailDialog = () => {
    setOpenEmail(!openEmail);
  };
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };

  useEffect(() => {
    dispatch(getGiftcard());
    dispatch(getEmails());
  }, [dispatch]);

  const { giftcard } = useSelector((state) => state.giftcard);
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
  let updataData = giftcard.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title={item.is_active === 1 ? 'Deactivate' : 'Activate'} arrow>
          <Button
            className={`admin-table-btn ${item.is_active === 1 ? 'deactive' : 'disabled'}`}
            onClick={() => {
              setId(item.id);
              setToggleMsg(item.is_active === 1 ? 'de' : '');
              handleToggleActiveDialog();
            }}
          >
            <FontAwesomeIcon icon={item.is_active === 1 ? faCheck : faMultiply} />
          </Button>
        </Tooltip>
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
      createdDate: DateType(item.created_dt),
      expiry_date: DateType(item.expiry_date),
      action: action_btn
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Gift Card Setting</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            giftcode: '',
            price: '',
            createdDate: today,
            expiry_date: today,
            comments: ''
          }}
          validationSchema={Yup.object().shape({
            giftcode: Yup.string().min(3).max(20).required('PromoCode is required'),
            price: Yup.number()
              .min(0, 'Price is too low, try again')
              .max(100, 'Price is too high, try again')
              .required('Please input Price'),
            createdDate: Yup.date().typeError('Please select Created Date').required('Please select Created Date'),
            expiry_date: Yup.date().typeError('Please select Expiry Date').required('Please select Expiry Date')
          })}
          onSubmit={async (values, actions) => {
            dispatch(addGiftcard(values));
            actions.resetForm();
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
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name="giftcode"
                    label="Giftcode *"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name="price"
                    label="Price *"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.createdDate && errors.createdDate)}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Created Date *"
                        name="createdDate"
                        value={values.createdDate}
                        onChange={(value) => {
                          const date = new Date(Date.parse(value));
                          setFieldValue('createdDate', date);
                        }}
                        renderInput={(params) => <TextField {...params} size="small" />}
                      />
                    </LocalizationProvider>
                    {touched.createdDate && errors.createdDate && (
                      <FormHelperText id="helper-text-createdDate" error>
                        {errors.createdDate}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={Boolean(touched.expiry_date && errors.expiry_date)}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Expiry Date *"
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
                <Grid item xs={12} sm={6}>
                  <InputTextarea
                    values={values}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name="comments"
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
        <Table data={updataData} columns={columns} />
      </Box>
      <DeleteModal
        openDelete={openDelete}
        handleDeleteDialog={handleDeleteDialog}
        deleteFunction={() => dispatch(delGiftcard({ id, type: 'admin' }))}
      />
      <Dialog open={openEmail} onClose={handleEmailDialog}>
        <div className="email-title">
          <h2>Promocode : {editInit.giftcode}</h2>
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
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Edit Promocode Setting</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={editInit}
            enableReinitialize
            validationSchema={Yup.object().shape({
              giftcode: Yup.string().min(3).max(20).required('PromoCode is required'),
              price: Yup.number()
                .min(0, 'Price is too low, try again')
                .max(100, 'Price is too high, try again')
                .required('Please input Price'),
              createdDate: Yup.date().typeError('Please select Created Date').required('Please select Created Date'),
              expiry_date: Yup.date().typeError('Please select Expiry Date').required('Please select Expiry Date')
            })}
            onSubmit={async (values, actions) => {
              try {
                await dispatch(updateGiftcard(values));
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
                      name="giftcode"
                      label="Giftcode *"
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
                    <FormControl fullWidth error={Boolean(touched.createdDate && errors.createdDate)}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          name="createdDate"
                          value={values.createdDate}
                          onChange={(value) => {
                            const date = new Date(Date.parse(value));
                            setFieldValue('createdDate', date);
                          }}
                          renderInput={(params) => <TextField {...params} size="small" />}
                        />
                      </LocalizationProvider>
                      {touched.createdDate && errors.createdDate && (
                        <FormHelperText id="helper-text-createdDate" error>
                          {errors.createdDate}
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
      <Dialog open={openToggleActive} onClose={handleToggleActiveDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Are you sure to {toggleMsg}activate?</Typography>
        </DialogTitle>
        <DialogActions>
          <Button className="account-no-btn" onClick={handleToggleActiveDialog}>
            Cancel
          </Button>
          <Button
            className="account-delete-btn"
            onClick={async () => {
              try {
                dispatch(activeGiftcard({ id: id, type: 'admin' }));
                handleToggleActiveDialog();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            {FirstUpper(toggleMsg)}activate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GiftCardAdmin;
