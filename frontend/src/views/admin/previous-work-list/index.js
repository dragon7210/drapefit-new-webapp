import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import DFnewLogger from 'utils/DFnewLogger';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviewWorkList, delPreviousWorkList } from 'actions/admin/customer';
import { DateType, Gender } from 'constant/function';
import DeleteModal from 'ui-component/modal/DeleteModal';

const columns = [
  { accessorKey: 'fullName', header: 'Full Name' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'profile', header: 'Profile' },
  { accessorKey: 'orderDate', header: 'Order Date' },
  { accessorKey: 'assigncustomerstylist', header: 'Assign Customer Stylist' },
  { accessorKey: 'customerAction', header: 'Customer Action' },
  { accessorKey: 'kidName', header: 'Kid Name' },
  { accessorKey: 'assignkidstylist', header: 'Assign Kid Stylist' },
  { accessorKey: 'kidAction', header: 'Kid Action' },
  { accessorKey: 'action', header: 'Action' }
];

const PreviousWorkList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPreviewWorkList());
  }, [dispatch]);
  const [id, setId] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };
  const { previewWorkList } = useSelector((state) => state.customer);
  let updateData = previewWorkList.map((item) => {
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
    const del_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Delete" arrow>
          <Button
            className="admin-table-btn delete"
            onClick={() => {
              handleDeleteDialog();
              setId(item.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Tooltip>
      </div>
    );

    return {
      ...item,
      orderDate: DateType(item.created_dt),
      fullName: item.user?.user_detail?.first_name + ' ' + item.user?.user_detail?.last_name,
      gender: Gender(Number(item.profile_type)),
      customerAction: action_btn,
      action: del_btn
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
      <DeleteModal
        openDelete={openDelete}
        handleDeleteDialog={handleDeleteDialog}
        deleteFunction={() => dispatch(delPreviousWorkList({ id: id }))}
      />
    </>
  );
};

export default PreviousWorkList;
