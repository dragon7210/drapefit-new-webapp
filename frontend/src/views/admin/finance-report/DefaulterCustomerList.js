import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import DFnewLogger from 'utils/DFnewLogger';
import { useDispatch, useSelector } from 'react-redux';
import { getDefaultCustomer } from 'actions/admin/product';
import { DateType, Gender } from 'constant/function';

const columns = [
  { accessorKey: 'orderDate', header: 'Order Date' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'kidName', header: 'Kid Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'profileType', header: 'Profile Type' },
  { accessorKey: 'is_stylist', header: 'Stylist Name' },
  { accessorKey: 'finalizeDate', header: 'Finalize Date' },
  { accessorKey: 'count', header: 'Product Count' },
  { accessorKey: 'price', header: 'Product Price' },
  { accessorKey: 'transactions_id', header: 'Transaction No.' },
  { accessorKey: 'action', header: 'Action' }
];

const DefaultCustomerList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDefaultCustomer());
  }, [dispatch]);

  const { defaultCustomerProduct } = useSelector((state) => state.product);

  let updateData = [];
  updateData = defaultCustomerProduct.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Check Out Process" arrow>
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              DFnewLogger('Table/edit_action');
            }}
          >
            <FontAwesomeIcon icon={faClipboardCheck} />
          </Button>
        </Tooltip>
      </div>
    );
    return {
      ...item,
      orderDate: DateType(item.created_dt),
      name: item.user?.name,
      email: item.user?.email,
      profileType: Gender(item.profile_type),
      finalizeDate: DateType(item.finalize_date),
      action: action_btn
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
    </>
  );
};

export default DefaultCustomerList;
