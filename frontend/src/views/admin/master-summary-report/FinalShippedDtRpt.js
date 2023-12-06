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
import { getFinalizedDetailReport } from 'actions/admin/masterSummary';
import ShowImg from 'ui-component/ShowImg';

const columns = [
  { accessorKey: 'product_name_one', header: 'Product Name' },
  { accessorKey: 'style_number', header: 'Style Number' },
  { accessorKey: 'brandName', header: 'Brand Name' },
  { accessorKey: 'productImage', header: 'Product Image' },
  { accessorKey: 'purchase_price', header: 'Purchase Price' },
  { accessorKey: 'sale_price', header: 'Sale Price' },
  { accessorKey: 'quantity', header: 'Quantity' },
  { accessorKey: 'date', header: 'Date' }
];

const FinalShippedDtRpt = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [profile, setProfile] = useState(1);
  const handleChange = (e) => {
    setProfile(e.target.value);
  };

  const handleFilter = () => {
    dispatch(getFinalizedDetailReport({ profile, startDate, endDate }));
  };

  const { finalizedDetailReport } = useSelector((state) => state.masterSummary);
  let updateData = [];
  updateData = finalizedDetailReport.map((item) => {
    return {
      ...item,
      productImage: <ShowImg url={'https://www.drapefittest.com/inventory/files/product_img/' + item.product_image} />,
      date: DateType(item.created)
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Product Finalized Details</Typography>
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

export default FinalShippedDtRpt;
