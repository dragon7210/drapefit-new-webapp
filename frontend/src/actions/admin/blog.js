import { setAlert } from 'actions/common/alert';
import { SET_LOADING, GET_BLOG_CATEGORY, GET_BLOG, GET_BLOG_TAG } from 'actions/common/types';
import Api from 'utils/Api';
import { ErrorHandler } from 'utils/ErrorHandler';
import DFnewLogger from 'utils/DFnewLogger';

export const getBlogCategory = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/blogCategory/tbllist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_BLOG_CATEGORY,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getBlogCategory_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addBlogCategory = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/blogCategory/add', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getBlogCategory());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_addBlogCategory_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const delBlogCategory = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/blogCategory/del', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getBlogCategory());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_delBlogCategory_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updateBlogCategory = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/blogCategory/update', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getBlogCategory());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_updateBlogCategory_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addBlog = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/blog/add', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getBlog());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_addBlog_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getBlog = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/blog/tbllist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_BLOG,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getBlog_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const delBlog = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/blog/del', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getBlog());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_delBlog_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updateBlog = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/blog/update', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getBlog());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_updateBlog_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const getBlogTag = () => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.get('/admmain/manage/blogTag/tbllist');
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch({
        type: GET_BLOG_TAG,
        payload: res.data
      });
    } else {
      setAlert('ACTION_getBlogTag_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const addBlogTag = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/blogTag/add', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getBlogTag());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_addBlogTag_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const delBlogTag = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/blogTag/del', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getBlogTag());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_delBlogTag_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};

export const updateBlogTag = (data) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await Api.post('/admmain/manage/blogTag/update', data);
    dispatch({ type: SET_LOADING });
    if (res.data) {
      dispatch(getBlogTag());
      setAlert('Success', 'success');
    } else {
      setAlert('ACTION_updateBlogTag_ERROR', 'error');
    }
  } catch (err) {
    dispatch({ type: SET_LOADING });
    DFnewLogger(err?.message);
    ErrorHandler(err);
  }
};
