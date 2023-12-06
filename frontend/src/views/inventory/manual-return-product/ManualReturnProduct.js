import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faDesktop, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Box, Button, Typography, Tooltip, Breadcrumbs, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Table from 'ui-component/Table';
import ShowImg from 'ui-component/ShowImg';
import { useDispatch, useSelector } from 'react-redux';
import { getManualProduct } from 'actions/inventory/product';

const columns = [
  { accessorKey: 'product_name_one', header: 'Product Name 1' },
  { accessorKey: 'product_name_two', header: 'Product Name 2' },
  { accessorKey: 'productImage', header: 'Product Image', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'purchase_price', header: 'Purchase Price', enableColumnFilter: false },
  { accessorKey: 'sale_price', header: 'Sale Price', enableColumnFilter: false },
  { accessorKey: 'quantity', header: 'Quantity', enableColumnFilter: false },
  { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
];

const ManualReturnProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getManualProduct());
  }, [dispatch]);
  const { manualProduct } = useSelector((state) => state.invProduct);
  let updateData = [];
  updateData = manualProduct?.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Add" arrow>
          <Link to="/dfinventory/add-manual-product">
            <Button className="admin-table-btn password">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Link>
        </Tooltip>
      </div>
    );
    return {
      ...item,
      action: action_btn,
      productImage: <ShowImg url={`https://drapefittest.com/files/product_img/${item.product_image}`} />
    };
  });
  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDesktop} />
              &nbsp;&nbsp;Home
            </Link>
            <Typography className="home-link current">Manual Return Product</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Manual Return Product</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={updateData} columns={columns} />
      </Box>
    </>
  );
};

export default ManualReturnProduct;
