import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckedOutNotReturnSummary } from 'actions/admin/report';

const columns = [
  { accessorKey: 'brand_name', header: 'Brand Name' },
  { accessorKey: 'return', header: 'Return' },
  { accessorKey: 'purchase', header: 'Purchase Price' },
  { accessorKey: 'sale', header: 'Sales Price' }
];

const CheckedOutNotReturnSummary = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCheckedOutNotReturnSummary());
  }, [dispatch]);

  const { checkedOutNotReturnSummaryList } = useSelector((state) => state.report);
  console.log(checkedOutNotReturnSummaryList);
  let updateData = checkedOutNotReturnSummaryList.map((item) => {
    let returnCount = 0;
    item?.in_products?.map((a) => {
      returnCount += a?.products?.length;
    });
    return {
      ...item,
      return: returnCount,
      purchase: item?.in_products[0]?.purchase_price,
      sale: item?.in_products[0]?.sale_price
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">checkout Not Return Summary</Typography>
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

export default CheckedOutNotReturnSummary;
