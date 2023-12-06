import { setAlert } from 'actions/common/alert';
import DFnewLogger from 'utils/DFnewLogger';

export const ErrorHandler = (err) => {
  try {
    if (err?.response?.status === 422) {
      const errormsgs = err?.response?.data?.errors;
      if (errormsgs) {
        errormsgs.forEach((error) => {
          if (error !== 'Invalid value') {
            setAlert(error, 'error');
          }
        });
      }
    } else {
      const errmsg = err?.response?.data?.msg;
      if (errmsg) {
        setAlert(errmsg, 'error');
      } else if (err?.message === 'Network Error') {
        setAlert(err?.message, 'error');
      } else {
        const finalmsg = 'Unknown Error';
        DFnewLogger(`${finalmsg}:`, err);
        setAlert(finalmsg, 'error');
      }
    }
  } catch (e) {
    DFnewLogger(e?.message);
  }
};
