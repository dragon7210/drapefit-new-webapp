import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import { getPurchaseOrdersApproved } from 'actions/supply/purchaseOrders';

import 'yup-phone-lite';
import { DateType } from 'constant/function';
import ShowImg from 'ui-component/ShowImg';
import Table from 'ui-component/Table';

const OrderDetail = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPurchaseOrdersApproved());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.splPurchaseOrders);

  const columns = [
    { accessorKey: 'name', header: 'PRODUCT NAME' },
    { accessorKey: 'category', header: 'CATEGORY' },
    { accessorKey: 'image', header: 'IMAGE' },
    { accessorKey: 'description', header: 'DESCRIPTION' },
    { accessorKey: 'quantity', header: 'QUANTITY IN STOCK' },
    { accessorKey: 'required_quantity', header: 'REQUIRED QUANTITY' },
    { accessorKey: 'deadline', header: 'DEADLINE DATE' }
  ];
  let updateData = [];
  updateData = tableData.map((item) => {
    return {
      ...item,
      image: <ShowImg url={item.product_photo} />,
      deadline: DateType(item.deadline),
      category: item.supply_product?.product_name,
      quantity: item.supply_product?.quantity
    };
  });

  return (
    <>
      <Box className="table-border container">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Table columns={columns} data={updateData} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OrderDetail;
