import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Tooltip, Grid, Breadcrumbs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getPaidList, delPaidList } from 'actions/admin/customer';
import { Gender } from 'constant/function';
import DeleteModal from 'ui-component/modal/DeleteModal';
import { format } from 'date-fns';
import EmpSelect from './EmpSelect';

const columns = [
  { accessorKey: 'fullName', header: 'Full Name' },
  { accessorKey: 'rqDate', header: 'Rq Date' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'count', header: 'Fit Number' },
  { accessorKey: 'orderDate', header: 'Order Date' },
  { accessorKey: 'orderNumber', header: 'Order Number' },
  { accessorKey: 'previous', header: 'Previous', size: 170 },
  { accessorKey: 'assignEmployee', header: 'Assign Employee' },
  { accessorKey: 'customerAction', header: 'Customer Action', size: 300 },
  { accessorKey: 'kidName', header: 'Kid Name' },
  { accessorKey: 'assignEmployeeKid', header: 'Assign Employee (Kid)' },
  { accessorKey: 'kidsAction', header: 'Kids Action', size: 300 },
  { accessorKey: 'delete', header: 'Delete' }
];

const PaidList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };

  useEffect(() => {
    dispatch(getPaidList());
  }, [dispatch]);

  const { paidList } = useSelector((state) => state.customer);
  const { emp_initial } = useSelector((state) => state.initial);

  let updateData = paidList.map((item) => {
    const actionBTN = (
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Link to="/dfadmin/customer/paid-list/extra-product">
            <Button fullWidth variant="contained" color="primary">
              Extra Product
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
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
            View Profile
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Link to="/dfadmin/customer/paid-list/product-list">
            <Button fullWidth variant="contained" color="secondary">
              Product List
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="/dfadmin/customer/paid-list/order-receipt">
            <Button fullWidth variant="contained" color="secondary">
              Order Receipt
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="/dfadmin/customer/paid-list/catelog">
            <Button fullWidth variant="contained" color="success">
              Catelog
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="/dfadmin/customer/paid-list/email">
            <Button fullWidth variant="contained" color="success">
              Email
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to={`/dfadmin/customer/paid-list/matching/${item?.id} `}>
            <Button fullWidth variant="contained" color="warning">
              Matching
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to={`/dfadmin/customer/paid-list/browse-all/${item?.id}`}>
            <Button fullWidth variant="contained" color="warning">
              Browse All
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="/dfadmin/customer/paid-list/previous-work">
            <Button fullWidth variant="contained" color="error">
              MPWL
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="/dfadmin/customer/paid-list/previous-order">
            <Button fullWidth variant="contained" color="error">
              Prev Order
            </Button>
          </Link>
        </Grid>
      </Grid>
    );
    const deleteBTN = (
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
    );
    const previous = (
      <>
        <p style={{ margin: 0, whiteSpace: 'nowrap' }}>
          <span style={{ fontWeight: 'bold' }}>Stylist</span> :{' '}
          {emp_initial?.emp?.filter((i) => i.id === item?.emp_id)[0]?.name ?? 'Not yet'}
        </p>
        <p style={{ margin: 0, whiteSpace: 'nowrap' }}>
          <span style={{ fontWeight: 'bold' }}>Inventory</span>:{' '}
          {emp_initial?.inventory?.filter((i) => i.id === item?.inv_id)[0]?.name ?? 'Not yet'}
        </p>
        <p style={{ margin: 0, whiteSpace: 'nowrap' }}>
          <span style={{ fontWeight: 'bold' }}>QA</span>:{' '}
          {emp_initial?.qa?.filter((i) => i.id === item?.qa_id)[0]?.name ?? 'Not yet'}
        </p>
        <p style={{ margin: 0, whiteSpace: 'nowrap' }}>
          <span style={{ fontWeight: 'bold' }}>Support</span>:{' '}
          {emp_initial?.support?.filter((i) => i.id === item?.support_id)[0]?.name ?? 'Not yet'}
        </p>
      </>
    );
    const assignEmployee = item?.profile_type !== 3 ? <EmpSelect data={item} /> : '';
    const assignEmployeeKid = item?.profile_type === 3 ? <EmpSelect data={item} /> : '';

    return {
      ...item,
      rqDate: item.deliver_date?.date_in_time,
      orderDate: format(new Date(item?.created_dt), 'yyyy-MM-dd HH:mm:ss'),
      delete: deleteBTN,
      previous: previous,
      fullName: item?.user?.user_detail?.first_name + ' ' + item?.user?.user_detail?.last_name,
      gender: item.kids_detail !== null ? 'Kid' : Gender(Number(item.user?.user_detail.gender)),
      customerAction: item.kids_detail ? '' : actionBTN,
      kidsAction: item.kids_detail ? actionBTN : '',
      kidName: item.kids_detail ? item.kids_detail.kids_first_name : '',
      orderNumber: '#DFPYMID' + item?.id,
      assignEmployee,
      assignEmployeeKid
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
            <Typography className="home-link disable">Customer</Typography>
            <Typography className="home-link current">Paid List</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Customer List Who Paid</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={updateData} columns={columns} />
      </Box>
      <DeleteModal
        openDelete={openDelete}
        handleDeleteDialog={handleDeleteDialog}
        deleteFunction={() => dispatch(delPaidList({ id: id }))}
      />
    </>
  );
};

export default PaidList;
