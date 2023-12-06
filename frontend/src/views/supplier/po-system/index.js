import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Breadcrumbs, Tabs, Tab } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import 'yup-phone-lite';

import NewOrder from './NewOrder';
import OrderReview from './OrderReview';
import OrderDetail from './OrderDetail';
import Acknowledgment from './Acknowledgment';
import Order from './Order';
import History from './History';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const POSystem = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfsupplier/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDesktop} />
              &nbsp;&nbsp;Home
            </Link>
            <Typography className="home-link current">Purchase Order</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Purchase Order System</Typography>
        </Grid>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="New Order" {...a11yProps(0)} />
          <Tab label="Order Review" {...a11yProps(1)} />
          <Tab label="Order Details By P.O" {...a11yProps(2)} />
          <Tab label="Acknowledgment" {...a11yProps(3)} />
          <Tab label="Order" {...a11yProps(4)} />
          <Tab label="P.O. History" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <NewOrder />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderReview />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OrderDetail />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Acknowledgment />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Order />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <History />
      </TabPanel>
    </>
  );
};

export default POSystem;
