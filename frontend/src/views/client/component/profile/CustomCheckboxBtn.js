import PropTypes from 'prop-types';
import { FormControl, FormHelperText, FormControlLabel, Checkbox, Typography } from '@mui/material';

const CustomCheckboxBtn = (props) => {
  return (
    <>
      <FormControl className="custom-hidden-checkbox">
        {props.touched[`${props.name}`] && props.errors[`${props.name}`] && (
          <FormHelperText id="standard-weight-helper-text--signup" error>
            {props.errors[`${props.name}`]}
          </FormHelperText>
        )}
        {props.part.map((item, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                disabled={props.disabled}
                onBlur={props.handleBlur}
                value={item}
                onChange={props.handleChange}
                name={props.name}
              />
            }
            label={
              <Typography
                component="div"
                style={{
                  display: 'inline-block',
                  padding: '8px 15px',
                  border: '1px solid #232f3e',
                  margin: '10px',
                  fontWeight: '700',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  color: props.value.includes(`${index}`) || props.value.includes(`${item}`) ? '#fff' : '#232f3e',
                  backgroundColor:
                    props.value.includes(`${index}`) || props.value.includes(`${item}`) ? '#232f3e' : '#fff'
                }}
              >
                {item}
              </Typography>
            }
          ></FormControlLabel>
        ))}
      </FormControl>
    </>
  );
};

CustomCheckboxBtn.propTypes = {
  name: PropTypes.string,
  part: PropTypes.array,
  value: PropTypes.array,
  disabled: PropTypes.bool,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func
};

export default CustomCheckboxBtn;
