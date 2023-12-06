import { Box, Typography } from '@mui/material';

const beginYear = 2022;
const nowYear = new Date().getFullYear();

const AdminFooter = () => {
  return (
    <Box className="admin-footer">
      <Typography className="copyright-text" sx={{ textAlign: { xs: 'center', md: 'start' } }}>
        &copy; {`${beginYear} - ${nowYear}`} DRAPE FIT INC. ALL RIGHTS RESERVED.
      </Typography>
    </Box>
  );
};

export default AdminFooter;
