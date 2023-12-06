import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faDownload } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getAutoList } from 'actions/admin/report';
import { DateType, Gender } from 'constant/function';

const columns = [
  { accessorKey: 'orderDate', header: 'Order Date' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'kidName', header: 'Kid Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'profileType', header: 'Profile Type' },
  { accessorKey: 'stylistName', header: 'Stylist Name' },
  { accessorKey: 'finalizeDate', header: 'Finalize Date' },
  { accessorKey: 'count', header: 'Product Count' },
  { accessorKey: 'price', header: 'Product Price' },
  { accessorKey: 'autoCheckoutDate', header: 'Auto Checkout Date' }
];

const AutoCheckoutList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAutoList());
  }, [dispatch]);

  const { autoList } = useSelector((state) => state.report);
  let updateData = [];
  updateData = autoList.map((item) => {
    return {
      ...item,
      orderDate: DateType(item.created_dt),
      name: item.user?.user_detail?.first_name + ' ' + item.user?.user_detail?.last_name,
      email: item.user?.email,
      autoCheckoutDate: DateType(item.auto_check_out_date),
      finalizeDate: DateType(item.finalize_date),
      profileType: Gender(Number(item?.profile_type))
    };
  });
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Default Customer Auto Checkout List</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Box className="table-border container">
        <Grid container>
          <Grid item xs={12} margin="10px" padding={2}>
            <Button variant="contained">
              <FontAwesomeIcon icon={faDownload} />
              &nbsp;Download PDF
            </Button>
            <Button variant="contained">
              <FontAwesomeIcon icon={faDownload} />
              &nbsp;Download EXCEL
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Table data={updateData} columns={columns} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AutoCheckoutList;
