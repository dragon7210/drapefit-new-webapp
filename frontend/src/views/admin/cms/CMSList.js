import { useEffect } from 'react';
import { Button, Box, Typography, Tooltip, Grid, Breadcrumbs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit } from '@fortawesome/free-solid-svg-icons';
import { getCMS } from 'actions/admin/cms';
import { Link } from 'react-router-dom';
import Table from 'ui-component/Table';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const columns = [
  { accessorKey: 'name', header: 'Page Title' },
  { accessorKey: 'action', header: 'Action' }
];

const CMSList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCMS());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.cms);
  let updateData = tableData.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Edit" arrow>
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              navigate(`/dfadmin/cms-edit/${item.id}`);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Tooltip>
      </div>
    );
    return {
      ...item,
      action: action_btn
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
            <Typography className="home-link current">CMS List</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Page Listing</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={updateData} columns={columns} />
      </Box>
    </>
  );
};

export default CMSList;
