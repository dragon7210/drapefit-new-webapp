import { Grid, Accordion, AccordionSummary, AccordionDetails, Typography, styled, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const DividerImg = GenS3Link('landing/images/client/divider-img');

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

const Accordions = ({ propsValue }) => {
  return (
    <>
      <Grid className="global-padding" container spacing={1}>
        <Grid item xs={12}>
          <Typography className="about-title" style={{ marginTop: '56px' }}>
            <strong>{propsValue.title}</strong>
          </Typography>
          <Box className="h-align-center" sx={{ my: '20px' }}>
            <DFnewImgTag
              src={`${DividerImg}.webp`}
              fallback={`${DividerImg}.png`}
              height="19"
              lzheight={19}
              alt="divider"
            />
          </Box>
        </Grid>
        {propsValue.content.map((item, index) => (
          <Grid key={index} item xs={12}>
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

Accordions.propTypes = {
  propsValue: PropTypes.object
};

export default Accordions;
