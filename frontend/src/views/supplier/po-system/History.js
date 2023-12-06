import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Grid, Dialog, Tooltip, DialogActions, DialogTitle, Typography, TextField } from '@mui/material';
import { getAllPurchaseOrder, handleClose } from 'actions/supply/purchaseOrders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import 'yup-phone-lite';
import ShowImg from 'ui-component/ShowImg';
import { DateType } from 'constant/function';
import Table from 'ui-component/Table';

const History = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [openClose, setOpenClose] = useState(false);
  const handleCloseDialog = () => {
    setOpenClose(!openClose);
  };

  const [filter, setFilter] = useState({
    vendor: '',
    order: '',
    name: '',
    state: ''
  });

  const [clickFilter, setClickFilter] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  useEffect(() => {
    dispatch(getAllPurchaseOrder());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.splPurchaseOrders);
  const filteredData = useMemo(
    () =>
      tableData.filter((item) => {
        if (filter.vendor && !item?.supply_vendor?.name?.toLowerCase().includes(filter.vendor.toLowerCase())) {
          return false;
        }
        if (filter.order && !item?.order?.toLowerCase().includes(filter.order.toLowerCase())) {
          return false;
        }
        if (filter.state && !item?.state?.toLowerCase().includes(filter.state.toLowerCase())) {
          return false;
        }
        if (filter.name && !item?.name?.toLowerCase().includes(filter.name.toLowerCase())) {
          return false;
        }
        return true;
      }),
    [tableData, filter]
  );

  const handleFilter = () => {
    setClickFilter(!clickFilter);
  };

  const columns = [
    { accessorKey: 'order', header: 'Order Id' },
    { accessorKey: 'name', header: 'PRODUCT NAME' },
    { accessorKey: 'vendorName', header: 'VENDOR NAME' },
    { accessorKey: 'createdAt', header: 'ORDERED DATE' },
    { accessorKey: 'category', header: 'CATEGORY' },
    { accessorKey: 'product_photo', header: 'IMAGE' },
    { accessorKey: 'description', header: 'DESCRIPTION' },
    { accessorKey: 'quantity', header: 'QUANTITY IN STOCK' },
    { accessorKey: 'required_quantity', header: 'REQUIRED QUANTITY' },
    { accessorKey: 'deadline', header: 'DEADLINE DATE' },
    { accessorKey: 'supplier_type', header: 'SUPPLIER TYPE' },
    { accessorKey: 'state', header: 'STATE' },
    { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
  ];
  let updateData = [];
  if (filteredData.length) {
    updateData = filteredData.map((item, index) => {
      let action_btn = null;
      action_btn = (
        <div key={index} style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
          <Tooltip title="Close" arrow>
            <Button
              className="admin-table-btn delete margin"
              onClick={() => {
                setId(item.id);
                handleCloseDialog();
              }}
            >
              <FontAwesomeIcon icon={faClose} />
            </Button>
          </Tooltip>
        </div>
      );
      return {
        ...item,
        product_photo: <ShowImg url={item.product_photo} />,
        action: action_btn,
        deadline: DateType(item.deadline),
        createdAt: DateType(item.created),
        vendorName: item.supply_vendor?.name,
        category: item.supply_product?.product_name,
        quantity: item.supply_product?.quantity
      };
    });
  }

  return (
    <>
      <Box className="table-border container">
        <Grid container padding={1} spacing={2}>
          <Grid item sm={2}>
            <TextField
              id="outlined-basic"
              label="Vendor Name"
              value={filter.vendor}
              name="vendor"
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              id="outlined-basic"
              label="Product Name"
              value={filter.name}
              name="name"
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              id="outlined-basic"
              label="Order Id"
              value={filter.order}
              name="order"
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item sm={2}>
            <TextField
              id="outlined-basic"
              label="STATE"
              value={filter.state}
              name="state"
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item sm={2}>
            <Button className="admin-submit-btn" onClick={handleFilter} style={{ marginTop: '5px' }}>
              Filter
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Table columns={columns} data={updateData} />
          </Grid>
        </Grid>
      </Box>

      <Dialog open={openClose} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Are you sure to close?</Typography>
        </DialogTitle>
        <DialogActions>
          <Button key="cancel" className="account-no-btn" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            key="submit"
            className="account-delete-btn"
            onClick={async () => {
              try {
                dispatch(handleClose({ id }));
                handleCloseDialog();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default History;
