import DFnewLogger from 'utils/DFnewLogger';

export const GenBarcodeStyleNo = (value, step) => {
  try {
    const codeArr = value.split('-');
    return `${codeArr[2].slice(0, 5)}${codeArr[2].slice(18, 23)}-${step + 1}`;
  } catch (e) {
    DFnewLogger(e?.message);
    return '';
  }
};
