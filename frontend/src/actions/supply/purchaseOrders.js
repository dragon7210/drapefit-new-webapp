import { setAlert } from 'actions/common/alert';
import { GET_PURCHASE_ORDERS, SET_LOADING } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getPurchaseOrders = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admsupplier/manage/purchaseOrder/tblist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_PURCHASE_ORDERS,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getPurchaseOrders_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const handleAdd = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    values.deadline = data.deadline;
    const res = await Api.post('/admsupplier/manage/purchaseOrder/add', values);
    if (res.data) {
      dispatch(getPurchaseOrders(data));
      dispatch({ type: SET_LOADING });
      setAlert('A new purchase order has been added', 'success');
    } else {
      dispatch({ type: SET_LOADING });
      setAlert('ACTION_addSplPurchaseOrders_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const handleDelete = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/purchaseOrder/delete', values);
    if (res.data) {
      setAlert('A new purchase order has been deleted', 'success');
      if (values.type === 'assigned') {
        dispatch(getPurchaseOrdersAssigned({ userEmail: values.userEmail }));
      } else {
        dispatch(getPurchaseOrders({ userEmail: values.userEmail }));
      }
      dispatch({ type: SET_LOADING });
    } else {
      setAlert('ACTION_handleAssign_ERROR', 'error');
    }
  } catch (error) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const handleEdit = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/purchaseOrder/edit', values);
    if (res.data) {
      setAlert('A new purchase order has been edited', 'success');
      dispatch({ type: SET_LOADING });
      if (data.type === 'assigned') {
        dispatch(getPurchaseOrdersAssigned());
      } else {
        dispatch(getPurchaseOrders());
      }
    } else {
      setAlert('ACTION_handleEdit_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const handleAddRequiredQuantity = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/purchaseOrder/addRequiredQuantity', data);
    if (res.data) {
      dispatch(getPurchaseOrders({ userEmail: data.userEmail }));
      dispatch({ type: SET_LOADING });
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_handleAddRequiredQuantity_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getPurchaseOrdersAssigned = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/purchaseOrder/assigned', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_PURCHASE_ORDERS,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getPurchaseOrdersAssigned_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getPurchaseOrdersApproved = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/purchaseOrder/approved', data);
    if (res.data) {
      dispatch({
        type: GET_PURCHASE_ORDERS,
        payload: res.data
      });
      dispatch({ type: SET_LOADING });
    } else {
      setAlert('ACTION_getPurchaseOrdersApproved_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const sendMail = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/purchaseOrder/mail', values);
    if (res.data) {
      dispatch(getPurchaseOrders());
      dispatch({ type: SET_LOADING });
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_SendMail_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const handleClose = (values) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/purchaseOrder/assigned/close', values);
    if (res.data) {
      dispatch(getAllPurchaseOrder({ userEmail: values.userEmail }));
      dispatch({ type: SET_LOADING });
      setAlert('A new purchase order has been closed', 'success');
    } else {
      setAlert('ACTION_handleApprove_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const handleApprove = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/purchaseOrder/assigned/approve', data);
    if (res.data) {
      dispatch(getPurchaseOrdersAssigned(data));
      dispatch({ type: SET_LOADING });
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_handleApprove_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const handleAssign = (values, data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/PurchaseOrder/assign', values);
    if (res.data) {
      dispatch(getPurchaseOrders(data));
      dispatch({ type: SET_LOADING });
      setAlert('A new purchase order has been assigned', 'success');
    } else {
      setAlert('ACTION_handleAssign_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const handleOrderChange = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/purchaseOrder/ordered/change', data);
    if (res.data) {
      dispatch(getPurchaseOrdered());
      dispatch({ type: SET_LOADING });
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_handleOrderChange_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const handleOrderDelete = (id, userEmail) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/PurchaseOrder/delete', {
      id,
      userEmail
    });
    if (res.data) {
      dispatch(getPurchaseOrdered({ userEmail }));
      dispatch({ type: SET_LOADING });
      setAlert('A new purchase order has been deleted', 'success');
    } else {
      setAlert('ACTION_handleOrderDelete', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const handleOrdered = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/purchaseOrder/ordered', data);
    if (res.data) {
      dispatch(getPurchaseOrdersApproved({ userEmail: data.userEmail }));
      dispatch({ type: SET_LOADING });
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_handleOrdered_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getPurchaseOrdered = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/purchaseOrder/ordered/tblist', data);
    if (res.data) {
      dispatch({
        type: GET_PURCHASE_ORDERS,
        payload: res.data
      });
      dispatch({ type: SET_LOADING });
    } else {
      setAlert('ACTION_getPurchaseOrdered_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const handleOrderedEdit = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admsupplier/manage/purchaseOrder/ordered/edit', data);
    if (res.data) {
      dispatch(getPurchaseOrdered({ userEmail: data.userEmail }));
      dispatch({ type: SET_LOADING });
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_getPurchaseOrdered_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getAllPurchaseOrder = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admsupplier/manage/purchaseOrder/all');
    if (res.data) {
      dispatch({
        type: GET_PURCHASE_ORDERS,
        payload: res.data
      });
      dispatch({ type: SET_LOADING });
    } else {
      setAlert('ACTION_getAllPurchaseOrder_ERROR', 'error');
    }
  } catch (err) {
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
