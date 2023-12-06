import PropTypes from 'prop-types';
import { FormControl, FormHelperText, RadioGroup, Typography, Grid, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import DFnewImgTag from 'utils/DFnewImgTag';
import GenS3Link from 'utils/GenS3Link';

const ImageSelectorRadioGroup = (props) => {
  return (
    <>
      <FormControl fullWidth error={Boolean(props.touched?.bodyShapeLabel && props.errors?.bodyShapeLabel)}>
        {props.touched[`${props.name}`] && props.errors[`${props.name}`] && (
          <FormHelperText id="helper-text-name" error>
            {props.errors[`${props.name}`]}
          </FormHelperText>
        )}
        <RadioGroup row aria-labelledby="demo-customized-radios" name={props.name} value={props.value}>
          <Grid container spacing={1}>
            {props.content.map((item, index) => (
              <Grid key={index} item xs={6} sm={4} md={3} lg={2.4}>
                {item.title && <Typography className="basic-info-sub-title">{item.title}</Typography>}
                <Box
                  component="div"
                  className="body-shape-box"
                  onClick={() => {
                    if (!props.disabled) {
                      props.setFieldValue(props.name, index);
                    }
                  }}
                  style={{ borderColor: props.value === index ? '#ff6c00' : '#eee' }}
                >
                  <FontAwesomeIcon
                    className="check-icon"
                    icon={faCircleCheck}
                    style={{ display: props.value === index ? 'block' : 'none' }}
                  />
                  <DFnewImgTag
                    src={`${GenS3Link(item.image)}.webp`}
                    fallback={`${GenS3Link(item.image)}.png`}
                    height="200"
                    width="100%"
                    lzheight={200}
                    style={{ minWidth: '60px' }}
                    alt="Select Shape"
                  />
                </Box>
                {item.content && <Typography className="basic-info-content">{item.content}</Typography>}
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    </>
  );
};

ImageSelectorRadioGroup.propTypes = {
  content: PropTypes.array,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func
};

export default ImageSelectorRadioGroup;
