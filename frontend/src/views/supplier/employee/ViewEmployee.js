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
  OutlinedInput,
  Dialog,
  DialogActions,
  DialogTitle,
  Breadcrumbs,
  InputAdornment,
  IconButton
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faTrashCan, faCheck, faMultiply } from '@fortawesome/free-solid-svg-icons';
import { faGg } from '@fortawesome/free-brands-svg-icons';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { strengthColor, strengthIndicator } from 'utils/PwdStrength';
import { Form, Formik } from 'formik';
import { format } from 'date-fns';
import { FirstUpper } from 'utils/FirstUpper';
import DeleteModal from 'ui-component/modal/DeleteModal';
import * as Yup from 'yup';
import 'yup-phone-lite';

import {
  getSupplierEmployee,
  editSupplierEmployee,
  deleteSupplierEmployee,
  changeSupplierEmployeePwd,
  toggleSupplierEmployeeActive
} from 'actions/common/employee';
import DFnewLogger from 'utils/DFnewLogger';
import { supplierEmployeeTypes } from 'constant/other';
import InputForm from 'ui-component/input/InputForm';
import InputSelect from 'ui-component/input/InputSelect';
import InputTextarea from 'ui-component/input/InputTextarea';
import Table from 'ui-component/Table';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Phone number' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'address', header: 'Address' },
  { accessorKey: 'createdAt', header: 'Created' },
  { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
];

const ViewEmployee = () => {
  const dispatch = useDispatch();
  const [initEdit, setInitEdit] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    type: '',
    about: '',
    address: ''
  });

  const [initPwd, setInitPwd] = useState({
    id: '',
    email: '',
    password: '',
    confirmPwd: ''
  });

  const [id, setId] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPwd, setOpenPwd] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [strengthPassword, setStrengthPassword] = useState(0);
  const [levelPassword, setLevelPassword] = useState();
  const [openToggle, setOpenToggle] = useState(false);
  const [toggleMsg, setToggleMsg] = useState('');

  const handleToggleDialog = () => {
    setOpenToggle(!openToggle);
  };
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handlePwdDialog = () => {
    setOpenPwd(!openPwd);
  };
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrengthPassword(temp);
    setLevelPassword(strengthColor(temp));
  };
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [strengthConfirmPwd, setStrengthConfirmPwd] = useState(0);
  const [levelConfirmPwd, setLevelConfirmPwd] = useState();
  const handleClickShowConfirmPwd = () => {
    setShowConfirmPwd(!showConfirmPwd);
  };
  const handleMouseDownConfirmPwd = (event) => {
    event.preventDefault();
  };
  const changeConfirmPwd = (value) => {
    const temp = strengthIndicator(value);
    setStrengthConfirmPwd(temp);
    setLevelConfirmPwd(strengthColor(temp));
  };

  useEffect(() => {
    dispatch(getSupplierEmployee({}));
  }, [dispatch]);

  const { tableData } = useSelector((state) => {
    return state.employee;
  });
  let updateData = [];
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
              setInitEdit({ ...item, type: item.type === '1' ? 'Warehouse Associate' : 'Wearhouse Manager' });
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
        {item.is_active === 0 ? (
          <Tooltip title="Deactivate" arrow>
            <Button
              className="admin-table-btn deactive"
              onClick={() => {
                setId(item.id);
                setToggleMsg('de');
                handleToggleDialog();
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip title="Activate" arrow>
            <Button
              className="admin-table-btn disabled"
              onClick={() => {
                setId(item.id);
                setToggleMsg('');
                handleToggleDialog();
              }}
            >
              <FontAwesomeIcon icon={faMultiply} />
            </Button>
          </Tooltip>
        )}
      </div>
    );

    return {
      ...item,
      type: item.type === '1' ? 'Warehouse Associate' : 'Wearhouse Manager',
      createdAt: format(new Date(item.created), 'yyyy-MM-dd HH:mm:ss'),
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
            <Typography className="home-link disable">Employee</Typography>
            <Typography className="home-link current">View Employee</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">View Employee</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table columns={columns} data={updateData} />
      </Box>

      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Change Employee Info</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initEdit}
            enableReinitialize
            validationSchema={Yup.object().shape({
              name: Yup.string().max(30).required('Name is required'),
              phone: Yup.string().required('Phone Number is required'),
              type: Yup.number().min(0).max(4).required('Please select type')
            })}
            onSubmit={async (values, actions) => {
              DFnewLogger(values);
              dispatch(editSupplierEmployee(values));
              handleEditDialog();
              actions.resetForm();
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <InputSelect
                      list={supplierEmployeeTypes}
                      touched={touched}
                      errors={errors}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Select employee type *"
                      name="type"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputTextarea
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="about"
                      placeholder="About"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputTextarea
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="address"
                      placeholder="Address"
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
                      disabled={isSubmitting}
                    >
                      Submit
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
        deleteFunction={deleteSupplierEmployee({ id: id })}
      />

      <Dialog open={openPwd} onClose={handlePwdDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Change Password</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initPwd}
            enableReinitialize
            validationSchema={Yup.object().shape({
              password: Yup.string().min(6).max(255).required('Password is required'),
              confirmPwd: Yup.string()
                .min(6)
                .max(255)
                .oneOf([Yup.ref('password'), null], 'Confirm password must be the same as Password')
                .required('Confirm Password is required')
            })}
            onSubmit={async (values, actions) => {
              DFnewLogger(values);
              changeSupplierEmployeePwd(values, actions);
              handlePwdDialog();
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      touched={touched}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Email"
                      name="email"
                    />
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
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                          changePassword(e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
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
                    {strengthPassword !== 0 && (
                      <FormControl fullWidth>
                        <Box sx={{ mb: 2 }}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item>
                              <Box
                                style={{ backgroundColor: levelPassword?.color }}
                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                              />
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle1" fontSize="0.75rem">
                                {levelPassword?.label}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </FormControl>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(touched.confirmPwd && errors.confirmPwd)}>
                      <InputLabel htmlFor="confirm-password">
                        Confirm Password <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Confirm Password *"
                        id="confirm-password"
                        autoComplete=""
                        type={showConfirmPwd ? 'text' : 'password'}
                        value={values.confirmPwd}
                        name="confirmPwd"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          handleChange(e);
                          changeConfirmPwd(e.target.value);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPwd}
                              onMouseDown={handleMouseDownConfirmPwd}
                              edge="end"
                              size="large"
                            >
                              {showConfirmPwd ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {touched.confirmPwd && errors.confirmPwd && (
                        <FormHelperText id="helper-confirm-password" error>
                          {errors.confirmPwd}
                        </FormHelperText>
                      )}
                    </FormControl>
                    {strengthConfirmPwd !== 0 && (
                      <FormControl fullWidth>
                        <Box sx={{ mb: 2 }}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item>
                              <Box
                                style={{ backgroundColor: levelConfirmPwd?.color }}
                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                              />
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle1" fontSize="0.75rem">
                                {levelConfirmPwd?.label}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </FormControl>
                    )}
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
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogActions>
      </Dialog>
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
            onClick={() => {
              handleToggleDialog();
              dispatch(toggleSupplierEmployeeActive({ id: id }));
            }}
          >
            {FirstUpper(toggleMsg)}activate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewEmployee;
