import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Box,
  Grid,
  Paper,
  Tooltip,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput
} from '@mui/material';
import ImageUpload from 'views/client/component/profile/ImageUpload';
import { getSplProducts } from 'actions/supply/product';
import {
  handleAdd,
  getPurchaseOrders,
  handleDelete,
  handleEdit,
  handleAddRequiredQuantity,
  sendMail
} from 'actions/supply/purchaseOrders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan, faAdd } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
import 'yup-phone-lite';

import ShowImg from 'ui-component/ShowImg';
import DeleteModal from 'ui-component/modal/DeleteModal';
import InputForm from 'ui-component/input/InputForm';
import InputDatePicker from 'ui-component/input/InputDatePicker';
import InputTextarea from 'ui-component/input/InputTextarea';
import { DateType } from 'constant/function';
import Table from 'ui-component/Table';

const NewOrder = () => {
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [initVal, setInitVal] = useState({
    name: '',
    supply_product_id: '',
    product_photo: '',
    description: '',
    quantity: '',
    required_quantity: ''
  });
  const [deadline, setDeadline] = useState(new Date());
  const [imgUpload, setImgUpload] = useState(false);
  const [id, setId] = useState('');
  const { tableData } = useSelector((state) => state.splPurchaseOrders);
  const columns = [
    { accessorKey: 'name', header: 'PRODUCT NAME' },
    { accessorKey: 'category', header: 'CATEGORY' },
    { accessorKey: 'description', header: 'DESCRIPTION' },
    { accessorKey: 'quantity', header: 'QUANTITY IN STOCK' },
    { accessorKey: 'required_quantity', header: 'REQUIRED QUANTITY' },
    { accessorKey: 'deadline', header: 'DEADLINE DATE' },
    { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
  ];
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };
  const handleAddDialog = () => {
    setOpenAdd(!openAdd);
  };
  let updateData = [];
  updateData = tableData.map((item, index) => {
    let action_btn = null;
    action_btn = (
      <div key={index} style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Create" arrow>
          <Button
            className="admin-table-btn password margin"
            onClick={() => {
              setOpenAdd(true);
              setId(item.id);
            }}
          >
            <FontAwesomeIcon icon={faAdd} />
          </Button>
        </Tooltip>
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
              setId(item.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Tooltip>
      </div>
    );
    let date_type = null;
    date_type = DateType(item.deadline);
    return {
      ...item,
      product_photo: <ShowImg url={item.product_photo} />,
      action: action_btn,
      deadline: date_type,
      quantity: item?.supply_product?.quantity,
      category: item?.supply_product?.product_name
    };
  });
  useEffect(() => {
    dispatch(getSplProducts());
    dispatch(getPurchaseOrders());
    dispatch(getSplProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.splProduct.tableData);
  const selectChange = (evt, handleChange) => {
    handleChange(evt);
    setInitVal({
      ...products.filter((item) => item.id === evt.target.value)[0],
      required_quantity: '',
      supply_product_id: evt.target.value
    });
  };
  return (
    <>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={initVal}
          enableReinitialize={true}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .trim()
              .min(3, 'Please enter at least 3 characters')
              .max(50, 'Product name is too long')
              .required('Please enter product name'),
            supply_product_id: Yup.string().required('Please select product catetory'),
            // product_photo: Yup.string().required('Please upload product image'),
            quantity: Yup.number(),
            required_quantity: Yup.number()
              .min(0, 'Product quantity must be greater than or equal to 0')
              .required('Please enter product quantity')
          })}
          onSubmit={async (values, actions) => {
            try {
              dispatch(
                handleAdd(values, {
                  deadline: deadline
                })
              );
              setInitVal({
                name: '',
                supply_product_id: '',
                product_photo: '',
                description: '',
                quantity: '',
                required_quantity: ''
              });
              actions.resetForm();
              setDeadline(new Date());
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
                    label="PRODUCT NAME"
                    name="name"
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      size="small"
                      label="Category"
                      name="supply_product_id"
                      value={values.supply_product_id || ''}
                      onBlur={handleBlur}
                      onChange={(e) => selectChange(e, handleChange)}
                    >
                      {products.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.product_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box width="200px">
                    {!imgUpload ? (
                      values.product_photo ? (
                        <div onClick={() => setImgUpload(true)}>
                          <img src={values.product_photo} width={200} alt="product" />
                        </div>
                      ) : (
                        <FontAwesomeIcon
                          icon={faCameraRetro}
                          style={{
                            fontSize: '35px',
                            color: '#232f3e',
                            padding: '70px'
                          }}
                        />
                      )
                    ) : (
                      <ImageUpload arg="product_photo" value={values.product_photo} setFieldValue={setFieldValue} />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputTextarea
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    placeholder="Please enter product description"
                    name="description"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    label="QUANTITY IN STOCK"
                    name="quantity"
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    label="REQUIRED QUANTITY"
                    name="required_quantity"
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputDatePicker label="Deadline date" value={deadline} onChangeDate={(e) => setDeadline(e.$d)} />
                </Grid>
                <Grid item xs={12}>
                  <Button className="admin-submit-btn" type="submit" disableElevation disabled={isSubmitting}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
      <Box className="table-border container">
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            className="admin-submit-btn"
            style={{ marginBottom: '10px' }}
            onClick={() => dispatch(sendMail({ id: tableData.map((item) => item.id) }))}
          >
            Product Added Done
          </Button>
        </div>

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
            initialValues={initVal}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .trim()
                .min(3, 'Please enter at least 3 characters')
                .max(50, 'Product name is too long')
                .required('Please enter product name'),
              supply_product_id: Yup.string().required('Please select product catetory'),
              product_photo: Yup.string().required('Please upload product image'),
              quantity: Yup.number(),
              required_quantity: Yup.number()
                .min(0, 'Product required quantity must be greater than or equal to 0')
                .required('Please enter product requirerd quantity')
            })}
            onSubmit={async (values) => {
              try {
                dispatch(handleEdit({ ...values, deadline }, { type: 'new' }));
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
                      label="Name"
                      type="number"
                      name="name"
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        size="small"
                        label="Category"
                        name="supply_product_id"
                        value={values.supply_product_id || ''}
                        onBlur={handleBlur}
                        onChange={(e) => selectChange(e, handleChange)}
                      >
                        {products.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.product_name}
                          </MenuItem>
                        ))}
                      </Select>
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
                      values={values}
                      name="description"
                      placeholder="Please enter description"
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
                      touched={touched}
                      values={values}
                      errors={errors}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="REQUIRED QUANTITY"
                      name="required_quantity"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputDatePicker value={deadline} label="Deadline date" onChangeDate={(e) => setDeadline(e.$d)} />
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
      <DeleteModal
        openDelete={openDelete}
        handleDeleteDialog={handleDeleteDialog}
        deleteFunction={handleDelete({ id })}
      />

      <Dialog open={openAdd} onClose={handleAddDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Add More</Typography>
          <Formik
            initialValues={{ add: 0 }}
            validationSchema={Yup.object().shape({
              add: Yup.number()
                .min(0, 'Product required quantity must be greater than or equal to 0')
                .required('Please enter product requirerd quantity')
            })}
            onSubmit={async (values) => {
              try {
                handleAddDialog();
                dispatch(handleAddRequiredQuantity({ ...values, id }));
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputForm
                      label="REQUIRED QUANTITY"
                      name="add"
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button key="cancel" className="account-no-btn" onClick={handleAddDialog}>
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
        </DialogTitle>
      </Dialog>
    </>
  );
};

export default NewOrder;
