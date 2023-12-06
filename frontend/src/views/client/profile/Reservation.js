import { Link } from 'react-router-dom';
import { Divider, Grid, Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowRight } from '@fortawesome/free-solid-svg-icons';

import { AddDays } from 'utils/AddDays';
import NavTabs from '../component/profile/NavTabs';

const Reservation = () => {
  const bsp2comma = (string) => {
    return string.replaceAll(' ', ', ');
  };
  const startDate = new Date().toDateString();
  const endDate = AddDays(new Date(), 7).toDateString();

  return (
    <>
      <NavTabs />
      <Divider />
      <Grid className="reservation" container>
        <Grid item xs={12} className="schedule">
          <Typography className="schedule-title">YOUR STYLE FIT BOX ORDER INFORMATION</Typography>
          <Typography className="basic-info-title">The estimated shipping window is</Typography>
          <Typography className="basic-info-title">
            {bsp2comma(startDate).slice(0, 8) + bsp2comma(startDate).slice(9)} -{' '}
            {bsp2comma(endDate).slice(0, 8) + bsp2comma(endDate).slice(9)}
          </Typography>
          <br />
          <Typography className="basic-info-content">
            Email us at <span className="basic-info-sub-title">support@drapefit.com</span> for any questions or
            suggestions.
          </Typography>
          <Link to="/customer-care/contact-us">
            <Button className="rounded-orange-btn">Support</Button>
          </Link>
          <Typography className="basic-info-content">
            Please complete your payment and shipping to have your reservation 30 minutes.
          </Typography>
          <Link to="/welcome/addressbook">
            <Button className="profile-gradient-btn" style={{ float: 'right' }}>
              NEXT: SHIPPING ADDRESS&nbsp;&nbsp;&nbsp;
              <FontAwesomeIcon icon={faLongArrowRight} />
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default Reservation;
