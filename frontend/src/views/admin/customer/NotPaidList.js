import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  Typography,
  Tooltip,
  Grid,
  Breadcrumbs,
  Dialog,
  DialogActions,
  DialogTitle,
  Select,
  MenuItem
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEnvelope, faTrashCan, faDownload } from '@fortawesome/free-solid-svg-icons';
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { process } from '@progress/kendo-data-query';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import Table from 'ui-component/Table';
import GenFileName from 'utils/GenFileName';
import DFnewLogger from 'utils/DFnewLogger';
import InputForm from 'ui-component/input/InputForm';
import InputTextarea from 'ui-component/input/InputTextarea';
import { useDispatch, useSelector } from 'react-redux';
import { getNotPaidList, updateStylist, delNotPaidList } from 'actions/admin/customer';
import { DateType, Gender } from 'constant/function';
import DeleteModal from 'ui-component/modal/DeleteModal';

const columns = [
  { accessorKey: 'fullName', header: 'Full Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'style', header: 'Assign Customer Stylist' },
  { accessorKey: 'created', header: 'Created Date' },
  { accessorKey: 'kidsName', header: 'Kids Name' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
];

const NotPaidList = () => {
  const dispatch = useDispatch();
  const [excelName, setExcelName] = useState('');
  const [id, setId] = useState(0);
  const [email, setEmail] = useState();

  useEffect(() => {
    dispatch(getNotPaidList());
  }, [dispatch]);

  const { notPaidList } = useSelector((state) => state.customer);
  const { emp_initial } = useSelector((state) => state.initial);

  let updateData = notPaidList.map((item, index) => {
    const action_btn = (
      <div key={index} style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Email" arrow>
          <Button
            className="admin-table-btn edit"
            onClick={() => {
              handleEditDialog();
              setEmail(item.user?.email);
            }}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </Button>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <Button
            className="admin-table-btn delete"
            onClick={() => {
              setId(item.id);
              handleDeleteDialog();
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Tooltip>
      </div>
    );
    const styleSelect = (
      <Select size="small" value={''} onChange={(e) => dispatch(updateStylist(item.id, e.target.value))} fullWidth>
        {emp_initial?.emp?.map((item, index) => (
          <MenuItem key={index} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    );
    return {
      ...item,
      action: action_btn,
      email: item.email,
      fullName: item.user_detail?.first_name + ' ' + item.user_detail?.last_name,
      gender: Gender(Number(item.user_detail?.gender)),
      created: DateType(item?.created_dt),
      kidsName: item?.kids_detail?.kids_first_name,
      style: styleSelect
    };
  });

  const _exportExcel = useRef(null);
  const exportEXCEL = () => {
    if (_exportExcel.current) {
      setExcelName(GenFileName('not_paid_customer_list'));
      _exportExcel.current.save();
    }
  };
  let data = [];
  if (notPaidList?.length !== 0) {
    data = process(notPaidList, { skip: 10 }).data;
  }
  const exportPDF = () => {
    try {
      const unit = 'pt';
      const size = 'A4'; //-- [A1, A2, A3, A4]
      const orientation = 'portrait'; //-- [portrait, landscape]
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
      doc.setFontSize(15);
      const title = 'Not Paid Customer List';
      const headers = [['Full Name', 'Email', 'Assign Customer Stylist', 'Created Date', 'Kids Name', 'Gender']];
      const data = notPaidList.map((item) => [
        item.fullName,
        item.email,
        item.account,
        item.created,
        item.kidsName,
        item.gender
      ]);
      const content = { startY: 50, head: headers, body: data };
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save(GenFileName('not_paid_customer_list'));
    } catch (err) {
      DFnewLogger(err?.message);
    }
  };
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditDialog = () => {
    setOpenEdit(!openEdit);
  };
  const [openDelete, setOpenDelete] = useState(false);
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfadmin/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link disable">Customer</Typography>
            <Typography className="home-link current">Not Paid List</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Customer List Who Not Paid</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Grid container>
          <Grid item xs={12}>
            <Button className="account-no-btn" onClick={exportEXCEL}>
              EXCEL&nbsp;
              <FontAwesomeIcon icon={faDownload} />
            </Button>
            <Button className="account-yes-btn" onClick={exportPDF}>
              PDF&nbsp;
              <FontAwesomeIcon icon={faDownload} />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Table data={updateData} columns={columns} />
          </Grid>
        </Grid>
      </Box>
      <ExcelExport fileName={excelName} data={data} ref={_exportExcel}>
        <ExcelExportColumn field="fullName" title="Full Name" />
        <ExcelExportColumn field="email" title="Email" />
        <ExcelExportColumn field="account" title="Assign Customer Stylist" />
        <ExcelExportColumn field="created" title="Created Date" />
        <ExcelExportColumn field="kidsName" title="Kids Name" />
        <ExcelExportColumn field="gender" title="Gender" />
      </ExcelExport>
      <Dialog open={openEdit} onClose={handleEditDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Email : {email}</Typography>
        </DialogTitle>
        <DialogActions>
          <Formik
            initialValues={{
              title: '',
              content: ''
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().min(6).max(30).required('Title is required'),
              content: Yup.string().min(30).max(3000).required('Content is required')
            })}
            onSubmit={async (values) => {
              DFnewLogger(values);
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography color="#ff0000">All (*) fields are mandatory</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <InputForm
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      values={values}
                      label="Title *"
                      name="title"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputTextarea
                      errors={errors}
                      values={values}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      placeholder="Please input the content *"
                      name="content"
                    />
                  </Grid>
                  <Grid item xs={12} className="h-align-right">
                    <Button className="account-no-btn" onClick={handleEditDialog}>
                      Cancel
                    </Button>
                    <Button
                      className="account-yes-btn"
                      onClick={() => {
                        handleEditDialog();
                      }}
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
        deleteFunction={() => dispatch(delNotPaidList({ id }))}
      />
    </>
  );
};

export default NotPaidList;
