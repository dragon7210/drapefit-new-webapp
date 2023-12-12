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
  DialogActions,
  DialogTitle,
  Checkbox
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import DFnewLogger from 'utils/DFnewLogger';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscription, updateSubscription } from 'actions/admin/subscription';
import { DateType } from 'constant/function';
import { Gender } from 'constant/function';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'profile', header: 'Profile' },
  { accessorKey: 'kidName', header: 'Kid Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'scheduledFixes', header: 'Scheduled Fixes' },
  { accessorKey: 'timeFix', header: 'Time Fix' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'action', header: 'Action' }
];

const SubscriptionCancellation = () => {
  const dispatch = useDispatch();
  const [openVeiw, setOPenView] = useState(false);
  const [edit, setEdit] = useState();
  const [sel, setSel] = useState();
  const [checked, setChecked] = useState(false);
  const array = [1, 2, 3];

  const handleViewDialog = () => {
    setOPenView(!openVeiw);
  };

  useEffect(() => {
    dispatch(getSubscription());
  }, [dispatch]);

  const onSave = () => {
    try {
      dispatch(updateSubscription({ id: edit.id, how_often_would_you_lik_fixes: sel + 1 }));
      handleViewDialog();
    } catch (error) {
      console.log(error);
    }
  };

  const { tableData } = useSelector((state) => state.subscription);
  let updateData = tableData.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="View" arrow>
          <Button
            className="admin-table-btn password"
            onClick={() => {
              handleViewDialog();
              setEdit(item);
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </Tooltip>
        <Tooltip title="Profile" arrow>
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              DFnewLogger('Table/edit_action');
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Tooltip>
      </div>
    );

    return {
      ...item,
      action: action_btn,
      name: item.user?.name,
      profile: Gender(Number(item.user?.user_detail?.gender)),
      email: item.user?.email,
      date: DateType(item.applay_dt),
      scheduledFixes: item.try_new_items_with_scheduled_fixes === 1 ? 'Yes' : 'No',
      timeFix: 'Every ' + item.how_often_would_you_lik_fixes + ' months',
      status: item.try_new_items_with_scheduled_fixes === 1 ? 'Subscription' : 'Un-subscription',
      kidName: item.kids_detail?.kids_first_name
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
            <Typography className="home-link current">Subscription Cancellation</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Refund Customer Listing With Status</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={updateData} columns={columns} />
      </Box>
      <Dialog open={openVeiw} onClose={handleViewDialog}>
        <DialogTitle>
          <Typography className="manage-title">MANAGE FIT SETTINGS</Typography>
          <Typography className="manage-content">How often would you like to receive Fixes?</Typography>
          <div className="manage-check" onClick={() => setChecked(!checked)}>
            <Checkbox checked={checked} />
            <p className="label">Try new items with scheduled Fixes.</p>
          </div>
          <div className="select-month">
            {checked &&
              array.map((item, index) => {
                return (
                  <div
                    className="monthly"
                    key={index}
                    onClick={() => {
                      setSel(index);
                      edit.how_often_would_you_lik_fixes = -1;
                    }}
                    style={{
                      background: (sel === index || edit.how_often_would_you_lik_fixes - 1 === index) && '#e4e4e4'
                    }}
                  >
                    <p className="top">EVERY {item} MONTHLY</p>
                    <p className="bottom">Will ship hand picked products in every month</p>
                  </div>
                );
              })}
          </div>
        </DialogTitle>
        <DialogActions>
          <Button className="account-yes-btn" onClick={onSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SubscriptionCancellation;
