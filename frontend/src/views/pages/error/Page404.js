import { Grid } from '@mui/material';

import CNotFound from 'views/client/components/NotFound';
import ThreeWords from 'views/client/component/ThreeWords';
import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';

const Img404 = GenS3Link('landing/images/client/404');

const result = {
  link: 'Home',
  typo: '404',
  title: {
    first: 'PAGE',
    last: 'NOT FOUND'
  },
  content: (
    <>
      <Grid className="h-align-center" item xs={6} sm={4} md={3} lg={2}>
        <DFnewImgTag
          src={`${Img404}.webp`}
          fallback={`${Img404}.png`}
          height="203"
          lzheight={203}
          style={{ maxWidth: '100%' }}
          alt="Sorry, the page you're looking for does not exist."
        />
      </Grid>
    </>
  )
};

const Page404 = () => {
  return (
    <>
      <CNotFound propsValue={result} />
      <ThreeWords />
    </>
  );
};

export default Page404;
