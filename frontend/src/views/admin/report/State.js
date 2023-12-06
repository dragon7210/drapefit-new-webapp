import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getStateList } from 'actions/admin/report';

const columns = [
  { accessorKey: 'fullName', header: 'Full Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'kidName', header: 'Kid Name' },
  { accessorKey: 'state', header: 'State' },
  { accessorKey: 'city', header: 'City' },
  { accessorKey: 'country', header: 'Country' },
  { accessorKey: 'zipcode', header: 'Zip code' }
];

const State = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStateList());
  }, [dispatch]);

  const { stateList } = useSelector((state) => state.report);
  let updateData = stateList.map((item) => {
    return {
      ...item,
      fullName: item.user?.user_detail?.first_name + ' ' + item.user?.user_detail?.last_name,
      email: item.user?.email,
      kidName: item.kids_detail?.kids_first_name
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">State wise men women and kids</Typography>
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

export default State;
