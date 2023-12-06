import { FormControl, TextareaAutosize } from '@mui/material';
import PropTypes from 'prop-types';

const InputTextarea = ({ values, handleBlur, handleChange, placeholder, name }) => {
  return (
    <FormControl fullWidth>
      <TextareaAutosize
        placeholder={placeholder}
        style={{
          minWidth: '100%',
          maxWidth: '100%',
          minHeight: '120px',
          padding: '15px',
          borderColor: '#ccc',
          borderRadius: '12px',
          fontSize: '14px'
        }}
        name={name}
        value={values[name] || ''}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </FormControl>
  );
};
InputTextarea.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func
};

export default InputTextarea;
