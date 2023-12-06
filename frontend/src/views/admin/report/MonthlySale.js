import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlySale } from 'actions/admin/report';
import { DateType } from 'constant/function';
import ShowImg from 'ui-component/ShowImg';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'img', header: 'Image' },
  { accessorKey: 'sell_price', header: 'Price' },
  { accessorKey: 'date', header: 'Created Date' },
  { accessorKey: 'barcode_value', header: 'Barcode' }
];

const MonthlySale = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMonthlySale());
  }, [dispatch]);

  const { monthlySaleList } = useSelector((state) => state.report);
  let updateData = monthlySaleList.map((item) => {
    return {
      ...item,
      name: item?.user_detail?.first_name + ' ' + item?.user_detail?.last_name,
      img: <ShowImg url={`https://www.drapefittest.com/${item?.product_image}`} />,
      date: DateType(item?.created)
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Sale</Typography>
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

export default MonthlySale;
