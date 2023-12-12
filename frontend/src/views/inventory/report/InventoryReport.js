import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Breadcrumbs, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getReportProduct } from 'actions/inventory/product';

const columns = [
  { accessorKey: 'Name', header: 'Name' },
  { accessorKey: 'men', header: 'Men' },
  { accessorKey: 'menTotal', header: 'Men Total' },
  { accessorKey: 'women', header: 'Women' },
  { accessorKey: 'womenTotal', header: 'Women Total' },
  { accessorKey: 'boy', header: 'Boy Kid' },
  { accessorKey: 'boyTotal', header: 'Boy Kid Total' },
  { accessorKey: 'girl', header: 'Girl Kid' },
  { accessorKey: 'girlTotal', header: 'Girl Kid Total' }
];

const InventoryReport = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReportProduct());
  }, [dispatch]);

  const { reportProduct } = useSelector((state) => state.invProduct);
  let updateData = reportProduct.map((item) => {
    let menArray = item?.in_products?.filter((i) => i.profile_type === 1);
    let sumMen = 0;
    menArray.map((i) => {
      sumMen += Number(i.sale_price);
    });
    let womenArray = item?.in_products?.filter((i) => i.profile_type === 2);
    let sumWomen = 0;
    womenArray.map((i) => {
      sumWomen += Number(i.sale_price);
    });
    let boyArray = item?.in_products?.filter((i) => i.profile_type === 3);
    let sumBoy = 0;
    boyArray.map((i) => {
      sumBoy += Number(i.sale_price);
    });
    let girlArray = item?.in_products?.filter((i) => i.profile_type === 4);
    let sumGirl = 0;
    girlArray.map((i) => {
      sumGirl += Number(i.sale_price);
    });
    return {
      ...item,
      Name: item?.name + ' ' + item?.last_name,
      men: menArray.length,
      menTotal: Math.round(sumMen * 100) / 100,
      women: womenArray.length,
      womenTotal: Math.round(sumWomen * 100) / 100,
      boy: boyArray.length,
      boyTotal: Math.round(sumBoy * 100) / 100,
      girl: girlArray.length,
      girlTotal: Math.round(sumGirl * 100) / 100
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
            <Typography className="home-link disable">Report</Typography>
            <Typography className="home-link current">Inventory Report</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Inventory Report</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={updateData} columns={columns} />
      </Box>
    </>
  );
};

export default InventoryReport;
