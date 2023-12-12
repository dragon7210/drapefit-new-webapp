import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Tooltip, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faTrashCan, faMultiply, faCheck, faEye } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { activeGiftcard, delGiftcard, getGiftcardPrint } from 'actions/admin/giftcard';
import { DateType } from 'constant/function';
import DeleteModal from 'ui-component/modal/DeleteModal';
import GiftcardPrint from 'ui-component/cards/GiftcardPrint';
import { FirstUpper } from 'utils/FirstUpper';

const columns = [
  { accessorKey: 'to_name', header: 'To Name' },
  { accessorKey: 'from_name', header: 'From Name' },
  { accessorKey: 'from_email', header: 'From Email' },
  { accessorKey: 'giftcode', header: 'GiftCode' },
  { accessorKey: 'price', header: 'Price' },
  { accessorKey: 'expiry_date', header: 'Expiry Date' },
  { accessorKey: 'createdDate', header: 'Created Date' },
  { accessorKey: 'deliveryStatus', header: 'Delivery Status' },
  { accessorKey: 'action', header: 'Action' }
];

const GiftCardPrint = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [viewInit, setViewInit] = useState({});
  const handleViewDialog = () => {
    setOpenView(!openView);
  };
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };
  const [openToggleActive, setOpenToggleActive] = useState(false);
  const [toggleMsg, setToggleMsg] = useState('');

  const handleToggleActiveDialog = () => {
    setOpenToggleActive(!openToggleActive);
  };

  useEffect(() => {
    dispatch(getGiftcardPrint());
  }, [dispatch]);
  const { giftcardPrint } = useSelector((state) => state.giftcard);

  console.log(giftcardPrint);

  let updataData = giftcardPrint.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title={item.is_active === true ? 'Deactivate' : 'Activate'} arrow>
          <Button
            className={`admin-table-btn ${item.is_active === true ? 'deactive' : 'disabled'}`}
            onClick={() => {
              setId(item.id);
              setToggleMsg(item.is_active === true ? 'de' : '');
              handleToggleActiveDialog();
            }}
          >
            <FontAwesomeIcon icon={item.is_active === true ? faCheck : faMultiply} />
          </Button>
        </Tooltip>
        <Tooltip title="View" arrow>
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
      deliveryStatus: item.mail_status == 1 ? 'Yes deliveryed' : 'No delivery',
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
        deleteFunction={() => dispatch(delGiftcard({ id, type: 'print' }))}
      />
      <Dialog open={openView} onClose={handleViewDialog}>
        <GiftcardPrint data={viewInit} />
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
      <Dialog open={openToggleActive} onClose={handleToggleActiveDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Are you sure to {toggleMsg}activate?</Typography>
        </DialogTitle>
        <DialogActions>
          <Button className="account-no-btn" onClick={handleToggleActiveDialog}>
            Cancel
          </Button>
          <Button
            className="account-delete-btn"
            onClick={async () => {
              try {
                dispatch(activeGiftcard({ id: id, type: 'print' }));
                handleToggleActiveDialog();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            {FirstUpper(toggleMsg)}activate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GiftCardPrint;
