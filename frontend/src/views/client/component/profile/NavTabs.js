import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Tabs, Tab, Chip } from '@mui/material';

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
  const location = useLocation();
  let current = 0;
  switch (location.pathname) {
    case '/order-review':
    case '/customer-order-review':
    case '/welcome/schedule':
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
  let orderRoute = '/not-yet-shipped';
  let nameRoute = '/welcome/schedule';
  let nameLabel = 'Info';
  if (user) {
    if (Number(fitFor) < 3) {
      nameLabel = user?.name;
      nameRoute = '/order-review';
    } else {
      nameLabel = user?.kids[order - 1]?.name;
      if (user?.kids[order - 1]?.isCheckoutPending) {
        nameRoute = '/order-review';
      } else {
        nameRoute = user?.kids[order - 1]?.kRoute;
      }
      if (user?.kids[order - 1]?.kStatus == 7) {
        orderRoute = '/order';
      } else {
        orderRoute = '/not-yet-shipped';
      }
    }
  }
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
