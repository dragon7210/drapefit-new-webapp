import { Link } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { Tabs } from 'antd';

import Total from './Total';

const Setting = () => {
  const pageItems = ['Profile', 'Password', 'Value Set', 'Email Template', 'SuperAdmin Pwd', 'Payment Mode'];

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Setting</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Tabs
          type="card"
          items={pageItems.map((item, index) => {
            return {
              label: item,
              key: index,
              children: <Total value={index} />
            };
          })}
        />
      </Paper>
    </>
  );
};

export default Setting;
