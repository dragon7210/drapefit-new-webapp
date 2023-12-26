import axios from 'axios';

import store from 'store.js';
import { LOGOUT } from 'actions/common/types';
import GlobalEnv from 'configs/GlobalEnv';
import MyEnvConfig from 'configs/MyEnvConfig';
import DFnewLogger from 'utils/DFnewLogger';

export const BaseUrl = GlobalEnv.isDebug ? `${MyEnvConfig.baseurl.dev}/dfnew` : `${MyEnvConfig.baseurl.prod}/dfnew`;

const Api = axios.create({
  baseURL: BaseUrl,
  headers: { 'Content-Type': 'application/json' }
});

Api.interceptors.response.use(
  (res) => res,
  (err) => {
    DFnewLogger('Api/interceptors:', err);
    if (err?.response?.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default Api;
