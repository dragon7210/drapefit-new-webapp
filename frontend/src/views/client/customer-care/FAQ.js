import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

import CAbout from '../components/About';

const result = {
  link: 'Home',
  typo: 'Faq',
  title: {
    first: '',
    last: 'FAQ'
  },
  content: (
    <>
      <Typography className="breadcrumb-link">What is DRAPE FIT?</Typography>
      <Typography className="about-content">
        DRAPE FIT is an <Link to="#">online personal styling service</Link> that provides looks to effortless style -
        saving you time and effort. DRAPE FIT Stylists create a personalized outfits just for you, to provide a
        convenient in-home shopping experience. Our mission at DRAPE FIT is to elevate your style.
      </Typography>
      <Typography className="breadcrumb-link">How does it work?</Typography>
      <Typography className="about-content">Fill out your style profile</Typography>
      <Typography className="about-content">
        Tell us all about your lifestyle, fit, and shopping tests so we can get to know you. It'll only take 5-10
        minutes. Share your social media profiles so we can get a sense of your lifestyle. The more you share, the
        better we can serve you.
      </Typography>
      <Typography className="about-content">Let a personal Stylist elevate your style</Typography>
      <Typography className="about-content">
        A personal stylist will hand select 5 pieces of clothing based on your style preferences. Your personalized box
        gets delivered to you monthly, every other month, or quarterly. A $20 styling fee will be charged when your
        Stylist begins curating your box.
      </Typography>
      <Typography className="about-content">Try everything on at home</Typography>
      <Typography className="about-content">
        Try on everything your Stylist selected for you in the comfort of your own home. Read your Stylist note for
        inspiration on how to style your new pieces and decide what you want to keep. Don't remove any tags if you're
        going to return the item.
      </Typography>
      <Typography className="about-content">Buy only what you love</Typography>
      <Typography className="about-content">
        Decide what you want to keep within 5 days and send back the rest. You'll only be charged for the items you keep
        at checkout.
      </Typography>
      <Typography className="about-content">Checkout online</Typography>
      <Typography className="about-content">
        Checkout by logging into your account at drapefit.com and pay for only what you want to keep. Buy all items from
        your box and get 25% off. Leave feedback for your Stylist and your next box will be even better!
      </Typography>
      <Typography className="about-content">Return the rest</Typography>
      <Typography className="about-content">
        Use your free USPS return mailer to send back any items you don't want to keep. It's that easy.
      </Typography>
      <Typography className="breadcrumb-link">How is DRAPE FIT different than shopping online or in store?</Typography>
      <Typography className="about-content">
        DRAPE FIT makes it effortless to elevate your style with the truly personalized in-home shopping experience. Our
        Stylist curates a collection of 5 unique outfits personalized to your taste, lifestyle and budget, making it
        easy to look and feel your best. DRAPE FIT saves you a trip to the mall and takes the guesswork out of online
        shopping. Try everything on in the comfort of your home, only pay for what you love, and return the rest.
      </Typography>
      <Typography className="breadcrumb-link">
        How is DRAPE FIT different than other personal styling services?
      </Typography>
      <Typography className="about-content">
        Other styling services may send you some items, which limits your selection to create full looks. DRAPE FIT
        sends you 5 personalized outfits based on your style and budget. You can easily chat with your own DRAPE FIT's
        Stylist to consult before or after getting your FIT Box. Our Stylists are passionate professionals who are
        dedicated to elevating your style.
      </Typography>
      <Typography className="breadcrumb-link">
        Can I preview the items my Stylist selected for me before I receive my box?
      </Typography>
      <Typography className="about-content">
        Once your Stylist completes your box, you will receive an email with a preview of your items. Your Stylist will
        make appropriate changes and your box will be on the way!
      </Typography>
      <Typography className="breadcrumb-link">What types of items can I expect?</Typography>
      <Typography className="about-content">
        We carry a variety of clothing and accessories to fit your style, body and lifestyle. We offer shirts, hoodies,
        jumpsuits, overalls, sweater dresses, sweaters, pants, skirts, shorts, dresses, jackets, scarves and jewelry.
        Our selection is constantly changing to meet both your needs and shifting fashion trends.
      </Typography>
      <Typography className="breadcrumb-link">How much do items in my DRAPE FIT Box cost?</Typography>
      <Typography className="about-content">
        We carry items from $60 and up and your Stylist will tailor your box to your budget. On your style profile, you
        can tell us exactly how much you want to spend. When you buy all items from a box, you get 25% off the lowest
        priced item.
      </Typography>
      <Typography className="breadcrumb-link">What kinds of brands can I expect to see in my box?</Typography>
      <Typography className="about-content">
        We work with numerous designer brands as well as up and coming designers. The merchandise mix is constantly
        growing and changing to provide the best selection to elevate your style. You may discover a new brand you love
        through your Stylist.
      </Typography>
      <Typography className="breadcrumb-link">What sizes do you carry?</Typography>
      <Typography className="about-content">
        We currently carry women's sizes 0-12, XS-XL and waist size 24-32. We also offer maternity or plus size at this
        time.
      </Typography>
      <Typography className="about-content">
        We currently offer men's sizes S, M, L, XL, XXL and waist size 30-34.
      </Typography>
      <Typography className="about-content">We currently offer kid's size newborn - 4T and Boy & Girl 5-14.</Typography>
      <Typography className="breadcrumb-link">How can I show my Stylist what I'm looking for in my box?</Typography>
      <Typography className="about-content">
        You can pin, screenshot and share what you love most from our social media platforms and share it with your
        Stylist. Add your Instagram or Facebook username to your style profile!
      </Typography>
      <Typography className="about-content">
        Remember to follow us on{' '}
        <Link to="https://www.facebook.com/drapefitinc" target="_blank" rel="noopener noreferrer">
          Facebook
        </Link>
        ,{' '}
        <Link to="https://www.instagram.com/drapefitinc" target="_blank" rel="noopener noreferrer">
          Instagram
        </Link>
        ,{' '}
        <Link to="https://www.pinterest.com/drapefitinc" target="_blank" rel="noopener noreferrer">
          Pinterest
        </Link>
        , and{' '}
        <Link to="https://www.twitter.com/drapefitinc" target="_blank" rel="noopener noreferrer">
          Twitter
        </Link>{' '}
        to get the latest styles and sneak peeks of what's new at DRAPE FIT.
      </Typography>
      <Typography className="breadcrumb-link">Can I make special requests?</Typography>
      <Typography className="about-content">
        Once you have a DRAPE FIT Stylist, you can contact them anytime by logging on to your account at{' '}
        <Link to="/">https://www.drapefit.com/</Link> or email them{' '}
        <Link to="mailto:support@drapefit.com">support@drapefit.com</Link>. Give your Stylist an idea of the type of
        style you are looking for rather than making specific item requests. This will give your Stylist a better
        understanding of your taste and preferences to help curate the best selection for you.
      </Typography>
      <Typography className="breadcrumb-link">How is the billing policy?</Typography>
      <Typography className="about-content">
        For your first box, a $20 styling fee will be charged as soon as you order. For each subsequently scheduled box,
        a $20 styling fee will be charged after your Stylist begins styling your FIT Box.
      </Typography>
      <Typography className="breadcrumb-link">Can I change my delivery frequency?</Typography>
      <Typography className="about-content">
        You can choose to receive a delivery every month, every other month or every 3 months. It's also easy to skip a
        box or change your delivery date and frequency at any time by logging into your account at
        <Link to="/">https://www.drapefit.com/</Link>.
      </Typography>
      <Typography className="breadcrumb-link">How do I cancel my subscription?</Typography>
      <Typography className="about-content">
        We're sorry to see you go! To cancel your subscription, go to your
        <Link to="/">Account</Link> page and click on "Cancel My Subscription". Let us know why the service didn't work
        out for you. We appreciate any feedback that can help us provide a better styling experience moving forward.
      </Typography>
      <Typography className="breadcrumb-link">Why can't I cancel my subscription?</Typography>
      <Typography className="about-content">
        If there's a FIT Box in transit to you from your Stylist, you won't be able to cancel your subscription until
        you receive your FIT Box, check out, and return your FIT Box. If there's a return in transit to us, you will
        need to wait until the return is received in order to complete your cancellation.
      </Typography>
      <Typography className="breadcrumb-link">How do returns work?</Typography>
      <Typography className="about-content">
        Returns are always free. You'll find a prepaid shipping label and return bag included in your box. Please
        contact us if you didn't receive a return label, or have lost the return label so we can send you a new one by
        email.
      </Typography>
      <Typography className="breadcrumb-link">
        How long do I have to send back the items I don't want to keep?
      </Typography>
      <Typography className="about-content">
        You have 5 days after you receive your box to send back returns in the mail. If the 5th day falls on a Sunday,
        please return by the following business day. If returns aren't postmarked by the 5th day, we'll assume you love
        your entire box and charge you for all the items in it. Don't worry, we'll send you email and text message
        reminders before we charge you. If you need a few extra days due to busy schedules, just ask your Stylist to
        extend your checkout date and they'll take care of you.
      </Typography>
      <Typography className="breadcrumb-link">Do you ship internationally?</Typography>
      <Typography className="about-content">Currently, we only ship within the U.S.</Typography>
      <Typography className="breadcrumb-link">ADDITIONAL QUESTIONS?</Typography>
      <Typography className="about-content">
        Email: <Link to="mailto:support@drapefit.com">support@drapefit.com</Link> or
      </Typography>
      <Typography className="about-content">
        Customer Care: <Link to="tel:469-502-3617">469-502-3617</Link>
      </Typography>
    </>
  )
};

const FAQ = () => {
  return <CAbout propsValue={result} />;
};

export default FAQ;
