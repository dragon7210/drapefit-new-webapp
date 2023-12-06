import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';

const Quill = ({ value, onChange }) => {
  const qModules = {
    toolbar: [
      //-- toggled buttons
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      //-- custom button values
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      //-- superscript/subscript
      [{ script: 'sub' }, { script: 'super' }],
      //-- outdent/indent
      [{ indent: '-1' }, { indent: '+1' }],
      //-- text direction
      [{ direction: 'rtl' }],
      //-- custom dropdown
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      //-- dropdown with defaults from theme
      [{ color: ['#ff6c00', '#232f3e'] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['image', 'link'],
      ['clean']
    ]
  };
  const qFormats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
  ];

  return <ReactQuill theme="snow" modules={qModules} formats={qFormats} value={value} onChange={(e) => onChange(e)} />;
};

Quill.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};
export default Quill;
