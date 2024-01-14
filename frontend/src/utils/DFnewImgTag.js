import LazyLoad from 'react-lazy-load';
import PropTypes from 'prop-types';

import DFnewLogger from 'utils/DFnewLogger';
import { noImageBase64 } from 'constant/other';

const DFnewImgTag = ({ src, fallback, alt, lzheight = '100%', ...rest }) => {
  let errFlag = true;

  return (
    <LazyLoad height={lzheight}>
      <picture style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <source srcSet={src} />
        <img
          src={fallback}
          alt={alt}
          onError={(e) => {
            try {
              if (errFlag) {
                errFlag = false;
                e.target.parentNode.childNodes[0].srcset = noImageBase64;
                e.target.src = noImageBase64;
              }
            } catch (e) {
              DFnewLogger(e?.message);
            }
          }}
          {...rest}
        />
      </picture>
    </LazyLoad>
  );
};

DFnewImgTag.propTypes = {
  src: PropTypes.string,
  fallback: PropTypes.string,
  alt: PropTypes.string,
  lzheight: PropTypes.any
};

DFnewImgTag.defaultProps = {
  lzheight: '100%'
};

export default DFnewImgTag;
