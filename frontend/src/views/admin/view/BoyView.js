import { Link } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import InfoTable from './InfoTable';
import BasicInfo from 'views/client/profile/kids/BasicInfo';
import BoyStyleFit from 'views/client/profile/kids/BoyStyleFit';
import BoyPriceRange from 'views/client/profile/kids/BoyPriceRange';
import BoyStyleCustom from 'views/client/profile/kids/BoyStyleCustom';

const BoyView = () => {
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
        <BoyStyleFit />
        <BoyPriceRange />
        <BoyStyleCustom />
      </Paper>
    </>
  );
};

export default BoyView;
