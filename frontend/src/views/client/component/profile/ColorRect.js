import PropTypes from 'prop-types';
import { FormControl, FormHelperText, FormControlLabel, Checkbox, Typography, Grid, Box } from '@mui/material';

const ColorRect = (props) => {
  const iPreferedColor = [
    { title: 'Black', value: '#000000' },
    { title: 'Grey', value: '#c2c2c2' },
    { title: 'White', value: '#ffffff' },
    { title: 'Cream', value: '#eed7c1' },
    { title: 'Brown', value: '#7f3a3e' },
    { title: 'Purple', value: '#88007c' },
    { title: 'Green', value: '#008020' },
    { title: 'Blue', value: '#001bf8' },
    { title: 'Orange', value: '#ffa031' },
    { title: 'Yellow', value: '#fffe45' },
    { title: 'Red', value: '#ff001c' },
    { title: 'Pink', value: '#ffbdca' }
  ];

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography className="basic-info-title">Tell Us Which Colors {props.subject} prefer</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            {props.touched[`${props.name}`] && props.errors[`${props.name}`] && (
              <FormHelperText id="standard-weight-helper-text--signup" error>
                {props.errors[`${props.name}`]}
              </FormHelperText>
            )}
            <Grid container spacing={1} className="custom-hidden-image-checkbox">
              {iPreferedColor.map((item, index) => (
                <Grid key={index} item xs={6} sm={3} xl={2.4}>
                  <Typography className="basic-info-sub-title">{item.title}</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={props.disabled}
                        onBlur={props.handleBlur}
                        value={index + 1}
                        onChange={props.handleChange}
                        name={props.name}
                      />
                    }
                    label={
                      <Box
                        component="div"
                        className="prefer-color-item"
                        style={{
                          backgroundColor: `${item.value}`,
                          border: props?.value?.includes(`${index + 1}`) ? '3px solid #ff6c00' : '1px solid #eee'
                        }}
                      />
                    }
                    style={{ margin: '0', width: '100%' }}
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

ColorRect.propTypes = {
  subject: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.array,
  disabled: PropTypes.bool,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func
};

export default ColorRect;
