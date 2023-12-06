import { faMagicWandSparkles, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid, Tooltip, TextField } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import { useState } from 'react';
import { DateType } from 'constant/function';
import PropTypes from 'prop-types';

const columns = [
  { accessorKey: 'no', header: '#', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'subs', header: 'Subs', enableColumnFilter: false },
  { accessorKey: 'date', header: 'Date', enableColumnFilter: false },
  { accessorKey: 'action', header: 'Action', enableColumnFilter: false }
];

const BottomPrediction = ({ data }) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [filter, setFilter] = useState();
  const handleFilter = () => {
    console.log(filter);
  };
  let rowNum = 0;

  const parentData = data.filter((item) => item.type === 'parent');
  const updateParentData = parentData.map((item, index) => {
    rowNum++;
    return {
      ...item,
      no: rowNum,
      date: DateType(item.createdAt),
      action: (
        <div key={index} style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
          <Tooltip title="Matching" arrow>
            <Button className="admin-table-btn password margin">
              <FontAwesomeIcon icon={faMagicWandSparkles} />
            </Button>
          </Tooltip>
          <Tooltip title="Browse All" arrow>
            <Button className="admin-table-btn edit margin">
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </Tooltip>
        </div>
      )
    };
  });
  const parentRowcount = parentData.length;

  const kidData = data.filter((item) => item.type === 'kid');
  const updateKidData = kidData.map((item, index) => {
    rowNum++;
    return {
      ...item,
      no: rowNum,
      date: DateType(item.createdAt),
      action: (
        <div key={index} style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
          <Tooltip title="Matching" arrow>
            <Button className="admin-table-btn password margin">
              <FontAwesomeIcon icon={faMagicWandSparkles} />
            </Button>
          </Tooltip>
          <Tooltip title="Browse All" arrow>
            <Button className="admin-table-btn edit margin">
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </Tooltip>
        </div>
      )
    };
  });
  const kidRowCount = kidData.length;

  return (
    <Grid container>
      <Grid item xs={6}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>Parent List</h3>
          <Grid item sm={3}>
            <TextField
              id="outlined-basic"
              label="Search"
              value={filter}
              size="small"
              onChange={(e) => setFilter(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item sm={2}>
            <Button className="admin-submit-btn" onClick={handleFilter}>
              Filter
            </Button>
          </Grid>
        </div>
        <MaterialReactTable
          columns={columns}
          data={updateParentData}
          enablePagination
          defaultColumn={{ minSize: 30, maxSize: 400, size: 50 }}
          manualFiltering
          manualPagination
          manualSorting
          onColumnFiltersChange={setColumnFilters}
          onGlobalFilterChange={setGlobalFilter}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          rowCount={parentRowcount}
          state={{ columnFilters, globalFilter, pagination, sorting }}
          enableStickyHeader
          muiTableHeadProps={{ sx: { zIndex: 1 } }}
          muiTableContainerProps={{ sx: { maxHeight: '50vh' } }}
        />
      </Grid>
      <Grid item xs={6}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>Kid List</h3>
          <Grid item sm={3}>
            <TextField
              id="outlined-basic"
              label="Search"
              value={filter}
              size="small"
              onChange={(e) => setFilter(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item sm={2}>
            <Button className="admin-submit-btn" onClick={handleFilter}>
              Filter
            </Button>
          </Grid>
        </div>
        <MaterialReactTable
          columns={columns}
          data={updateKidData}
          enablePagination
          defaultColumn={{ minSize: 30, maxSize: 400, size: 50 }}
          manualFiltering
          manualPagination
          manualSorting
          onColumnFiltersChange={setColumnFilters}
          onGlobalFilterChange={setGlobalFilter}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          rowCount={kidRowCount}
          state={{ columnFilters, globalFilter, pagination, sorting }}
          enableStickyHeader
          muiTableHeadProps={{ sx: { zIndex: 1 } }}
          muiTableContainerProps={{ sx: { maxHeight: '50vh' } }}
        />
      </Grid>
    </Grid>
  );
};

BottomPrediction.propTypes = {
  data: PropTypes.array
};
export default BottomPrediction;
