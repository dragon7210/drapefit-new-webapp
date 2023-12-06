import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { completeScan } from 'actions/admin/product';

const Scaned = ({ data, scanValue }) => {
  let menuItems = ['Return', 'Exchange', 'Keep'];
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(data.keepStatus - 1);
  const onChange = (index) => {
    setIsChecked(index);
  };
  const onComplete = () => {
    dispatch(completeScan({ keepStatus: isChecked + 1, id: data.id, scanValue }));
  };

  return (
    <div className="scan">
      <div className="scan-body">
        <div style={{ textAlign: 'center' }}>
          <h2>What you would like to do with the product?</h2>
          <div className="scan-select">
            {menuItems.map((item, index) => {
              return (
                <div className="scan-checkbox" key={index}>
                  <Checkbox checked={isChecked === index ? true : false} onChange={() => onChange(index)} />
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
          <h3>{data?.product_name_one}</h3>
          <h3>{data?.product_name_two}</h3>
          <h3>Size : {data?.size}</h3>
          <h3>Color : {data?.color}</h3>
          <h3>Barcode : {data?.barcode_value}</h3>
        </div>
        <div>
          <img src={data?.product_image} alt="img" width={300} height={250} />
        </div>
      </div>
      <div className="complete">
        <Button className="admin-submit-btn" onClick={onComplete}>
          Complete
        </Button>
      </div>
    </div>
  );
};
Scaned.propTypes = {
  data: PropTypes.object,
  scanValue: PropTypes.object
};
export default Scaned;
