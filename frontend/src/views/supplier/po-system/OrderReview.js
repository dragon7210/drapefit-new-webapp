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
  FormControl,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import { Form, Formik } from 'formik';
import ImageUpload from 'views/client/component/profile/ImageUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan, faSave } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
import 'yup-phone-lite';
import { getPurchaseOrdersAssigned, handleApprove } from 'actions/supply/purchaseOrders';
import { getSupplierVendor } from 'actions/supply/vendor';
import { handleDelete, handleEdit } from 'actions/supply/purchaseOrders';
import { setAlert } from 'actions/common/alert';
import { DateType } from 'constant/function';
import ShowImg from 'ui-component/ShowImg';
import DeleteModal from 'ui-component/modal/DeleteModal';
import InputForm from 'ui-component/input/InputForm';
import InputTextarea from 'ui-component/input/InputTextarea';
import InputDatePicker from 'ui-component/input/InputDatePicker';
import Table from 'ui-component/Table';

export const checkVendor = (data, id) => {
  let j = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i]) {
      j++;
    }
  }
  if (j === id.length) {
    return true;
  } else {
    return false;
  }
};

const OrderReview = () => {
  const dispatch = useDispatch();

  const { tableData } = useSelector((state) => state.splPurchaseOrders);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [deadline, setDeadline] = useState(new Date());

  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };

  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };

  const [initVal, setInitVal] = useState({
    name: '',
    category: '',
    product_photo: '',
    description: '',
    quantity: '',
    required_quantity: '',
    supplierEmail: ''
  });

  useEffect(() => {
    dispatch(getPurchaseOrdersAssigned());
    dispatch(getSupplierVendor());
  }, [dispatch]);

  const columns = [
    { accessorKey: 'name', header: 'PRODUCT NAME' },
    { accessorKey: 'category', header: 'CATEGORY' },
    { accessorKey: 'product_photo', header: 'IMAGE' },
    { accessorKey: 'description', header: 'DESCRIPTION' },
    { accessorKey: 'quantity', header: 'QUANTITY IN STOCK' },
    { accessorKey: 'required_quantity', header: 'REQUIRED QUANTITY' },
    { accessorKey: 'deadline', header: 'DEADLINE DATE' },
    { accessorKey: 'vendor', header: 'VENDOR' },
    { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
  ];

  const [vendor, setVendor] = useState([]);
  const id = tableData.map((item) => item.id);

  const vendors = useSelector((state) => state.splVendor.tableData);
  let updateData = [];
  updateData = tableData.map((item, index) => {
    let action_btn = null;
    let vendor_sel = null;
    action_btn = (
      <div key={index} style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Edit" arrow>
          <Button
            className="admin-table-btn deactive margin"
            onClick={() => {
              handleEditDialog(index);
              setInitVal(item);
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
              handleDeleteDialog();
              setDeleteId(item.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Tooltip>

        <Tooltip title="Save for later" arrow>
          <Button className="admin-table-btn password margin">
            <FontAwesomeIcon icon={faSave} />
          </Button>
        </Tooltip>
      </div>
    );
    vendor_sel = (
      <>
        <Select
          style={{ width: '200px' }}
          size="small"
          value={vendor[index] || ''}
          name="vendor"
          onChange={(evt) => {
            const temp = vendor.map((i) => i);
            temp[index] = evt.target.value;
            setVendor(temp);
          }}
        >
          {vendors.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </>
    );
    let date_type = DateType(item.deadline);
    return {
      ...item,
      product_photo: <ShowImg url={item.product_photo} />,
      action: action_btn,
      vendor: vendor_sel,
      deadline: date_type,
      category: item.supply_product?.product_name,
      quantity: item.supply_product?.quantity
    };
  });
  return (
    <>
      <Box className="table-border container">
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            className="admin-submit-btn"
            style={{ marginBottom: '10px' }}
            onClick={() =>
              checkVendor(vendor, id)
                ? dispatch(handleApprove({ vendor, id }))
                : setAlert('Please fill all the vendor', 'warning')
            }
          >
            Order Request
          </Button>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Table columns={columns} data={updateData} />
          </Grid>
        </Grid>
      </Box>
      <DeleteModal
        openDelete={openDelete}
        handleDeleteDialog={handleDeleteDialog}
        deleteFunction={handleDelete({ id: deleteId, type: 'assigned' })}
      />
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Edit Purchase Order</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initVal}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .trim()
                .min(3, 'Please enter at least 3 characters')
                .max(50, 'Product name is too long')
                .required('Please enter product name'),
              product_photo: Yup.string().required('Please upload product image'),
              quantity: Yup.number(),
              required_quantity: Yup.number()
                .min(0, 'Product required quantity must be greater than or equal to 0')
                .required('Please enter product requirerd quantity')
            })}
            onSubmit={async (values) => {
              try {
                dispatch(
                  handleEdit(
                    { ...values, deadline },
                    {
                      type: 'assigned'
                    }
                  )
                );
                handleEditDialog();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
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
                        value={initVal?.supply_product?.product_name}
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
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      placeholder="Please enter description"
                      name="description"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Quantity</InputLabel>
                      <OutlinedInput size="small" label="Quantity" value={initVal?.supply_product?.quantity} disabled />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="REQUIRED QUANTITY"
                      name="required_quantity"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputDatePicker value={deadline} onChangeDate={(e) => setDeadline(e.$d)} />
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

export default OrderReview;
