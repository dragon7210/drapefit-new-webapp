import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Typography, Tooltip, Grid, Breadcrumbs, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { delCareer, getCareer, updateCareer } from 'actions/admin/career';
import DeleteModal from 'ui-component/modal/DeleteModal';
import { Form, Formik } from 'formik';
import InputForm from 'ui-component/input/InputForm';

const columns = [
  { accessorKey: 'school', header: 'School' },
  { accessorKey: 'degree', header: 'Degree' },
  { accessorKey: 'discipline', header: 'Discipline' },
  { accessorKey: 'about_this_job', header: 'About Job' },
  { accessorKey: 'action', header: 'Action' }
];

const ViewCareer = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [initEdit, setInitEdit] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };

  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };

  useEffect(() => {
    dispatch(getCareer());
  }, [dispatch]);
  const { tableData } = useSelector((state) => state.career);
  let updateData = tableData.map((item) => {
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
              handleDeleteDialog();
              setId(item.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Tooltip>
      </div>
    );
    return {
      ...item,
      action: action_btn
    };
  });

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfadmin/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link current">View Career</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Career Dynamic Listing</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table data={updateData} columns={columns} />
      </Box>
      <DeleteModal
        openDelete={openDelete}
        handleDeleteDialog={handleDeleteDialog}
        deleteFunction={() => dispatch(delCareer({ id }))}
      />
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Change Career Info</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={initEdit}
            enableReinitialize
            validationSchema={Yup.object().shape({
              school: Yup.string().max(50).required('School is required'),
              degree: Yup.string().max(50).required('Degree is required'),
              discipline: Yup.string().max(50).required('Discipline is required'),
              about_this_job: Yup.string().max(50).required('aboutThisJob is required')
            })}
            onSubmit={async (values) => {
              dispatch(updateCareer(values));
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
                      label="School *"
                      name="school"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Degree *"
                      name="degree"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="Discipline *"
                      name="discipline"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      values={values}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label="About Job *"
                      name="about_this_job"
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
    </>
  );
};

export default ViewCareer;
