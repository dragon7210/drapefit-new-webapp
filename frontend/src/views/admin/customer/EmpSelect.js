import { Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateInventory, updateQA, updateStylist, updateSupport } from 'actions/admin/customer';

const EmpSelect = ({ data }) => {
  const dispatch = useDispatch();
  const { emp_initial } = useSelector((state) => state.initial);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ fontWeight: 'bold', width: '62px' }}>Stylist</span>
        <Select
          size="small"
          value={data?.emp_id || 0}
          onChange={(e) => dispatch(updateStylist(data?.id, e.target.value))}
          sx={{ minWidth: 165 }}
        >
          {emp_initial?.emp?.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
          <MenuItem value={0}>{'Assign Stylist'}</MenuItem>
        </Select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ fontWeight: 'bold', width: '62px' }}>Inventory</span>
        <Select
          size="small"
          value={data?.inv_id || 0}
          onChange={(e) => dispatch(updateInventory(data?.id, e.target.value))}
          sx={{ minWidth: 165 }}
        >
          {emp_initial?.inventory?.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
          <MenuItem value={0}>{'Assign Inventory'}</MenuItem>
        </Select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ fontWeight: 'bold', width: '62px' }}>QA</span>
        <Select
          size="small"
          value={data?.qa_id || 0}
          onChange={(e) => dispatch(updateQA(data?.id, e.target.value))}
          sx={{ minWidth: 165 }}
        >
          {emp_initial?.qa?.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
          <MenuItem value={0}>{'Assign QA'}</MenuItem>
        </Select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ fontWeight: 'bold', width: '62px' }}>SUPPORT</span>
        <Select
          size="small"
          value={data?.support_id || 0}
          onChange={(e) => dispatch(updateSupport(data?.id, e.target.value))}
          sx={{ minWidth: 165 }}
        >
          {emp_initial?.support?.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
          <MenuItem value={0}>{'Assign Support'}</MenuItem>
        </Select>
      </div>
    </>
  );
};

export default EmpSelect;
