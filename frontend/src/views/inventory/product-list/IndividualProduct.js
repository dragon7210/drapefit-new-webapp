import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faPrint } from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Typography,
  Tooltip,
  Button,
  Breadcrumbs,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@mui/material';
import Barcode from 'react-barcode';
import html2pdf from 'html2pdf.js';
import { SET_LOADING } from 'actions/common/types';
import GenFileName from 'utils/GenFileName';
import DFnewLogger from 'utils/DFnewLogger';
import ShowImg from 'ui-component/ShowImg';
import Table from 'ui-component/Table';
import { getProduct } from 'actions/inventory/product';

const columns = [
  { accessorKey: 'brand_id', header: 'Brand Name', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'product_name_one', header: 'Product Name 1', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'product_name_two', header: 'Product Name 2', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'productImage', header: 'Product Image', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'sizeSelected', header: 'Size', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'colorName', header: 'Color', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'purchase_price', header: 'Purchase Price', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'sale_price', header: 'Sale Price', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'quantity', header: 'Quantity', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'barcode', header: 'Barcode', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
];

const IndividualProduct = () => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState({});
  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };
  const { id } = useParams();
  const downloadPdf = async (barcodeNum) => {
    try {
      dispatch({ type: SET_LOADING });
      const element = document.getElementById('p-barcode');
      const opt = {
        margin: [10, 10, 10, 10],
        filename: GenFileName(`INVP_INDV_BC_${barcodeNum}`),
        image: { type: 'jpeg', quality: 0.99 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
      };
      html2pdf()
        .from(element)
        .set(opt)
        .save()
        .then(() => {
          dispatch({ type: SET_LOADING });
        });
    } catch (err) {
      dispatch({ type: SET_LOADING });
      DFnewLogger(err?.message);
    }
  };

  useEffect(() => {
    dispatch(getProduct({ id }));
  }, [dispatch, id]);

  const { indProduct } = useSelector((state) => state.invProduct);
  let updateData = [];
  updateData = indProduct.map((item) => {
    return {
      ...item,
      quantity: item.quantity,
      productImage: <ShowImg url={item.product_image} />,
      barcode: <Barcode value={item.style_number || ''} height={50} width={1} />,
      colorName: item.in_color?.name,
      action: (
        <Tooltip title="Print" arrow>
          <Button
            className="admin-table-btn password"
            onClick={() => {
              setData(item);
              handleDialog();
            }}
          >
            <FontAwesomeIcon icon={faPrint} />
          </Button>
        </Tooltip>
      )
    };
  });

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfinventory/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDesktop} />
              &nbsp;&nbsp;Home
            </Link>
            <Link to="/dfinventory/product-list" className="home-link">
              Product List
            </Link>
            <Typography className="home-link current">Individual Product</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Individual Product</Typography>
        </Grid>
      </Grid>
      <Box className="table-border">
        <Table columns={columns} data={updateData} />
      </Box>
      {/* Modal Dialogs */}
      <Dialog open={openDialog} onClose={handleDialog} scroll="paper">
        <DialogTitle>
          <Typography className="dialog-title">Barcode Print</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Box id="p-barcode">
            <Box className="barcode-box">
              <Typography className="barcode-name" align="center">
                <b>{data?.product_name_one}</b>
              </Typography>
              <Typography className="barcode-subname" align="center">
                {data?.product_name_two}
              </Typography>
              <Typography className="barcode-name border" align="left">
                Size: <strong>{data?.sizeSelected}</strong>
                <span className="right">
                  Color: <strong>{data?.color}</strong>
                </span>
              </Typography>
              <div className="h-align-center">
                <Barcode value={data.style_number || ''} height={18} width={1.3} />
              </div>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button className="account-no-btn" onClick={handleDialog}>
            Cancel
          </Button>
          <Button
            className="account-yes-btn"
            onClick={async () => {
              try {
                await downloadPdf(data.style_number);
                handleDialog();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default IndividualProduct;
