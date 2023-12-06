import CReadMore from '../../components/ReadMore';

const result = {
  title: 'Try Subscription Clothing Box for Big and Tall Men',
  content:
    'With Drape Fit, dress up as per your height and size with the help of our styling experts. No matter what your sizes and preferences are, we find what fits you best. Finding the appropriate fit is essential for building a good and lasting relationship with your clothing. We understand that and so do our styling experts and your own personal stylists. Our expert stylists can help you build everything from an outfit to a complete closet, depending on your height and physique measurements.'
};

const ReadMore = () => {
  return <CReadMore propsValue={result} />;
};

export default ReadMore;
