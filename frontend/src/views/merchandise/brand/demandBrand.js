import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  TextField
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import MaterialReactTable from 'material-react-table';
import 'yup-phone-lite';
import { LABEL_SEL_CATEGORY, profileList } from 'constant/other';
import { getProductList } from 'actions/inventory/product';
import { getProductCategories } from 'actions/inventory/productCategory';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ShowImg from 'ui-component/ShowImg';

const columns = [
  { accessorKey: 'no', header: '#', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'brandName', header: 'Brand Name' },
  { accessorKey: 'productImage', header: 'Product Image', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'purchasePrice', header: 'Purchase Price', enableColumnFilter: false },
  { accessorKey: 'salePrice', header: 'Sale Price', enableColumnFilter: false },
  { accessorKey: 'quantity', header: 'Quantity', enableColumnFilter: false },
  { accessorKey: 'used', header: 'Used', enableColumnFilter: false },
  { accessorKey: 'currentStock', header: 'Current Stock', enableColumnFilter: false },
  { accessorKey: 'styleNo', header: 'Style NO.' },
  { accessorKey: 'demand', header: 'Demand.' }
];

const DemandBrand = () => {
  const dispatch = useDispatch();
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [filter, setFilter] = useState({
    profile: 'men',
    categoryId: LABEL_SEL_CATEGORY
  });

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getProductList({ profile: filter.profile, categoryId: filter.categoryId }));
  }, [dispatch, filter]);

  const { tableData, rowCount } = useSelector((state) => state.invProduct);
  const { prodCategories } = useSelector((state) => state.invProductCategory);
  let updateData = [];
  let rowNum = pagination.pageIndex * pagination.pageSize;
  if (tableData.length) {
    updateData = tableData.map((item, index) => {
      rowNum++;
      return {
        ...item,
        no: rowNum,
        productImage: <ShowImg url={item.productImage} />,
        styleNo: `${item.styleNo ? item.styleNo : `Product-`}` + `1`,
        demand: (
          <div key={index} style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
            {((item.used * 10) / item.quantity).toFixed() > 7 && (
              <p style={{ color: 'white', backgroundColor: 'green', textAlign: 'center', width: '70px' }}>High</p>
            )}
            {8 > ((item.used * 10) / item.quantity).toFixed() && ((item.used * 10) / item.quantity).toFixed() > 3 && (
              <p style={{ color: 'white', backgroundColor: 'blue', textAlign: 'center', width: '70px' }}>Average</p>
            )}
            {((item.used * 10) / item.quantity).toFixed() < 4 && (
              <p style={{ color: 'white', backgroundColor: 'red', textAlign: 'center', width: '70px' }}>Low</p>
            )}
          </div>
        )
      };
    });
  }
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfadmin/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link disable">Brand</Typography>
            <Typography className="home-link current">Brand Demand Report</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Brand Demand Report</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Grid container padding={3} spacing={2}>
          <Grid item sm={2}>
            <FormControl fullWidth>
              <InputLabel id="profile">Profile</InputLabel>
              <Select
                size="small"
                labelId="profile"
                label="Profile"
                name="profile"
                value={filter.profile}
                onChange={handleChange}
              >
                {profileList.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={2}>
            <FormControl fullWidth>
              <InputLabel id="profile">Category</InputLabel>
              <Select
                size="small"
                labelId="categoryId"
                label="Category"
                name="categoryId"
                value={filter.categoryId}
                onChange={handleChange}
              >
                <MenuItem key="--category--" value={LABEL_SEL_CATEGORY}>
                  <span>{LABEL_SEL_CATEGORY}</span>
                </MenuItem>
                {prodCategories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.value}
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
        </Grid>
        <MaterialReactTable
          columns={columns}
          data={updateData}
          enablePagination
          defaultColumn={{ minSize: 30, maxSize: 400, size: 50 }}
          manualFiltering
          manualPagination
          manualSorting
          onColumnFiltersChange={setColumnFilters}
          onGlobalFilterChange={setGlobalFilter}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          rowCount={rowCount}
          state={{ columnFilters, globalFilter, pagination, sorting }}
          enableStickyHeader
          muiTableHeadProps={{ sx: { zIndex: 1 } }}
          muiTableContainerProps={{ sx: { maxHeight: '50vh' } }}
        />
      </Box>
    </>
  );
};

export default DemandBrand;
