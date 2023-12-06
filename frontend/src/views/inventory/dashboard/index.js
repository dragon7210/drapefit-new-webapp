import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import { getCount } from 'actions/inventory/brand';
import { gridSpacing } from 'constant/other';
import TotalNumOfTotalBrand from './TotalNumOfTotalBrand';
import TotalNumOfActiveBrand from './TotalNumOfActiveBrand';
import TotalNumOfInactiveBrand from './TotalNumOfInactiveBrand';
// import PopularCard from './PopularCard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.invBrand);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getCount());
    setLoading(false);
  }, [dispatch]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalNumOfTotalBrand isLoading={isLoading} count={count?.countTotal} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalNumOfActiveBrand isLoading={isLoading} count={count?.countActive} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalNumOfInactiveBrand isLoading={isLoading} count={count?.countInactive} />
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default Dashboard;
