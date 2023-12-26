import { Link } from 'react-router-dom';
import { Divider, Box, Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import NavTabs from '../component/profile/NavTabs';

const PaymentSuccess = () => {
  return (
    <>
      <NavTabs />
      <Divider />
      <Box className="payment-success">
        <Box className="pay-success-container">
          <Typography className="pay-success-title">
            <FontAwesomeIcon icon={faCheck} />
            &nbsp;&nbsp;Thank You For Choosing Drape Fit
          </Typography>
          <Box className="h-align-center">
            <Link to="/">
              <Button className="continue-homepage-btn">CONTINUE TO HOMEPAGE</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PaymentSuccess;
