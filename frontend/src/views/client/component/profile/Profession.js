import PropTypes from 'prop-types';
import { RadioGroup, Grid, FormControlLabel, FormHelperText } from '@mui/material';

import CustomRadio from './CustomRadio';

const occupation_v2 = (props) => {
  const ioccupation_v2 = [
    'Architecture / Engineering',
    'Art / Design',
    'Building / Maintenance',
    'Business / Client Service',
    'Community / Social Service',
    'Computer / IT',
    'Education',
    'Entertainer / Performer',
    'Farming / Fishing / Forestry',
    'Financial Services',
    'Health Practitioner / Technician',
    'Hospitality / Food Service',
    'Management',
    'Media / Communications',
    'Military / Protective Service',
    'Legal',
    'Office / Administration',
    'Average',
    'Personal Care & Service',
    'Production / Manufacturing',
    'Retail',
    'Sales',
    'Science',
    'Technology',
    'Transportation',
    'Self-Employed',
    'Stay-At-Home Parent',
    'Student',
    'Retired',
    'Not Employed',
    'Other'
  ];

  return (
    <RadioGroup
      aria-labelledby="demo-customized-radios"
      name={props.name ? props.name : 'occupation_v2'}
      value={props.value}
      onChange={props.handleChange}
    >
      {props.touched?.occupation_v2 && props.errors?.occupation_v2 && (
        <FormHelperText id="standard-weight-helper-text--signup" error>
          {props.errors?.occupation_v2}
        </FormHelperText>
      )}
      <Grid container spacing={2}>
        {ioccupation_v2.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} lg={4}>
            <FormControlLabel
              // disabled={props.disabled}
              className="occupation_v2-radio-btn"
              style={{ margin: '-6px 0' }}
              control={<CustomRadio />}
              label={item}
              value={index + 1}
            />
          </Grid>
        ))}
      </Grid>
    </RadioGroup>
  );
};

occupation_v2.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func
};

export default occupation_v2;
