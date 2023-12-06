import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlyProductDeclined } from 'actions/admin/report';
import { DateType } from 'constant/function';
import ShowImg from 'ui-component/ShowImg';

const columns = [
  { accessorKey: 'user', header: 'User' },
  { accessorKey: 'kid', header: 'Kid' },
  { accessorKey: 'fit', header: 'Fit' },
  { accessorKey: 'product_name_one', header: 'Product Name 1' },
  { accessorKey: 'product_name_two', header: 'Product Name 2' },
  { accessorKey: 'product_img', header: 'Product Image' },
  { accessorKey: 'purchase_price', header: 'Purchase Price' },
  { accessorKey: 'sell_price', header: 'Sale Price' },
  { accessorKey: 'quality_status', header: 'Quantity' },
  { accessorKey: 'date', header: 'Date' }
];

const MonthlyProductDeclined = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMonthlyProductDeclined());
  }, [dispatch]);

  const { monthlyProductDeclinedList } = useSelector((state) => state.report);
  let updateData = [];
  updateData = monthlyProductDeclinedList.map((item) => {
    return {
      ...item,
      user: item?.user?.name,
      kid: item?.kids_detail?.kids_first_name,
      date: DateType(item?.created),
      fit: '1',
      product_img: <ShowImg url={`https://www.drapefittest.com/${item?.product_image}`} />
    };
  });
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Monthly Product Declined</Typography>
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

export default MonthlyProductDeclined;
