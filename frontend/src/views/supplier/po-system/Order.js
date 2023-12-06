import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Tooltip,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  InputLabel,
  OutlinedInput,
  FormControl
} from '@mui/material';
import {
  handleOrderChange,
  handleOrderDelete,
  getPurchaseOrdered,
  handleOrderedEdit
} from 'actions/supply/purchaseOrders';
import * as Yup from 'yup';
import ImageUpload from 'views/client/component/profile/ImageUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import { supplierEmployeeTypes } from '../../../constant/other';
import 'yup-phone-lite';
import { DateType } from 'constant/function';
import ShowImg from 'ui-component/ShowImg';
import InputForm from 'ui-component/input/InputForm';
import InputTextarea from 'ui-component/input/InputTextarea';
import InputDatePicker from 'ui-component/input/InputDatePicker';
import Table from 'ui-component/Table';

const Order = () => {
  const dispatch = useDispatch();

  const [openEdit, setOpenEdit] = useState(false);
  const [deadline, setDeadline] = useState(new Date());

  useEffect(() => {
    dispatch(getPurchaseOrdered());
  }, [dispatch]);
  const { tableData } = useSelector((state) => state.splPurchaseOrders);

  const columns = [
    { accessorKey: 'order', header: 'Order Id' },
    { accessorKey: 'name', header: 'PRODUCT NAME' },
    { accessorKey: 'category', header: 'CATEGORY' },
    { accessorKey: 'image', header: 'IMAGE' },
    { accessorKey: 'description', header: 'DESCRIPTION' },
    { accessorKey: 'quantity', header: 'QUANTITY IN STOCK' },
    { accessorKey: 'required_quantity', header: 'REQUIRED QUANTITY' },
    { accessorKey: 'deadline', header: 'DEADLINE DATE' },
    { accessorKey: 'suppliertype', header: 'SUPPLIER TYPE' },
    { accessorKey: 'vendorName', header: 'VENDOR' },
    { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
  ];
  const [initialVal, setInitialVal] = useState({
    order: '',
    name: '',
    category: '',
    product_photo: '',
    description: '',
    quantity: '',
    required_quantity: '',
    vendorName: ''
  });
  let updateData = [];
  updateData = tableData.map((item, index) => {
    let action_btn = null;
    let suppliertypeSel = null;
    action_btn = (
      <div key={index} style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Edit" arrow>
          <Button
            className="admin-table-btn deactive margin"
            onClick={() => {
              handleEditDialog();
              setInitialVal(item);
              setDeadline(new Date(item.deadline));
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <Button
            className="admin-table-btn delete margin"
            onClick={() => {
              dispatch(handleOrderDelete(item.id));
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Tooltip>
      </div>
    );
    suppliertypeSel = (
      <Select
        style={{ width: '150px' }}
        size="small"
        value={item.supplier_type || ''}
        onChange={(e) => {
          dispatch(handleOrderChange({ id: item.id, supplier_type: e.target.value }));
        }}
      >
        {supplierEmployeeTypes.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    );
    return {
      ...item,
      image: <ShowImg url={item.product_photo} />,
      action: action_btn,
      suppliertype: suppliertypeSel,
      deadline: DateType(item.deadline),
      vendorName: item.supply_vendor?.name,
      category: item.supply_product?.product_name,
      quantity: item.supply_product?.quantity
    };
  });

  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  return (
    <>
      <Box className="table-border container">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Table columns={columns} data={updateData} />
          </Grid>
        </Grid>
      </Box>
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Edit Purchase Order</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initialVal}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .trim()
                .min(3, 'Please enter at least 3 characters')
                .max(50, 'Product name is too long')
                .required('Please enter product name'),
              product_photo: Yup.string().required('Please upload product image'),
              required_quantity: Yup.number()
                .min(0, 'Product required quantity must be greater than or equal to 0')
                .required('Please enter product requirerd quantity')
            })}
            onSubmit={async (values) => {
              try {
                dispatch(handleOrderedEdit({ ...values, deadline }));
                handleEditDialog();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <InputForm
                      errors={errors}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched}
                      values={values}
                      label="Order Id"
                      name="order"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched}
                      values={values}
                      label="NAME"
                      name="name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Category"
                        value={initialVal?.supply_product?.product_name}
                        disabled
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box width="200px">
                      <ImageUpload arg="product_photo" value={values.product_photo} setFieldValue={setFieldValue} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputTextarea
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      name="description"
                      values={values}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Quantity</InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Quantity"
                        value={initialVal?.supply_product?.quantity}
                        disabled
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched}
                      values={values}
                      label="REQUIRED QUANTITY"
                      name="required_quantity"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputDatePicker label="Deadline date" value={deadline} onChangeDate={(e) => setDeadline(e.$d)} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Vendor</InputLabel>
                      <OutlinedInput size="small" label="Vendor" value={initialVal?.supply_vendor?.name} disabled />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button key="cancel" className="account-no-btn" onClick={handleEditDialog}>
                      Cancel
                    </Button>
                    <Button
                      key="submit"
                      className="account-yes-btn"
                      type="submit"
                      disableElevation
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Order;
