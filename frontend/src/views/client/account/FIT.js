import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Button, Typography, FormControl, FormHelperText, RadioGroup } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { editSchedule, getSchedule } from 'actions/client/profile';
import NavTabs from '../component/profile/NavTabs';
import { Divider } from 'antd';
import { useLocation, useNavigate } from 'react-router';

const FIT = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let state = false;
  if (pathname.includes('schedule')) {
    state = true;
  }

  useEffect(() => {
    dispatch(getSchedule());
  }, [dispatch]);
  const { schedule } = useSelector((state) => state.profile);
  const initVal = { try_new_items_with_scheduled_fixes: '', applay_dt: new Date() };
  const schedules = [
    { title: 'EVERY MONTHLY', content: 'Will ship hand picked products in every month.' },
    { title: 'EVERY 2 MONTH', content: 'Try a FIT in every two months.' },
    { title: 'EVERY 3 MONTH', content: 'Try a FIT in every three months.' }
  ];

  return (
    <>
      {state && (
        <>
          <NavTabs />
          <Divider />
        </>
      )}
      <Grid container>
        <Grid item xs={12} className="schedule">
          <Typography className="schedule-title">MANAGE YOUR FIT SETTINGS</Typography>
          <Typography className="schedule-content">Please select your schedule</Typography>
          <Formik
            initialValues={schedule === null ? initVal : schedule}
            enableReinitialize
            validationSchema={Yup.object().shape({
              try_new_items_with_scheduled_fixes: Yup.number().min(0).max(4).required('Please select FIT Schedule')
            })}
            onSubmit={async (values) => {
              if (state) {
                dispatch(editSchedule(values, navigate));
              } else {
                dispatch(editSchedule(values));
              }
            }}
          >
            {({ errors, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <FormControl
                  fullWidth
                  error={Boolean(
                    touched.try_new_items_with_scheduled_fixes && errors.try_new_items_with_scheduled_fixes
                  )}
                >
                  <RadioGroup
                    row
                    aria-labelledby="demo-customized-radios"
                    name="try_new_items_with_scheduled_fixes"
                    value={values.try_new_items_with_scheduled_fixes}
                  >
                    <Grid container spacing={2} sx={{ padding: { xs: '20px 10px', xl: '20px 8vw' } }}>
                      <Grid item xs={12} className="h-align-center">
                        {touched.try_new_items_with_scheduled_fixes && errors.try_new_items_with_scheduled_fixes && (
                          <FormHelperText id="helper-text-try_new_items_with_scheduled_fixes" error>
                            {errors.try_new_items_with_scheduled_fixes}
                          </FormHelperText>
                        )}
                      </Grid>
                      {schedules.map((item, index) => (
                        <Grid key={index} item xs={12} lg={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Box
                            className="schedule-box"
                            onClick={() => setFieldValue('try_new_items_with_scheduled_fixes', index)}
                            style={{
                              backgroundColor: values.try_new_items_with_scheduled_fixes === index ? '#e1e1e1' : '#fff'
                            }}
                          >
                            <Box width="100%">
                              <Typography className="schedule-sub-title">{item.title}</Typography>
                              <Typography className="schedule-content">{item.content}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Typography className="schedule-content">
                          Until you cancel your Fit Schedule we will charge a styling Fees $20 depends on your style
                          delivery frequency.
                        </Typography>
                      </Grid>
                      <Grid item xs={12} className="h-align-right">
                        <Button className="account-yes-btn" type="submit" disableElevation disabled={isSubmitting}>
                          SAVE
                        </Button>
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default FIT;
