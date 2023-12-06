import { expect } from 'chai';

import DFnewLogger from 'utils/DFnewLogger';
import GlobalEnv from 'configs/GlobalEnv';

describe('DFnewLogger', () => {
  it('should return a function when flag is true', () => {
    GlobalEnv.isDebug = true;
    const result = DFnewLogger();
    expect(result).to.be.a('function');
  });

  it('should return an empty function when flag is false', () => {
    GlobalEnv.isDebug = false;
    const result = DFnewLogger();
    expect(result).to.be.a('function').and.to.have.lengthOf(0);
  });
});
