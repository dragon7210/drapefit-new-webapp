import PropTypes from 'prop-types';
import { RadioGroup, Grid, FormControlLabel, FormHelperText } from '@mui/material';

import CustomRadio from './CustomRadio';

const Profession = (props) => {
  const iProfession = [
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
      name="profession"
      value={props.value}
      onChange={props.handleChange}
    >
      {props.touched?.profession && props.errors?.profession && (
        <FormHelperText id="standard-weight-helper-text--signup" error>
          {props.errors?.profession}
        </FormHelperText>
      )}
      <Grid container spacing={2}>
        {iProfession.map((item, index) => (
          <Grid key={index} item xs={12} sm={6} lg={4}>
            <FormControlLabel
              // disabled={props.disabled}
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

Profession.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func
};

export default Profession;
