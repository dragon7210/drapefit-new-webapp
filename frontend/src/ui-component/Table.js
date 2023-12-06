import MaterialReactTable from 'material-react-table';

const Table = (propsValue) => {
  const { columns, data, ...otherProps } = propsValue;

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowNumbers
      enablePagination
      rowNumberMode="original"
      defaultColumn={{ minSize: 30, maxSize: 400, size: 50 }}
      enableStickyHeader
      muiTableHeadProps={{ sx: { zIndex: 1 } }}
      {...otherProps}
    />
  );
};

export default Table;
