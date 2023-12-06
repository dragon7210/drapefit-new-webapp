import { expect } from 'chai';

import MyEnvConfig from 'configs/MyEnvConfig';
import SetAuthToken from 'utils/SetAuthToken';
import Api from 'utils/Api';
import DFnewLogger from 'utils/DFnewLogger';

describe('SetAuthToken', () => {
  it('should set the token in localStorage and axios headers if a token is provided', () => {
    const token = '12345';
    SetAuthToken(token, true);
    expect(localStorage.getItem('dftoken')).toBe(token);
    expect(Api.defaults.headers.common['df-auth-token']).toBe(`${MyEnvConfig.bearer.tokenPrefix} ${token}`);
  });

  it('should remove the token from localStorage and axios headers if no token is provided', () => {
    SetAuthToken();
    expect(localStorage.getItem('dftoken')).toBeNull();
    expect(Api.defaults.headers.common['df-auth-token']).toBeUndefined();
  });

  it('should call DFnewLogger if an error occurs', () => {
    const spy = jest.spyOn(DFnewLogger, 'DFnewLogger');
    const error = new Error('Error occurred');
    SetAuthToken(error);
    expect(spy).toHaveBeenCalledWith(error);
  });
});
