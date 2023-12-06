import CReadMore from '../../components/ReadMore';

const result = {
  title: 'The Trendiest and Best Jeans for Women USA',
  content:
    "Whoever said diamonds are a girl's best friend obviously never had the perfect pair of jeans. We at Drape Fit think that denim is the ideal partner for a woman - it's tough, stylish and always looks great. Not to forget that the right pair of jeans can elevate almost any look apart from lifting your spirits and improving your appearance. With that in mind, the experts and professional stylists can put together the perfect denim guide for you that can help you find the fit(s) that feels tailored, especially for you. Just find your body shape and know your perfect fit."
};

const ReadMore = () => {
  return <CReadMore propsValue={result} />;
};

export default ReadMore;
