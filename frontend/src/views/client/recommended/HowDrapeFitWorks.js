import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

import GenS3Link from 'utils/GenS3Link';
import Recommended from '../component/Recommended';
import HowItWorks from '../component/HowItWorks';
import FinallySign from '../component/FinallySign';
import Expect from '../component/Expect';
import HowMuchCost from '../component/HowMuchCost';
import Accordions from '../component/Accordions';

const Rounded_1 = GenS3Link('landing/images/client/how-it-works-1');
const Rounded_2 = GenS3Link('landing/images/client/how-it-works-2');
const Rounded_3 = GenS3Link('landing/images/client/how-it-works-3');
const SignImg = GenS3Link('landing/images/client/finally-sign');

const info = {
  title: {
    first: 'HOW DRAPE FIT',
    last: 'WORKS'
  },
  subtitle: '',
  content: (
    <Typography className="recommended-top-content">
      Drape Fit is the <Link to="#">best leading online Personal Styling service</Link> for everyone. We blend styles
      and needs together to deliver outfits, shoes and accessories personalized to our clients' unique tastes, budgets
      and fits. We love to help all our clients to explore and discover new styles through our personal stylists.
    </Typography>
  )
};
const roundedImage = [
  {
    image: Rounded_1,
    number: '01',
    title: 'Fill Out Your Style Quiz',
    content: 'Share your style, price, size and style preferences with your personal stylist.'
  },
  {
    image: Rounded_2,
    number: '02',
    title: 'Request A FIT Box',
    content:
      'Get up to 5 hand-picked pieces of clothing by your personal stylist delivered to your home, monthly or quarterly. Save money and time.'
  },
  {
    image: Rounded_3,
    number: '03',
    title: 'Keep What Love',
    content:
      "Keep which fits you. Send back rest. You're only billed for what you keep, and your styling fee is applied to your purchase. Shipping is free both ways."
  }
];
const finallySign = {
  image: SignImg,
  title: {
    first: 'WE DO',
    last: 'BEST'
  },
  content: (
    <Typography className="recommended-top-content">
      We are the best online personal style provider. We do give our client with plenty of options to get a best FIT.
      Upgrade your style in easy steps.
    </Typography>
  )
};
const billing = {
  title: 'BILLING',
  content: [
    {
      title: 'When and how will you charge my card for my FIT Box?',
      content: `For each order which we receive from the customer, then the initial $20 styling fee will be charged before our stylist start styling for you. After your FIT Box arrives, you can log in to your account with us and buy the items you would like to keep with you. And the rest of the things you can return with the prepaid shipping envelope sent with your FIT Box.`
    },
    {
      title: 'Why is it important to add the credit card details?',
      content: `We require substantial credit card details to send you your FIT Box. You won't be charged till you order your FIT request (a $20 styling fee will be charged when you order and when your FIT Box ships).`
    },
    {
      title: 'What is the standard cost of the FIT Box sent?',
      content: `Well out standard FIT Box, our standard cost for the FIT Box is around $60, which is further adjusted in accordance with your budget preference by your personal stylist. Thus when you receive your FIT Box, you may find a very slight difference in the value of your Fit as most of the time, it will be under your budget preferences.`
    },
    {
      title: 'Does the style charge turn over if I return all the items of my FIT Box?',
      content: `Your styling charge must be applied to your current purchase. Thus, it doesn't turn over to your next shipment. The styling fee is non-refundable and cannot be used by any other account. This applies whether you return all your things, or buy an item which is less the cost of the styling fee.
              Thus, we aim to provide you the items which are in accordance with your styling needs and preferences in the specially customized FIT Box. Therefore, you will definitely find most of the items of your use.
              But still, in any case, you return all the items from the FIT Box, then we would appreciate you leave feedback every time for each item. It will help us to know you better and to improve our picks in accordance to your need for future FIT Boxes.
              Further, the credit of the styling fee is valid for 30 days from the date of your fit order (the date and time on which the styling fee is charged). Further, all the unused styling credits are entirely non-refundable. Whereas the same can be used on, the Drape Fit the online outlet.`
    }
  ]
};
const scheduling = {
  title: 'SCHEDULING',
  content: [
    {
      title: 'How can I schedule the automatic delivery option?',
      content: `Automatic deliveries are the option available for you to set your schedule for receiving your FIT Box to receive at a regular interval.
                You can choose among the following automatics delivery schedules we offer: For Men's, women, and kids-you have an option to select the automatic delivery - Monthly, bimonthly and quarterly.
                You can manage your delivery schedule of your sign-in home page. The page will let you know about your next shipment arrival date. Thus you can easily cancel, reschedule your FIT Box as per your need.
                In case you don't want to set the automatic scheduling for your orders, then you can schedule the manual schedule to order your fit from your sign-in home page only after signing in your account.`
    },
    {
      title: 'What is the option available to change or cancel my subscription for automatic deliveries?',
      content: `You can refer to the point of "How can I schedule the automatic delivery option?" to sign for your scheduled deliveries.
                After signing-in to your account, you will land to your sign-in home page, thus click on the automatic FIT options. It will further offer you the option of selecting the frequency of your schedules like monthly, bimonthly and quarterly.
                In case if you need to avoid your next shipment, you don't have to change your schedule. From your sign-in home page, click on "Skip this Fit." When you select this alternative, we won't send your next planned shipment, yet your scheduled calendar will continue as usual for the accompanying delivery.
                In case, if we're already in the process of sending your next shipment, this option of skipping your FIT Box. Thus, in that case, you have to reach us by contacting our customer care team at 469-502-3617 or by dropping mail support@drapefit.com to cancel your shipment Further, in case you need to cancel your automatic delivery schedule, then click on the "manage automatic fits" on your login page.
                At the point when you cancel your automatic schedule shipment, then you can also cancel your upcoming shipments. In case, if you don't cancel your upcoming shipment of the FIT Box, thus, the same will arrive at the already-scheduled time.`
    }
  ]
};

const HowDrpaeFitWorks = () => {
  return (
    <>
      <Recommended propsValue={info} />
      <HowItWorks propsValue={roundedImage} />
      <Expect />
      <HowMuchCost />
      <Accordions propsValue={billing} />
      <Accordions propsValue={scheduling} />
      <FinallySign propsValue={finallySign} />
    </>
  );
};

export default HowDrpaeFitWorks;
