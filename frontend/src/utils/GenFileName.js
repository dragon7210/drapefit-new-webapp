import DFnewLogger from 'utils/DFnewLogger';

const GenFileName = (title) => {
  try {
    return `${title}_${new Date().toISOString().slice(-24).replace(/\D/g, '').slice(0, 14)}`;
  } catch (e) {
    DFnewLogger(e?.message);
    return '';
  }
};

export default GenFileName;
