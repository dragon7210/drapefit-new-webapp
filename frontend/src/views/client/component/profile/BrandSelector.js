import PropTypes from 'prop-types';
import { FormControl, FormHelperText, FormControlLabel, Checkbox, Grid, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import GenS3Link from 'utils/GenS3Link';

import DFnewImgTag from 'utils/DFnewImgTag';

const BrandSelector = (props) => {
  return (
    <>
      <FormControl fullWidth>
        {props.touched[`${props.name}`] && props.errors[`${props.name}`] && (
          <FormHelperText id="standard-weight-helper-text--signup" error>
            {props.errors[`${props.name}`]}
          </FormHelperText>
        )}
        <Grid container spacing={1} className="custom-hidden-image-checkbox">
          {props.brands.map((item, index) => (
            <Grid key={index} item xs={6} sm={4} lg={3}>
              <FormControlLabel
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
                  <Box
                    component="div"
                    className="body-shape-box"
                    style={{
                      borderColor: props.value.includes(`${item}`) ? '#ff6c00' : '#eee'
                    }}
                  >
                    <FontAwesomeIcon
                      className="check-icon"
                      icon={faCircleCheck}
                      style={{
                        display: props.value.includes(`${item}`) ? 'block' : 'none'
                      }}
                    />
                    <DFnewImgTag
                      src={`${GenS3Link('landing/images/client/brands/' + item)}.webp`}
                      fallback={`${GenS3Link('landing/images/client/brands/' + item)}.png`}
                      width="100%"
                      lzheight={`auto`}
                      style={{ minHeight: '85px' }}
                      alt="Gold Brands"
                    />
                  </Box>
                }
                style={{ margin: 0 }}
              />
            </Grid>
          ))}
        </Grid>
      </FormControl>
    </>
  );
};

BrandSelector.propTypes = {
  name: PropTypes.string,
  brands: PropTypes.array,
  value: PropTypes.array,
  disabled: PropTypes.bool,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func
};

export default BrandSelector;
