import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Grid, Breadcrumbs, Tooltip, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faDownload, faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
import { LABEL_SEL_CATEGORY } from 'constant/other';
import { getProductList } from 'actions/inventory/product';
import { getProductCategories } from 'actions/inventory/productCategory';
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { process } from '@progress/kendo-data-query';
import MaterialReactTable from 'material-react-table';
import GenFileName from 'utils/GenFileName';
import ShowImg from 'ui-component/ShowImg';
import 'yup-phone-lite';

const columns = [
  { accessorKey: 'no', header: '#', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'brandName', header: 'Brand Name' },
  { accessorKey: 'productImage', header: 'Product Image', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'purchaseName', header: 'Product Name', enableColumnFilter: false },
  { accessorKey: 'season', header: 'Season', enableColumnFilter: false },
  { accessorKey: 'purchasePrice', header: 'Purchase Price', enableColumnFilter: false },
  { accessorKey: 'sellPrice', header: 'Sell Price', enableColumnFilter: false },
  { accessorKey: 'description', header: 'Product Description', enableColumnFilter: false },
  { accessorKey: 'remark', header: 'Remark', enableColumnFilter: false },
  { accessorKey: 'action', header: 'Action' }
];
const Product = () => {
  const dispatch = useDispatch();
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [excelName, setExcelName] = useState();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [filter, setFilter] = useState({
    profile: 'women',
    categoryId: LABEL_SEL_CATEGORY
  });

  const _exportExcel = useRef(null);
  const exportEXCEL = () => {
    if (_exportExcel.current) {
      setExcelName(GenFileName('not_paid_customer_list'));
      _exportExcel.current.save();
    }
  };
  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getProductList({ profile: filter.profile, categoryId: filter.categoryId }));
  }, [dispatch, filter]);

  const { tableData, rowCount } = useSelector((state) => state.invProduct);
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
          </div>
        )
      };
    });
  }

  let data = [];
  if (tableData !== []) {
    data = process(tableData, { skip: 0 }).data;
  }

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfadmin/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link disable">Product Quality Assurance</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Product Quality Assurance</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Grid container>
          <Grid item xs={12}>
            <Button className="account-no-btn" onClick={exportEXCEL}>
              EXCEL&nbsp;
              <FontAwesomeIcon icon={faDownload} />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ExcelExport fileName={excelName} data={data} ref={_exportExcel}>
        <ExcelExportColumn field="name" title="Brand Name" />
        <ExcelExportColumn field="productName" title="Product Name" />
        <ExcelExportColumn field="season" title="Season" />
        <ExcelExportColumn field="pruchasePrice" title="Pruchase Price" />
        <ExcelExportColumn field="sellPrice" title="Sell Price" />
        <ExcelExportColumn field="description" title="Product Description" />
      </ExcelExport>
      <Box>
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
