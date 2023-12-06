import PropTypes from 'prop-types';
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Typography,
  Grid,
  Box,
  RadioGroup
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import DFnewImgTag from 'utils/DFnewImgTag';
import CustomRadio from './CustomRadio';
import GenS3Link from 'utils/GenS3Link';

const ImageSelectorWithRadioGroup = (props) => {
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <FormControl fullWidth>
            {props.touched[`${props.name}`] && props.errors[`${props.name}`] && (
              <FormHelperText id="standard-weight-helper-text--signup" error>
                {props.errors[`${props.name}`]}
              </FormHelperText>
            )}
            <Grid container spacing={1} className="custom-hidden-image-checkbox">
              {props.content.map((item, index) => (
                <Grid key={index} item xs={6} sm={4} lg={3}>
                  <Grid container>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled={props.disabled}
                            onBlur={props.handleBlur}
                            value={index}
                            onChange={props.handleChange}
                            name={props.name}
                            onClick={() => {
                              if (props.value[`${props.name}`].includes(`${index}`)) {
                                props.setFieldValue(`${props.rname}${index}`, '');
                              } else {
                                props.setFieldValue(`${props.rname}${index}`, '0');
                              }
                            }}
                          />
                        }
                        label={
                          <Box
                            component="div"
                            className="body-shape-box"
                            style={{
                              borderColor: props.value[`${props.name}`].includes(`${index}`) ? '#ff6c00' : '#eee'
                            }}
                          >
                            <FontAwesomeIcon
                              className="check-icon"
                              icon={faCircleCheck}
                              style={{ display: props.value[`${props.name}`].includes(`${index}`) ? 'block' : 'none' }}
                            />
                            <DFnewImgTag
                              src={`${GenS3Link(item)}.webp`}
                              fallback={`${GenS3Link(item)}.jpg`}
                              width="100%"
                              lzheight={`auto`}
                              style={{ minHeight: '194px' }}
                              alt="Select Outfit"
                            />
                          </Box>
                        }
                        style={{ margin: 0, width: '100%' }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <RadioGroup
                        aria-labelledby="demo-customized-radios"
                        name={`${props.rname}${index}`}
                        value={props.value[`${props.rname}${index}`]}
                        onChange={props.handleChange}
                      >
                        <Grid container>
                          <Grid item xs={12}>
                            <FormControlLabel
                              className="profession-radio-btn"
                              value="0"
                              control={<CustomRadio />}
                              disabled={props.value[`${props.name}`].includes(`${index}`) ? false : true}
                              label={<Typography className="img-radio-label">Always dress this way</Typography>}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              className="profession-radio-btn"
                              value="1"
                              control={<CustomRadio />}
                              disabled={props.value[`${props.name}`].includes(`${index}`) ? false : true}
                              label={<Typography className="img-radio-label">Sometimes dress this way</Typography>}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              className="profession-radio-btn"
                              value="2"
                              control={<CustomRadio />}
                              disabled={props.value[`${props.name}`].includes(`${index}`) ? false : true}
                              label={<Typography className="img-radio-label">Occasionally dress this way</Typography>}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              className="profession-radio-btn"
                              value="3"
                              control={<CustomRadio />}
                              disabled={props.value[`${props.name}`].includes(`${index}`) ? false : true}
                              label={<Typography className="img-radio-label">Never this way</Typography>}
                            />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

ImageSelectorWithRadioGroup.propTypes = {
  content: PropTypes.array,
  name: PropTypes.string,
  rname: PropTypes.string,
  value: PropTypes.object,
  disabled: PropTypes.bool,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func
};

export default ImageSelectorWithRadioGroup;
