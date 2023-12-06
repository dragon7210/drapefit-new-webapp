import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import 'antd/dist/reset.css';

import { setAlert } from 'actions/common/alert';
import MyEnvConfig from 'configs/MyEnvConfig';
import GlobalEnv from 'configs/GlobalEnv';
import DFnewLogger from 'utils/DFnewLogger';

const beforeUpload = (file) => {
  try {
    const isJpgOrPng = ['image/jpg', 'image/jpeg', 'image/png'].includes(file.type);
    if (!isJpgOrPng) {
      setAlert('You can only upload JPG/JPEG/PNG file', 'error');
    }
    return isJpgOrPng;
  } catch (e) {
    DFnewLogger(e?.message);
    return false;
  }
};

const ImageUpload = (props) => {
  const [fileList, setFileList] = useState(props.value === '' ? [] : [{ uid: '-1', status: 'done', url: props.value }]);
  const onChange = (info) => {
    try {
      if (info.file.status === 'done') {
        DFnewLogger('onChange/response:', info.file.response);
        props.setFieldValue(props.arg, info.file.response.imgName);
      }
      if (info.file.status === 'removed') {
        props.setFieldValue(props.arg, '');
        setFileList([]);
      }
      setFileList(info.fileList);
    } catch (e) {
      DFnewLogger(e?.message);
    }
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const header = {
    headers: {
      'df-auth-token': `${MyEnvConfig.bearer.tokenPrefix} ${sessionStorage.dftoken}`
    }
  };

  useEffect(() => {
    DFnewLogger('image-url:', props.value);
  }, [props.value]);
  return (
    <>
      <ImgCrop rotationSlider>
        <Upload
          name="dfimg"
          method="POST"
          action={`${GlobalEnv.isDebug ? MyEnvConfig.baseurl.dev : MyEnvConfig.baseurl.prod}/dfnew/uploadfile/upldimg/${
            props.arg
          }`}
          listType="picture-card"
          fileList={fileList}
          beforeUpload={beforeUpload}
          onChange={onChange}
          onPreview={onPreview}
          style={{ width: '100%', aspectRatio: '1 / 1' }}
          accept=".jpeg,.jpg,.png"
          {...header}
        >
          {fileList.length < 1 && (
            <FontAwesomeIcon icon={faCameraRetro} style={{ fontSize: '35px', color: '#232f3e' }} />
          )}
        </Upload>
      </ImgCrop>
    </>
  );
};

ImageUpload.propTypes = {
  value: PropTypes.string,
  arg: PropTypes.string,
  setFieldValue: PropTypes.func
};

export default ImageUpload;
