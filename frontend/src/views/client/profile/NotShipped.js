import { Divider, Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import converter from 'number-to-words';

import NavTabs from '../component/profile/NavTabs';

const NotShipped = () => {
  const numOrdinal = converter.toOrdinal(5);

  return (
    <>
      <NavTabs />
      <Divider />
      <Box className="payment-success">
        <Box className="pay-success-container border-radius">
          <Typography className="not-shipped-title">
            <FontAwesomeIcon icon={faCircleCheck} className="icon" />
            <br />
            Products not yet shipped
          </Typography>
          <Typography className="not-shipped-content">
            {`We are working hard to complete your ${numOrdinal} FIT.`}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default NotShipped;
