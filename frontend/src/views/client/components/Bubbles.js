import { Box } from '@mui/material';

import 'assets/scss/_animation.scss';

const Bubbles = () => {
  const bubbles = new Array(10).fill().map((_, index) => <Box key={index} className="bubble" />);
  return (
    <>
      <Box className="bubbles">{bubbles}</Box>
    </>
  );
};

export default Bubbles;
