import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getStyleList } from 'actions/admin/report';
import { DateType } from 'constant/function';

const columns = [
  { accessorKey: 'styleFullName', header: 'Stylist Full Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'assignedCustomer', header: 'Assigned Customer' },
  { accessorKey: 'KidName', header: 'Kid Name' },
  { accessorKey: 'createDate', header: 'Create Date' },
  { accessorKey: 'status', header: 'Status' }
];

const StyleList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStyleList());
  }, [dispatch]);

  const { styleList } = useSelector((state) => state.report);
  let updateData = styleList.map((item) => {
    return {
      ...item,
      email: item.user?.email,
      createDate: DateType(item.created_dt),
      KidName: item.kids_detail?.kids_first_name,
      assignedCustomer: item.user?.name
    };
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

export default StyleList;
