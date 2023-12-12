import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDesktop,
  faEdit,
  faTrashCan,
  faListUl,
  faPrint,
  faEye,
  faCheck,
  faMultiply
} from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Typography,
  Tooltip,
  Button,
  FormControl,
  Breadcrumbs,
  Grid,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@mui/material';
import Barcode from 'react-barcode';
import html2pdf from 'html2pdf.js';
import { SET_LOADING } from 'actions/common/types';
import { getProductCategories } from 'actions/inventory/productCategory';
import { getProductList, deleteProduct, toggleProductActive } from 'actions/inventory/product';
import GenFileName from 'utils/GenFileName';
import { FirstUpper } from 'utils/FirstUpper';
import { GenBarcodeStyleNo } from 'utils/GenBarcodeStyleNo';
import { selectProps, profileList } from 'constant/other';
import DFnewLogger from 'utils/DFnewLogger';
import ShowImg from 'ui-component/ShowImg';
import DeleteModal from 'ui-component/modal/DeleteModal';
import Table from 'ui-component/Table';

const columns = [
  { accessorKey: 'brand_id', header: 'Brand Name' },
  { accessorKey: 'product_name_one', header: 'Product Name 1' },
  { accessorKey: 'productImage', header: 'Product Image', enableColumnFilter: false, enableSorting: false },
  { accessorKey: 'colorName', header: 'Color' },
  { accessorKey: 'purchase_price', header: 'Purchase Price', enableColumnFilter: false },
  { accessorKey: 'sale_price', header: 'Sale Price', enableColumnFilter: false },
  { accessorKey: 'quantity', header: 'Quantity', enableColumnFilter: false },
  { accessorKey: 'style_number', header: 'Style Number', enableColumnFilter: false },
  { accessorKey: 'action', header: 'Action', enableColumnFilter: false, enableSorting: false }
];

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [toggleMsg, setToggleMsg] = useState('');
  const [openPrint, setOpenPrint] = useState(false);
  const handlePrintDialog = () => {
    setOpenPrint(!openPrint);
  };
  const [openDelete, setOpenDelete] = useState(false);
  const handleDeleteDialog = () => {
    setOpenDelete(!openDelete);
  };
  const [openToggle, setOpenToggle] = useState(false);
  const handleToggleDialog = () => {
    setOpenToggle(!openToggle);
  };
  const [itemData, setItemData] = useState({});
  const [profile, setProfile] = useState(1);
  const [category, setCategory] = useState('');

  const downloadPdf = async (profile, barcodeNum) => {
    try {
      dispatch({ type: SET_LOADING });
      const element = document.getElementById('p-barcode');
      const opt = {
        margin: [10, 10, 10, 10],
        filename: GenFileName(`INVP_${profile.toUpperCase()}_BC_${barcodeNum}`),
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
    dispatch(getProductCategories());
    dispatch(
      getProductList({
        profile: profile,
        categoryId: category
      })
    );
  }, [dispatch, profile, category]);

  const { prodCategories } = useSelector((state) => state.invProductCategory);
  const { tableData } = useSelector((state) => state.invProduct);
  let updateData = [];
  updateData = tableData.map((item, index) => {
    const action_btn = (
      <div key={index}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Tooltip title="Details" arrow>
            <Button
              className="admin-table-btn edit"
              onClick={() => {
                navigate(`/dfinventory/product-list/individual/${item.id}`);
              }}
            >
              <FontAwesomeIcon icon={faListUl} />
            </Button>
          </Tooltip>
          <Tooltip title="Print" arrow>
            <Button
              className="admin-table-btn password"
              onClick={() => {
                setItemData(item);
                handlePrintDialog();
              }}
            >
              <FontAwesomeIcon icon={faPrint} />
            </Button>
          </Tooltip>
          <Tooltip title="OverView" arrow>
            <Button
              className="admin-table-btn deactive"
              onClick={() => {
                navigate(`/dfinventory/product-list/view/${item.id}/${item.profile_type}`);
              }}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </Tooltip>
        </div>
        <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
          <Tooltip title="Edit" arrow>
            <Button
              className="admin-table-btn update"
              onClick={() => {
                navigate(`/dfinventory/product-list/edit/${item.id}/${item.profile_type}`);
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
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
          <Tooltip title={item.is_active === 1 ? 'Deactivate' : 'Activate'} arrow>
            <Button
              className={`admin-table-btn ${item.is_active === 1 ? 'deactive' : 'disabled'}`}
              onClick={() => {
                setId(item.id);
                setToggleMsg(item.is_active === 1 ? 'de' : '');
                handleToggleDialog();
              }}
            >
              <FontAwesomeIcon icon={item.is_active === 1 ? faCheck : faMultiply} />
            </Button>
          </Tooltip>
        </div>
      </div>
    );

    return {
      ...item,
      productImage: <ShowImg url={`https://www.drapefittest.com/inventory/files/product_img/${item.product_image}`} />,
      colorName: item.in_color?.name,
      action: action_btn
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
            <Typography className="home-link current">Product List</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Product List</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
          <Typography color="#ff0000">
            Search fields are <strong>Brand Name</strong>, <strong>Product Name 1</strong>,{' '}
            <strong>Product Name 2</strong>, <strong>Size</strong>, <strong>Color</strong>
          </Typography>
        </Grid>
      </Grid>
      <Box className="table-border container no-margin">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography>
                  <strong>Profile</strong>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    name="profile"
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    MenuProps={selectProps}
                  >
                    {profileList.map((item, index) => (
                      <MenuItem key={index} value={index + 1}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography>
                  <strong>Category</strong>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    name="category"
                    value={category}
                    onChange={(evt) => setCategory(evt.target.value)}
                    MenuProps={selectProps}
                  >
                    {prodCategories.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.product_type + ' ' + item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Table columns={columns} data={updateData} />
          </Grid>
        </Grid>
      </Box>
      <Dialog open={openPrint} onClose={handlePrintDialog} scroll="paper">
        <DialogTitle>
          <Typography className="dialog-title">Barcode Print</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Box id="p-barcode">
            {[...new Array(itemData.quantity)].map((item, index) => (
              <Box className="barcode-box" key={index}>
                <Typography className="barcode-name" align="center">
                  <b>{itemData.product_name_one}</b>
                </Typography>
                <Typography className="barcode-subname" align="center">
                  {itemData.product_name_two}
                </Typography>
                <Typography className="barcode-name border" align="left">
                  Size: <strong>{itemData.sizeSelected}</strong>
                  <span className="right">
                    Color: <strong>{itemData.color}</strong>
                  </span>
                </Typography>
                <div className="h-align-center">
                  <Barcode value={GenBarcodeStyleNo(itemData?.style_number, index)} height={18} width={1.3} />
                </div>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button className="account-no-btn" onClick={handlePrintDialog}>
            Cancel
          </Button>
          <Button
            className="account-yes-btn"
            onClick={async () => {
              try {
                const barcodeNum = GenBarcodeStyleNo(itemData?.style_number, 0).slice(0, -2);
                await downloadPdf(profile, barcodeNum);
                handlePrintDialog();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteModal
        openDelete={openDelete}
        handleDeleteDialog={handleDeleteDialog}
        deleteFunction={deleteProduct({ id: id, profile: profile, categoryId: category })}
      />
      <Dialog open={openToggle} onClose={handleToggleDialog}>
        <DialogTitle>
          <Typography className="dialog-title">Are you sure to {toggleMsg}activate?</Typography>
        </DialogTitle>
        <DialogActions>
          <Button className="account-no-btn" onClick={handleToggleDialog}>
            Cancel
          </Button>
          <Button
            className="account-delete-btn"
            onClick={async () => {
              try {
                dispatch(toggleProductActive({ id: id, profile: profile, categoryId: category }));
                handleToggleDialog();
              } catch (err) {
                DFnewLogger(err?.message);
              }
            }}
          >
            {FirstUpper(toggleMsg)}activate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductList;
