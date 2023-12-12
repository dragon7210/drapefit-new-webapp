import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import DFnewLogger from 'utils/DFnewLogger';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviewWorkList } from 'actions/admin/masterSupport';
import { DateType, Gender } from 'constant/function';

const columns = [
  { accessorKey: 'name', header: 'Clinet Name' },
  { accessorKey: 'kidName', header: 'Kids Name' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'orderDate', header: 'Order Date' },
  { accessorKey: 'customEmail', header: 'Custom Email' },
  { accessorKey: 'count', header: 'Fit Number' },
  { accessorKey: 'listProduct', header: 'List of Product added' },
  { accessorKey: 'productFinalize', header: 'Product finalized or not' },
  { accessorKey: 'transactions_id', header: 'Transaction Number' },
  { accessorKey: 'transactionNumber', header: 'Transaction Number Checkout Order' },
  { accessorKey: 'refund_transactions_id', header: 'Refund Transaction Number' },
  { accessorKey: 'refund_amount', header: 'Refund Amount' },
  { accessorKey: 'tracking', header: 'USPS Tracking' },
  { accessorKey: 'inventoryCheckout', header: 'Inventory Checkout' },
  { accessorKey: 'calculationFee', header: 'Stying Fees calculation with refund Box order' },
  { accessorKey: 'fee', header: 'Stying Fees' },
  { accessorKey: 'productShipped', header: 'Product shipped Amount' },
  { accessorKey: 'adjustment', header: 'with adjustment 25% amount' },
  { accessorKey: 'salesTax', header: 'Sales tax' },
  { accessorKey: 'orderTotal', header: 'Order Total' },
  { accessorKey: 'return', header: 'Return/Exchange Amount' },
  { accessorKey: 'lostAmount', header: 'Lost Amount' },
  { accessorKey: 'checkoutAmount', header: 'Checkout Amount' }
];

const PreviousWorkList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPreviewWorkList());
  }, [dispatch]);
  const { previewWorkList } = useSelector((state) => state.masterSupport);
  let updateData = [];
  updateData = previewWorkList.map((item) => {
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
              DFnewLogger('Table/review_action');
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </Tooltip>
      </div>
    );
    return {
      ...item,
      name: item.user?.name,
      gender: Gender(Number(item.user?.user_detail?.gender)),
      kidName: item?.kids_detail?.kids_first_name,
      customEmail: item.user?.email,
      orderDate: DateType(item?.created_dt),
      productFinalize: 'Product finalized or not',
      transactionNumber: 'Transaction Number Checkout Order',
      inventoryCheckout: 'Inventory checkout',
      calculationFee: 'Styling Fees calculation witd refund Box order',
      fee: item?.kids_detail ? 10 : 20,
      productShipped: 'Product Shipped Amount',
      adjustment: 'witd adjustment 25% amount',
      salesTax: 'Sales tax',
      orderTotal: 'Order Total',
      return: 'Return/Exchange Amount',
      lostAmount: 'Lost Amount',
      checkoutAmount: 'Checkout Amount',
      action: action_btn
    };
  });
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Previous Work List</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Box className="table-border">
        <Table data={updateData} columns={columns} />
      </Box>
    </>
  );
};

export default PreviousWorkList;
