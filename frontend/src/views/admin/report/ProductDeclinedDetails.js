import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDeclinedDetails } from 'actions/admin/report';
import ShowImg from 'ui-component/ShowImg';
import { DateType } from 'constant/function';

const columns = [
  { accessorKey: 'product_name_one', header: 'Product Name1' },
  { accessorKey: 'product_name_two', header: 'Quantity' },
  { accessorKey: 'brand_id', header: 'Brand Name' },
  { accessorKey: 'Img', header: 'Product Image' },
  { accessorKey: 'status', header: 'Stutus' },
  { accessorKey: 'purchase_price', header: 'Purchase Price' },
  { accessorKey: 'sale_price', header: 'Sale Price' },
  { accessorKey: 'quantity', header: 'Quantity' },
  { accessorKey: 'date', header: 'Date' }
];

const ProductDeclinedDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDeclinedDetails());
  }, [dispatch]);

  const { productDeclineDetailList } = useSelector((state) => state.report);
  let updateData = productDeclineDetailList.map((item) => {
    let status;
    if (Number(item?.keep_status) === 3) {
      status = 'Keep';
    } else if (Number(item?.keep_status) === 2) {
      status = 'Exchange';
    } else {
      status = 'Return';
    }
    return {
      ...item,
      status,
      Img: <ShowImg url={`https://www.drapefittest.com/${item?.product_iamge}`} />,
      date: DateType(item?.created)
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

export default ProductDeclinedDetails;
