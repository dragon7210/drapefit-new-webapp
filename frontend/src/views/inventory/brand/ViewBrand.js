import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Box,
  Typography,
  Tooltip,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Breadcrumbs,
  Dialog,
  DialogActions,
  DialogTitle,
  TextareaAutosize
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faEdit, faTrashCan, faCheck, faMultiply } from '@fortawesome/free-solid-svg-icons';
import { faGg } from '@fortawesome/free-brands-svg-icons';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import { format } from 'date-fns';
import * as Yup from 'yup';
import 'yup-phone-lite';

import { getBrand, editBrand, deleteBrand, changeBrandPwd, toggleBrandActive } from 'actions/inventory/brand';
import { strengthColor, strengthIndicator } from 'utils/PwdStrength';
import { FirstUpper } from 'utils/FirstUpper';
import DFnewLogger from 'utils/DFnewLogger';
import DeleteModal from 'ui-component/modal/DeleteModal';
import Table from 'ui-component/Table';

const columns = [
  { accessorKey: 'name', header: 'Name', enableSorting: false },
  { accessorKey: 'brand_name', header: 'Brand Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Phone' },
  { accessorKey: 'lastLoginAt', header: 'Last Login', enableColumnFilter: false },
  { accessorKey: 'createdAt', header: 'Created', enableColumnFilter: false },
  { accessorKey: 'is_active', header: 'is_active', enableColumnFilter: false },
  { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
];

const ViewBrand = () => {
  const dispatch = useDispatch();
  const [showPwd, setShowPwd] = useState(false);
  const [strengthPwd, setStrengthPwd] = useState(0);
  const [levelPwd, setLevelPwd] = useState();
  const handleClickShowPwd = () => {
    setShowPwd(!showPwd);
  };
  const handleMouseDownPwd = (event) => {
    event.preventDefault();
  };
  const changePwd = (value) => {
    const data = strengthIndicator(value);
    setStrengthPwd(data);
    setLevelPwd(strengthColor(data));
  };

  const [initPwd, setInitPwd] = useState({
    id: '',
    email: '',
    password: '',
    confirmPwd: ''
  });
  const [initEdit, setInitEdit] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    brand_name: '',
    address: '',
    phone: ''
  });
  const [id, setId] = useState('');
  const [toggleMsg, setToggleMsg] = useState('');
  const [openPwd, setOpenPwd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openToggle, setOpenToggle] = useState(false);
  const handlePwdDialog = () => {
    setOpenPwd(!openPwd);
  };
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };
  const handleToggleDialog = () => {
    setOpenToggle(!openToggle);
  };

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.invBrand);
  let updateData = [];
  if (tableData.length) {
    updateData = tableData.map((item, index) => {
      const action_btn = (
        <div key={index} style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
          <Tooltip title="Set Password" arrow>
            <Button
              className="admin-table-btn password"
              onClick={() => {
                setInitPwd({
                  id: item.id,
                  email: item.email,
                  password: '',
                  confirmPwd: ''
                });
                handlePwdDialog();
              }}
            >
              <FontAwesomeIcon icon={faGg} />
            </Button>
          </Tooltip>
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
          <Tooltip title={item.is_active === 1 ? 'Deactivate' : 'Activate'} arrow>
            <Button
              className={`admin-table-btn ${item.is_active === 1 ? 'deactive' : 'disabled'}`}
              onClick={() => {
                setId(item.id);
                setToggleMsg(item.is_active === 1 ? 'de' : '');
                handleToggleDialog();
              }}
            >
              <FontAwesomeIcon icon={item.is_active === 1 ? faCheck : faMultiply} />
            </Button>
          </Tooltip>
        </div>
      );

      return {
        ...item,
        name: `${item.first_name} ${item.last_name}`,
        createdAt: format(new Date(item.createdAt), 'yyyy-MM-dd HH:mm:ss'),
        is_active: item.is_active === 0 ? 'Inactive' : 'Active',
        lastLoginAt: item.last_login_date ? format(new Date(item.last_login_date), 'yyyy-MM-dd HH:mm:ss') : '',
        action: action_btn
      };
    });
  }

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDesktop} />
              &nbsp;&nbsp;Home
            </Link>
            <Typography className="home-link disable">Brand</Typography>
            <Typography className="home-link current">View Brand</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">View Brand</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
          <Typography color="#ff0000">
            Search fields are <strong>Name</strong>, <strong>Brand Name</strong>, <strong>Email</strong>,{' '}
            <strong>Phone</strong>
          </Typography>
        </Grid>
      </Grid>
      <Box className="table-border no-margin">
        <Table columns={columns} data={updateData} />
      </Box>
      <Dialog open={openPwd} onClose={handlePwdDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Change Password</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initPwd}
            enableReinitialize
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .min(6, 'Please enter at least 6 characters')
                .max(50, 'Password is too long')
                .required('Please enter password'),
              confirmPwd: Yup.string()
                .min(6, 'Please enter at least 6 characters')
                .max(50, 'Confirm password is too long')
                .oneOf([Yup.ref('password'), null], 'Confirm password does not match new password')
                .required('Please confirm new password')
            })}
            onSubmit={async (values, actions) => {
              try {
                await dispatch(changeBrandPwd(values));
                actions.resetForm();
                setStrengthPwd(0);
                setShowPwd(false);
                handlePwdDialog();
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
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                      <InputLabel>Email (READ-ONLY)</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Email (READ-ONLY)"
                        disabled
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText id="helper-text-email" error>
                          {errors.email}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                      <InputLabel>
                        Password <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Password *"
                        autoComplete=""
                        type={showPwd ? 'text' : 'password'}
                        name="password"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                          changePwd(e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPwd}
                              onMouseDown={handleMouseDownPwd}
                              edge="end"
                              size="large"
                            >
                              {showPwd ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {touched.password && errors.password && (
                        <FormHelperText id="standard-weight-helper-text-password-signup" error>
                          {errors.password}
                        </FormHelperText>
                      )}
                    </FormControl>
                    {strengthPwd !== 0 && (
                      <FormControl fullWidth>
                        <Box sx={{ mb: 2 }}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item>
                              <Box
                                style={{ backgroundColor: levelPwd?.color }}
                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                              />
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle1" fontSize="0.75rem">
                                {levelPwd?.label}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </FormControl>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(touched.confirmPwd && errors.confirmPwd)}>
                      <InputLabel>
                        Confirm Password <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Confirm Password *"
                        autoComplete=""
                        type="password"
                        name="confirmPwd"
                        value={values.confirmPwd}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.confirmPwd && errors.confirmPwd && (
                        <FormHelperText id="helper-confirm-password" error>
                          {errors.confirmPwd}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button key="cancel" className="account-no-btn" onClick={handlePwdDialog}>
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
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Change Brand Info</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initEdit}
            validationSchema={Yup.object().shape({
              first_name: Yup.string().trim().max(50, 'First name is too long').required('Please enter first name'),
              last_name: Yup.string().trim().max(50, 'Last name is too long').required('Please enter last name'),
              brand_name: Yup.string().trim().max(255, 'Brand name is too long').required('Please enter brand name'),
              phone: Yup.string()
                .phone(['US', 'IN'], 'Please enter a valid phone number')
                .required('Please enter phone number')
            })}
            onSubmit={async (values, actions) => {
              try {
                dispatch(editBrand(values));
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
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(touched.first_name && errors.first_name)}>
                      <InputLabel>
                        First Name <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="First Name *"
                        name="first_name"
                        value={values.first_name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.first_name && errors.first_name && (
                        <FormHelperText id="helper-text-first_name" error>
                          {errors.first_name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(touched.last_name && errors.last_name)}>
                      <InputLabel>
                        Last Name <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Last Name *"
                        name="last_name"
                        value={values.last_name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.last_name && errors.last_name && (
                        <FormHelperText id="helper-text-last_name" error>
                          {errors.last_name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                      <InputLabel>Email (READ-ONLY)</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Email (READ-ONLY)"
                        disabled
                        name="email"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.email && errors.email && (
                        <FormHelperText id="helper-text-email" error>
                          {errors.email}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(touched.brand_name && errors.brand_name)}>
                      <InputLabel>
                        Brand Name <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Brand Name *"
                        name="brand_name"
                        value={values.brand_name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.brand_name && errors.brand_name && (
                        <FormHelperText id="helper-text-brand_name" error>
                          {errors.brand_name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextareaAutosize
                        placeholder="Please enter address"
                        style={{
                          minWidth: '100%',
                          maxWidth: '100%',
                          height: '100px',
                          minHeight: '80px',
                          padding: '1em',
                          borderColor: '#ccc',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                        name="address"
                        value={values.address}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(touched.phone && errors.phone)}>
                      <InputLabel>
                        Phone <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Phone *"
                        name="phone"
                        value={values.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.phone && errors.phone && (
                        <FormHelperText id="helper-text-phone" error>
                          {errors.phone}
                        </FormHelperText>
                      )}
                    </FormControl>
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
        deleteFunction={deleteBrand({ id: id })}
      />
      <Dialog open={openToggle} onClose={handleToggleDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Are you sure to {toggleMsg}activate?</Typography>
        </DialogTitle>
        <DialogActions>
          <Button className="account-no-btn" onClick={handleToggleDialog}>
            Cancel
          </Button>
          <Button
            className="account-delete-btn"
            onClick={async () => {
              try {
                await dispatch(toggleBrandActive({ id: id }));
                handleToggleDialog();
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

export default ViewBrand;
