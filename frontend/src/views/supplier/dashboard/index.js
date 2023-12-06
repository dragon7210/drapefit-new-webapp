import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';

import { gridSpacing } from 'constant/other';
import DrapefitAreaChartCard from './DrapefitAreaChartCard';
import EarningCard from './EarningCard';

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={5}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={7}>
            <DrapefitAreaChartCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
