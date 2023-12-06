import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faDownload } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getNotPaidList } from 'actions/admin/customer';
import { DateType } from 'constant/function';
import { Gender } from 'constant/function';

const columns = [
  { accessorKey: 'createdAt', header: 'Create Date' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'fullName', header: 'Full Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'asgCtmStylist', header: 'Assign Customer Stylist' },
  { accessorKey: 'kidName', header: 'Kids Name' },
  { accessorKey: 'age', header: 'Age' }
];

const CustomerNotPaidList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotPaidList());
  }, [dispatch]);

  const { notPaidList } = useSelector((state) => state.customer);

  let updateData = notPaidList.map((item) => {
    return {
      ...item,
      createdAt: DateType(item.created_dt),
      fullName: item.user_detail?.first_name + ' ' + item.user_detail?.last_name,
      email: item.email,
      gender: Gender(Number(item.user_detail.gender)),
      paidStatus: item.status === 1 ? 'PAID' : 'NOT PAID',
      kidName: item.kids_detail?.kids_first_name,
      age: item.kids_detail?.kids_birthdate
        ? new Date().getFullYear() - new Date(item.kids_detail?.kids_birthdate).getFullYear()
        : ''
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Customer List Who Not Paid</Typography>
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

export default CustomerNotPaidList;
