import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const DividerImg = GenS3Link('landing/images/client/divider-img');

const Expect = () => {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <Box>
        <Typography className="about-title">
          WHAT TO <strong>EXPECT FROM US</strong>
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
        {matchesMD ? (
          <Timeline position="alternate" sx={{ mb: '240px' }}>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot className="timeline-dot" />
                <TimelineConnector className="timeline-connector" />
              </TimelineSeparator>
              <TimelineContent className="timeline-content">
                <FontAwesomeIcon className="timeline-content-icon" icon={faArrowRightLong} />
                <Box className="timeline-content-box right">
                  <Typography className="timeline-content-title">ORDER ON DEMAND</Typography>
                  <Typography className="timeline-content-content">
                    You can order your FIT Box on your need. Schedule online and cancel any time.
                  </Typography>
                  <Typography className="timeline-content-num right">01</Typography>
                </Box>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot className="timeline-dot" />
                <TimelineConnector className="timeline-connector" />
              </TimelineSeparator>
              <TimelineContent className="timeline-content">
                <FontAwesomeIcon className="timeline-content-icon" icon={faArrowLeftLong} />
                <Box className="timeline-content-box left">
                  <Typography className="timeline-content-title">TRY IN HOME</Typography>
                  <Typography className="timeline-content-content">
                    A FIT Box will be delivered in your door. Try at home and return if you don't like. You have 5 days
                    to buy or return. It's that easy.
                  </Typography>
                  <Typography className="timeline-content-num left">02</Typography>
                </Box>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot className="timeline-dot" />
                <TimelineConnector className="timeline-connector" />
              </TimelineSeparator>
              <TimelineContent className="timeline-content">
                <FontAwesomeIcon className="timeline-content-icon" icon={faArrowRightLong} />
                <Box className="timeline-content-box right">
                  <Typography className="timeline-content-title">SAVE UP TO 25%</Typography>
                  <Typography className="timeline-content-content">
                    Plenty options to save. If you keep all items you can save up to 25%.
                  </Typography>
                  <Typography className="timeline-content-num right">03</Typography>
                </Box>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot className="timeline-dot" />
              </TimelineSeparator>
              <TimelineContent className="timeline-content">
                <FontAwesomeIcon className="timeline-content-icon" icon={faArrowLeftLong} />
                <Box className="timeline-content-box left">
                  <Typography className="timeline-content-title">FREE SHIPPING AND RETURNS</Typography>
                  <Typography className="timeline-content-content">
                    Free shipping both the ways. Keep what you like. Return what doesn't FIT you.
                  </Typography>
                  <Typography className="timeline-content-num left">04</Typography>
                </Box>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        ) : (
          <Box mb="120px">
            <Box className="timeline-content-box theme-md">
              <Typography className="timeline-content-title theme-md">ORDER ON DEMAND</Typography>
              <Typography className="timeline-content-content theme-md">
                You can order your FIT Box on your need. Schedule online and cancel any time.
              </Typography>
              <Typography className="timeline-content-num theme-md">01</Typography>
            </Box>
            <Box className="timeline-content-box theme-md">
              <Typography className="timeline-content-title theme-md">TRY IN HOME</Typography>
              <Typography className="timeline-content-content theme-md">
                A FIT Box will be delivered in your door. Try at home and return if you don't like. You have 5 days to
                buy or return. It's that easy.
              </Typography>
              <Typography className="timeline-content-num theme-md">02</Typography>
            </Box>
            <Box className="timeline-content-box theme-md">
              <Typography className="timeline-content-title theme-md">SAVE UP TO 25%</Typography>
              <Typography className="timeline-content-content theme-md">
                Plenty options to save. If you keep all items you can save up to 25%.
              </Typography>
              <Typography className="timeline-content-num theme-md">03</Typography>
            </Box>
            <Box className="timeline-content-box theme-md">
              <Typography className="timeline-content-title theme-md">FREE SHIPPING AND RETURNS</Typography>
              <Typography className="timeline-content-content theme-md">
                Free shipping both the ways. Keep what you like. Return what doesn't FIT you.
              </Typography>
              <Typography className="timeline-content-num theme-md">04</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Expect;
