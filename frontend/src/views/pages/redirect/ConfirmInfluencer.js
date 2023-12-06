import { Grid } from '@mui/material';

import CNotFound from 'views/client/components/NotFound';
import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const ImgConfirmed = GenS3Link('landing/images/client/confirmed');

const result = {
  link: 'Home',
  typo: 'Success',
  title: {
    first: 'INFLUENCER',
    last: 'CONFIRMED'
  },
  content: (
    <>
      <Grid className="h-align-center" item xs={6} sm={4} md={3} lg={2}>
        <DFnewImgTag
          src={`${ImgConfirmed}.webp`}
          fallback={`${ImgConfirmed}.png`}
          height="183"
          lzheight={183}
          style={{ maxWidth: '100%' }}
          alt="OK, confirmed"
        />
      </Grid>
    </>
  )
};

const ConfirmInfluencer = () => {
  return (
    <>
      <CNotFound propsValue={result} />
    </>
  );
};

export default ConfirmInfluencer;
