import DFnewLogger from 'utils/DFnewLogger';

const AddZeroPrefix = (param) => {
  try {
    if (Number(param) < 10) {
      return `0${param}`;
    } else {
      return `${param}`;
    }
  } catch (e) {
    DFnewLogger(e?.message);
    return '';
  }
};

export default AddZeroPrefix;
