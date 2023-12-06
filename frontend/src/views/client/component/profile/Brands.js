import { useState, forwardRef, useImperativeHandle, memo } from 'react';
import { Grid, Box, Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const Brands = forwardRef((value, _ref) => {
  const [allBrands, setAllBrands] = useState([]);
  const handleClick = async (source) => {
    const check = allBrands.includes(source);
    if (check) {
      const id = allBrands.indexOf(source);
      let newArr = allBrands;
      newArr.splice(id, 1);
      setAllBrands([...newArr]);
    } else {
      allBrands.push(source);
      setAllBrands([...allBrands]);
    }
  };

  useImperativeHandle(_ref, () => ({
    getChildState: () => {
      return allBrands;
    }
  }));

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {value.propsValue.map((item, index) => (
              <Grid key={index} item xs={6} sm={4} lg={3}>
                <Box
                  component="div"
                  className="body-shape-box"
                  onClick={() => handleClick(index)}
                  style={{ borderColor: allBrands.includes(index) ? '#ff6c00' : '#eee' }}
                >
                  <FontAwesomeIcon
                    className="check-icon"
                    icon={faCircleCheck}
                    style={{ display: allBrands.includes(index) ? 'block' : 'none' }}
                  />
                  <img src={item} width="100%" alt="shape" />
                </Box>
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

export default memo(Brands);
