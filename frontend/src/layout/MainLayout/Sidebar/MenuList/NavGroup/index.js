import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { List, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { logout } from 'actions/common/auth';
import NavCollapse from '../NavCollapse';
import NavItem from '../NavItem';

const NavGroup = ({ item }) => {
  const dispatch = useDispatch();
  const items = item.children?.map((menu) => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />;
      case 'logout':
        return (
          <Typography key={menu.id} onClick={() => dispatch(logout())} className="sidebar-logout">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <span style={{ marginLeft: '0.5em' }}>Logout</span>
          </Typography>
        );
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List>{items}</List>
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
