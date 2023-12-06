import PropTypes from 'prop-types';
import { FormControl, FormHelperText, FormControlLabel, Checkbox, Typography, Grid } from '@mui/material';

const CustomCheckboxLarge = (props) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {props.content?.title && <Typography className="basic-info-title">{props.content?.title}</Typography>}
          {props.content?.subtitle && (
            <Typography className="basic-info-title-small">{props.content?.subtitle}</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            {props.touched[`${props.name}`] && props.errors[`${props.name}`] && (
              <FormHelperText id="standard-weight-helper-text--signup" error>
                {props.errors[`${props.name}`]}
              </FormHelperText>
            )}
            <Grid container spacing={1}>
              {props.content?.items.map((item, index) => (
                <Grid key={index} item xs={6} md={4} xl={3}>
                  <FormControlLabel
                    className="orange-checkbox"
                    value={props.value}
                    control={
                      <Checkbox
                        disabled={props.disabled}
                        checked={props.value && props?.value?.includes(`${index}`)}
                        onBlur={props.handleBlur}
                        value={index}
                        onChange={props.handleChange}
                        name={props.name}
                      />
                    }
                    label={<Typography className="custom-checkbox-label">{item}</Typography>}
                  />
                </Grid>
              ))}
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

CustomCheckboxLarge.propTypes = {
  content: PropTypes.object,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  disabled: PropTypes.bool,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func
};

export default CustomCheckboxLarge;
