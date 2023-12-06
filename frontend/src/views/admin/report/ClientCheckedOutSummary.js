import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getClientCheckedOutSummary } from 'actions/admin/report';

const columns = [
  { accessorKey: 'brand_name', header: 'Brand Name' },
  { accessorKey: 'quantity', header: 'Quantity' },
  { accessorKey: 'keep', header: 'Keep' },
  { accessorKey: 'exchange', header: 'Exchange' },
  { accessorKey: 'return', header: 'Return' },
  { accessorKey: 'purchase_price', header: 'Purchase Price' },
  { accessorKey: 'sale_price', header: 'Sale Price' }
];

const ClientCheckedOutSummary = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientCheckedOutSummary());
  }, [dispatch]);

  const { clientCheckedOutSummaryList } = useSelector((state) => state.report);
  let updateData = [];
  clientCheckedOutSummaryList.map((item) => {
    let keepCount = 0;
    let exchangeCount = 0;
    let returnCount = 0;
    item?.in_products.map((a) => {
      a?.products.map((b) => {
        if (b?.keep_status == 3) {
          keepCount++;
        } else if (b?.keep_status == 2) {
          exchangeCount++;
        } else {
          returnCount++;
        }
      });
    });
    updateData.push({
      quantity: keepCount + exchangeCount + returnCount,
      brand_name: item?.brand_name,
      keep: keepCount,
      exchange: exchangeCount,
      return: returnCount
    });
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Client Checked Out Summary</Typography>
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

export default ClientCheckedOutSummary;
