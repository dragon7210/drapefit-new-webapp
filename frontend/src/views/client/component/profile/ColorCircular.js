import PropTypes from 'prop-types';
import { FormControl, FormHelperText, RadioGroup, Grid, Box, Typography } from '@mui/material';

const ColorCircular = (props) => {
  const iSkinToneLabel = [
    { title: 'Extremely fair skin', value: '#fdc8b9' },
    { title: 'Fair skin', value: '#f0b4a2' },
    { title: 'Medium skin', value: '#d0967e' },
    { title: 'Olive skin', value: '#c57456' },
    { title: 'Brown skin', value: '#78412a' },
    { title: 'Other', value: '#e6e6e6' }
  ];

  return (
    <FormControl fullWidth error={Boolean(props.touched?.skinToneLabel && props.errors?.skinToneLabel)}>
      {props.touched?.skinToneLabel && props.errors?.skinToneLabel && (
        <FormHelperText id="helper-text-skinToneLabel" error>
          {props.errors.skinToneLabel}
        </FormHelperText>
      )}
      <RadioGroup row aria-labelledby="demo-customized-radios" name="skinToneLabel" value={props.value}>
        <Grid container spacing={1}>
          {iSkinToneLabel.map((item, index) => (
            <Grid key={index} item xs={4} sm={3} lg={2}>
              <Box
                className="skin-tone-item"
                component="div"
                onClick={() => {
                  if (!props?.disabled) {
                    props.setFieldValue('skin_tone', index);
                  }
                }}
                style={{
                  backgroundColor: `${item.value}`,
                  borderColor: props.value === index ? '#ff6c00' : '#fff'
                }}
              >
                {index === iSkinToneLabel.length - 1 && <Typography className="other-text">OTHER</Typography>}
              </Box>
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

ColorCircular.propTypes = {
  touched: PropTypes.object,
  errors: PropTypes.object,
  value: PropTypes.number,
  disabled: PropTypes.bool,
  setFieldValue: PropTypes.func
};

export default ColorCircular;
