import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Tooltip, Button, Dialog, DialogActions } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faTrashCan, faEye } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { delGiftcard, getGiftcardEmail } from 'actions/admin/giftcard';
import { DateType } from 'constant/function';
import DeleteModal from 'ui-component/modal/DeleteModal';
import GiftcardEmail from 'ui-component/cards/GiftcardEmail';

const columns = [
  { accessorKey: 'to_name', header: 'To Name' },
  { accessorKey: 'to_email', header: 'To Email' },
  { accessorKey: 'from_name', header: 'From Name' },
  { accessorKey: 'from_email', header: 'From Email' },
  { accessorKey: 'giftcode', header: 'GiftCode' },
  { accessorKey: 'price', header: 'Price' },
  { accessorKey: 'delivery_date', header: 'Delivery Date' },
  { accessorKey: 'expiry_date', header: 'Expiry Date' },
  { accessorKey: 'createdDate', header: 'Created Date' },
  { accessorKey: 'deliveryStatus', header: 'Delivery Status' },
  { accessorKey: 'action', header: 'Action' }
];

const GiftCardEmail = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [viewInit, setViewInit] = useState({});
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };
  const [openView, setOpenView] = useState(false);
  const handleViewDialog = () => {
    setOpenView(!openView);
  };

  useEffect(() => {
    dispatch(getGiftcardEmail());
  }, [dispatch]);

  const { giftcardEmail } = useSelector((state) => state.giftcard);
  let updataData = giftcardEmail.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Email" arrow>
          <Button
            className="admin-table-btn password"
            onClick={() => {
              handleViewDialog();
              setViewInit(item);
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <Button
            className="admin-table-btn delete"
            onClick={() => {
              setId(item.id);
              handleDeleteDialog();
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Tooltip>
      </div>
    );
    return {
      ...item,
      createdDate: DateType(item.created_dt),
      expiry_date: DateType(item.expiry_date),
      delivery_date: DateType(item.delivery_date),
      deliveryStatus: item.mail_status === 1 ? 'Yes deliveryed' : 'No delivery',
      action: action_btn
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Gift Card Email</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Box className="table-border">
        <Table data={updataData} columns={columns} />
      </Box>
      <DeleteModal
        openDelete={openDelete}
        handleDeleteDialog={handleDeleteDialog}
        deleteFunction={() => dispatch(delGiftcard({ id, type: 'email' }))}
      />
      <Dialog open={openView} onClose={handleViewDialog}>
        <GiftcardEmail data={viewInit} />
        <DialogActions>
          <Button
            className="account-no-btn"
            onClick={() => {
              window.print();
              handleViewDialog();
            }}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GiftCardEmail;
