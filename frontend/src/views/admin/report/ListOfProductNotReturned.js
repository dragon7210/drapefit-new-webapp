import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getListOfProductNotReturned } from 'actions/admin/report';
import { DateType, Gender } from 'constant/function';

const columns = [
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'kidName', header: 'Kids Name' },
  { accessorKey: 'birthday', header: 'Birthday' }
];

const ListOfProductNotReturned = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListOfProductNotReturned());
  }, [dispatch]);

  const { listOfProductNotReturnedList } = useSelector((state) => state.report);
  let updateData = listOfProductNotReturnedList.map((item) => {
    return {
      ...item,
      name: item?.user_detail?.first_name + ' ' + item?.user_detail?.last_name,
      gender: Gender(Number(item?.user_detail?.gender)),
      birthday: DateType(item.user_detail?.dateofbirth),
      kidName: item.kids_detail?.kids_first_name
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

export default ListOfProductNotReturned;
