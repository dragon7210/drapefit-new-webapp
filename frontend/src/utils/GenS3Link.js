import MyEnvConfig from 'configs/MyEnvConfig';
import DFnewLogger from 'utils/DFnewLogger';

const GenS3Link = (path) => {
  try {
    return `https://${MyEnvConfig.aws.s3Bucket}.s3.${MyEnvConfig.aws.region}.amazonaws.com/${path}`;
  } catch (e) {
    DFnewLogger(e?.message);
    return 'https://via.placeholder.com/518';
  }
};

export default GenS3Link;
