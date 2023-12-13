import { setAlert } from 'actions/common/alert';
import {
  SET_LOADING,
  EDIT_EMPLOYEE,
  GET_EMPLOYEE,
  GET_SUPPLIER_EMPLOYEE,
  TOGGLE_EMPLOYEE_ACTIVE,
  GET_MER_EMPLOYEE
} from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getEmployee = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/employee/tbllist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getEmployee_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addEmployee = (values) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/employee/create', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('Employee account has been created')) {
      setAlert(res.data, 'success');
    } else {
      setAlert('ACTION_addEmployee_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const changeEmployeePwd = (values) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/employee/changepwd', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('Password has been changed')) {
      setAlert(res.data, 'success');
    } else {
      setAlert('ACTION_changeEmployeePwd_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editEmployee = (values) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/employee/edit', values);
    dispatch({ type: SET_LOADING });
    if (res.data?.msg.includes('Employee info has been updated')) {
      setAlert(res.data?.msg, 'success');
      dispatch({
        type: EDIT_EMPLOYEE,
        payload: res.data?.data
      });
    } else {
      setAlert('ACTION_editEmployee_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const deleteEmployee = (values, data) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/employee/delete', values);
    dispatch({ type: SET_LOADING });
    if (res.data === 'Employee account has been deleted') {
      setAlert(res.data, 'success');
      dispatch(getEmployee(data));
    } else {
      setAlert('ACTION_deleteEmployee_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const toggleEmployeeActive = (values) => async (dispatch) => {
  try {
    DFnewLogger(values);
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/employee/toggleactive', values);
    dispatch({ type: SET_LOADING });
    if (
      res.data.includes('Employee account has been activated') ||
      res.data.includes('Employee account has been deactivated')
    ) {
      setAlert(res.data, 'success');
      dispatch({
        type: TOGGLE_EMPLOYEE_ACTIVE,
        payload: values
      });
    } else {
      setAlert('ACTION_toggleEmployeeActive_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addSupplierEmployee = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/employee/create', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('success')) {
      setAlert(res.data, 'success');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getSupplierEmployee = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/employee/tbllist', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_SUPPLIER_EMPLOYEE,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getSupplierEmployee_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editSupplierEmployee = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/employee/edit', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('success')) {
      setAlert(res.data, 'success');
      dispatch(getSupplierEmployee(data));
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const deleteSupplierEmployee = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/employee/delete', values);
    if (res.data.includes('success')) {
      dispatch(getSupplierEmployee(data));
      dispatch({ type: SET_LOADING });
      setAlert(res.data, 'success');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const changeSupplierEmployeePwd = async (values, actions) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/employee/changepwd', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('success')) {
      setAlert(res.data, 'success');
      actions.resetForm();
    } else {
      setAlert('ACTION_changeSupplierEmployeePwd_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const toggleSupplierEmployeeActive = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/employee/toggleactive', values);
    if (res.data === 'success') {
      dispatch(getSupplierEmployee(data));
      dispatch({ type: SET_LOADING });
      setAlert(res.data, 'success');
    } else {
      setAlert('ACTION_toggleSupplierEmployeeActive_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addMerEmployee = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminMerchandise/manage/employee/create', values);
    if (res.data === 'success') {
      dispatch(getSupplierEmployee(data));
      dispatch({ type: SET_LOADING });
      setAlert(res.data, 'success');
    } else {
      setAlert('ACTION_toggleSupplierEmployeeActive_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getMerEmployee = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminMerchandise/manage/employee/tbllist', values);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_MER_EMPLOYEE,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getMerEmployee_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const changeMerEmployeePwd = async (values, actions) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminMerchandise/manage/employee/changepwd', values);
    dispatch({ type: SET_LOADING });
    if (res.data.includes('success')) {
      setAlert(res.data, 'success');
      actions.resetForm();
    } else {
      setAlert('ACTION_changeEmployeePwd_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const deleteMerEmployee = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminMerchandise/manage/employee/delete', values);
    if (res.data.includes('success')) {
      dispatch(getMerEmployee());
      dispatch({ type: SET_LOADING });
      setAlert(res.data, 'success');
    } else {
      setAlert('ACTION_changeEmployeePwd_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const toggleMerEmployeeActive = (id) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminMerchandise/manage/employee/toggleactive', id);
    if (res.data.includes('success')) {
      setAlert(res.data, 'success');
      dispatch(getMerEmployee());
      dispatch({ type: SET_LOADING });
    } else {
      setAlert('ACTION_changeEmployeePwd_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const editMerEmployee = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/adminMerchandise/manage/employee/edit', values);
    if (res.data.includes('success')) {
      setAlert(res.data, 'success');
      dispatch(getMerEmployee());
      dispatch({ type: SET_LOADING });
    } else {
      setAlert('ACTION_changeEmployeePwd_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
