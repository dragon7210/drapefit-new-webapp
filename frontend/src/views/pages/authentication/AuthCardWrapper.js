import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';

const AuthCardWrapper = ({ children, ...other }) => (
  <MainCard
    sx={{ maxWidth: { xs: 320, sm: 420 }, margin: { xs: 1, md: 1 }, borderColor: '#232f3e55' }}
    content={false}
    {...other}
  >
    <Box sx={{ p: { xs: 2, sm: 3, xl: 3 } }}>{children}</Box>
  </MainCard>
);

AuthCardWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthCardWrapper;
