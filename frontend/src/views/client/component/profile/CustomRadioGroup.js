import PropTypes from 'prop-types';
import { RadioGroup, Grid, FormControlLabel, FormHelperText } from '@mui/material';

import CustomRadio from './CustomRadio';

const CustomRadioGroup = (props) => {
  return (
    <RadioGroup
      aria-labelledby="demo-customized-radios"
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
    >
      {props.touched[`${props.name}`] && props.errors[`${props.name}`] && (
        <FormHelperText id="standard-weight-helper-text--signup" error>
          {props.errors[`${props.name}`]}
        </FormHelperText>
      )}
      <Grid container spacing={2}>
        {props.content.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} lg={4}>
            <FormControlLabel
              disabled={props.disabled}
              className="profession-radio-btn"
              style={{ margin: '-6px 0' }}
              value={index}
              control={<CustomRadio />}
              label={item}
            />
          </Grid>
        ))}
      </Grid>
    </RadioGroup>
  );
};

CustomRadioGroup.propTypes = {
  content: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.number,
  disabled: PropTypes.bool,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func
};

export default CustomRadioGroup;
