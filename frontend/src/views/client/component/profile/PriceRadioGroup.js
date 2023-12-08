import PropTypes from 'prop-types';
import { RadioGroup, Grid, FormControlLabel, FormHelperText, Typography } from '@mui/material';

import CustomRadio from './CustomRadio';

const PriceRadioGroup = (props) => {
  return (
    <>
      {props.wears.map((item, index) => {
        if (!props.value) return null;
        return (
          <Grid container key={index}>
            <Grid item xs={12}>
              <Typography className="basic-info-sub-title">{item.title}</Typography>
            </Grid>
            {props.touched[`${item.value}`] && props.errors[`${item.value}`] && (
              <FormHelperText id="standard-weight-helper-text--signup" error>
                {props.errors[`${item.value}`]}
              </FormHelperText>
            )}
            <Grid item xs={12}>
              <RadioGroup
                aria-labelledby="demo-customized-radios"
                name={item.value}
                value={props?.value[`${item.value}`] || ''}
                onChange={props.handleChange}
              >
                <Grid container spacing={2}>
                  {item.prices.map((item, index) => (
                    <Grid key={index} item xs={12} sm={6} lg={4}>
                      <FormControlLabel
                        disabled={props?.disabled}
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
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

PriceRadioGroup.propTypes = {
  wears: PropTypes.array,
  value: PropTypes.object,
  disabled: PropTypes.bool,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func
};

export default PriceRadioGroup;
