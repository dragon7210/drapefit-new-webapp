import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Box,
  Tooltip,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { CKEditor } from 'ckeditor4-react';
import MaterialReactTable from 'material-react-table';
import { Form, Formik } from 'formik';
import DeleteModal from 'ui-component/modal/DeleteModal';
import * as Yup from 'yup';

import {
  getInventoryEmailTpl,
  addInventoryEmailTpl,
  editInventoryEmailTpl,
  deleteInventoryEmailTpl
} from 'actions/inventory/product';
import DFnewLogger from 'utils/DFnewLogger';

const columns = [
  { accessorKey: 'no', header: '#', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'emailName', header: 'Email Name' },
  { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
];

const EmailTemplate = () => {
  const dispatch = useDispatch();
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [initVal, setInitVal] = useState({
    emailName: '',
    template: ''
  });
  const [delId, setDelId] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };

  useEffect(() => {
    dispatch(
      getInventoryEmailTpl({
        start: pagination.pageIndex * pagination.pageSize,
        size: pagination.pageSize,
        filters: JSON.stringify(columnFilters ?? []),
        globalFilter: globalFilter ?? '',
        sorting: JSON.stringify(sorting ?? [])
      })
    );
  }, [dispatch, columnFilters, globalFilter, sorting, pagination]);

  const { tableData, rowCount } = useSelector((state) => state.invProduct);
  let updateData = [];
  let rowNum = pagination.pageIndex * pagination.pageSize;
  if (tableData.length) {
    updateData = tableData.map((item, index) => {
      const action_btn = (
        <div key={index} style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
          <Tooltip title="Edit" arrow>
            <Button
              className="admin-table-btn edit"
              onClick={() => {
                setInitVal(item);
                handleEditDialog();
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <Button
              className="admin-table-btn delete"
              onClick={() => {
                setDelId(item.id);
                handleDeleteDialog();
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </Tooltip>
        </div>
      );
      rowNum++;

      return {
        ...item,
        no: rowNum,
        action: action_btn
      };
    });
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Button
            className="admin-submit-btn"
            type="submit"
            disableElevation
            onClick={() => {
              setInitVal({
                emailName: '',
                template: ''
              });
              handleEditDialog();
            }}
          >
            Add Template
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
          <Typography color="#ff0000">
            Search fields are <strong>Email Name</strong>
          </Typography>
        </Grid>
      </Grid>
      <Box className="table-border no-margin">
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
      {/* Modal Dialogs */}
      <Dialog open={openEdit} onClose={handleEditDialog} maxWidth="lg">
        <DialogTitle>
          <Typography className="dialog-title">{initVal?.id ? 'Edit' : 'Add'} Email Template</Typography>
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
                if (initVal?.id) {
                  await dispatch(editInventoryEmailTpl(values));
                } else {
                  await dispatch(
                    addInventoryEmailTpl(values, {
                      start: pagination.pageIndex * pagination.pageSize,
                      size: pagination.pageSize,
                      filters: JSON.stringify(columnFilters ?? []),
                      globalFilter: globalFilter ?? '',
                      sorting: JSON.stringify(sorting ?? [])
                    })
                  );
                }
                actions.resetForm();
                handleEditDialog();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              isSubmitting,
              touched,
              values,
              isValid,
              dirty
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={Boolean(touched.emailName && errors.emailName)}>
                      <InputLabel>
                        Email Name <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        size="small"
                        label="Email Name *"
                        name="emailName"
                        value={values.emailName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.emailName && errors.emailName && (
                        <FormHelperText id="helper-text-emailName" error>
                          {errors.emailName}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <CKEditor
                      initData={values.template}
                      onChange={(evt) => {
                        try {
                          const { editor } = evt || {};
                          if (editor) {
                            setFieldValue('template', editor.getData());
                          }
                        } catch (err) {
                          DFnewLogger(err?.message);
                        }
                      }}
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
                      disabled={!isValid || !dirty || isSubmitting}
                    >
                      {initVal?.id ? 'Update' : 'Save'}
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
        deleteFunction={deleteInventoryEmailTpl({ id: delId })}
      />
    </>
  );
};

export default EmailTemplate;
