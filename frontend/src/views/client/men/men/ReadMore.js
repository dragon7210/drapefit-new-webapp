import CReadMore from '../../components/ReadMore';

const result = {
  title: 'Curated Clothing Subscription Boxes for Men',
  content:
    "Drape Fit's clothing box subscription for men that fits your style is just what you need to instantly elevate even your basic everyday looks combined with little elements of fashion for a complete and elaborate outfit."
};

const ReadMore = () => {
  return <CReadMore propsValue={result} />;
};

export default ReadMore;
