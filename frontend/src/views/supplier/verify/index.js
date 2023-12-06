import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { handleAssign } from 'actions/supply/purchaseOrders';
import { useDispatch } from 'react-redux';

const Verify = () => {
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleAssign({ id: param.id }));
    navigate('/dfsupplier/po-system');
  }, [dispatch, param, navigate]);

  /**
   * @tip - You can use `DFnewLogger()` instead of `console.log()`
   */
  console.log(param);
  return <>verify</>;
};

export default Verify;
