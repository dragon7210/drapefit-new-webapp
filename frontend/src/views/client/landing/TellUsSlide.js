import { Link } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

import GenS3Link from 'utils/GenS3Link';
import DFnewImgTag from 'utils/DFnewImgTag';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slide_1 = GenS3Link('landing/images/client/landing/slide_1');
const Slide_2 = GenS3Link('landing/images/client/landing/slide_2');
const Slide_3 = GenS3Link('landing/images/client/landing/slide_3');
const Slide_4 = GenS3Link('landing/images/client/landing/slide_4');
const Slide_5 = GenS3Link('landing/images/client/landing/slide_5');
const Slide_6 = GenS3Link('landing/images/client/landing/slide_6');
const Slide_7 = GenS3Link('landing/images/client/landing/slide_7');
const Slide_8 = GenS3Link('landing/images/client/landing/slide_8');
const Slide_9 = GenS3Link('landing/images/client/landing/slide_9');
const params = {
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    400: { slidesPerView: 2, spaceBetween: 20 },
    600: { slidesPerView: 3, spaceBetween: 20 },
    800: { slidesPerView: 4, spaceBetween: 30 },
    1000: { slidesPerView: 5, spaceBetween: 30 }
  },
  spaceBetween: 30,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: { clickable: true },
  navigation: true,
  modules: [Navigation]
};

const TellUsSlide = () => {
  return (
    <>
      <Grid container className="tell-us-slide">
        <Grid item xs={12}>
          <Typography className="orange-bold-title">Tell Us What You Like</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ mb: 2 }}>
            <Swiper {...params}>
              <SwiperSlide style={{ display: 'block' }}>
                <Link to="/women">
                  <DFnewImgTag
                    src={`${Slide_1}.webp`}
                    fallback={`${Slide_1}.jpg`}
                    lzheight={`auto`}
                    style={{ minHeight: '228px' }}
                    alt="Slide - Women"
                  />
                  <Box className="service-link-box">
                    <Typography className="service-link">Women</Typography>
                    <FontAwesomeIcon icon={faLongArrowAltRight} className="icon-arrow" />
                  </Box>
                </Link>
              </SwiperSlide>
              <SwiperSlide style={{ display: 'block' }}>
                <Link to="/men">
                  <DFnewImgTag
                    src={`${Slide_2}.webp`}
                    fallback={`${Slide_2}.jpg`}
                    lzheight={`auto`}
                    style={{ minHeight: '228px' }}
                    alt="Slide - Men"
                  />
                  <Box className="service-link-box">
                    <Typography className="service-link">Men</Typography>
                    <FontAwesomeIcon icon={faLongArrowAltRight} className="icon-arrow" />
                  </Box>
                </Link>
              </SwiperSlide>
              <SwiperSlide style={{ display: 'block' }}>
                <Link to="/women/plus-size">
                  <DFnewImgTag
                    src={`${Slide_3}.webp`}
                    fallback={`${Slide_3}.jpg`}
                    lzheight={`auto`}
                    style={{ minHeight: '228px' }}
                    alt="Slide - Plus Size"
                  />
                  <Box className="service-link-box">
                    <Typography className="service-link">Plus Size</Typography>
                    <FontAwesomeIcon icon={faLongArrowAltRight} className="icon-arrow" />
                  </Box>
                </Link>
              </SwiperSlide>
              <SwiperSlide style={{ display: 'block' }}>
                <Link to="/men/big-tall">
                  <DFnewImgTag
                    src={`${Slide_4}.webp`}
                    fallback={`${Slide_4}.jpg`}
                    lzheight={`auto`}
                    style={{ minHeight: '228px' }}
                    alt="Slide - Big and Tall"
                  />
                  <Box className="service-link-box">
                    <Typography className="service-link">Big and Tall</Typography>
                    <FontAwesomeIcon icon={faLongArrowAltRight} className="icon-arrow" />
                  </Box>
                </Link>
              </SwiperSlide>
              <SwiperSlide style={{ display: 'block' }}>
                <Link to="/kids">
                  <DFnewImgTag
                    src={`${Slide_5}.webp`}
                    fallback={`${Slide_5}.jpg`}
                    lzheight={`auto`}
                    style={{ minHeight: '228px' }}
                    alt="Slide - Kids"
                  />
                  <Box className="service-link-box">
                    <Typography className="service-link">Kids</Typography>
                    <FontAwesomeIcon icon={faLongArrowAltRight} className="icon-arrow" />
                  </Box>
                </Link>
              </SwiperSlide>
              <SwiperSlide style={{ display: 'block' }}>
                <Link to="/women/petite">
                  <DFnewImgTag
                    src={`${Slide_6}.webp`}
                    fallback={`${Slide_6}.jpg`}
                    lzheight={`auto`}
                    style={{ minHeight: '228px' }}
                    alt="Slide - Women Active Wear"
                  />
                  <Box className="service-link-box">
                    <Typography className="service-link">Women Active Wear</Typography>
                    <FontAwesomeIcon icon={faLongArrowAltRight} className="icon-arrow" />
                  </Box>
                </Link>
              </SwiperSlide>
              <SwiperSlide style={{ display: 'block' }}>
                <Link to="/women/plus-size">
                  <DFnewImgTag
                    src={`${Slide_7}.webp`}
                    fallback={`${Slide_7}.jpg`}
                    lzheight={`auto`}
                    style={{ minHeight: '228px' }}
                    alt="Slide - Plus Size Active Wear"
                  />
                  <Box className="service-link-box">
                    <Typography className="service-link">Plus Size Active Wear</Typography>
                    <FontAwesomeIcon icon={faLongArrowAltRight} className="icon-arrow" />
                  </Box>
                </Link>
              </SwiperSlide>
              <SwiperSlide style={{ display: 'block' }}>
                <Link to="/women/women-jeans">
                  <DFnewImgTag
                    src={`${Slide_8}.webp`}
                    fallback={`${Slide_8}.jpg`}
                    lzheight={`auto`}
                    style={{ minHeight: '228px' }}
                    alt="Slide - Women Jeans"
                  />
                  <Box className="service-link-box">
                    <Typography className="service-link">Women Jeans</Typography>
                    <FontAwesomeIcon icon={faLongArrowAltRight} className="icon-arrow" />
                  </Box>
                </Link>
              </SwiperSlide>
              <SwiperSlide style={{ display: 'block' }}>
                <Link to="/women/women-business">
                  <DFnewImgTag
                    src={`${Slide_9}.webp`}
                    fallback={`${Slide_9}.jpg`}
                    lzheight={`auto`}
                    style={{ minHeight: '228px' }}
                    alt="Slide - Women Business Wear"
                  />
                  <Box className="service-link-box">
                    <Typography className="service-link">Women Business Wear</Typography>
                    <FontAwesomeIcon icon={faLongArrowAltRight} className="icon-arrow" />
                  </Box>
                </Link>
              </SwiperSlide>
            </Swiper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TellUsSlide;
