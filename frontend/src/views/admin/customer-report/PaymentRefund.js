import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  Typography,
  Tooltip,
  Grid,
  Breadcrumbs,
  Dialog,
  DialogTitle,
  DialogActions,
  InputLabel
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEye } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentRefund, updatePaymentRefund } from 'actions/admin/customer';
import { DateType } from 'constant/function';
import InputForm from 'ui-component/input/InputForm';
import InputTextarea from 'ui-component/input/InputTextarea';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Gender } from 'constant/function';
import { format } from 'date-fns';

const columns = [
  { accessorKey: 'paymentDate', header: 'Payment Date' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'profileGender', header: 'Profile Gender' },
  { accessorKey: 'count', header: 'Profile Count' },
  { accessorKey: 'transactionId', header: 'Transaction ID' },
  { accessorKey: 'price', header: 'Price' },
  { accessorKey: 'orderType', header: 'Order Type' },
  { accessorKey: 'action', header: 'Action' }
];

const PaymentRefund = () => {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [initEdit, setInitEdit] = useState({});

  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };

  useEffect(() => {
    dispatch(getPaymentRefund());
  }, [dispatch]);

  const { paymentRefund } = useSelector((state) => state.customer);
  let updateData = paymentRefund.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="View" arrow>
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              handleEditDialog();
              setInitEdit(item);
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
      paymentDate: format(new Date(item?.created_dt), 'yyyy-MM-dd HH:mm:ss'),
      name: item.user?.name,
      email: item.user?.email,
      profileGender: Gender(Number(item?.profile_type)),
      transactionId: item?.transactions_id,
      price: '$' + item?.price,
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
            <Typography className="home-link current">Payment Refund</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Refund Customer Listing With Status</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={updateData} columns={columns} />
      </Box>
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Transaction Details</Typography>
          <Typography className="paymentInfo">Transactions id : {initEdit?.transactions_id}</Typography>
          <Typography className="paymentInfo">
            Last 4 digits card : {initEdit?.payment_card_detail?.card_number}
          </Typography>
          <Typography className="paymentInfo">Name : {initEdit?.payment_card_detail?.card_name}</Typography>
          <Typography className="paymentInfo">Payment Date : {DateType(initEdit?.created_dt)}</Typography>
          <Typography className="paymentInfo">Email : {initEdit?.user?.email}</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={{ price: initEdit?.price, refund_msg: '', id: initEdit?.id }}
            enableReinitialize
            validationSchema={Yup.object().shape({
              price: Yup.number().required('Price is required'),
              refund_msg: Yup.string().max(30).required('Message is required')
            })}
            onSubmit={async (values) => {
              handleEditDialog();
              dispatch(updatePaymentRefund(values));
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Price *"
                      name="price"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel style={{ padding: '3px 10px' }}>Message *</InputLabel>
                    <InputTextarea
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Message *"
                      name="refund_msg"
                    />
                  </Grid>

                  <Grid item xs={12} className="h-align-right">
                    <Button key="cancel" className="account-no-btn" onClick={handleEditDialog}>
                      Cancel
                    </Button>
                    <Button
                      key="submit"
                      className="account-yes-btn"
                      type="submit"
                      disableElevation
                      disabled={!isValid || !dirty || isSubmitting}
                    >
                      Refund
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentRefund;
