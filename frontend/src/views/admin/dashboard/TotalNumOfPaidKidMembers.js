import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';

import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#00a65a',
  color: theme.palette.primary.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, #51f8ac -50.94%, #51f8ac2d 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, #51f8ac -14.02%, #51f8ac2d 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

const TotalNumOfPaidKidMembers = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 1 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: '#0b633b',
                      color: '#fff'
                    }}
                  >
                    <FontAwesomeIcon icon={faUserCheck} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ py: 0, mt: 0.45, mb: 0.45 }}
                  primary={
                    <Typography variant="h2" sx={{ color: '#fff' }}>
                      0
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ color: '#fff', fontSize: '16px', mt: 0.25 }}>
                      Total number of paid KID members
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalNumOfPaidKidMembers.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalNumOfPaidKidMembers;
