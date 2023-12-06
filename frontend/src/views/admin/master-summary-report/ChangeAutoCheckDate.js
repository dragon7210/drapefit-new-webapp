import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Tooltip, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getChangeAutoCheckout, updateChangeAutoCheckout } from 'actions/admin/masterSummary';
import { DateType } from 'constant/function';
import InputDatePicker from 'ui-component/input/InputDatePicker';

const columns = [
  { accessorKey: 'payment_id', header: 'Payment ID' },
  { accessorKey: 'name', header: 'User Name' },
  { accessorKey: 'email', header: 'User Email' },
  { accessorKey: 'kidName', header: 'Kid Name' },
  { accessorKey: 'fit', header: 'FIT' },
  { accessorKey: 'shippingDate', header: 'Shipping Date' },
  { accessorKey: 'autoCheckoutDate', header: 'Auto Checkout Date' },
  { accessorKey: 'paymentDate', header: 'Payment Date' },
  { accessorKey: 'action', header: 'Action' }
];

const ChangeAutoCheckDate = () => {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  const [date, setDate] = useState(new Date());
  const [payment_id, setPayment_id] = useState();

  useEffect(() => {
    dispatch(getChangeAutoCheckout());
  }, [dispatch]);
  const { changeAutoCheckout } = useSelector((state) => state.masterSummary);
  let updateData = [];
  updateData = changeAutoCheckout.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Check Out Process" arrow>
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              handleEditDialog();
              setDate(item?.auto_checkout_date ? new Date(item?.auto_checkout_date) : new Date());
              setPayment_id(item.payment_id);
            }}
          >
            <FontAwesomeIcon icon={faClipboardCheck} />
          </Button>
        </Tooltip>
      </div>
    );
    return {
      ...item,
      action: action_btn,
      name: item.user?.user_detail?.first_name + ' ' + item.user?.user_detail?.last_name,
      email: item.user?.email,
      kidName: item.kids_detail?.kids_first_name,
      shippingDate: DateType(item?.shipping_date),
      autoCheckoutDate: item?.auto_checkout_date ? DateType(item?.auto_checkout_date) : '',
      paymentDate: DateType(item?.payment_getway?.created_dt)
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Default Customer List Who Not Checkout</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Box className="table-border">
        <Table data={updateData} columns={columns} />
      </Box>
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Update auto checkout date</Typography>
        </DialogTitle>
        <DialogActions>
          <div style={{ marginRight: '10px' }}>
            <InputDatePicker value={date} onChangeDate={(e) => setDate(e.$d)} />
          </div>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(updateChangeAutoCheckout({ auto_checkout_date: date, payment_id }));
              handleEditDialog();
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangeAutoCheckDate;
