import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Tooltip, Grid, Breadcrumbs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import DFnewLogger from 'utils/DFnewLogger';
import { useDispatch, useSelector } from 'react-redux';
import { getExchangeProduct } from 'actions/admin/product';
import { Gender, removeDuplicates } from 'constant/function';
import { format } from 'date-fns';

const columns = [
  { accessorKey: 'fullName', header: 'Full Name' },
  { accessorKey: 'rqDate', header: 'Rq Date' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'fitNumber', header: 'Fit Number' },
  { accessorKey: 'orderDate', header: 'Order Date' },
  { accessorKey: 'orderNumber', header: 'Order Number' },
  { accessorKey: 'action', header: 'Action' }
];

const ExchangeProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getExchangeProduct());
  }, [dispatch]);

  const { exchangeProduct } = useSelector((state) => state.product);
  let data = removeDuplicates(exchangeProduct, 'payment_id');
  let updateData = data.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Check Product Page" arrow>
          <Button
            className="admin-table-btn password"
            onClick={() => {
              DFnewLogger('Table/email_action');
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Tooltip>
        <Tooltip title="Review" arrow>
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              if (item?.kids_detail?.kids_clothing_gender === 'boys') {
                localStorage.setItem('order', item?.kids_detail?.kid_count);
                navigate(`/dfadmin/boy-view/${item.user.id}`);
              } else if (item?.kids_detail?.kids_clothing_gender === 'girls') {
                localStorage.setItem('order', item?.kids_detail?.kid_count);
                navigate(`/dfadmin/girl-view/${item.user.id}`);
              } else if (Gender(Number(item.user?.user_detail?.gender)) === 'Men') {
                navigate(`/dfadmin/men-view/${item.user.id}`);
              } else {
                navigate(`/dfadmin/women-view/${item.user.id}`);
              }
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </Tooltip>
      </div>
    );
    return {
      ...item,
      orderDate: format(new Date(item?.created), 'yyyy-MM-dd HH:mm:ss'),
      gender: item?.kids_detail
        ? item?.kids_detail?.kids_clothing_gender === 'boys'
          ? 'Boy'
          : 'Girl'
        : Gender(Number(item.user?.user_detail?.gender)),
      fullName: item.user?.user_detail?.first_name + ' ' + item.user?.user_detail?.last_name,
      rqDate: item?.payment_getway?.deliver_date?.date_in_time,
      orderNumber: '#DFPYMID' + item?.payment_getway?.id,
      fitNumber: item?.payment_getway?.count,
      action: action_btn
    };
  });
  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfadmin/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link current">Exchange Products</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Exchange Order Listing</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={updateData} columns={columns} />
      </Box>
    </>
  );
};

export default ExchangeProducts;
