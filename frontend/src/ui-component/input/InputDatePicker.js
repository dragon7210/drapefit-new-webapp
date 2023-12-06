import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PropTypes from 'prop-types';

import { TextField } from '@mui/material';

const InputDatePicker = ({ label, value, onChangeDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChangeDate}
        renderInput={(props) => <TextField {...props} size="small" fullWidth />}
      />
    </LocalizationProvider>
  );
};
InputDatePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.object,
  onChangeDate: PropTypes.func
};

export default InputDatePicker;
