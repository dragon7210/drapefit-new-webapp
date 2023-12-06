import { Grid, Typography, List, ListItem } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const Lady = GenS3Link('landing/images/client/lady');
const FitBox = GenS3Link('landing/images/client/boxdouble');

const HowMuchCost = () => {
  return (
    <>
      <Grid className="how-much-cost" container>
        <Grid className="h-align-center outlined" item xs={12} md={7}>
          <DFnewImgTag
            src={`${Lady}.webp`}
            fallback={`${Lady}.jpg`}
            className="lady"
            lzheight={`auto`}
            style={{ minHeight: '303px' }}
            alt="Lady"
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid className="h-align-center" container>
            <Grid className="h-align-center" item xs={10}>
              <Typography className="how-much-cost-title">
                <span className="how-much-cost-title-small">How</span> MUCH DOES FIT{' '}
                <span className="how-much-cost-title-small margin-left">Cost?</span>
              </Typography>
            </Grid>
            <Grid className="how-much-cost-content-box" item xs={11}>
              <List
                sx={{
                  listStyleType: 'disc',
                  pl: '3vw',
                  pr: '3vw',
                  '& .MuiListItem-root': {
                    display: 'list-item'
                  }
                }}
              >
                <ListItem className="darker-center-content">
                  Each FIT Box has a <strong>$20 styling fee</strong> is applied to your purchase and you're only billed
                  for what you keep. <strong>It's Free Shipping!</strong> Prepaid return envelope included.
                </ListItem>
                <ListItem className="darker-center-content">
                  Items in your box generally will cost depends as per you choose in your style profile.
                </ListItem>
                <ListItem className="darker-center-content">
                  Receive a FIT Box monthly or quarterly. Choose your freequency.{' '}
                  <strong>Skip or cancel anytime.</strong>
                </ListItem>
              </List>
            </Grid>
            <Grid className="h-align-center" item xs={10}>
              <DFnewImgTag
                src={`${FitBox}.webp`}
                fallback={`${FitBox}.jpg`}
                className="rounded-img"
                width="100%"
                lzheight={`auto`}
                style={{ minHeight: '178px' }}
                alt="FIT box"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HowMuchCost;
