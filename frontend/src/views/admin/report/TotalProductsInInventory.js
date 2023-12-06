import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalProductsInInventory } from 'actions/admin/report';
import ShowImg from 'ui-component/ShowImg';

const columns = [
  { accessorKey: 'brand_name', header: 'Brand Name' },
  { accessorKey: 'product_name_one', header: 'Product Name 1' },
  { accessorKey: 'product_name_two', header: 'Product Name 2' },
  { accessorKey: 'img', header: 'Product Image' },
  { accessorKey: 'size', header: 'Size' },
  { accessorKey: 'color', header: 'Color' },
  { accessorKey: 'purchase_price', header: 'Purchase Price' },
  { accessorKey: 'sale_price', header: 'Sale Price' },
  { accessorKey: 'quantity', header: 'Quantity' }
];

const TotalProductsInInventory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalProductsInInventory());
  }, [dispatch]);

  const { totalProductsInInventoryList } = useSelector((state) => state.report);
  console.log(totalProductsInInventoryList);
  let updateData = [];
  totalProductsInInventoryList.map((item) => {
    item?.in_products.map((a) => {
      updateData.push({
        brand_name: item?.brand_name,
        product_name_one: a?.product_name_one,
        product_name_two: a?.product_name_two,
        purchase_price: a?.purchase_price,
        sale_price: a?.sale_price,
        quantity: a?.quantity,
        color: a?.in_color?.name,
        img: <ShowImg url={`https://www.drapefittest.com/inventory/files/product_img/${a?.product_image}`} />
      });
    });
    // return {
    //   ...item,
    //   name: item?.user_detail?.first_name + ' ' + item?.user_detail?.last_name,
    //   gender: Gender(Number(item?.user_detail?.gender)),
    //   birthday: DateType(item.user_detail?.dateofbirth),
    //   kidName: item.kids_detail?.kids_first_name
    // };
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

export default TotalProductsInInventory;
