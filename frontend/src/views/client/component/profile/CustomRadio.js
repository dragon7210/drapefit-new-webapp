import { Radio, styled } from '@mui/material';

const CustomRadio = (props) => {
  const CustomIcon = styled('span')(({}) => ({
    borderRadius: '50%',
    width: 20,
    height: 20,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2
    },
    'input:hover ~ &': '#ebf1f5',
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)'
    }
  }));
  const CustomCheckedIcon = styled(CustomIcon)({
    backgroundColor: '#232f3e',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 20,
      height: 20,
      backgroundImage: 'radial-gradient(#ff6c00,#ff6c00 35%,transparent 32%)',
      content: '""'
    }
  });

  return <Radio disableRipple color="default" checkedIcon={<CustomCheckedIcon />} icon={<CustomIcon />} {...props} />;
};

export default CustomRadio;
