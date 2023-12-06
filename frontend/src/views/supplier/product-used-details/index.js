import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Grid, Breadcrumbs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';

import { getSplProdUsedDetails } from 'actions/supply/prodUsedDetails';
import Table from 'ui-component/Table';
import InputDatePicker from 'ui-component/input/InputDatePicker';
import { DateType } from 'constant/function';

const columns = [
  { accessorKey: 'name', header: 'Product' },
  { accessorKey: 'quatity', header: 'Quantity', enableColumnFilter: false },
  { accessorKey: 'orderId', header: 'Order ID', enableColumnFilter: false },
  { accessorKey: 'createdAt', header: 'Date', enableColumnFilter: false }
];

const ProductUsedDetails = () => {
  const dispatch = useDispatch();
  const today = new Date();
  const [startDate, setStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1));
  const [endDate, setEndDate] = useState(today);

  useEffect(() => {
    dispatch(
      getSplProdUsedDetails(false, {
        startDate: startDate,
        endDate: endDate
      })
    );
  }, [dispatch, startDate, endDate]);

  const { tableData } = useSelector((state) => state.splProdUsedDetails);
  let updateData = [];
  updateData = tableData.map((item) => {
    return {
      ...item,
      orderId: `#DFPYMID${item.order_id}`,
      createdAt: DateType(item.created_on),
      name: item?.supply_product?.product_name
    };
  });

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfsupplier/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDesktop} />
              &nbsp;&nbsp;Home
            </Link>
            <Typography className="home-link current">Product Used Details</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Supplier Product Used Details</Typography>
        </Grid>
      </Grid>
      <Box className="table-border container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <InputDatePicker label="Deadline date" value={startDate} onChangeDate={(e) => setStartDate(e.$d)} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <InputDatePicker label="Deadline date" value={endDate} onChangeDate={(e) => setEndDate(e.$d)} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              className="admin-submit-btn"
              onClick={() =>
                dispatch(
                  getSplProdUsedDetails(true, {
                    startDate: startDate,
                    endDate: endDate
                  })
                )
              }
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
            <Typography color="#ff0000">
              Search fields are <strong>Product</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} className="no-margin" style={{ paddingTop: 0 }}>
            <Table columns={columns} data={updateData} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductUsedDetails;
