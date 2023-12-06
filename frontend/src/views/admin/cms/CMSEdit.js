import { Link } from 'react-router-dom';
import { Box, Paper, Typography, OutlinedInput, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Quill from 'ui-component/Quill';
import { useEffect, useState } from 'react';
import { updateCMS } from 'actions/admin/cms';

const CMSEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.cms).tableData.filter((item) => item.id === Number(id))[0];
  const [cmsInfo, setCmsInfo] = useState({
    description: '',
    meta_title: '',
    meta_keyword: '',
    meta_description: '',
    page_title: ''
  });
  useEffect(() => {
    setCmsInfo(data);
  }, [data]);

  const onChange = (e) => {
    if (e.target) {
      let { name, value } = e.target;
      setCmsInfo({
        ...cmsInfo,
        [name]: value
      });
    } else {
      cmsInfo.description = e;
    }
  };

  const onSave = () => {
    dispatch(updateCMS(cmsInfo, navigate));
  };
  return (
    <>
      <Box className="admin-page-title-part">
        <Typography className="page-title">Edit Page</Typography>
        <Link to="/dfadmin/dashboard" className="home-link">
          <FontAwesomeIcon icon={faDashboard} /> Home
        </Link>
      </Box>
      <Paper className="admin-form-container form-border">
        <Typography className="page-title" marginTop={6}>
          Page Title
        </Typography>
        <OutlinedInput value={cmsInfo?.page_title || ''} size="small" fullWidth name="page_title" onChange={onChange} />
        <Typography className="page-title" marginTop={4}>
          Page contain
        </Typography>
        <Quill value={cmsInfo?.description || ''} onChange={onChange} />
        <Typography className="page-title" marginTop={6}>
          Meta Title
        </Typography>
        <OutlinedInput value={cmsInfo?.meta_title || ''} size="small" fullWidth name="meta_title" onChange={onChange} />
        <Typography className="page-title" marginTop={4}>
          Meta Keyword
        </Typography>
        <OutlinedInput
          value={cmsInfo?.meta_keyword || ''}
          size="small"
          fullWidth
          name="meta_keyword"
          onChange={onChange}
        />
        <Typography className="page-title" marginTop={4}>
          Meta Description
        </Typography>
        <OutlinedInput
          value={cmsInfo?.meta_description || ''}
          size="small"
          fullWidth
          name="meta_description"
          onChange={onChange}
        />
        <Button style={{ marginTop: '20px' }} className="admin-submit-btn" onClick={onSave}>
          Update Page
        </Button>
      </Paper>
    </>
  );
};

export default CMSEdit;
