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
    title: 'Get A FIT Box',
    content:
      'Receive a FIT Box in accordance with your big size and length to meet your styling needs. Our experts will handpick the perfect outfits for you to send you the perfect FIT Box.'
  },
  {
    image: Men3,
    num: 3,
    title: 'Keep What You Love',
    content: "Simply try on everything from home and only pay for what you keep and return what you don't."
  },
  {
    image: Men4,
    num: 4,
    title: 'Easy Return',
    content: "Drape Fit offers a flexible return and exchange policy. It's Free Shipping, Return & Exchanges."
  }
];

const TakeStyleQuiz = () => {
  return <CHowWorks propsValue={result} />;
};

export default TakeStyleQuiz;
