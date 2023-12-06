import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%',
  color: '#ff6c00',
  backgroundColor: '#ffd35d'
});

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="inherit" />
  </LoaderWrapper>
);

export default Loader;
