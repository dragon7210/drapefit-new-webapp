import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

import CAbout from '../components/About';

const result = {
  link: 'Home',
  typo: 'Return and Exchange',
  title: {
    first: 'RETURN AND',
    last: 'EXCHANGE'
  },
  content: (
    <>
      <Typography className="breadcrumb-link">FIT BOX 30-DAY EASY RETURN AND EXCHANGES</Typography>
      <Typography className="about-content">
        Need to return something? Not a problem. Send back your purchased any item you don't love within 30 days of
        receipt and receive a full refund.
      </Typography>
      <Typography className="about-content">
        Please return your purchase in unused condition, with its{' '}
        <Link to="#">original packaging and all accessories</Link>, hang tags etc. intact. Please take a look below for
        specific instructions regarding your merchandise. Excludes FINAL SALE items.
      </Typography>
      <Typography className="breadcrumb-link">30-Day Risk Free Returns</Typography>
      <Typography className="about-content">
        All returns will be refunded to your original form of payment. A $8.95 return shipping fee will be deducted from
        your refund total.
      </Typography>
      <Typography className="breadcrumb-link">How Do I Return an Item?</Typography>
      <Typography className="about-content">
        A return label should be included in your envelope. If you did not receive one or misplaced it, email{' '}
        <Link to="mailto:support@drapefit.com">support@drapefit.com</Link> to receive your return label via email.
      </Typography>
      <Typography className="breadcrumb-link">When Will My Credit Card Be Credited?</Typography>
      <Typography className="about-content">
        Please allow one to two billing cycles for your credit to appear on your statement.
      </Typography>
      <Typography className="breadcrumb-link">If My Order Arrived Damaged</Typography>
      <Typography className="about-content">
        Please email us at <Link to="mailto:support@drapefit.com">support@drapefit.com</Link>.
      </Typography>
      <Typography className="breadcrumb-link">Can I make exchanges?</Typography>
      <Typography className="about-content">
        Yes, place a new order immediately for the size that you want, before it sells out. Then return your original
        item. Reach out to customer service to refund the return shipping charge, once the new order is placed.
      </Typography>
      <Typography className="breadcrumb-link">How long does it take to process a return?</Typography>
      <Typography className="about-content">
        Once your return has been received and accepted, please allow 72 hours for your store credit to appear on your
        account. We will email you with a credit confirmation as soon as the return is processed.
      </Typography>
      <Typography className="breadcrumb-link">Will I Be Charged for the Return Shipping?</Typography>
      <Typography className="about-content">
        The return shipping fee is $8.95 for the US. We'll automatically deduct the fee from your refund.
      </Typography>
      <Typography className="breadcrumb-link">Will I Be Charged Shipping for my Exchange Order?</Typography>
      <Typography className="about-content">
        Orders over $50 are not charged shipping for exchanges. Orders under $50 are charged the standard $8.95 shipping
        rate.
      </Typography>
      <Typography className="about-content">
        Will I be issued a refund for the shipping cost I paid to have my order shipped to me?
      </Typography>
      <Typography className="about-content">
        No, We do not refund original shipping cost paid to have your order shipped to you as this is a service that is
        paid to USPS to have your order delivered.
      </Typography>
      <Typography className="breadcrumb-link">Late Returns</Typography>
      <Typography className="about-content">
        Unfortunately, items received after the 30-day return period cannot be accepted for a refund or exchange. Your
        package will be returned to you at your expense or a 30% restocking fee may apply. If we receive the same late
        return package a second time, we will keep your merchandise and no credit or exchange will be processed.
      </Typography>
      <Typography className="breadcrumb-link">Can I return an item without using your return label?</Typography>
      <Typography className="about-content">
        We do not recommend using your own label for returns, as the return shipping fee of $8.95 is deducted from each
        return.
      </Typography>
      <Typography className="breadcrumb-link">Have a different question</Typography>
      <Typography className="about-content">
        Email: <Link to="mailto:support@drapefit.com">support@drapefit.com</Link> or
      </Typography>
      <Typography className="about-content">
        Customer Care: <Link to="tel:469-502-3617">469-502-3617</Link>
      </Typography>
    </>
  )
};

const ReturnExchange = () => {
  return <CAbout propsValue={result} />;
};

export default ReturnExchange;
