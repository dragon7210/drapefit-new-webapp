import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Breadcrumbs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getJunk } from 'actions/admin/customer';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'registrationDate', header: 'Registration Date' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'paymentStatus', header: 'Payment Status' },
  { accessorKey: 'lastLogin', header: 'Last Login' },
  { accessorKey: 'action', header: 'Action' }
];

const JunkUserList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJunk());
  }, [dispatch]);

  const { junkList } = useSelector((state) => state.customer);
  let updateData = [];
  updateData = junkList.map((item) => {
    return {
      ...item
    };
  });

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfadmin/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link disable">Customer Report</Typography>
            <Typography className="home-link current">Junk User List</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Junk Customer Listing</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={updateData} columns={columns} />
      </Box>
    </>
  );
};

export default JunkUserList;
