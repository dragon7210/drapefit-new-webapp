import { useEffect, useState } from 'react';
import { Box, Grid, TextField, Button, Checkbox, TextareaAutosize } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchaseOrdersApproved, handleOrdered } from 'actions/supply/purchaseOrders';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import GenFileName from 'utils/GenFileName';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { setAlert } from 'actions/common/alert';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import MyEnvConfig from 'configs/MyEnvConfig';
import Billing from './Billing';
import ShowImg from 'ui-component/ShowImg';

const Acknowledgment = () => {
  const dispatch = useDispatch();

  const stripePromise = loadStripe(`${MyEnvConfig.stripe.pbKey}`);
  const appearance = {
    theme: 'stripe'
  };
  const options = {
    appearance
  };

  const [selOrder, setSelOrder] = useState([]);
  useEffect(() => {
    dispatch(getPurchaseOrdersApproved());
  }, [dispatch]);

  const { tableData } = useSelector((state) => state.splPurchaseOrders);

  const [info, setInfo] = useState({
    cCompanyName: '',
    cCompanyAddress: '',
    cPerson: '',
    cPhone: '',
    cEmail: '',
    airPrice: '',
    shipPrice: '',
    shippingPrice: '',
    trackingNumber: '',
    shippingCarrier: ''
  });

  const [bankInfo, setBankInfo] = useState({
    bankName: '',
    bankAddress: '',
    swiftCode: '',
    bankCode: '',
    name: '',
    account: '',
    link: ''
  });
  const handleChange = (e) => {
    let { name, value } = e.target;
    setBankInfo({ ...bankInfo, [name]: value });
  };

  const handleSubmit = () => {
    let data = [];
    selOrder.map((item, index) => {
      if (item === true) {
        data.push({ id: tableData[index].id });
      }
    });
    dispatch(handleOrdered({ data, order: GenFileName('Order') }));
  };

  const onChange = (e) => {
    let { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value
    });
  };
  const exportPDF = () => {
    try {
      const unit = 'pt';
      const size = 'A4'; //-- [A1, A2, A3, A4]
      const orientation = 'portrait'; //-- [portrait, landscape]
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
      doc.setFontSize(15);
      const title = 'Invoice';
      const headers = [['Product Name', 'Product Description', 'Quantity', 'Price', 'Total']];
      const data = tableData.map((item) => [
        item.name,
        item.description,
        item.quantity,
        item.supply_product?.price,
        item.quantity * item.supply_product?.price
      ]);
      let companyName = 'Company Name :' + ' ' + info.cCompanyName;
      let companyAddress = 'Company Address :' + ' ' + info.cCompanyAddress;
      let person = 'Contact Person :' + ' ' + info.cPerson;
      let phone = 'Phone or Email Address :' + ' ' + info.cPhone;

      const content = { startY: 200, head: headers, body: data };
      doc.text(title, marginLeft, 40);
      doc.text(companyName, 50, 100, 'left', 0);
      doc.text(companyAddress, 50, 125, 'left', 0);
      doc.text(person, 50, 150, 'left', 0);
      doc.text(phone, 50, 175, 'left', 0);
      doc.autoTable(content);
      doc.save(GenFileName('Payment Invoice for order'));
      setInfo({ cCompanyName: '', cCompanyAddress: '', cPerson: '', cPhone: '' });
    } catch (err) {
      console.log(err?.message);
    }
  };
  return (
    <Box className="table-border container">
      <Grid item xs={12}>
        <Button
          className="account-yes-btn"
          onClick={() => (validateObject(info) ? exportPDF() : setAlert('Please fill the all values', 'warning'))}
        >
          PDF&nbsp;
          <FontAwesomeIcon icon={faDownload} />
        </Button>
      </Grid>
      <Grid container padding={4}>
        <Grid container spacing={4} marginTop={2}>
          <Grid item xs={6} sm={4}>
            <TextField
              id="outlined-basic"
              label="Company Name"
              value={info.cCompanyName}
              name="cCompanyName"
              onChange={onChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              id="outlined-basic"
              label="Company Address"
              value={info.cCompanyAddress}
              name="cCompanyAddress"
              onChange={onChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              id="outlined-basic"
              label="Contact Person"
              value={info.cPerson}
              name="cPerson"
              onChange={onChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              value={info.cPhone}
              name="cPhone"
              onChange={onChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              id="outlined-basic"
              label="Email Address"
              value={info.cEmail}
              type="email"
              name="cEmail"
              onChange={onChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              id="outlined-basic"
              label="Air Price"
              value={info.airPrice}
              name="airPrice"
              type="number"
              onChange={onChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              id="outlined-basic"
              label="Ship Price"
              type="number"
              value={info.shipPrice}
              name="shipPrice"
              onChange={onChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              id="outlined-basic"
              label="Shipping Price"
              value={info.shippingPrice}
              name="shippingPrice"
              type="number"
              onChange={onChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField
              id="outlined-basic"
              label="Tracking Number"
              value={info.trackingNumber}
              name="trackingNumber"
              type="number"
              onChange={onChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={12}>
            <TextareaAutosize
              placeholder="Please enter shipping carrier"
              style={{
                minWidth: '100%',
                maxWidth: '100%',
                minHeight: '120px',
                padding: '15px',
                borderColor: '#ccc',
                borderRadius: '12px',
                fontSize: '14px'
              }}
              value={info.shippingCarrier}
              name="shippingCarrier"
              type="test"
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="left">NO</TableCell>
              <TableCell align="left">NAME</TableCell>
              <TableCell align="right">IMAGE</TableCell>
              <TableCell align="right">DESCRIPTION</TableCell>
              <TableCell align="right">QUANTITY</TableCell>
              <TableCell align="right">PRICE</TableCell>
              <TableCell align="right">TOTAL</TableCell>
              <TableCell align="right">REMARK</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">
                  <ShowImg url={row.product_photo} />
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.supply_product?.quantity}</TableCell>
                <TableCell align="right">{row.supply_product?.price}</TableCell>
                <TableCell align="right">{5}</TableCell>
                <TableCell align="right">
                  <Checkbox
                    onChange={() => {
                      const temp = selOrder.map((i) => i);
                      temp[index] = !temp[index];
                      setSelOrder(temp);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Elements options={options} stripe={stripePromise} style={{ width: '100%' }}>
        <Billing bankInfo={bankInfo} handleChange={handleChange} />
      </Elements>
      <div style={{ display: 'flex', justifyContent: 'end', margin: '20px' }}>
        <Button
          className="admin-submit-btn"
          onClick={() =>
            validateObject(info) && validateObject(bankInfo)
              ? handleSubmit()
              : setAlert('Please fill the all values', 'warning')
          }
        >
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default Acknowledgment;

export const validateObject = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  if (Object.keys(obj).length === 0) {
    return false;
  }
  for (let key in obj) {
    if (!obj[key]) {
      return false;
    }
  }
  return true;
};
