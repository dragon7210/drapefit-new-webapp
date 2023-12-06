import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProduct } from 'actions/inventory/product';
import MenProduct from '../add-product/MenProduct';
import WomenProduct from '../add-product/WomenProduct';
import BoyProduct from '../add-product/BoyProduct';
import GirlProduct from '../add-product/GirlProduct';

const OverviewTotal = () => {
  const { gender, id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct({ id }));
  }, [dispatch, id]);

  const data = useSelector((state) => state.invProduct.indProduct);
  return (
    <>
      {!isEmpty(data) && Number(gender) === 1 && <MenProduct data={data} />}
      {!isEmpty(data) && Number(gender) === 2 && <WomenProduct data={data} />}
      {!isEmpty(data) && Number(gender) === 3 && <BoyProduct data={data} />}
      {!isEmpty(data) && Number(gender) === 4 && <GirlProduct data={data} />}
    </>
  );
};

export default OverviewTotal;

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}
