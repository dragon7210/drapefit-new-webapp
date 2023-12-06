import { Link } from 'react-router-dom';
import { Typography, Grid, Divider } from '@mui/material';

import CAbout from '../components/About';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from 'actions/admin/news';
import { DateType } from 'constant/function';
import ShowImg from 'ui-component/ShowImg';

const News = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);
  const { tableData } = useSelector((state) => state.news);
  const result = {
    link: 'Home',
    typo: 'News',
    title: {
      first: '',
      last: 'NEWS'
    },
    content: (
      <>
        <Grid container spacing={4}>
          {tableData.map((item, index) => (
            <Grid container className="h-align-center" key={index} marginY={4}>
              <Grid item xs={10} sm={6} lg={7}>
                <Link className="post-title">{item.news_name}</Link>
                <Link className="post-read-more" to={item.news_link}>
                  Read more...
                </Link>
                <Typography className="post-date">{DateType(item.created)}</Typography>
              </Grid>
              <Grid item xs={10} sm={4} lg={3}>
                <ShowImg url={`https://www.drapefittest.com/files/news/${item.news_image}`} />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </>
    )
  };
  console.log(tableData);
  return <CAbout propsValue={result} />;
};

export default News;
