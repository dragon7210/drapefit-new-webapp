import { useState, forwardRef, useImperativeHandle, memo } from 'react';
import { Grid, Typography, Box, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const MultiImageSelector = forwardRef((value, _ref) => {
  const [allImages, setAllImages] = useState([]);
  const handleClick = async (source) => {
    const check = allImages.includes(source);
    if (check) {
      const id = allImages.indexOf(source);
      let newArr = allImages;
      newArr.splice(id, 1);
      setAllImages([...newArr]);
    } else {
      allImages.push(source);
      setAllImages([...allImages]);
    }
  };

  useImperativeHandle(_ref, () => ({
    getChildState: () => {
      return allImages;
    }
  }));

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography className="basic-info-title">{value.propsValue.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {value.propsValue.gallery.map((item, index) => (
              <Grid key={index} item xs={6} sm={3} lg={2.4}>
                {item.title !== '' && <Typography className="basic-info-sub-title">{item.title}</Typography>}
                {item.color ? (
                  <Box
                    component="div"
                    className="prefer-color-item"
                    onClick={() => handleClick(index)}
                    style={{
                      backgroundColor: `${item.color}`,
                      border: allImages.includes(index) ? '3px solid #ff6c00' : '1px solid #eee'
                    }}
                  />
                ) : (
                  <Box
                    component="div"
                    className="body-shape-box"
                    onClick={() => handleClick(index)}
                    style={{ borderColor: allImages.includes(index) ? '#ff6c00' : '#eee' }}
                  >
                    <FontAwesomeIcon
                      className="check-icon"
                      icon={faCircleCheck}
                      style={{ display: allImages.includes(index) ? 'block' : 'none' }}
                    />
                    <img src={item.image} width="100%" alt="shape" />
                  </Box>
                )}
                {item.content !== '' && <Typography className="basic-info-content">{item.content}</Typography>}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ margin: '20px 0' }} />
        </Grid>
      </Grid>
    </>
  );
});

export default memo(MultiImageSelector);
