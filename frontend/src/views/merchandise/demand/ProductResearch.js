import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Grid, Breadcrumbs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';

import MaterialReactTable from 'material-react-table';
import 'yup-phone-lite';

import { LABEL_SEL_CATEGORY } from 'constant/other';
import { getProductList } from 'actions/inventory/product';
import { getProductCategories } from 'actions/inventory/productCategory';
import ShowImg from 'ui-component/ShowImg';

const columns = [
  { accessorKey: 'no', header: '#', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'brandName', header: 'Brand Name' },
  { accessorKey: 'productImage', header: 'Product Image', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'purchasePrice', header: 'Price', enableColumnFilter: false },
  { accessorKey: 'description', header: 'Product Description', enableColumnFilter: false },
  { accessorKey: 'prodCategoryId', header: 'Product Category', enableColumnFilter: false },
  { accessorKey: 'website', header: 'Websites', enableColumnFilter: false },
  { accessorKey: 'source', header: 'Source', enableColumnFilter: false },
  { accessorKey: 'demand', header: 'Demand' }
];
const ProductResearch = () => {
  const dispatch = useDispatch();
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [filter, setFilter] = useState({
    profile: 'women',
    categoryId: LABEL_SEL_CATEGORY
  });

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getProductList({ profile: filter.profile, categoryId: filter.categoryId }));
  }, [dispatch, filter]);

  const { tableData, rowCount } = useSelector((state) => state.invProduct);

  let updateData = [];
  let rowNum = pagination.pageIndex * pagination.pageSize;
  if (tableData.length) {
    updateData = tableData.map((item) => {
      rowNum++;
      return {
        ...item,
        no: rowNum,
        productImage: <ShowImg url={item.productImage} />,
        styleNo: `${item.styleNo ? item.styleNo : `Product-`}` + `1`,
        demand: <></>
      };
    });
  }

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfadmin/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link disable">Demand and Trend</Typography>
            <Typography className="home-link current">Product Research and Analysis</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Product Research and Analysis</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
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

export default ProductResearch;
