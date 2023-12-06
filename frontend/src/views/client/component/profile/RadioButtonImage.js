import PropTypes from 'prop-types';
import { ButtonGroup, FormControl, Button, FormHelperText, Typography, Box } from '@mui/material';

import DFnewImgTag from 'utils/DFnewImgTag';
import GenS3Link from 'utils/GenS3Link';

const RadioButtonImage = (props) => {
  return (
    <>
      <FormControl fullWidth className="v-align-center">
        {props.group?.title && (
          <Typography className="basic-info-sub-title" align="left">
            {props.group?.title}
          </Typography>
        )}
        <Box className={props.group?.title ? 'radio-btn-img-border' : 'radio-btn-img'}>
          <DFnewImgTag
            src={`${GenS3Link(props.group?.image)}.webp`}
            fallback={`${GenS3Link(props.group?.image)}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '154px' }}
            alt="Please select"
          />
        </Box>
        <ButtonGroup disabled={props.disabled} variant="outlined" name={props.name} value={props.value}>
          {props.group?.content.map((item, index) => (
            <Button
              key={index}
              className="radio-button-group"
              style={{
                backgroundColor: props.value === index || props.value == item ? '#ff6c00' : '#f8f8f8',
                color: props.value === index || props.value == item ? '#ffffff' : '#656565'
              }}
              onClick={() => {
                props.setFieldValue(props.name, item);
              }}
            >
              {item}
            </Button>
          ))}
        </ButtonGroup>
        {props.touched[`${props.name}`] && props.errors[`${props.name}`] && (
          <FormHelperText id="standard-weight-helper-text--signup" error>
            {props.errors[`${props.name}`]}
          </FormHelperText>
        )}
      </FormControl>
    </>
  );
};

RadioButtonImage.propTypes = {
  group: PropTypes.object,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  touched: PropTypes.object,
  errors: PropTypes.object,
  setFieldValue: PropTypes.func
};

export default RadioButtonImage;
