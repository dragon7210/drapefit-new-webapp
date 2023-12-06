import { FormControl, InputLabel, FormHelperText, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const InputSelect = ({ list, label, handleBlur, handleChange, name, values, errors, touched }) => {
  return (
    <FormControl fullWidth error={Boolean(touched[name] && errors[name])}>
      <InputLabel>{label}</InputLabel>
      <Select size="small" label={label} name={name} value={values[name]} onBlur={handleBlur} onChange={handleChange}>
        {list.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      {touched[name] && errors[name] && (
        <FormHelperText id="standard-weight-helper-text--signup" error>
          {errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};
InputSelect.propTypes = {
  list: PropTypes.array,
  label: PropTypes.string,
  name: PropTypes.string,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleChange: PropTypes.func
};

export default InputSelect;
