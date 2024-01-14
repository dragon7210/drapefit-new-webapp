import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Tabs, Tab, Chip } from '@mui/material';
import { useEffect, useState } from 'react';

const LinkTab = (props) => {
  return (
    <Tab
      component={Link}
      {...props}
      sx={{
        color: '#ff6c00 !important',
        fontSize: { xs: '12px', sm: '16px' },
        fontWeight: '600 !important',
        paddingBottom: '2px',
        '&:hover': {
          borderBottom: '2px solid',
          paddingBottom: '0px'
        }
      }}
    />
  );
};

const NavTabs = () => {
  const fitFor = localStorage.getItem('fitFor');
  const order = localStorage.getItem('order');
  const { user } = useSelector((state) => state.auth);
  const { products, paidStatus } = useSelector((state) => state.profile);
  const location = useLocation();
  let current = 0;
  switch (location.pathname) {
    case '/order-review':
    case '/customer-order-review':
    case '/welcome/schedule':
    case '/calendar-sechedule':
    case '/not-yet-shipped':
      current = 0;
      break;
    case '/order':
    case '/not-yet-shipped':
      current = 2;
      break;
    case '/clients/referrals':
      current = 3;
      break;
    default:
      current = 1;
  }

  const [orderRoute, setOrderRoute] = useState('/not-yet-shipped');
  const [nameRoute, setNameRoute] = useState('/welcome/schedule');
  const [nameLabel, setNameLabel] = useState('Info');

  useEffect(() => {
    if (!products) {
      return;
    }
    console.log(paidStatus);
    if (products.filter((p) => p.checkedout === 'N').length) {
      setNameRoute('/order-review');
    } else if (paidStatus === 1) {
      setNameRoute('/welcome/schedule');
    } else if (paidStatus === 4) {
      setNameRoute('/calendar-sechedule');
    } else {
      setNameRoute('/not-yet-shipped');
    }
  }, [paidStatus, products]);

  useEffect(() => {
    if (user) {
      if (Number(fitFor) < 3) {
        setNameLabel(user?.name);
      } else {
        setNameLabel(user?.kids[order - 1]?.name);
      }
    }
  }, [fitFor, order, user]);
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={current} aria-label="nav tabs example" centered>
        <LinkTab
          icon={
            <Chip
              label={nameLabel?.charAt(0)}
              style={{ backgroundColor: '#232f3e', color: '#ff6c00', fontWeight: '700', fontSize: '18px' }}
            />
          }
          label={nameLabel}
          iconPosition="start"
          to={nameRoute}
        />
        <LinkTab
          label="FIT PROFILE"
          to={`/welcome/basic-info/${fitFor === '2' ? 'women' : fitFor === '1' ? 'men' : 'kids'}`}
        />
        <LinkTab label="ORDERS" to={orderRoute} />
        <LinkTab label="GET $25" to="/clients/referrals" />
      </Tabs>
    </Box>
  );
};

export default NavTabs;
