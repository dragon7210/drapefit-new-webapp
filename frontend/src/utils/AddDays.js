import DFnewLogger from 'utils/DFnewLogger';

export const AddDays = (date, days = 0) => {
  try {
    let _date = new Date(date);
    _date.setDate(_date.getDate() + days);
    return _date;
  } catch (e) {
    DFnewLogger(e?.message);
    return null;
  }
};
