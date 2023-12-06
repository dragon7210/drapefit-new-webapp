import { Link } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import InfoTable from './InfoTable';
import BasicInfo from 'views/client/profile/men/BasicInfo';
import StyleFit from 'views/client/profile/men/StyleFit';
import PriceRange from 'views/client/profile/men/PriceRange';
import StyleCustom from 'views/client/profile/men/StyleCustom';

const MenView = () => {
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

export default MenView;
