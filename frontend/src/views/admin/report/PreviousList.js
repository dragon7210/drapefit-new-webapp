import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faDownload } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviewWorkList } from 'actions/admin/customer';
import { DateType } from 'constant/function';
import { Gender } from 'constant/function';

const columns = [
  { accessorKey: 'fullName', header: 'Full Name' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'profile', header: 'Profile' },
  { accessorKey: 'orderDate', header: 'Order Date' },
  { accessorKey: 'assigncustomerstylist', header: 'Assign Customer Stylist' },
  { accessorKey: 'kidName', header: 'Kid Name' },
  { accessorKey: 'assignkidstylist', header: 'Assign Kid Stylist' }
];

const PreviousList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPreviewWorkList());
  }, [dispatch]);

  const { previewWorkList } = useSelector((state) => state.customer);
  let updateData = previewWorkList.map((item) => {
    return {
      ...item,
      orderDate: DateType(item.created_dt),
      fullName: item.user?.user_detail?.first_name + ' ' + item.user?.user_detail?.last_name,
      gender: Gender(Number(item.profile_type)),
      kidName: item.kids_detail?.kids_first_name
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Previous Work List Reports</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Box className="table-border container">
        <Grid container>
          <Grid item xs={12} margin="10px">
            <Button variant="contained">
              <FontAwesomeIcon icon={faDownload} />
              &nbsp;Download PDF
            </Button>{' '}
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

export default PreviousList;
