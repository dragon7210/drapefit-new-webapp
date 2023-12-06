import { useState } from 'react';
import PropTypes from 'prop-types';

import DFnewImgTag from 'utils/DFnewImgTag';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const ShowImg = ({ url }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImgUrl, setPreviewImgUrl] = useState('');

  ShowImg.propTypes = {
    url: PropTypes.string
  };

  return (
    <>
      <DFnewImgTag
        src={url}
        width="70px"
        lzheight={`auto`}
        style={{ cursor: 'zoom-in' }}
        alt="Drape Fit Image"
        onClick={() => {
          setPreviewImgUrl(url);
          setPreviewOpen(true);
        }}
      />
      <Lightbox
        open={previewOpen}
        close={() => setPreviewOpen(false)}
        slides={[{ src: previewImgUrl }]}
        carousel={{ finite: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null
        }}
        plugins={[Zoom]}
        zoom={{
          scrollToZoom: true,
          maxZoomPixelRatio: 5
        }}
      />
    </>
  );
};

export default ShowImg;
