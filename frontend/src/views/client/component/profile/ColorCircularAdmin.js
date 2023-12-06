import PropTypes from 'prop-types';
import { FormControl, FormHelperText, Checkbox, Grid, Box, Typography, FormControlLabel } from '@mui/material';

const iSkinToneLabel = [
  { title: 'Extremely fair skin', value: '#fdc8b9' },
  { title: 'Fair skin', value: '#f0b4a2' },
  { title: 'Medium skin', value: '#d0967e' },
  { title: 'Olive skin', value: '#c57456' },
  { title: 'Brown skin', value: '#78412a' },
  { title: 'Other', value: '#e6e6e6' }
];

const ColorCircularAdmin = (props) => {
  return (
    <Grid container className="v-align-center">
      <FormControl fullWidth error={Boolean(props.touched?.skinToneLabel && props.errors?.skinToneLabel)}>
        {props.touched?.skinToneLabel && props.errors?.skinToneLabel && (
          <FormHelperText id="helper-text-skinToneLabel" error>
            {props.errors?.skinToneLabel}
          </FormHelperText>
        )}
        <Grid container spacing={1} className="custom-hidden-image-checkbox skin-tone">
          {iSkinToneLabel.map((item, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox onBlur={props.handleBlur} value={index} onChange={props.handleChange} name={props.name} />
              }
              label={
                <Grid key={index} item xs={4} sm={2} md={3} lg={2}>
                  <Box
                    className="skin-tone-item small"
                    component="div"
                    style={{
                      backgroundColor: `${item.value}`,
                      borderColor: props.value === index ? '#ff6c00' : '#fff'
                    }}
                  >
                    {index === iSkinToneLabel.length - 1 && <Typography className="other-text">OTHER</Typography>}
                  </Box>
                </Grid>
              }
              sx={{ mx: 1, mb: 1 }}
            />
          ))}
        </Grid>
      </FormControl>
    </Grid>
  );
};

ColorCircularAdmin.propTypes = {
  value: PropTypes.array,
  name: PropTypes.string,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func
};

export default ColorCircularAdmin;
