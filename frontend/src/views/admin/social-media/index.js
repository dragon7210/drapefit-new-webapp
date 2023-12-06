import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  Paper,
  Grid,
  Typography,
  Tooltip,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faTrashCan, faMultiply, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Table from 'ui-component/Table';
import DFnewLogger from 'utils/DFnewLogger';
import InputForm from 'ui-component/input/InputForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSocialMedia,
  getSocialMedia,
  delSocialMedia,
  activeSocialMedia,
  editSocialMedia
} from 'actions/admin/socialMedia';
import DeleteModal from 'ui-component/modal/DeleteModal';
import { FirstUpper } from 'utils/FirstUpper';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'vector', header: 'Icon' },
  { accessorKey: 'link', header: 'Link' },
  { accessorKey: 'action', header: 'Action' }
];

const SocialMedia = () => {
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);
  const [openToggleActive, setOpenToggleActive] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [initEdit, setInitEdit] = useState({ name: '', link: '', vector: '' });
  const [toggleMsg, setToggleMsg] = useState('');

  const handleToggleActiveDialog = () => {
    setOpenToggleActive(!openToggleActive);
  };
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  const [id, setId] = useState();

  useEffect(() => {
    dispatch(getSocialMedia());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.socialMedia);
  let updateData = tableData.map((item) => {
    let vector = <div dangerouslySetInnerHTML={{ __html: item.vector }} />;
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Edit" arrow>
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              handleEditDialog();
              setInitEdit(item);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <Button
            className="admin-table-btn delete"
            onClick={() => {
              setOpenDelete(!openDelete);
              setId(item.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Tooltip>
        <Tooltip title={item.is_active === 1 ? 'Deactivate' : 'Activate'} arrow>
          <Button
            className={`admin-table-btn ${item.is_active === 1 ? 'deactive' : 'disabled'}`}
            onClick={() => {
              setId(item.id);
              setToggleMsg(item.is_active === 1 ? 'de' : '');
              handleToggleActiveDialog();
            }}
          >
            <FontAwesomeIcon icon={item.is_active === 1 ? faCheck : faMultiply} />
          </Button>
        </Tooltip>
      </div>
    );
    return {
      ...item,
      vector: vector,
      action: action_btn
    };
  });

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Social Icon Listing</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Formik
          initialValues={{
            name: '',
            link: '',
            vector: ''
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(30).required('Name is required'),
            link: Yup.string().min(10).max(50).required('Link is required'),
            vector: Yup.string().min(10).max(50).required('Icon is required')
          })}
          onSubmit={async (values) => {
            dispatch(addSocialMedia(values));
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography color="#ff0000">All (*) fields are mandatory</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name="name"
                    label="Name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name="link"
                    label="Link"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    name="vector"
                    label="Icon"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
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
      <Box className="table-border">
        <Table
          data={updateData}
          columns={columns}
          enableRowOrdering
          enableSorting={false}
          muiTableBodyRowDragHandleProps={({ table }) => ({
            onDragEnd: () => {
              const { draggingRow, hoveredRow } = table.getState();
              if (hoveredRow && draggingRow) {
                tableData.splice(hoveredRow.index, 0, tableData.splice(draggingRow.index, 1)[0]);
                setTableData([...tableData]);
              }
            }
          })}
        />
        <DeleteModal
          openDelete={openDelete}
          handleDeleteDialog={() => setOpenDelete(!openDelete)}
          deleteFunction={() => dispatch(delSocialMedia({ id: id }))}
        />
        <Dialog open={openToggleActive} onClose={handleToggleActiveDialog}>
          <DialogTitle>
            <Typography className="dialog-title">Are you sure to {toggleMsg}activate?</Typography>
          </DialogTitle>
          <DialogActions>
            <Button className="account-no-btn" onClick={handleToggleActiveDialog}>
              Cancel
            </Button>
            <Button
              className="account-delete-btn"
              onClick={async () => {
                try {
                  await dispatch(activeSocialMedia({ id: id }));
                  handleToggleActiveDialog();
                } catch (err) {
                  DFnewLogger(err?.message);
                }
              }}
            >
              {FirstUpper(toggleMsg)}activate
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEdit} onClose={handleEditDialog}>
          <DialogTitle>
            <Typography className="dialog-title">Change Social Media Info</Typography>
          </DialogTitle>
          <DialogActions>
            <Formik
              initialValues={initEdit}
              enableReinitialize
              validationSchema={Yup.object().shape({
                name: Yup.string().max(30).required('Name is required'),
                link: Yup.string().min(10).max(50).required('Link is required'),
                vector: Yup.string().min(10).max(50).required('Icon is required')
              })}
              onSubmit={async (values) => {
                await dispatch(editSocialMedia(values));
                handleEditDialog();
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid, dirty }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <InputForm
                        errors={errors}
                        values={values}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        label="Name *"
                        name="name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputForm
                        errors={errors}
                        values={values}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        label="Link *"
                        name="link"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputForm
                        errors={errors}
                        values={values}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        label="Icon *"
                        name="vector"
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
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default SocialMedia;
