import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';
import { Box, Typography, Paper } from '@mui/material';

const PrevWork = () => {
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Extra Products</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faGaugeHigh} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Typography>Previous selected extra products</Typography>
      </Paper>
    </>
  );
};

export default PrevWork;
