import DFnewLogger from 'utils/DFnewLogger';

export const FirstUpper = (word) => {
  try {
    if (word) return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    return '';
  } catch (e) {
    // DFnewLogger(e?.message);
    return '';
  }
};
