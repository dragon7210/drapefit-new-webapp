import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getProductFinalizeDetails } from 'actions/admin/report';
import { DateType } from 'constant/function';
import ShowImg from 'ui-component/ShowImg';

const columns = [
  { accessorKey: 'product_name_one', header: 'Product Name 1' },
  { accessorKey: 'product_name_two', header: 'Product Name 2' },
  { accessorKey: 'brandName', header: 'Brand Name' },
  { accessorKey: 'Img', header: 'Product Image' },
  { accessorKey: 'purchase_price', header: 'Purchase Price' },
  { accessorKey: 'sale_price', header: 'Sale Price' },
  { accessorKey: 'quantity', header: 'Quantity' },
  { accessorKey: 'date', header: 'Date' }
];

const ProductFinalizeDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductFinalizeDetails());
  }, [dispatch]);

  const { productFinalizeDetailsList } = useSelector((state) => state.report);
  let updateData = [];
  updateData = productFinalizeDetailsList.map((item) => {
    return {
      ...item,
      date: DateType(item?.created),
      brandName: item?.brand_id,
      Img: <ShowImg url={`https://www.drapefittest.com/${item?.product_image}`} />
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Product Fianalize Detail</Typography>
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

export default ProductFinalizeDetails;
