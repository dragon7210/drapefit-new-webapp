import { Link } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import InfoTable from './InfoTable';
import BasicInfo from 'views/client/profile/kids/BasicInfo';
import GirlStyleFit from 'views/client/profile/kids/GirlStyleFit';
import GirlPriceRange from 'views/client/profile/kids/GirlPriceRange';
import { GET_CLIENT_BIRTHDAY_LIST } from 'actions/common/types';

const GirlView = () => {
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Profile</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <InfoTable />
        <BasicInfo />
        <GirlStyleFit />
        <GirlPriceRange />
        <GET_CLIENT_BIRTHDAY_LIST />
      </Paper>
    </>
  );
};

export default GirlView;
