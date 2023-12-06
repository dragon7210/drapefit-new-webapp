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
  Tooltip,
  Button
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faPrint, faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
import { LABEL_SEL_CATEGORY, profileList } from 'constant/other';
import { getProductList } from 'actions/inventory/product';
import { getProductCategories } from 'actions/inventory/productCategory';
import MaterialReactTable from 'material-react-table';
import ShowImg from 'ui-component/ShowImg';
import 'yup-phone-lite';

const columns = [
  { accessorKey: 'no', header: '#', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'brandName', header: 'Brand Name' },
  { accessorKey: 'productImage', header: 'Product Image', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'purchasePrice', header: 'Price', enableColumnFilter: false },
  { accessorKey: 'description', header: 'Product Description', enableColumnFilter: false },
  { accessorKey: 'prodCategoryId', header: 'Product Category', enableColumnFilter: false },
  { accessorKey: 'purchasePrice', header: 'Purchase Price', enableColumnFilter: false },
  { accessorKey: 'salePrice', header: 'Sale Price', enableColumnFilter: false },
  { accessorKey: 'website', header: 'Websites', enableColumnFilter: false },
  { accessorKey: 'source', header: 'Source', enableColumnFilter: false },
  { accessorKey: 'action', header: 'Action' }
];

const Product = () => {
  const dispatch = useDispatch();
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

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
        action: (
          <div key={index} style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
            <Tooltip title="Edit" arrow>
              <Button className="admin-table-btn password margin">
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </Tooltip>
            <Tooltip title="Delete" arrow>
              <Button className="admin-table-btn delete margin">
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </Tooltip>
            <Tooltip title="Print" arrow>
              <Button className="admin-table-btn deactive margin">
                <FontAwesomeIcon icon={faPrint} />
              </Button>
            </Tooltip>
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
            <Typography className="home-link disable">Pricing</Typography>
            <Typography className="home-link current">Products Price List</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Products Price List</Typography>
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

export default Product;
