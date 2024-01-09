import PropTypes from 'prop-types';
import { ButtonGroup, FormControl, Button, FormHelperText } from '@mui/material';

const RadioButtonGroup = (props) => {
  return (
    <>
      <FormControl fullWidth>
        <ButtonGroup disabled={props.disabled} size="large" variant="outlined" name={props.name} value={props.value}>
          {props.group.map((item, index) => (
            <Button
              key={index}
              className="radio-button-group"
              style={{
                backgroundColor: props.value === index || props.value == item ? '#ff6c00' : '#f8f8f8',
                color: props.value === index || props.value == item ? '#ffffff' : '#656565'
              }}
              onClick={() => {
                props.setFieldValue(props.name, item);
              }}
            >
              {item}
            </Button>
          ))}
        </ButtonGroup>
        {props.touched[`${props.name}`] && props.errors && props.errors[`${props.name}`] && (
          <FormHelperText id="standard-weight-helper-text--signup" error>
            {props.errors[`${props.name}`]}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};

RadioButtonGroup.propTypes = {
  group: PropTypes.array,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func
};

export default RadioButtonGroup;
