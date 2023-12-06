import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscription } from 'actions/admin/subscription';
import { DateType, Gender } from 'constant/function';

const columns = [
  { accessorKey: 'fullName', header: 'Full Name' },
  { accessorKey: 'profile', header: 'Profile' },
  { accessorKey: 'kidName', header: 'Kid Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'newItem', header: 'New items with scheduled Fixes' },
  { accessorKey: 'timeFix', header: 'Time fix' },
  { accessorKey: 'status', header: 'Status' }
];

const Subscription = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscription());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.subscription);
  let updateData = tableData.map((item) => {
    return {
      ...item,
      fullName: item.user?.user_detail?.first_name + ' ' + item.user?.user_detail?.last_name,
      kidName: item.kids_detail?.kids_first_name,
      email: item.user?.email,
      profile: Gender(Number(item.user?.user_detail?.gender)),
      date: DateType(item?.applay_dt),
      timeFix: 'Every' + ' ' + item?.how_often_would_you_lik_fixes + ' ' + 'Monthly',
      newItem: Number(item.try_new_items_with_scheduled_fixes) === 1 ? 'Yes' : 'No',
      status: Number(item.try_new_items_with_scheduled_fixes) === 1 ? 'Subscription' : 'Un-subscription'
    };
  });
  console.log(tableData);

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Refund Customer Listing with Status</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Box className="table-border container">
        <Grid container>
          <Grid item xs={12}>
            <Table data={updateData} columns={columns} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Subscription;
