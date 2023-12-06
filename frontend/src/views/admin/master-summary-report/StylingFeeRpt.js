import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { profileList } from 'constant/other';
import { DateType } from 'constant/function';
import InputDatePicker from 'ui-component/input/InputDatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { getStylingFeeReport } from 'actions/admin/masterSummary';

const columns = [
  { accessorKey: 'name', header: 'User Name' },
  { accessorKey: 'kidName', header: 'Kid Name' },
  { accessorKey: 'fee', header: 'Fee' },
  { accessorKey: 'shipping', header: 'Shipping date' },
  { accessorKey: 'auto', header: 'Auto checkout date' },
  { accessorKey: 'payment', header: 'Payment date' }
];

const StylingFeeRpt = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [profile, setProfile] = useState(1);
  const handleChange = (e) => {
    setProfile(e.target.value);
  };

  const handleFilter = () => {
    dispatch(getStylingFeeReport({ profile, startDate, endDate }));
  };

  const { stylingFeeReport } = useSelector((state) => state.masterSummary);
  let updateData = [];
  stylingFeeReport.map((item) => {
    item?.products?.map((a) => {
      updateData.push({
        name: a?.user?.name,
        kidName: a?.kids_detail?.kids_first_name,
        fee: a?.kids_detail ? '10' : '20',
        shipping: DateType(a?.shipping_date),
        auto: DateType(a?.auto_checkout_date),
        payment: DateType(a?.payment_getway?.finalize_date)
      });
    });
  });
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Product Styling Fee Report</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Box className="table-border container">
        <Grid container display="flex" spacing={2} item xs={12} margin="10px" className="v-align-center">
          <Grid item sm={2}>
            <FormControl fullWidth>
              <InputLabel id="profile">Profile</InputLabel>
              <Select
                size="small"
                labelId="profile"
                label="Profile"
                name="profile"
                value={profile}
                onChange={handleChange}
              >
                {profileList.map((item, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <InputDatePicker label="Start" value={startDate} onChangeDate={(e) => setStartDate(e.$d)} />
          </Grid>
          <Grid item xs={2}>
            <InputDatePicker label="End" value={endDate} onChangeDate={(e) => setEndDate(e.$d)} />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleFilter}>
              Filter
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Table data={updateData} columns={columns} />
        </Grid>
      </Box>
    </>
  );
};

export default StylingFeeRpt;
