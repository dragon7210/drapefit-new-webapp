import MyEnvConfig from 'configs/MyEnvConfig';
import Api from 'utils/Api';
import DFnewLogger from 'utils/DFnewLogger';

const SetAuthToken = (token, isRememberMe = false) => {
  try {
    if (token) {
      Api.defaults.headers.common['df-auth-token'] = `${MyEnvConfig.bearer.tokenPrefix} ${token}`;
      if (isRememberMe) {
        localStorage.setItem('dftoken', token);
      } else {
        sessionStorage.setItem('dftoken', token);
      }
    } else {
      delete Api.defaults.headers.common['df-auth-token'];
      sessionStorage.removeItem('dftoken');
      localStorage.removeItem('dftoken');
    }
  } catch (e) {
    DFnewLogger(e?.message);
  }
};

export default SetAuthToken;
