import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';

import DFnewLogger from 'utils/DFnewLogger';
import NavItem from '../NavItem';

const NavCollapse = ({ menu, level }) => {
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
  };

  let pathMiddleId = location.pathname.split('/').slice(-2, -1)[0];
  if (location.pathname.includes('/dfinventory')) {
    if (pathMiddleId === 'product-sub-category') {
      pathMiddleId = location.pathname.split('/').slice(-3, -1)[0];
    }
  }

  useEffect(() => {
    try {
      if (pathMiddleId === menu.id) {
        setOpen(true);
        setSelected(menu.id);
      }
    } catch (err) {
      DFnewLogger(err?.message);
    }
  }, []);

  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });
  const Icon = menu.icon;
  const menuIcon = menu.icon ? (
    <Icon strokeWidth={1.5} size="1.3rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selected === menu.id ? 8 : 6,
        height: selected === menu.id ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  return (
    <>
      <ListItemButton
        sx={{
          mb: 0.5,
          alignItems: 'flex-start',
          pl: `${level * 24}px`,
          backgroundColor: pathMiddleId === menu.id ? '#405d78 !important' : '#122333'
        }}
        selected={pathMiddleId === menu.id}
        onClick={handleClick}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>{menuIcon}</ListItemIcon>
        <ListItemText
          primary={<Typography sx={{ my: 'auto' }}>{menu.title}</Typography>}
          secondary={
            menu.caption && (
              <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                {menu.caption}
              </Typography>
            )
          }
        />
        {open ? (
          <IconChevronUp stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
        ) : (
          <IconChevronDown stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: 'relative',
            '&:before': {
              content: "''",
              position: 'absolute',
              left: '24px',
              top: '0px',
              height: '100%',
              width: '1px',
              opacity: 1,
              background: '#ff6c00'
            }
          }}
        >
          {menus}
        </List>
      </Collapse>
    </>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number
};

export default NavCollapse;
