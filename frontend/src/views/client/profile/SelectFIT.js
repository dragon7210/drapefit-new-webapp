import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Divider,
  Grid,
  Typography,
  ButtonGroup,
  Button,
  FormControl,
  FormHelperText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { selectFit } from 'actions/client/profile';
import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import { FirstUpper } from 'utils/FirstUpper';

const SelectMen = GenS3Link('landing/images/client/profile/select-men');
const SelectWomen = GenS3Link('landing/images/client/profile/select-women');

const SelectFIT = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box className="select-fit">
      <Grid container spacing={1} className="box">
        <Grid item xs={12}>
          <Typography className="title">
            <i>{FirstUpper(user?.name)},</i> select your FIT
          </Typography>
        </Grid>
        <Grid item xs={12} className="form">
          <Formik
            initialValues={{
              fitFor: ''
            }}
            validationSchema={Yup.object().shape({
              fitFor: Yup.number().min(0).max(1).required('Please select your FIT')
            })}
            onSubmit={async (values) => {
              dispatch(selectFit(values, navigate));
            }}
          >
            {({ errors, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <ButtonGroup size="large" variant="outlined" name="fitFor" value={values.fitFor}>
                    {['Women', 'Men'].map((item, index) => (
                      <Button
                        key={index}
                        className="select-btn"
                        style={{
                          width: '50% !important',
                          backgroundColor: values.fitFor === index ? '#ff6c00' : '#f8f8f8',
                          color: values.fitFor === index ? '#ffffff' : '#656565'
                        }}
                        onClick={() => {
                          setFieldValue('fitFor', index);
                        }}
                      >
                        {item}
                      </Button>
                    ))}
                  </ButtonGroup>
                  {touched.fitFor && errors.fitFor && (
                    <FormHelperText id="helper-text-fitFor" error>
                      {errors.fitFor}
                    </FormHelperText>
                  )}
                  <Button
                    className="profile-gradient-btn"
                    type="submit"
                    disableElevation
                    disabled={isSubmitting}
                    style={{ margin: '30px 0 0' }}
                  >
                    COMPLETE{matchDownSM ? '' : ' YOUR STYLE PROFILE'}
                  </Button>
                </FormControl>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ border: '1px solid #ff6c00' }} />
        </Grid>
        <Grid item xs={6}>
          <DFnewImgTag
            src={`${SelectWomen}.webp`}
            fallback={`${SelectWomen}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '111px' }}
            alt="Women FIT"
          />
        </Grid>
        <Grid item xs={6}>
          <DFnewImgTag
            src={`${SelectMen}.webp`}
            fallback={`${SelectMen}.jpg`}
            width="100%"
            lzheight={`auto`}
            style={{ minHeight: '111px' }}
            alt="Men FIT"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography className="content">
            Complete Your FIT Profile and your Stylist will send you the items based on your budget.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SelectFIT;
