import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Breadcrumbs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getBlock } from 'actions/admin/customer';
import { DateType } from 'constant/function';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'registrationDate', header: 'Registration Date' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'paymentStatus', header: 'Payment Status' },
  { accessorKey: 'lastLogin', header: 'Last Login' },
  { accessorKey: 'action', header: 'Action' }
];

const BlockCustomerList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlock());
  }, [dispatch]);

  const { blockList } = useSelector((state) => state.customer);
  let updateData = [];
  updateData = blockList.map((item) => {
    return {
      ...item,
      registrationDate: DateType(item?.created_dt),
      lastLogin: DateType(item?.last_login_date),
      paymentStatus: item?.notPaidOnce === 1 ? 'Paid' : 'Unpaid'
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
            <Typography className="home-link current">Block Customer List</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Block Customer Listing</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={updateData} columns={columns} />
      </Box>
    </>
  );
};

export default BlockCustomerList;
