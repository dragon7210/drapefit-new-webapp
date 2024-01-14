import { useState, useRef, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconButton,
  List,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Grid,
  Paper,
  Popper,
  useTheme,
  useMediaQuery,
  Badge
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faAngleDown,
  faListUl,
  faUserPlus,
  faUserGear,
  faUserPen,
  faUserCheck,
  faRightFromBracket,
  faChild,
  faGaugeHigh,
  faBell,
  faDesktop
} from '@fortawesome/free-solid-svg-icons';
import PerfectScrollbar from 'react-perfect-scrollbar';

import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import { logout } from 'actions/common/auth';
import { addNewKid } from 'actions/client/kids';

const LinkSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, paidStatus } = useSelector((state) => state.profile);
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useSelector((state) => state.auth);
  const order = user?.kids?.length;
  const [open, setOpen] = useState(false);
  const [nameRoute, setNameRoute] = useState('/welcome/schedule');
  const anchorRef = useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const prevOpen = useRef(open);

  useEffect(() => {
    if (!user || !products) {
      return;
    }
    console.log(user);
    const userType = ['men', 'women', 'kids'][user.user_detail.gender - 1];
    if (user.user_detail.is_progressbar === 0) {
      setNameRoute(`/welcome/basic-info/${userType}`);
    } else if (user.user_detail.is_progressbar === 25) {
      setNameRoute(`/welcome/style-fit/${userType}`);
    } else if (user.user_detail.is_progressbar === 50) {
      setNameRoute(`/welcome/price-range/${userType}`);
    } else if (user.user_detail.is_progressbar === 75) {
      setNameRoute(`/welcome/style-custom/${userType}`);
    } else if (products.filter((p) => p.checkedout === 'N').length) {
      setNameRoute('/order-review');
    } else if (paidStatus === 1) {
      setNameRoute('/welcome/schedule');
    } else if (paidStatus === 4) {
      setNameRoute('/calendar-sechedule');
    } else {
      setNameRoute('/not-yet-shipped');
    }
  }, [paidStatus, products, user]);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const [openMen, setOpenMen] = useState(false);
  const anchorRefMen = useRef(null);
  const handleToggleMen = () => {
    setOpenMen((prevOpenMen) => !prevOpenMen);
  };
  const handleCloseMen = (event) => {
    if (anchorRefMen.current && anchorRefMen.current.contains(event.target)) {
      return;
    }
    setOpenMen(false);
  };
  const prevOpenMen = useRef(openMen);

  useEffect(() => {
    if (prevOpenMen.current === true && openMen === false) {
      anchorRefMen.current.focus();
    }
    prevOpenMen.current = openMen;
  }, [openMen]);

  const [openWomen, setOpenWomen] = useState(false);
  const anchorRefWomen = useRef(null);
  const handleToggleWomen = () => {
    setOpenWomen((prevOpenWomen) => !prevOpenWomen);
  };
  const handleCloseWomen = (event) => {
    if (anchorRefWomen.current && anchorRefWomen.current.contains(event.target)) {
      return;
    }
    setOpenWomen(false);
  };
  const prevOpenWomen = useRef(openWomen);

  useEffect(() => {
    if (prevOpenWomen.current === true && openWomen === false) {
      anchorRefWomen.current.focus();
    }
    prevOpenWomen.current = openWomen;
  }, [openWomen]);

  const [openAccount, setOpenAccount] = useState(false);
  const anchorRefAccount = useRef(null);
  const handleToggleAccount = () => {
    setOpenAccount((prevOpenAccount) => !prevOpenAccount);
  };
  const handleCloseAccount = (event) => {
    if (anchorRefAccount.current && anchorRefAccount.current.contains(event.target)) {
      return;
    }
    setOpenAccount(false);
  };
  const prevOpenAccount = useRef(openAccount);

  useEffect(() => {
    if (prevOpenAccount.current === true && openAccount === false) {
      anchorRefAccount.current.focus();
    }
    prevOpenAccount.current = openAccount;
  }, [openAccount]);

  const kidsProfile = (kidOrder, kidGender) => {
    localStorage.setItem('order', kidOrder);
    localStorage.setItem('fitFor', kidGender);
  };

  const userProfile = () => {
    localStorage.setItem('fitFor', user?.fitFor === 1 ? 1 : user?.fitFor === 2 ? 2 : 3);
  };
  let badgeCount = 0;
  // if (user?.isCheckoutPending === true) badgeCount++;
  // user?.kids.map((item) => {
  //   if (item.isCheckoutPending === true) badgeCount++;
  // });

  return (
    <>
      {user ? (
        <>
          <Box sx={{ display: 'flex' }}>
            <Link to="/customer-care/faq" className="header-link-item">
              ? FAQ
            </Link>
            <Badge badgeContent={badgeCount} className="pending-badge">
              <Button
                className="header-link-outbtn"
                sx={{ my: 'auto' }}
                ref={anchorRefAccount}
                aria-haspopup="true"
                onClick={handleToggleAccount}
              >
                <FontAwesomeIcon icon={faUserCheck} style={{ marginRight: '8px', fontSize: '18px' }} />
                My Account
              </Button>
            </Badge>
          </Box>
          <Popper
            placement={matchDownMD ? 'bottom-start' : 'bottom-start'}
            open={openAccount}
            anchorEl={anchorRefAccount.current}
            role={undefined}
            transition
            disablePortal
            popperOptions={{
              modifiers: [{ name: 'offset', options: { offset: [-68, 10] } }]
            }}
          >
            {({ TransitionProps }) => (
              <Transitions position={matchDownMD ? 'top-left' : 'top-left'} in={open} {...TransitionProps}>
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseAccount}>
                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                      <Grid container direction="column" spacing={2}>
                        <Grid item xs={12}>
                          <Box sx={{ backgroundColor: '#1c2734' }}>
                            <Link
                              to={nameRoute}
                              sx={{ textDecoration: 'none' }}
                              onClick={(e) => {
                                userProfile();
                                handleCloseAccount(e);
                              }}
                            >
                              <List className="toggle-btn-item">
                                <FontAwesomeIcon icon={faUserPen} style={{ fontSize: '15px', marginRight: '10px' }} />
                                {user?.name?.toUpperCase()}
                                {user?.isCheckoutPending && <FontAwesomeIcon icon={faBell} className="bell-badge" />}
                              </List>
                            </Link>
                            {user?.kids?.map((item, index) => (
                              <Fragment key={index}>
                                <Divider className="toggle-btn-divider" />
                                <Link
                                  to={item?.isCheckoutPending ? '/order-review' : `${item.kRoute}`}
                                  sx={{ textDecoration: 'none' }}
                                  onClick={(e) => {
                                    kidsProfile(index + 1, item.kGender);
                                    handleCloseAccount(e);
                                  }}
                                >
                                  <List className="toggle-btn-item">
                                    <FontAwesomeIcon
                                      icon={faChild}
                                      style={{ fontSize: '15px', marginRight: '10px', marginLeft: '18px' }}
                                    />
                                    {item.name}
                                    {item.isCheckoutPending && <FontAwesomeIcon icon={faBell} className="bell-badge" />}
                                  </List>
                                </Link>
                              </Fragment>
                            ))}
                            <Divider className="toggle-btn-divider" />
                            <Link
                              sx={{ textDecoration: 'none' }}
                              onClick={() => dispatch(addNewKid(order + 1, navigate))}
                            >
                              <List className="toggle-btn-item">
                                <FontAwesomeIcon icon={faUserPlus} style={{ fontSize: '15px', marginRight: '10px' }} />
                                ADD A CHILD PROFILE
                              </List>
                            </Link>
                            <Divider className="toggle-btn-divider" />
                            <Link
                              to="/account"
                              sx={{ textDecoration: 'none' }}
                              onClick={(e) => {
                                userProfile();
                                handleCloseAccount(e);
                              }}
                            >
                              <List className="toggle-btn-item">
                                <FontAwesomeIcon icon={faUserGear} style={{ fontSize: '15px', marginRight: '10px' }} />
                                SETTING
                              </List>
                            </Link>
                            {user?.role === 100 && (
                              <>
                                <Divider className="toggle-btn-divider" />
                                <Link
                                  to="/dfadmin/dashboard"
                                  sx={{ textDecoration: 'none' }}
                                  onClick={handleCloseAccount}
                                >
                                  <List className="toggle-btn-item admin-dashboard">
                                    <FontAwesomeIcon
                                      icon={faGaugeHigh}
                                      style={{ fontSize: '15px', marginRight: '10px' }}
                                    />
                                    ADMIN&nbsp;&nbsp;DASHBOARD
                                  </List>
                                </Link>
                                <Divider className="toggle-btn-divider" />
                                <Link
                                  to="/dfinventory/dashboard"
                                  sx={{ textDecoration: 'none' }}
                                  onClick={handleCloseAccount}
                                >
                                  <List className="toggle-btn-item admin-dashboard">
                                    <FontAwesomeIcon
                                      icon={faDesktop}
                                      style={{ fontSize: '15px', marginRight: '10px' }}
                                    />
                                    INVENTORY&nbsp;&nbsp;DASHBOARD
                                  </List>
                                </Link>
                                <Divider className="toggle-btn-divider" />
                                <Link
                                  to="/dfsupplier/dashboard"
                                  sx={{ textDecoration: 'none' }}
                                  onClick={handleCloseAccount}
                                >
                                  <List className="toggle-btn-item admin-dashboard">
                                    <FontAwesomeIcon
                                      icon={faDesktop}
                                      style={{ fontSize: '15px', marginRight: '10px' }}
                                    />
                                    SUPPLIER&nbsp;&nbsp;DASHBOARD
                                  </List>
                                </Link>
                                <Divider className="toggle-btn-divider" />
                                <Link
                                  to="/dfmerchandise/dashboard"
                                  sx={{ textDecoration: 'none' }}
                                  onClick={handleCloseAccount}
                                >
                                  <List className="toggle-btn-item admin-dashboard">
                                    <FontAwesomeIcon
                                      icon={faDesktop}
                                      style={{ fontSize: '15px', marginRight: '10px' }}
                                    />
                                    MERCHANDISE&nbsp;&nbsp;DASHBOARD
                                  </List>
                                </Link>
                              </>
                            )}
                            {user?.role === 101 && (
                              <>
                                <Divider className="toggle-btn-divider" />
                                <Link
                                  to="/dfadmin/dashboard"
                                  sx={{ textDecoration: 'none' }}
                                  onClick={handleCloseAccount}
                                >
                                  <List className="toggle-btn-item admin-dashboard">
                                    <FontAwesomeIcon
                                      icon={faGaugeHigh}
                                      style={{ fontSize: '15px', marginRight: '10px' }}
                                    />
                                    ADMIN&nbsp;&nbsp;DASHBOARD
                                  </List>
                                </Link>
                              </>
                            )}
                            {user?.role === 104 && (
                              <>
                                <Divider className="toggle-btn-divider" />
                                <Link
                                  to="/dfinventory/dashboard"
                                  sx={{ textDecoration: 'none' }}
                                  onClick={handleCloseAccount}
                                >
                                  <List className="toggle-btn-item admin-dashboard">
                                    <FontAwesomeIcon
                                      icon={faDesktop}
                                      style={{ fontSize: '15px', marginRight: '10px' }}
                                    />
                                    INVENTORY&nbsp;&nbsp;DASHBOARD
                                  </List>
                                </Link>
                              </>
                            )}
                            {user?.role === 107 && (
                              <>
                                <Divider className="toggle-btn-divider" />
                                <Link
                                  to="/dfsupplier/dashboard"
                                  sx={{ textDecoration: 'none' }}
                                  onClick={handleCloseAccount}
                                >
                                  <List className="toggle-btn-item admin-dashboard">
                                    <FontAwesomeIcon
                                      icon={faDesktop}
                                      style={{ fontSize: '15px', marginRight: '10px' }}
                                    />
                                    SUPPLIER&nbsp;&nbsp;DASHBOARD
                                  </List>
                                </Link>
                              </>
                            )}
                            <Divider className="toggle-btn-divider" />
                            <Link
                              sx={{ textDecoration: 'none' }}
                              onClick={async () => {
                                handleToggleAccount();
                                await dispatch(logout());
                              }}
                            >
                              <List className="toggle-btn-item-sign">
                                <FontAwesomeIcon
                                  icon={faRightFromBracket}
                                  style={{ fontSize: '15px', marginRight: '10px' }}
                                />
                                SIGN OUT
                              </List>
                            </Link>
                          </Box>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </ClickAwayListener>
                </Paper>
              </Transitions>
            )}
          </Popper>
        </>
      ) : (
        <>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link
              className="header-link-item"
              ref={anchorRefMen}
              aria-controls={openMen ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggleMen}
            >
              MEN
              <FontAwesomeIcon icon={faAngleDown} style={{ marginLeft: '12px' }} />
            </Link>
            <Link
              className="header-link-item"
              ref={anchorRefWomen}
              aria-controls={openWomen ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggleWomen}
            >
              WOMEN
              <FontAwesomeIcon icon={faAngleDown} style={{ marginLeft: '16px' }} />
            </Link>
            <Link className="header-link-item" to="/kids">
              KIDS
            </Link>
            <Link to="/login" className="link-to-btn">
              <Button className="header-link-btn" variant="contained" sx={{ my: 'auto' }}>
                <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: '8px', fontSize: '18px' }} />
                SIGN IN
              </Button>
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              sx={{
                fontSize: '18px',
                padding: '8px',
                backgroundColor: '#232f3e',
                color: '#fff',
                '&:hover': { backgroundColor: '#ff6c00' }
              }}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <FontAwesomeIcon icon={faListUl} />
            </IconButton>
          </Box>
          <Popper
            sx={{ display: { md: 'none' } }}
            placement={matchDownMD ? 'bottom-start' : 'bottom-start'}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
            popperOptions={{
              modifiers: [{ name: 'offset', options: { offset: [matchDownMD ? 5 : 0, 20] } }]
            }}
          >
            {({ TransitionProps }) => (
              <Transitions position={matchDownMD ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                      <Grid container direction="column" spacing={2}>
                        <Grid item xs={12}>
                          <PerfectScrollbar style={{ maxHeight: 'calc(80vh)' }}>
                            <Box sx={{ backgroundColor: '#18212c' }}>
                              <Link to="/men" sx={{ textDecoration: 'none' }} onClick={handleClose}>
                                <List className="toggle-btn-item-collapse">
                                  <FontAwesomeIcon
                                    icon={faAngleDown}
                                    style={{ marginRight: '12px', fontSize: '18px' }}
                                  />
                                  MEN
                                </List>
                              </Link>
                              <Divider className="toggle-btn-divider" />
                              <Link to="/men" sx={{ textDecoration: 'none' }} onClick={handleClose}>
                                <List className="toggle-btn-item">MEN'S FITS</List>
                              </Link>
                              <Divider className="toggle-btn-divider" />
                              <Link to="/men/big-tall" sx={{ textDecoration: 'none' }} onClick={handleClose}>
                                <List className="toggle-btn-item">BIG & TALL</List>
                              </Link>
                              <Divider className="toggle-btn-divider" />
                              <Link to="/women" sx={{ textDecoration: 'none' }} onClick={handleClose}>
                                <List className="toggle-btn-item-collapse">
                                  <FontAwesomeIcon
                                    icon={faAngleDown}
                                    style={{ marginRight: '12px', fontSize: '18px' }}
                                  />
                                  WOMEN
                                </List>
                              </Link>
                              <Divider className="toggle-btn-divider" />
                              <Link to="/women" sx={{ textDecoration: 'none' }} onClick={handleClose}>
                                <List className="toggle-btn-item">WOMEN'S FITS</List>
                              </Link>
                              <Divider className="toggle-btn-divider" />
                              <Link to="/women/plus-size" sx={{ textDecoration: 'none' }} onClick={handleClose}>
                                <List className="toggle-btn-item">PLUS SIZE FITS</List>
                              </Link>
                              <Divider className="toggle-btn-divider" />
                              <Link to="/women/maternity" sx={{ textDecoration: 'none' }} onClick={handleClose}>
                                <List className="toggle-btn-item">MATERNITY FITS</List>
                              </Link>
                              <Divider className="toggle-btn-divider" />
                              <Link to="/women/petite" sx={{ textDecoration: 'none' }} onClick={handleClose}>
                                <List className="toggle-btn-item">PETITE</List>
                              </Link>
                              <Divider className="toggle-btn-divider" />
                              <Link to="/women/women-jeans" sx={{ textDecoration: 'none' }} onClick={handleClose}>
                                <List className="toggle-btn-item">WOMEN JEANS</List>
                              </Link>
                              <Divider className="toggle-btn-divider" />
                              <Link to="/women/women-business" sx={{ textDecoration: 'none' }} onClick={handleClose}>
                                <List className="toggle-btn-item">WOMEN BUSINESS FITS</List>
                              </Link>
                              <Divider className="toggle-btn-divider" />
                              <Link to="/kids" sx={{ textDecoration: 'none' }} onClick={handleClose}>
                                <List className="toggle-btn-item">KIDS</List>
                              </Link>
                              <Divider className="toggle-btn-divider" />
                              <Link to="/login" sx={{ textDecoration: 'none' }} onClick={handleClose}>
                                <List className="toggle-btn-item-sign">
                                  <FontAwesomeIcon
                                    icon={faUserCircle}
                                    style={{ marginRight: '12px', fontSize: '18px' }}
                                  />
                                  SIGN IN
                                </List>
                              </Link>
                            </Box>
                          </PerfectScrollbar>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </ClickAwayListener>
                </Paper>
              </Transitions>
            )}
          </Popper>
          <Popper
            sx={{ display: { xs: 'none', md: 'block' } }}
            placement={matchDownMD ? 'bottom-start' : 'bottom-start'}
            open={openMen}
            anchorEl={anchorRefMen.current}
            role={undefined}
            transition
            disablePortal
            popperOptions={{
              modifiers: [{ name: 'offset', options: { offset: [-18, 5] } }]
            }}
          >
            {({ TransitionProps }) => (
              <Transitions position={matchDownMD ? 'top-left' : 'top-left'} in={open} {...TransitionProps}>
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseMen}>
                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                      <Grid container direction="column" spacing={2}>
                        <Grid item xs={12}>
                          <Box sx={{ backgroundColor: '#18212c' }}>
                            <Link to="/men" sx={{ textDecoration: 'none' }} onClick={handleCloseMen}>
                              <List className="toggle-btn-item">MEN'S FITS</List>
                            </Link>
                            <Divider className="toggle-btn-divider" />
                            <Link to="/men/big-tall" sx={{ textDecoration: 'none' }} onClick={handleCloseMen}>
                              <List className="toggle-btn-item">BIG & TALL</List>
                            </Link>
                          </Box>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </ClickAwayListener>
                </Paper>
              </Transitions>
            )}
          </Popper>
          <Popper
            sx={{ display: { xs: 'none', md: 'block' } }}
            placement={matchDownMD ? 'bottom-start' : 'bottom-start'}
            open={openWomen}
            anchorEl={anchorRefWomen.current}
            role={undefined}
            transition
            disablePortal
            popperOptions={{
              modifiers: [{ name: 'offset', options: { offset: [-30, 5] } }]
            }}
          >
            {({ TransitionProps }) => (
              <Transitions position={matchDownMD ? 'top' : 'top-right'} in={openWomen} {...TransitionProps}>
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseWomen}>
                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                      <Grid container direction="column" spacing={2}>
                        <Grid item xs={12}>
                          <Box sx={{ backgroundColor: '#18212c' }}>
                            <Link to="/women" sx={{ textDecoration: 'none' }} onClick={handleCloseWomen}>
                              <List className="toggle-btn-item">WOMEN'S FITS</List>
                            </Link>
                            <Divider className="toggle-btn-divider" />
                            <Link to="/women/plus-size" sx={{ textDecoration: 'none' }} onClick={handleCloseWomen}>
                              <List className="toggle-btn-item">PLUS SIZE FITS</List>
                            </Link>
                            <Divider className="toggle-btn-divider" />
                            <Link to="/women/maternity" sx={{ textDecoration: 'none' }} onClick={handleCloseWomen}>
                              <List className="toggle-btn-item">MATERNITY FITS</List>
                            </Link>
                            <Divider className="toggle-btn-divider" />
                            <Link to="/women/petite" sx={{ textDecoration: 'none' }} onClick={handleCloseWomen}>
                              <List className="toggle-btn-item">PETITE</List>
                            </Link>
                            <Divider className="toggle-btn-divider" />
                            <Link to="/women/women-jeans" sx={{ textDecoration: 'none' }} onClick={handleCloseWomen}>
                              <List className="toggle-btn-item">WOMEN JEANS</List>
                            </Link>
                            <Divider className="toggle-btn-divider" />
                            <Link to="/women/women-business" sx={{ textDecoration: 'none' }} onClick={handleCloseWomen}>
                              <List className="toggle-btn-item">WOMEN BUSINESS FITS</List>
                            </Link>
                          </Box>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </ClickAwayListener>
                </Paper>
              </Transitions>
            )}
          </Popper>
        </>
      )}
    </>
  );
};

export default LinkSection;
