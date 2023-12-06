import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faDownload } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getPaidList } from 'actions/admin/customer';
import { DateType } from 'constant/function';
import { Gender } from 'constant/function';

const columns = [
  { accessorKey: 'createdAt', header: 'Rq Date' },
  { accessorKey: 'fullName', header: 'Full Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'gender', header: 'Profile' },
  { accessorKey: 'fitNumber', header: 'Fit Number' },
  { accessorKey: 'previousStylist', header: 'Previous Stylist' },
  { accessorKey: 'asgCtmStylist', header: 'Assign Customer Stylist' },
  { accessorKey: 'kidName', header: 'Kids Name' },
  { accessorKey: 'age', header: 'Age' },
  { accessorKey: 'asgKidStylist', header: 'Assign Kid Stylist' }
];

const CustomerPaidList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaidList());
  }, [dispatch]);

  const { paidList } = useSelector((state) => state.customer);
  let updateData = paidList.map((item) => {
    return {
      ...item,
      createdAt: DateType(item?.created_dt),
      fullName: item.user?.user_detail?.first_name + ' ' + item.user?.user_detail?.last_name,
      email: item.user?.email,
      gender: Gender(Number(item.user?.user_detail.gender)),
      paidStatus: item.status === 1 ? 'PAID' : 'NOT PAID',
      kidName: item.kids_detail?.kids_first_name,
      age: item.kids_detail?.kids_birthdate
        ? new Date().getFullYear() - new Date(item.kids_detail?.kids_birthdate).getFullYear()
        : new Date().getFullYear() - new Date(item.user?.user_detail?.dateofbirth).getFullYear()
    };
  });
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Customer List Who Paid</Typography>
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

export default CustomerPaidList;
