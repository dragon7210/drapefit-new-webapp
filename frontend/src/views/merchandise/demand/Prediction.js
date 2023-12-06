import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Breadcrumbs, Tabs, Tab } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import 'yup-phone-lite';
import { monthList } from 'constant/other';
import BottomPrediction from './BottomPrediction';
import { useDispatch, useSelector } from 'react-redux';
import { getPrediction } from 'actions/merPrediction';

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
const month = new Date().getMonth();

const Prediction = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPrediction());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.prediction);
  const data1 = tableData.filter((item) => new Date(item.createdAt).getMonth() === month + 1);
  const data2 = tableData.filter((item) => new Date(item.createdAt).getMonth() === month + 2);
  const data3 = tableData.filter((item) => new Date(item.createdAt).getMonth() === month + 3);
  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfsupplier/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDesktop} />
              &nbsp;&nbsp;Home
            </Link>
            <Typography className="home-link disable">Demand and Trend</Typography>
            <Typography className="home-link current">Prediction List</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Prediction List</Typography>
        </Grid>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={monthList[month + 1]} {...a11yProps(0)} />
          <Tab label={monthList[month + 2]} {...a11yProps(1)} />
          <Tab label={monthList[month + 3]} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BottomPrediction data={data1} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BottomPrediction data={data2} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BottomPrediction data={data3} />
      </TabPanel>
    </>
  );
};

export default Prediction;
