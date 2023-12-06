import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import Bubbles from '../components/Bubbles';

const DividerImg = GenS3Link('landing/images/client/divider-img');
const CEO = GenS3Link('landing/images/client/executive/sukhendu');
const CIO = GenS3Link('landing/images/client/executive/monomita');

const ExecutiveTeam = () => {
  const [ceoRead, setCeoRead] = useState(false);
  const [cioRead, setCioRead] = useState(false);
  const ceoSummary =
    'Sukhendu always loves about style and technology. His Drape Fit idea actually came about from the time wanting to create a platform that made it really easy to shop entire perfect outfits from head-to-toe for everyone as per their styles, needs and budget. Prior to Co-founding Drape Fit Sukhendu developed better experience in styles, retails and technologies. He is very passionate about styles. Previously he consulted and experienced with dozens of leading companies in USA including e-commerce and retailers. He worked as a Lead Engineer at different IT industry powerhouses in worldwide. Sukhendu holds an engineering degree in Information Technology. He involves with lots of social work for developing our society. He helps people experience personal styling everyday through Drape Fit.';
  const cioSummary =
    "Monomita is the Co-Founder and Chief Information Officer at Drape Fit, overseeing operations, styling and client experience and merchandising. She co-founded Drape Fit to deliver a superior customer styling experience that helping people to achieve everyday confidence. She thinks Drape Fit helps everyone explore their shopping experience through their own affordable personal stylists or personal shopper. She helps people not to stick on their single style or color palette, for discover everybody's different styles with some trendy, some classy through their own Drape Fit's Stylist. As a woman she started Drape Fit where styles meet our daily lives. She is very passionate about high quality styles and technology. Previously she had working experience as a Business Analyst with lots of different leading companies in USA. Monomita holds an engineering degree in Information Technology.";

  return (
    <>
      <Box className="executive-team-bg">
        <Box className="align-top-right-little">
          <Typography className="darker-bold-title">Executive Team</Typography>
        </Box>
      </Box>
      <Box className="h-align-center">
        <Box className="executive-team-box">
          <Typography className="about-title">
            OUR <strong>EXECUTIVE TEAM</strong>
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
          <Grid className="h-align-center" container>
            {ceoRead && !cioRead ? (
              <>
                <Box className="executive-co-founder-card">
                  <Box>
                    <Button className="executive-close-btn" onClick={() => setCeoRead(false)}>
                      <FontAwesomeIcon icon={faWindowClose} />
                    </Button>
                  </Box>
                  <Typography className="executive-co-founder-summary">{ceoSummary}</Typography>
                  <Typography className="executive-co-founder-quote">
                    "Drape Fit is about helping people to find the best Fit and Try before Buy to save time and money
                    from Work to Workout."
                  </Typography>
                  <Typography className="executive-co-founder-name">Sukhendu Mukherjee</Typography>
                  <Typography className="executive-co-founder-career">CEO & CO-FOUNDER</Typography>
                </Box>
              </>
            ) : !ceoRead && cioRead ? (
              <>
                <Box className="executive-co-founder-card">
                  <Box>
                    <Button className="executive-close-btn" onClick={() => setCioRead(false)}>
                      <FontAwesomeIcon icon={faWindowClose} />
                    </Button>
                  </Box>
                  <Typography className="executive-co-founder-summary">{cioSummary}</Typography>
                  <Typography className="executive-co-founder-quote">
                    "I co-founded Drape Fit as a way for women just like me to embrace their individuality. It grew out
                    of a personal need and now, Drape Fit is a place where everyone can explore all the incredible
                    things that style can really do."
                  </Typography>
                  <Typography className="executive-co-founder-name">Monomita Chakraborty</Typography>
                  <Typography className="executive-co-founder-career">CIO & CO-FOUNDER</Typography>
                </Box>
              </>
            ) : (
              <>
                <Grid className="executive-team-card" item xs={10} md={5} lg={4}>
                  <Grid className="executive-team-avatar" item>
                    <DFnewImgTag
                      src={`${CEO}.webp`}
                      fallback={`${CEO}.jpg`}
                      width="100%"
                      height="119"
                      lzheight={119}
                      alt="Sukhendu Mukherjee - CEO & CO-FOUNDER"
                    />
                  </Grid>
                  <Grid className="executive-team-content">
                    <Typography className="executive-team-name">Sukhendu Mukherjee</Typography>
                    <Typography className="executive-team-career">CEO & CO-FOUNDER</Typography>
                    <Typography className="executive-team-summary">{ceoSummary}</Typography>
                    <Button className="executive-read-btn" variant="outlined" onClick={() => setCeoRead(true)}>
                      Read More
                    </Button>
                  </Grid>
                </Grid>
                <Grid className="executive-team-card" item xs={10} md={5} lg={4}>
                  <Grid className="executive-team-avatar" item>
                    <DFnewImgTag
                      src={`${CIO}.webp`}
                      fallback={`${CIO}.jpg`}
                      width="100%"
                      height="119"
                      lzheight={119}
                      alt="Monomita Chakraborty - CIO & CO-FOUNDER"
                    />
                  </Grid>
                  <Grid className="executive-team-content">
                    <Typography className="executive-team-name">Monomita Chakraborty</Typography>
                    <Typography className="executive-team-career">CIO & CO-FOUNDER</Typography>
                    <Typography className="executive-team-summary">{cioSummary}</Typography>
                    <Button className="executive-read-btn" variant="outlined" onClick={() => setCioRead(true)}>
                      Read More
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Box>
      <Box className="executive-talk">
        <Box sx={{ zIndex: 12 }}>
          <Typography className="executive-talk-title">Let's Talk</Typography>
          <Typography className="executive-talk-content">
            Together, we can work to solve your business goals. Feel free to provide your email address below and a
            representative will reach out to you soon.
          </Typography>
          <Link to="/customer-care/contact-us">
            <Button className="executive-talk-btn">Contact Us</Button>
          </Link>
        </Box>
        <Bubbles />
      </Box>
    </>
  );
};

export default ExecutiveTeam;
