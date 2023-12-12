import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Tooltip, Grid, Breadcrumbs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentRefundList } from 'actions/admin/customer';
import { DateType } from 'constant/function';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { Gender } from 'constant/function';

const columns = [
  { accessorKey: 'paymentDate', header: 'Payment Date' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'profileGender', header: 'Profile Gender' },
  { accessorKey: 'count', header: 'Profile Count' },
  { accessorKey: 'transactionId', header: 'Transaction ID.' },
  { accessorKey: 'refundTransactionId', header: 'Refund Transaction ID.' },
  { accessorKey: 'price', header: 'Price' },
  { accessorKey: 'orderType', header: 'Order Type' },
  { accessorKey: 'action', header: 'Action' }
];

const PaymentRefundListing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPaymentRefundList());
  }, [dispatch]);
  const { paymentRefundList } = useSelector((state) => state.customer);
  let updateData = paymentRefundList.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem', alignItems: 'center' }}>
        <Tooltip title="View" arrow>
          <FontAwesomeIcon icon={faPaypal} />
        </Tooltip>
        <div>
          <p style={{ margin: 0 }}>Funded</p>
          <p style={{ margin: 0 }}>{DateType(item.refound_date)}</p>
        </div>
      </div>
    );

    return {
      ...item,
      action: action_btn,
      paymentDate: DateType(item.created_dt),
      name: item.user?.name,
      email: item.user.email,
      profileGender: Gender(Number(item.user?.user_detail.gender)),
      transactionId: item.transactions_id,
      refundTransactionId: item.refund_transactions_id,
      price: '$' + item.price,
      orderType: item?.payment_type === 1 ? 'Box order' : item?.payment_type === 3 ? 'Direct charge' : 'Checkout order'
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
            <Typography className="home-link disable">Customer Report</Typography>
            <Typography className="home-link current">Payment Refund List</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Refund Customer Listing With Status</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={updateData} columns={columns} />
      </Box>
    </>
  );
};

export default PaymentRefundListing;
