import CReadMore from '../../components/ReadMore';

const result = {
  title: 'Look like the Stylish Mum You Are with Our Maternity Clothing Subscription Box',
  content:
    'And you thought stylish maternity clothing was just for celebrities! Are you a mom-to-be? Our pregnancy clothing subscription box is full of clothing pieces that flow with you and make you feel cozy and snug. The boxes even offer non-maternity apparel that offers comfortable yet chic pieces that hug you and make you feel like everything is okay. So, be it oversized shirts, ultra-stretch bottoms, or layers, you can stop worrying about looking your best even when you are an expecting mom.'
};

const ReadMore = () => {
  return <CReadMore propsValue={result} />;
};

export default ReadMore;
