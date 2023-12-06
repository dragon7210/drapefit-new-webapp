import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Breadcrumbs, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getReportProduct } from 'actions/inventory/product';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'men', header: 'Men' },
  { accessorKey: 'menTotal', header: 'Men Total' },
  { accessorKey: 'women', header: 'Women' },
  { accessorKey: 'womenTotal', header: 'Women Total' },
  { accessorKey: 'boyKid', header: 'Boy Kid' },
  { accessorKey: 'boyKidTotal', header: 'Boy Kid Total' },
  { accessorKey: 'girlKid', header: 'Girl Kid' },
  { accessorKey: 'girlKidTotal', header: 'Girl Kid Total' }
];

const InventoryReport = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReportProduct());
  }, [dispatch]);

  const { reportProduct } = useSelector((state) => state.invProduct);
  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDesktop} />
              &nbsp;&nbsp;Home
            </Link>
            <Typography className="home-link disable">Report</Typography>
            <Typography className="home-link current">Inventory Report</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Inventory Report</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={reportProduct} columns={columns} />
      </Box>
    </>
  );
};

export default InventoryReport;
