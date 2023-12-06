import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { profileList } from 'constant/other';
import { DateType } from 'constant/function';
import ShowImg from 'ui-component/ShowImg';
import InputDatePicker from 'ui-component/input/InputDatePicker';
import { getExchangeDetailReport } from 'actions/admin/masterSummary';

const columns = [
  { accessorKey: 'product_name_one', header: 'Product Name' },
  { accessorKey: 'style_number', header: 'Style Number' },
  { accessorKey: 'brand_name', header: 'Brand Name' },
  { accessorKey: 'productImage', header: 'Product Image' },
  { accessorKey: 'purchase_price', header: 'Purchase Price' },
  { accessorKey: 'sell_price', header: 'Sale Price' },
  { accessorKey: 'quantity', header: 'Quantity' },
  { accessorKey: 'date', header: 'Date' }
];
const ExchangeProcessedDtRpt = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [profile, setProfile] = useState(1);
  const handleChange = (e) => {
    setProfile(e.target.value);
  };

  const handleFilter = () => {
    dispatch(getExchangeDetailReport({ profile, startDate, endDate }));
  };

  const { exchangeDetailReport } = useSelector((state) => state.masterSummary);
  let updateData = [];
  exchangeDetailReport.map((item) => {
    let Img;
    item?.products?.map((a) => {
      Img = <ShowImg url={'https://www.drapefittest.com/' + a?.product_image} />;
      updateData.push({
        ...a,
        productImage: Img,
        date: DateType(a?.product_purchase_date),
        brand_name: item?.brand_name,
        style_number: item?.style_number,
        quantity: item?.quantity
      });
    });
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Exchange Processed Details</Typography>
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

export default ExchangeProcessedDtRpt;
