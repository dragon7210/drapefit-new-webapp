import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getReturnNotProcessed } from 'actions/admin/report';
import { Gender } from 'constant/function';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'kidName', header: 'Kids Name' },
  { accessorKey: 'profile', header: 'Profile Type' },
  { accessorKey: 'fit', header: 'Fit' },
  { accessorKey: 'products', header: 'Products' }
];

const ReturnNotProcessed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReturnNotProcessed());
  }, [dispatch]);

  const { returnNotProcessedList } = useSelector((state) => state.report);
  let updateData = returnNotProcessedList.map((item) => {
    let Products = 1;
    return {
      ...item,
      name: item?.user?.user_detail?.first_name + ' ' + item?.user?.user_detail?.last_name,
      profile: Gender(Number(item?.user?.user_detail?.gender)),
      kidName: item?.kids_detail?.kids_first_name,
      email: item.user?.email,
      fit: 1,
      products: Products
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Checked out already but return not processed</Typography>
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

export default ReturnNotProcessed;
