import GenS3Link from 'utils/GenS3Link';
import CHowWorks from '../../components/HowWorks';

const Women1 = GenS3Link('landing/images/client/maternity-women1');
const Women2 = GenS3Link('landing/images/client/Men2');
const Women3 = GenS3Link('landing/images/client/maternity-women3');
const Women4 = GenS3Link('landing/images/client/Men4');

const result = [
  {
    image: Women1,
    num: 1,
    title: 'Fill Out The Quiz',
    content: 'Take our quiz to tell us about your shape and style. Your Personal Stylist will connect with you.'
  },
  {
    image: Women2,
    num: 2,
    title: 'We Deliver The Goods',
    content:
      'Your personal stylist will start putting together the perfect FIT Box of looks. For just $20 your stylist-picked items get delivered to your door. Try everything on in the comfort of your home!'
  },
  {
    image: Women3,
    num: 3,
    title: 'Keep What You Love',
    content:
      'Take 5 days to FIT, Choose and think and connect your personal stylist with questions you have. Try before buy. Keep what you love.'
  },
  {
    image: Women4,
    num: 4,
    title: 'Easy Return',
    content:
      "Send back the what you don't like or doesn't FIT. Shipping is free both the ways. Prepaid return envelope included."
  }
];

const TakeStyleQuiz = () => {
  return <CHowWorks propsValue={result} />;
};

export default TakeStyleQuiz;
