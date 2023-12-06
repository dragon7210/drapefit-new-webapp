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
  Dialog,
  DialogActions,
  DialogTitle,
  Breadcrumbs
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faTrashCan, faCheck, faMultiply } from '@fortawesome/free-solid-svg-icons';
import { faGg } from '@fortawesome/free-brands-svg-icons';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import { format } from 'date-fns';
import * as Yup from 'yup';
import 'yup-phone-lite';

import {
  getEmployee,
  editEmployee,
  changeEmployeePwd,
  toggleEmployeeActive,
  deleteEmployee
} from 'actions/common/employee';
import { strengthColor, strengthIndicator } from 'utils/PwdStrength';
import { FirstUpper } from 'utils/FirstUpper';
import { userEmployeeTypes } from 'constant/other';
import { DateType } from 'constant/function';
import DFnewLogger from 'utils/DFnewLogger';
import DeleteModal from 'ui-component/modal/DeleteModal';
import InputForm from 'ui-component/input/InputForm';
import InputTextarea from 'ui-component/input/InputTextarea';
import Table from 'ui-component/Table';
import InputSelectValue from 'ui-component/input/InputSelectValue';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Phone Number' },
  { accessorKey: 'typeStr', header: 'Type' },
  { accessorKey: 'lastLoginAt', header: 'Last Login' },
  { accessorKey: 'createdAt', header: 'Created At' },
  { accessorKey: 'action', header: 'Action', enableSorting: false }
];

const ViewEmployee = () => {
  const dispatch = useDispatch();
  const [showPwd, setShowPwd] = useState(false);
  const [strengthPwd, setStrengthPwd] = useState(0);
  const [levelPwd, setLevelPwd] = useState();
  const handleClickShowPwd = () => {
    setShowPwd(!showPwd);
  };
  const handleMouseDownPwd = (evt) => {
    evt.preventDefault();
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
    name: '',
    email: '',
    phone: '',
    type: 0,
    about: '',
    address: ''
  });
  const [id, setId] = useState('');
  const [toggleMsg, setToggleMsg] = useState('');
  const [openPwd, setOpenPwd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openToggleActive, setOpenToggleActive] = useState(false);
  const handlePwdDialog = () => {
    setOpenPwd(!openPwd);
  };
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };
  const handleToggleActiveDialog = () => {
    setOpenToggleActive(!openToggleActive);
  };

  useEffect(() => {
    dispatch(getEmployee());
  }, [dispatch]);
  const { tableData } = useSelector((state) => state.employee);
  let updateData = [];
  updateData = tableData.map((item, index) => {
    let type;
    if (item.type === 3) {
      type = 0;
    } else if (item.type === 7) {
      type = 1;
    } else if (item.type === 8) {
      type = 2;
    } else {
      type = 3;
    }
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
              setInitEdit({ ...item, type });
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
              handleToggleActiveDialog();
            }}
          >
            <FontAwesomeIcon icon={item.is_active === 1 ? faCheck : faMultiply} />
          </Button>
        </Tooltip>
      </div>
    );

    return {
      ...item,
      createdAt: format(new Date(item?.created_dt), 'yyyy-MM-dd HH:mm:ss'),
      action: action_btn,
      typeStr: userEmployeeTypes[type],
      lastLoginAt: DateType(item?.last_login_date)
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
        <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
          <Typography color="#ff0000">
            Search fields are <strong>Name</strong>, <strong>Email</strong>, <strong>Phone Number</strong>,{' '}
            <strong>Type</strong>
          </Typography>
        </Grid>
      </Grid>
      <Box className="table-border container no-margin">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Table columns={columns} data={updateData} />
          </Grid>
        </Grid>
      </Box>
      {/* Modal Dialogs */}
      <Dialog open={openPwd} onClose={handlePwdDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Change Password</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initPwd}
            enableReinitialize
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .trim()
                .email('Please enter a valid email address')
                .max(255, 'Email is too long')
                .required('Please enter email address'),
              password: Yup.string()
                .min(6, 'Please enter at least 6 characters')
                .max(50, 'Password is too long')
                .required('Please enter password'),
              confirmPwd: Yup.string()
                .min(6, 'Please enter at least 6 characters')
                .max(50, 'Password is too long')
                .oneOf([Yup.ref('password'), null], 'Confirm password does not match password')
                .required('Please confirm password')
            })}
            onSubmit={async (values, actions) => {
              try {
                await dispatch(changeEmployeePwd(values));
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
                      <InputLabel htmlFor="confirm-password">
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
          <Typography className="dialog-title">Change Employee Info</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initEdit}
            enableReinitialize
            validationSchema={Yup.object().shape({
              name: Yup.string().trim().max(50, 'Name is too long').required('Please enter name'),
              email: Yup.string()
                .trim()
                .email('Please enter a valid email address')
                .max(255, 'Email is too long')
                .required('Please enter email address'),
              phone: Yup.string()
                .phone(['US', 'IN'], 'Please enter a valid phone number')
                .required('Please enter phone number'),
              type: Yup.number()
                .min(0)
                .max(4)
                .notOneOf([0], 'This field is mandatory')
                .required('Please select user type')
            })}
            onSubmit={async (values, actions) => {
              try {
                await dispatch(editEmployee(values));
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
                    <InputSelectValue
                      errors={errors}
                      values={values}
                      touched={touched}
                      list={userEmployeeTypes}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Account Type *"
                      name="type"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputTextarea
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="about"
                      placeholder="Please describe about the employee"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputTextarea
                        values={values}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        name="address"
                        placeholder="Please enter address"
                      />
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
        deleteFunction={deleteEmployee({ id: id })}
      />

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
                await dispatch(toggleEmployeeActive({ id }));
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

export default ViewEmployee;
