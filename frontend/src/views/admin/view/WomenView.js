import { Link } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BasicInfo from 'views/client/profile/women/BasicInfo';
import StyleCustom from 'views/client/profile/women/StyleCustom';
import PriceRange from 'views/client/profile/women/PriceRange';
import StyleFit from 'views/client/profile/women/StyleFit';
import InfoTable from './InfoTable';

const WomenView = () => {
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
        <StyleFit />
        <PriceRange />
        <StyleCustom />
      </Paper>
    </>
  );
};

export default WomenView;
