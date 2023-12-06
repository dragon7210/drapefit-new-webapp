import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography, Grid, Button, Box } from '@mui/material';

const CTakeStyleQuiz = ({ propsValue }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Grid className="take-style-quiz" container>
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Typography className="orange-bold-title">{propsValue.title}</Typography>
        </Grid>
        <Grid>
          <Typography className="take-style-quiz-content">{propsValue.content}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Box className="h-align-center" sx={{ mt: 4 }}>
            <Link to={user ? `${user?.pRoute}` : '/login'}>
              <Button className="custom-btn">TAKE YOUR STYLE QUIZ</Button>
            </Link>
          </Box>
          {!user && (
            <Typography className="darker-sub-semibold-title">
              Already have an acount?
              <Link className="light-semibold-content" to="/login">
                Sign in
              </Link>
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

CTakeStyleQuiz.propTypes = {
  propsValue: PropTypes.object
};

export default CTakeStyleQuiz;
