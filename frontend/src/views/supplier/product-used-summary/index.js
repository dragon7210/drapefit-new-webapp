import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Grid, Breadcrumbs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { getSplProdUsedSummary } from 'actions/supply/prodUsedSummary';
import Table from 'ui-component/Table';
import InputDatePicker from 'ui-component/input/InputDatePicker';

const columns = [
  { accessorKey: 'name', header: 'Product' },
  { accessorKey: 'quatity', header: 'Quantity', enableColumnFilter: false, enableSorting: false }
];

const ProductUsedSummary = () => {
  const dispatch = useDispatch();
  const today = new Date();
  const [startDate, setStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1));
  const [endDate, setEndDate] = useState(today);

  useEffect(() => {
    dispatch(
      getSplProdUsedSummary(false, {
        startDate: startDate,
        endDate: endDate
      })
    );
  }, [dispatch, endDate, startDate]);

  const { tableData } = useSelector((state) => state.splProdUsedSummary);
  let updateData = [];
  updateData = tableData.map((item) => {
    return {
      ...item,
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
            <Typography className="home-link current">Product Used Summary</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Supplier Product Used Summary</Typography>
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
                  getSplProdUsedSummary(true, {
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

export default ProductUsedSummary;
