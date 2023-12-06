import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDeclinedSummary } from 'actions/admin/report';

const columns = [
  { accessorKey: 'brand_name', header: 'Brand Name' },
  { accessorKey: 'return', header: 'Quantity' },
  { accessorKey: 'purchase', header: 'Purchase Price' },
  { accessorKey: 'sale', header: 'Sale Price' }
];

const ProductDeclinedSummary = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDeclinedSummary());
  }, [dispatch]);

  const { productDeclineSummaryList } = useSelector((state) => state.report);
  let updateData = productDeclineSummaryList.map((item) => {
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
        <Typography className="page-title">Style List</Typography>
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

export default ProductDeclinedSummary;
