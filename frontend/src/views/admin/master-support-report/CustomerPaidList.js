import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEnvelope, faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import DFnewLogger from 'utils/DFnewLogger';
import { DateType, Gender } from 'constant/function';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomPaidList } from 'actions/admin/masterSupport';

const columns = [
  { accessorKey: 'name', header: 'Full Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'account', header: 'Assign Customer Stylist' },
  { accessorKey: 'created', header: 'Create Date' },
  { accessorKey: 'kidName', header: 'Kids Name' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'action', header: 'Action' }
];

const CustomerPaidList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomPaidList());
  }, [dispatch]);

  const { customPaidList } = useSelector((state) => state.masterSupport);
  let updateData = [];
  updateData = customPaidList.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Review" arrow>
          <Button
            className="admin-table-btn password"
            onClick={() => {
              DFnewLogger('Table/review_action');
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </Tooltip>
        <Tooltip title="Email" arrow>
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              DFnewLogger('Table/email_action');
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </Button>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <Button
            className="admin-table-btn delete"
            onClick={() => {
              DFnewLogger('Table/delete_action');
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Tooltip>
      </div>
    );
    return {
      ...item,
      name: item.user?.name,
      email: item.user?.email,
      created: DateType(item.created_dt),
      gender: Gender(Number(item.user?.user_detail?.gender)),
      kidName: item.kids_detail?.kids_first_name,
      action: action_btn
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Customer List Who Paid</Typography>
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

export default CustomerPaidList;
