import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { profileList } from 'constant/other';
import InputDatePicker from 'ui-component/input/InputDatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckoutSummaryReport } from 'actions/admin/masterSummary';

const columns = [
  { accessorKey: 'brand_name', header: 'Brand Name' },
  { accessorKey: 'quantity', header: 'Quantity' },
  { accessorKey: 'keep', header: 'Keep' },
  { accessorKey: 'exchange', header: 'Exchange' },
  { accessorKey: 'return', header: 'Return' },
  { accessorKey: 'purchasePrice', header: 'Purchase Price' },
  { accessorKey: 'salePrice', header: 'Sales Price' }
];

const CheckoutSmRpt = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [profile, setProfile] = useState(1);
  const handleChange = (e) => {
    setProfile(e.target.value);
  };

  const handleFilter = () => {
    dispatch(getCheckoutSummaryReport({ profile, startDate, endDate }));
  };

  const { checkoutSummaryReport } = useSelector((state) => state.masterSummary);
  let updateData = [];
  updateData = checkoutSummaryReport.map((item) => {
    let keepCount = 0;
    let exchangeCount = 0;
    let returnCount = 0;
    item.in_products?.map((a) => {
      a?.products?.map((b) => {
        if (Number(b.keep_status) === 3) {
          keepCount++;
        } else if (Number(b.keep_status) === 2) {
          exchangeCount++;
        } else {
          returnCount++;
        }
      });
    });
    return {
      ...item,
      quantity: keepCount + exchangeCount + returnCount,
      purchasePrice: item?.in_products[0]?.purchase_price,
      salePrice: item?.in_products[0]?.sale_price,
      keep: keepCount,
      exchange: exchangeCount,
      return: returnCount
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Product Checkout Summary</Typography>
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

export default CheckoutSmRpt;
