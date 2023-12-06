import CFeedbacks from '../../components/Feedbacks';

const result = [
  {
    star: 5,
    name: 'Rebecca M.',
    content:
      "Drape Fit incredibly convenient & time saving for those of us who don't have much free time to go shopping. I just got my 2nd Fit Box with unique spring styles and very much affordable prices. Love their customer service which is absolutely amazing.",
    address: 'MIAMI, FL'
  },
  {
    star: 5,
    name: 'David L.',
    content:
      'I love this personal styling service. My stylist has been attentive to my style choices and price points. If you complete your style quiz properly, you will receive beautiful outfits.',
    address: 'TOLEDO, OH'
  },
  {
    star: 4,
    name: 'AI V.',
    content:
      'I started using Drape Fit few months before. I hate shopping. So Drape Fit seemed like the perfect way to get some good quality clothes I liked - and to step out my comfort zone a little bit by trying something diferent styles. I love this service.',
    address: 'HUDSON, NY'
  },
  {
    star: 5,
    name: 'Kate S.',
    content:
      "I started with a Fit Box for my son. Did the style quiz which is very specific. Customer service is awesome and so are the boxes. I think it's really useful for your kids and your family. $20/month isn't not at all bad for styling fees. Definitely keeping Drape Fit!",
    address: 'AUSTIN, IN'
  },
  {
    star: 5,
    name: 'Jennifer H.',
    content:
      "Drape Fit has been a blast. The stylist I have been working with did a great job of analyzing my needs. The styling and fit of all the outfits have exceeded my expectations. Love the prices of all outfits. The quality has been good with unique styles. It's been fun!",
    address: 'BOZEMAN, MT'
  }
];

const Feedbacks = () => {
  return <CFeedbacks propsValue={result} />;
};

export default Feedbacks;
