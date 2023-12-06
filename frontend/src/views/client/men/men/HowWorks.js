import GenS3Link from 'utils/GenS3Link';
import CHowWorks from '../../components/HowWorks';

const Men1 = GenS3Link('landing/images/client/Men1');
const Men2 = GenS3Link('landing/images/client/Men2');
const Men3 = GenS3Link('landing/images/client/Men3');
const Men4 = GenS3Link('landing/images/client/Men4');

const result = [
  {
    image: Men1,
    num: 1,
    title: 'Fill Out The Quiz',
    content: 'Take our quiz to tell us about your shape and style. Your Personal Stylist will connect with you.'
  },
  {
    image: Men2,
    num: 2,
    title: 'We Deliver The Goods',
    content:
      'Your personal stylist will start putting together the perfect FIT Box of looks. For just $20 your stylist-picked items get delivered to your door. Try everything on in the comfort of your home!'
  },
  {
    image: Men3,
    num: 3,
    title: 'Keep What You Love',
    content:
      'Take 5 days to FIT. Choose and think and connect your personal stylist with questions you have. Try before buy. Keep what you love.'
  },
  {
    image: Men4,
    num: 4,
    title: 'Easy Return',
    content:
      "Send back what you don't like or doesn't FIT. Shipping is free both the ways. Prepaid return envelope included."
  }
];

const TakeStyleQuiz = () => {
  return <CHowWorks propsValue={result} />;
};

export default TakeStyleQuiz;
