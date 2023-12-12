import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Tooltip, Grid, Breadcrumbs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import DFnewLogger from 'utils/DFnewLogger';
import { useDispatch, useSelector } from 'react-redux';
import { getDeclineProduct } from 'actions/admin/product';
import { removeDuplicates } from 'constant/function';
import { Gender } from 'constant/function';
import { format } from 'date-fns';

const columns = [
  { accessorKey: 'fullName', header: 'Full Name' },
  { accessorKey: 'kidName', header: 'Kid Name' },
  { accessorKey: 'rqDate', header: 'Rq Date' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'count', header: 'Fit Number' },
  { accessorKey: 'orderDate', header: 'Order Date' },
  { accessorKey: 'orderNumber', header: 'Order Number' },
  { accessorKey: 'action', header: 'Action' }
];

const DeclinedProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDeclineProduct());
  }, [dispatch]);
  const { declineProduct } = useSelector((state) => state.product);
  let data = removeDuplicates(declineProduct, 'payment_id');

  let updateData = data.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Change Product Page" arrow>
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
              if (Gender(Number(item.user?.user_detail?.gender)) === 'Men') {
                navigate(`/dfadmin/men-view/${item.user.id}`);
              } else if (Gender(Number(item.user?.user_detail?.gender)) === 'Women') {
                navigate(`/dfadmin/women-view/${item.user.id}`);
              } else if (Gender(Number(item.user?.user_detail?.gender)) === 'Kid') {
                navigate(`/dfadmin/boy-view/${item.user.id}`);
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
      action: action_btn,
      orderDate: format(new Date(item?.created), 'yyyy-MM-dd HH:mm:ss'),
      gender: item?.kids_detail !== null ? 'Kid' : Gender(Number(item.user?.user_detail?.gender)),
      fullName: item.user?.user_detail?.first_name + ' ' + item.user?.user_detail?.last_name,
      rqDate: item?.payment_getway?.deliver_date?.date_in_time,
      orderNumber: '#DFPYMID' + item?.payment_getway?.id,
      kidName: item.kids_detail?.kids_first_name,
      email: item.user?.email,
      count: item?.payment_getway?.count
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
            <Typography className="home-link current">Declined Products</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Declined Order Listing</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={updateData} columns={columns} />
      </Box>
    </>
  );
};

export default DeclinedProducts;
