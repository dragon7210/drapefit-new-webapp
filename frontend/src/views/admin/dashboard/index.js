import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import { gridSpacing } from 'constant/other';
import TotalNumOfPaidMaleMembers from './TotalNumOfPaidMaleMembers';
import TotalNumOfNonPaidMaleMembers from './TotalNumOfNonPaidMaleMembers';
import TotalNumOfPaidFemaleMembers from './TotalNumOfPaidFemaleMembers';
import TotalNumOfNonPaidFemaleMembers from './TotalNumOfNonPaidFemaleMembers';
import TotalNumOfPaidKidMembers from './TotalNumOfPaidKidMembers';
import TotalNumOfNonPaidKidMembers from './TotalNumOfNonPaidKidMembers';
import { useDispatch } from 'react-redux';
import { getInitial } from 'actions/admin/initial';

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
    dispatch(getInitial());
  }, [dispatch]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalNumOfPaidMaleMembers isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalNumOfPaidFemaleMembers isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalNumOfPaidKidMembers isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalNumOfNonPaidMaleMembers isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalNumOfNonPaidFemaleMembers isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalNumOfNonPaidKidMembers isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
