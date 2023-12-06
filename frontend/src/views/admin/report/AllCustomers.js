import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faDownload } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from 'actions/admin/customer';
import { DateType, Gender } from 'constant/function';

const columns = [
  { accessorKey: 'createdAt', header: 'Created Date' },
  { accessorKey: 'fullName', header: 'Full Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'assignCustomerStylist', header: 'Assign Customer Stylist' },
  { accessorKey: 'kidCount', header: 'Kid Count' },
  { accessorKey: 'paidStatus', header: 'Paid Status' }
];

const AllCustomer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.customer);
  let updateData = tableData.map((item) => {
    return {
      ...item,
      createdAt: DateType(item.created_dt),
      fullName: item.user_detail?.first_name + ' ' + item.user_detail?.last_name,
      email: item.email,
      gender: Gender(item.user_detail?.gender),
      paidStatus: item.status === 1 ? 'PAID' : 'NOT PAID',
      kidCount: item.kids_detail ? item.kids_detail?.kid_count : 0
    };
  });
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">All Customer</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Box className="table-border container">
        <Grid container>
          <Grid item xs={12} margin="10px">
            <Button variant="contained">
              <FontAwesomeIcon icon={faDownload} />
              &nbsp;Download PDF
            </Button>{' '}
            <Button variant="contained">
              <FontAwesomeIcon icon={faDownload} />
              &nbsp;Download EXCEL
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Table data={updateData} columns={columns} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AllCustomer;
