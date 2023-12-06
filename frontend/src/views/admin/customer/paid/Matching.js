import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography, Paper, Button, Tooltip, Grid, Breadcrumbs } from '@mui/material';
import { faEye, faDashboard, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getMatch } from 'actions/admin/customer';
import ShowImg from 'ui-component/ShowImg';

const columns = [
  { accessorKey: 'percentage', header: 'Matching Percentage', size: 30 },
  { accessorKey: 'brandName', header: 'Brand Name' },
  { accessorKey: 'product_name_one', header: 'Product Name 1' },
  { accessorKey: 'product_name_two', header: 'Product Name 2' },
  { accessorKey: 'prod_id', header: 'Style No.' },
  { accessorKey: 'productImage', header: 'Product Image' },
  { accessorKey: 'primary_size', header: 'Size' },
  { accessorKey: 'colorName', header: 'Color' },
  { accessorKey: 'purchase_price', header: 'Price' },
  { accessorKey: 'quantity', header: 'Quantity' },
  { accessorKey: 'action', header: 'Action' }
];

const Matching = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const { id } = useParams();
  const data = useSelector((state) => state.customer).paidList.filter((item) => item.id === Number(id));
  useEffect(() => {
    dispatch(getMatch({ id: id }));
  }, [id, dispatch]);
  const { matchingData, condition } = useSelector((state) => state.customer);

  let tableData = matchingData?.map((item) => {
    const action_btn = (
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
        <Tooltip title="Add" arrow>
          <Link to="/dfadmin/customer/paid-list/matching">
            <Button className="admin-table-btn password">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Link>
        </Tooltip>
        <Tooltip title="View" arrow>
          <Link to="/dfadmin/customer/paid-list">
            <Button className="admin-table-btn edit">
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </Link>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <Button className="admin-table-btn delete">
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </Tooltip>
      </div>
    );
    let percentage;
    condition.forEach((element) => {
      if (element?.product_id === item?.id) {
        percentage = (Object.keys(element).length - 1) * 10 + ' % matches';
      }
    });
    return {
      ...item,
      percentage,
      colorName: item?.in_color?.name,
      action: action_btn,
      productImage: <ShowImg url={`https://www.drapefittest.com/inventory/files/product_img/${item?.product_image}`} />,
      brandName: item?.in_rack?.rack_name
    };
  });

  useEffect(() => {
    if (data[0]?.kid_detail) {
      setName(data[0]?.kid_detail.kids_first_name);
    } else {
      setName(data[0]?.user?.user_detail?.first_name + ' ' + data[0]?.user?.user_detail?.last_name);
    }
  }, [data]);

  return (
    <>
      <Grid container className="admin-page-title-part">
        <Grid item xs={12} className="h-align-right">
          <Breadcrumbs>
            <Link to="/dfadmin/dashboard" className="home-link">
              <FontAwesomeIcon icon={faDashboard} /> Home
            </Link>
            <Typography className="home-link disable">Customer</Typography>
            <Link to="/dfadmin/customer/paid-list" className="home-link">
              Paid List
            </Link>
            <Typography className="home-link current">Matching</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} className="h-align-left">
          <Typography className="page-title">Matching List of {name}</Typography>
        </Grid>
      </Grid>
      <Paper className="admin-form-container form-border">
        <Table data={tableData} columns={columns} />
      </Paper>
    </>
  );
};

export default Matching;
