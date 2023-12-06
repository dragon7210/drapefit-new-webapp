import { FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';

const InputForm = ({ label, name, values, errors, touched, handleBlur, handleChange, disabled, type }) => {
  return (
    <FormControl fullWidth error={Boolean(touched[name] && errors[name])}>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        size="small"
        label={label}
        name={name}
        value={values[name] || ''}
        onBlur={handleBlur}
        onChange={handleChange}
        disabled={disabled}
        type={type}
      />
      {touched[name] && errors[name] && (
        <FormHelperText id={`helper-text-${name}`} error>
          {errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

InputForm.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  errors: PropTypes.object,
  touched: PropTypes.object,
  disabled: PropTypes.any,
  type: PropTypes.string
};

export default InputForm;
