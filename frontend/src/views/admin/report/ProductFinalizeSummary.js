import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getProductFinalizeSummary } from 'actions/admin/report';

const columns = [
  { accessorKey: 'brand_name', header: 'Brand Name' },
  { accessorKey: 'quantity', header: 'Quantity' },
  { accessorKey: 'purchase_price', header: 'Purchase Price' },
  { accessorKey: 'sale', header: 'Sale Price' }
];

const ProductFinalizeSummary = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductFinalizeSummary());
  }, [dispatch]);

  const { productFinalizeSummaryList } = useSelector((state) => state.report);
  console.log(productFinalizeSummaryList);
  let updateData = [];
  updateData = productFinalizeSummaryList.map((item) => {
    return {
      ...item,
      quantity: item?.in_products?.length,
      purchase_price: item?.in_products[0]?.purchase_price,
      sale: item?.in_products[0]?.sale_price
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Product Finalize Summary</Typography>
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

export default ProductFinalizeSummary;
