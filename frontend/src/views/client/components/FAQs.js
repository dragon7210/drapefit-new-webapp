import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography, styled, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const MyAccordion = styled((props) => <Accordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}));
const MyAccordionSummary = styled((props) => <AccordionSummary expandIcon={<CustomIcon />} {...props} />)(
  ({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .1)',
    flexDirection: 'row',
    height: '80px',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(0deg)'
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1)
    }
  })
);
const MyAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));
const CustomIcon = () => {
  return (
    <Box
      sx={{
        '.Mui-expanded & > .collapseIconWrapper': {
          display: 'none'
        },
        '.expandIconWrapper': {
          display: 'none'
        },
        '.Mui-expanded & > .expandIconWrapper': {
          display: 'block'
        }
      }}
    >
      <Box className="expandIconWrapper">
        <FontAwesomeIcon icon={faMinus} className="accordions-item-title" />
      </Box>
      <Box className="collapseIconWrapper">
        <FontAwesomeIcon icon={faPlus} className="accordions-item-title" />
      </Box>
    </Box>
  );
};

const CFAQs = ({ propsValue }) => {
  return (
    <>
      <Grid className="faqs" container spacing={4}>
        <Grid item xs={12}>
          <Typography className="orange-bold-title">FAQ</Typography>
        </Grid>
        {propsValue.map((item, index) => (
          <Grid key={index} item xs={12} md={6} lg={4}>
            <MyAccordion>
              <MyAccordionSummary aria-controls={`${index}-content`} id={`${index}`}>
                <Typography className="accordions-item-title">{item.title}</Typography>
              </MyAccordionSummary>
              <MyAccordionDetails>
                <Typography className="accordions-item-content">{item.content}</Typography>
              </MyAccordionDetails>
            </MyAccordion>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

CFAQs.propTypes = {
  propsValue: PropTypes.array
};

export default CFAQs;
