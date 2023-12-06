import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Divider,
  TableContainer,
  Button
} from '@mui/material';
import Barcode from 'react-barcode';
import JsPDF from 'jspdf';
import 'jspdf-autotable';

const OrderReceipt = () => {
  const tableData = [
    { id: 'WA3A31-10-1208-20', name: 'women top 3', size: '10L (10 - 12)', color: 'Sky Blue', price: 29.99 },
    { id: 'WA1A11-10-1045-8	', name: 'women bottom 3', size: '10L (10 - 12)', color: 'Orange', price: 20 },
    { id: 'WA3A31-10-1208-20', name: 'women bottom 3', size: '12M (6 - 8)', color: 'Sky Blue', price: 35.5 }
  ];
  let subTotal = 0;
  let salesTax = 0;
  tableData.forEach((item) => (subTotal += item.price));

  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Order Receipt</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Box id="print-order-receipt">
          <Box className="h-align-right">
            <Barcode value="john@doe.com" height={80} width={1.2} />
          </Box>
          <Grid container spacing={3} className="fx-sm-padding">
            <Grid item xs={12}>
              <Typography className="order-receipt-title">Hello, John Doe</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Thank you for letting us prepare your FIT #1 for you.</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Your Personal Stylist John Doe picks following product for you.</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>ITEM ID</strong>
                      </TableCell>
                      <TableCell>
                        <strong>ITEM NAME</strong>
                      </TableCell>
                      <TableCell>
                        <strong>SIZE</strong>
                      </TableCell>
                      <TableCell>
                        <strong>COLOR</strong>
                      </TableCell>
                      <TableCell>
                        <strong>PRICE</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((item, index) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.size}</TableCell>
                        <TableCell>{item.color}</TableCell>
                        <TableCell>${item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Purchase all discount:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>You'll receive 25% discount when you purchase all products.</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={1}>
                <Grid item xs={9}>
                  <Typography align="right">subtotal:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="left">${subTotal}</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography align="right">Purchase all discount 25%:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="left">-${Math.floor(subTotal / 4)}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={9}>
                  <Typography align="right">Order subtotal:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="left">${subTotal - Math.floor(subTotal / 4)}</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography align="right">Sales Tax:</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="left">${salesTax}</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography align="right">
                    <strong>Order Total:</strong>
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography align="left">${subTotal - Math.floor(subTotal / 4) + salesTax}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Please check out online - it will help us to make better Fit next time.</strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>1. Please sign in to drapefit.com.</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>2. Complete your checkout and Provide your feedback.</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                3. Ship any exchange or return product with prepaid mailing bag within 3 Business days.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography className="order-receipt-inc">DRAPE FIT</Typography>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ mb: '20px' }} />
        <Button
          className="admin-submit-btn"
          onClick={() => {
            const report = new JsPDF({
              orientation: 'p',
              unit: 'px',
              format: 'a1',
              compressPdf: true
            });
            report.html(document.querySelector('#print-order-receipt')).then(() => {
              report.save('report.pdf');
            });
          }}
        >
          Print
        </Button>
      </Paper>
    </>
  );
};

export default OrderReceipt;
