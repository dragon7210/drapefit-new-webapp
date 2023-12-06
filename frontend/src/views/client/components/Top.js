import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Typography, Button } from '@mui/material';

const CTop = ({ propsValue }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Box className={propsValue.topClass}>
        <Box className="align-top-right">
          <Typography className="darker-bold-title">{propsValue.title}</Typography>
          <Link to={user ? `${user?.pRoute}` : '/login'}>
            <Button className="custom-btn">GET STARTED</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

CTop.propTypes = {
  propsValue: PropTypes.object
};

export default CTop;
