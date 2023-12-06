import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Grid, Breadcrumbs, Tooltip, Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faMailReplyAll, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import MaterialReactTable from 'material-react-table';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { getCollaborationBrand, deleteCollaborationBrand, editCollaborationBrand } from 'actions/inventory/brand';
import { getProductCategories } from 'actions/inventory/productCategory';
import { CKEditor } from 'ckeditor4-react';
import DeleteModal from 'ui-component/modal/DeleteModal';
import InputForm from 'ui-component/input/InputForm';

const columns = [
  { accessorKey: 'no', header: '#', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'brandName', header: 'Brand Name' },
  { accessorKey: 'website', header: 'Website Url', enableColumnFilter: false },
  { accessorKey: 'name', header: 'Contact Person', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'email', header: 'Contact Email' },
  { accessorKey: 'phone', header: 'Contact Phone Number' },
  { accessorKey: 'action', header: 'Action' }
];

const CollaborationBrand = () => {
  const dispatch = useDispatch();
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [initVal, setInitVal] = useState({
    subject: '',
    content: ''
  });

  const [editInit, setEditInit] = useState({
    name: '',
    email: '',
    id: '',
    phone: '',
    brandName: '',
    phone: '',
    website: ''
  });

  const [delId, setDelId] = useState();
  const [openSendEmail, setOpenSendEmail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  const handleSendEmail = () => {
    setOpenSendEmail(!openSendEmail);
  };

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getCollaborationBrand());
  }, [dispatch]);

  const { tableData, rowCount } = useSelector((state) => state.invBrand);
  let updateData = [];
  let rowNum = pagination.pageIndex * pagination.pageSize;
  if (tableData.length) {
    updateData = tableData.map((item, index) => {
      rowNum++;
      return {
        ...item,
        no: rowNum,
        action: (
          <div key={index} style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
            <Tooltip title="Email" arrow>
              <Button className="admin-table-btn deactive margin" onClick={handleSendEmail}>
                <FontAwesomeIcon icon={faMailReplyAll} />
              </Button>
            </Tooltip>
            <Tooltip title="Edit" arrow>
              <Button
                className="admin-table-btn password margin"
                onClick={() => {
                  setEditInit(item);
                  handleEditDialog();
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
                  setDelId(item.id);
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </Tooltip>
          </div>
        )
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
            <Typography className="home-link disable">Brand</Typography>
            <Typography className="home-link current">Brand Collaboration</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Brand Collaboration</Typography>
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
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Edit Collaboration Brand</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={editInit}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(30).required('Name is required'),
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              website: Yup.string().required('Website is required'),
              phone: Yup.string().required('Phone Number is required'),
              brandName: Yup.string().required('Brand Number is required')
            })}
            onSubmit={async (values, actions) => {
              try {
                await dispatch(editCollaborationBrand(values));
                handleEditDialog();
                setEditInit({
                  name: '',
                  email: '',
                  id: '',
                  phone: '',
                  brandName: '',
                  phone: '',
                  website: ''
                });
                actions.resetForm();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="Brand Name"
                      name="brandName"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="Website"
                      name="website"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="Phone"
                      name="phone"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="Email"
                      name="email"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputForm
                      errors={errors}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="Name"
                      name="name"
                    />
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
        deleteFunction={deleteCollaborationBrand({ id: delId })}
      />
      <Dialog open={openSendEmail} onClose={handleSendEmail} maxWidth="lg">
        <DialogTitle>
          <Typography className="dialog-title"> Email Template</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initVal}
            enableReinitialize
            validationSchema={Yup.object().shape({
              emailName: Yup.string().trim().max(50, 'Email name is too long').required('Please enter email name')
            })}
            onSubmit={async (values, actions) => {
              try {
                handleSendEmail(values);
                setInitVal({
                  subject: '',
                  content: ''
                });
                actions.resetForm();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched}
                      label="Email Name *"
                      name="subject"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CKEditor
                      initData={values.content}
                      onChange={(evt) => {
                        try {
                          const { editor } = evt || {};
                          if (editor) {
                            setFieldValue('content', editor.getData());
                          }
                        } catch (err) {
                          DFnewLogger(err?.message);
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button key="cancel" className="account-no-btn" onClick={handleSendEmail}>
                      Cancel
                    </Button>
                    <Button key="submit" className="account-yes-btn" type="submit">
                      Send
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

export default CollaborationBrand;
