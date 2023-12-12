import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Typography,
  Breadcrumbs,
  Box,
  FormControl,
  Select,
  MenuItem,
  Button,
  TextField,
  InputLabel
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import Table from 'ui-component/Table';
import { profileList, selectProps } from 'constant/other';
import { getSummaryProduct } from 'actions/inventory/product';
import { useDispatch, useSelector } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getProductCategories } from 'actions/inventory/productCategory';

const columns = [
  { accessorKey: 'brand_name', header: 'Brand Name' },
  { accessorKey: 'quantity', header: 'Quantity' },
  { accessorKey: 'used', header: 'Used' },
  { accessorKey: 'currentStock', header: 'Current Stock' },
  { accessorKey: 'purchase_price', header: 'Purchase Price' },
  { accessorKey: 'sale_price', header: 'Sales Price' }
];

const InventorySummary = () => {
  const dispatch = useDispatch();
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [filter, setFilter] = useState({
    profile: 0,
    categoryId: ''
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getSummaryProduct(filter));
  }, [dispatch, filter]);

  const { summaryProduct } = useSelector((state) => state.invProduct);
  const { prodCategories } = useSelector((state) => state.invProductCategory);

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDesktop} />
              &nbsp;&nbsp;Home
            </Link>
            <Typography className="home-link disable">Report</Typography>
            <Typography className="home-link current">Inventory Summary</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Inventory Summary</Typography>
        </Grid>
      </Grid>
      <Box className="table-border container">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth>
                  <Select
                    name="profile"
                    onChange={handleChange}
                    MenuProps={selectProps}
                    value={filter.profile}
                    size="small"
                  >
                    {profileList.map((item, index) => (
                      <MenuItem key={index} value={index}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={2}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    size="small"
                    label="Category"
                    name="categoryId"
                    value={filter.categoryId}
                    onChange={handleChange}
                  >
                    {prodCategories.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.$d)}
                    renderInput={(props) => <TextField {...props} size="small" fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item sm={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.$d)}
                    renderInput={(props) => <TextField {...props} size="small" fullWidth />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={2} md={1}>
                <Button className="admin-submit-btn">Filter</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Table data={summaryProduct} columns={columns} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default InventorySummary;
