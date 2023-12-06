import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { MENU_OPEN, SET_MENU } from 'actions/common/types';

const NavItem = ({ item, level }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );
  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }
  let listItemProps = {
    component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }
  const itemHandler = (id) => {
    dispatch({
      type: MENU_OPEN,
      id
    });
    if (matchesSM) {
      dispatch({
        type: SET_MENU,
        opened: false
      });
    }
  };

  let pathLastId = location.pathname.split('/').pop();
  if (location.pathname.includes('/dfinventory')) {
    if (location.pathname.includes('/product-sub-category')) {
      pathLastId = 'product-sub-category';
    }
    if (location.pathname.includes('/add-product')) {
      pathLastId = 'add-product';
    }
    if (location.pathname.includes('/edit-product')) {
      pathLastId = 'product-list';
    }
    if (location.pathname.includes('/product-list')) {
      pathLastId = 'product-list';
    }
  }

  useEffect(() => {
    const currentIndex = location.pathname.split('/').findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch({
        type: MENU_OPEN,
        id: item.id
      });
    }
  }, [dispatch, item]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{ mb: 0.5, alignItems: 'flex-start', pl: `${level * 24}px` }}
      selected={pathLastId === item.id}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={<Typography>{item.title}</Typography>}
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
