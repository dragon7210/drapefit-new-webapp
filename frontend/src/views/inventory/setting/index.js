import { Link } from 'react-router-dom';
import { Typography, Paper, Grid, Breadcrumbs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { Tabs } from 'antd';

import Total from './Total';

const pageItems = ['Profile', 'Password', 'Value Set', 'Email Template'];

const Setting = () => {
  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDesktop} />
              &nbsp;&nbsp;Home
            </Link>
            <Typography className="home-link current">Setting</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Setting</Typography>
        </Grid>
      </Grid>
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
