import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getClientCheckedOutDetails } from 'actions/admin/report';
import { DateType } from 'constant/function';
import ShowImg from 'ui-component/ShowImg';

const columns = [
  { accessorKey: 'product_name_one', header: 'Product Name1' },
  { accessorKey: 'product_name_two', header: 'Quantity' },
  { accessorKey: 'brand_name', header: 'Brand Name' },
  { accessorKey: 'Img', header: 'Product Image' },
  { accessorKey: 'status', header: 'Stutus' },
  { accessorKey: 'purchase_price', header: 'Purchase Price' },
  { accessorKey: 'sale_price', header: 'Sale Price' },
  { accessorKey: 'quantity', header: 'Quantity' },
  { accessorKey: 'date', header: 'Date' }
];

const ClientCheckedOutDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientCheckedOutDetails());
  }, [dispatch]);

  const { clientCheckedOutDetailsList } = useSelector((state) => state.report);
  let updateData = [];
  clientCheckedOutDetailsList.map((item) => {
    item?.in_products?.map((a) => {
      a?.products?.map((b) => {
        let status = '';
        if (Number(b.keep_status) === 3) {
          status = 'Keep';
        } else if (Number(b.keep_status) === 2) {
          status = 'Exchange';
        } else {
          status = 'Return';
        }
        updateData.push({
          brand_name: item?.brand_name,
          product_name_one: b?.product_name_one,
          product_name_two: b?.product_name_two,
          status: status,
          purchase_price: a?.purchase_price,
          sale_price: a?.sale_price,
          quantity: a?.quantity,
          Img: <ShowImg url={`https://www.drapefittest.com/${b?.product_image}`} />,
          date: DateType(b?.created)
        });
      });
    });
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Client Checked Out Detail</Typography>
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

export default ClientCheckedOutDetails;
