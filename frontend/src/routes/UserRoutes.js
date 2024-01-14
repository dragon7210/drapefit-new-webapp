import { lazy } from 'react';

import Loadable from 'ui-component/Loadable';
import UserLayout from 'layout/UserLayout';
import ComponentLoader from 'utils/ComponentLoader';
import AuthClientRoutes from 'utils/AuthClientRoutes';
import PrivateClientRoutes from 'utils/PrivateClientRoutes';

const Landing = Loadable(lazy(() => ComponentLoader(() => import('views/client/landing'))));
const MyLogin = Loadable(lazy(() => ComponentLoader(() => import('views/pages/authentication/auth-modes/MyLogin'))));
const MySignup = Loadable(lazy(() => ComponentLoader(() => import('views/pages/authentication/auth-modes/MySignup'))));
const MyForgotPwd = Loadable(
  lazy(() => ComponentLoader(() => import('views/pages/authentication/auth-modes/MyForgotPwd')))
);
const MyResetPwd = Loadable(
  lazy(() => ComponentLoader(() => import('views/pages/authentication/auth-modes/MyResetPwd')))
);
const MyVerify = Loadable(lazy(() => ComponentLoader(() => import('views/pages/authentication/auth-modes/MyVerify'))));
const Men = Loadable(lazy(() => ComponentLoader(() => import('views/client/men/men'))));
const BigTall = Loadable(lazy(() => ComponentLoader(() => import('views/client/men/big-tall'))));
const Women = Loadable(lazy(() => ComponentLoader(() => import('views/client/women/women'))));
const PlusSize = Loadable(lazy(() => ComponentLoader(() => import('views/client/women/plus-size'))));
const Maternity = Loadable(lazy(() => ComponentLoader(() => import('views/client/women/maternity'))));
const Petite = Loadable(lazy(() => ComponentLoader(() => import('views/client/women/petite'))));
const Jeans = Loadable(lazy(() => ComponentLoader(() => import('views/client/women/women-jeans'))));
const Business = Loadable(lazy(() => ComponentLoader(() => import('views/client/women/women-business'))));
const Kids = Loadable(lazy(() => ComponentLoader(() => import('views/client/kids'))));
const WhoWeAre = Loadable(lazy(() => ComponentLoader(() => import('views/client/about-us/WhoWeAre'))));
const OurMission = Loadable(lazy(() => ComponentLoader(() => import('views/client/about-us/OurMission'))));
const OurStylist = Loadable(lazy(() => ComponentLoader(() => import('views/client/about-us/OurStylist'))));
const ExecutiveTeam = Loadable(lazy(() => ComponentLoader(() => import('views/client/about-us/ExecutiveTeam'))));
const News = Loadable(lazy(() => ComponentLoader(() => import('views/client/the-company/News'))));
const Careers = Loadable(lazy(() => ComponentLoader(() => import('views/client/the-company/Careers'))));
const FAQ = Loadable(lazy(() => ComponentLoader(() => import('views/client/customer-care/FAQ'))));
const ReturnExchange = Loadable(lazy(() => ComponentLoader(() => import('views/client/customer-care/ReturnExchange'))));
const TrackOrder = Loadable(lazy(() => ComponentLoader(() => import('views/client/customer-care/TrackOrder'))));
const HelpCenter = Loadable(lazy(() => ComponentLoader(() => import('views/client/customer-care/HelpCenter'))));
const ContactUs = Loadable(lazy(() => ComponentLoader(() => import('views/client/customer-care/ContactUs'))));
const TermsConditions = Loadable(lazy(() => ComponentLoader(() => import('views/client/site-agree/TermsConditions'))));
const PrivacyPolicy = Loadable(lazy(() => ComponentLoader(() => import('views/client/site-agree/PrivacyPolicy'))));
const Sitemap = Loadable(lazy(() => ComponentLoader(() => import('views/client/site-agree/Sitemap'))));
const HowDrapeFitWorks = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/recommended/HowDrapeFitWorks')))
);
const FitBoxPricing = Loadable(lazy(() => ComponentLoader(() => import('views/client/recommended/FitBoxPricing'))));
const PersonalStylist = Loadable(lazy(() => ComponentLoader(() => import('views/client/recommended/PersonalStylist'))));
const MenBasicInfo = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/men/BasicInfo'))));
const MenStyleFit = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/men/StyleFit'))));
const MenPriceRange = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/men/PriceRange'))));
const MenStyleCustom = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/men/StyleCustom'))));
const Schedule = Loadable(lazy(() => ComponentLoader(() => import('views/client/account/FIT'))));
const Reservation = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/Reservation'))));
const AddressBook = Loadable(lazy(() => ComponentLoader(() => import('views/client/account/Address'))));
const Payment = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/Payment'))));
const AddCard = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/AddCard'))));
const PaymentSuccess = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/PaymentSuccess'))));
const NotShipped = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/NotShipped'))));
const Order = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/Order'))));
const Referrals = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/Referrals'))));
const OrderReview = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/OrderReview'))));
const CustomerOrderReview = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/CustomerOrderReview')))
);
const WomenBasicInfo = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/women/BasicInfo'))));
const WomenStyleFit = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/women/StyleFit'))));
const WomenPriceRange = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/women/PriceRange'))));
const WomenStyleCustom = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/women/StyleCustom'))));
const KidsBasicInfo = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/kids/BasicInfo'))));
const KidsBoyStyleFit = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/kids/BoyStyleFit'))));
const KidsGirlStyleFit = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/kids/GirlStyleFit'))));
const KidsBoyPriceRange = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/kids/BoyPriceRange')))
);
const KidsGirlPriceRange = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/kids/GirlPriceRange')))
);
const KidsBoyStyleCustom = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/kids/BoyStyleCustom')))
);
const KidsGirlStyleCustom = Loadable(
  lazy(() => ComponentLoader(() => import('views/client/profile/kids/GirlStyleCustom')))
);
const Account = Loadable(lazy(() => ComponentLoader(() => import('views/client/account/index'))));
const SelectFIT = Loadable(lazy(() => ComponentLoader(() => import('views/client/profile/SelectFIT'))));
const ConfirmInfluencer = Loadable(lazy(() => import('views/pages/redirect/ConfirmInfluencer')));
const CalendarSchedule = Loadable(lazy(() => import('views/client/profile/CalendarSchedule')));
const Page404 = Loadable(lazy(() => import('views/pages/error/Page404')));

const UserRoutes = {
  path: '/',
  element: <UserLayout />,
  children: [
    {
      index: true,
      element: <Landing />
    },
    {
      path: '/login',
      element: <AuthClientRoutes component={MyLogin} />
    },
    {
      path: '/signup',
      element: <AuthClientRoutes component={MySignup} />
    },
    {
      path: '/forgot-pwd',
      element: <AuthClientRoutes component={MyForgotPwd} />
    },
    {
      path: '/reset-pwd',
      element: <AuthClientRoutes component={MyResetPwd} />
    },
    {
      path: '/verify',
      element: <AuthClientRoutes component={MyVerify} />
    },
    {
      path: '/men',
      element: <Men />
    },
    {
      path: '/men/big-tall',
      element: <BigTall />
    },
    {
      path: '/women',
      element: <Women />
    },
    {
      path: '/women/plus-size',
      element: <PlusSize />
    },
    {
      path: '/women/maternity',
      element: <Maternity />
    },
    {
      path: '/women/petite',
      element: <Petite />
    },
    {
      path: '/women/women-jeans',
      element: <Jeans />
    },
    {
      path: '/women/women-business',
      element: <Business />
    },
    {
      path: '/kids',
      element: <Kids />
    },
    {
      path: '/about-us/who-we-are',
      element: <WhoWeAre />
    },
    {
      path: '/about-us/our-mission',
      element: <OurMission />
    },
    {
      path: '/about-us/our-stylist',
      element: <OurStylist />
    },
    {
      path: '/about-us/executive-team',
      element: <ExecutiveTeam />
    },
    {
      path: '/the-company/news',
      element: <News />
    },
    {
      path: '/the-company/careers',
      element: <Careers />
    },
    {
      path: '/customer-care/faq',
      element: <FAQ />
    },
    {
      path: '/customer-care/track-order',
      element: <TrackOrder />
    },
    {
      path: '/customer-care/return-and-exchange',
      element: <ReturnExchange />
    },
    {
      path: '/customer-care/help-center',
      element: <HelpCenter />
    },
    {
      path: '/customer-care/contact-us',
      element: <ContactUs />
    },
    {
      path: '/terms-and-conditions',
      element: <TermsConditions />
    },
    {
      path: '/privacy-policy',
      element: <PrivacyPolicy />
    },
    {
      path: '/sitemap',
      element: <Sitemap />
    },
    {
      path: '/recommended/how-drape-fit-works',
      element: <HowDrapeFitWorks />
    },
    {
      path: '/recommended/fit-box-pricing',
      element: <FitBoxPricing />
    },
    {
      path: '/recommended/personal-stylist',
      element: <PersonalStylist />
    },
    {
      path: '/confirm-influencer/success',
      element: <ConfirmInfluencer />
    },
    {
      path: '/welcome/basic-info/men',
      element: <PrivateClientRoutes component={MenBasicInfo} />
    },
    {
      path: '/welcome/basic-info/women',
      element: <PrivateClientRoutes component={WomenBasicInfo} />
    },
    {
      path: '/welcome/basic-info/kids',
      element: <PrivateClientRoutes component={KidsBasicInfo} />
    },
    {
      path: '/welcome/style-fit/men',
      element: <PrivateClientRoutes component={MenStyleFit} />
    },
    {
      path: '/welcome/style-fit/women',
      element: <PrivateClientRoutes component={WomenStyleFit} />
    },
    {
      path: '/welcome/style-fit/kids/girls',
      element: <PrivateClientRoutes component={KidsGirlStyleFit} />
    },
    {
      path: '/welcome/style-fit/kids/boys',
      element: <PrivateClientRoutes component={KidsBoyStyleFit} />
    },
    {
      path: '/welcome/price-range/men',
      element: <PrivateClientRoutes component={MenPriceRange} />
    },
    {
      path: '/welcome/price-range/women',
      element: <PrivateClientRoutes component={WomenPriceRange} />
    },
    {
      path: '/welcome/price-range/kids/girls',
      element: <PrivateClientRoutes component={KidsGirlPriceRange} />
    },
    {
      path: '/welcome/price-range/kids/boys',
      element: <PrivateClientRoutes component={KidsBoyPriceRange} />
    },
    {
      path: '/welcome/style-custom/men',
      element: <PrivateClientRoutes component={MenStyleCustom} />
    },
    {
      path: '/welcome/style-custom/women',
      element: <PrivateClientRoutes component={WomenStyleCustom} />
    },
    {
      path: '/welcome/style-custom/kids/girls',
      element: <PrivateClientRoutes component={KidsGirlStyleCustom} />
    },
    {
      path: '/welcome/style-custom/kids/boys',
      element: <PrivateClientRoutes component={KidsBoyStyleCustom} />
    },
    {
      path: '/welcome/schedule',
      element: <PrivateClientRoutes component={Schedule} />
    },
    {
      path: '/welcome/reservation',
      element: <PrivateClientRoutes component={Reservation} />
    },
    {
      path: '/welcome/addressbook',
      element: <PrivateClientRoutes component={AddressBook} />
    },
    {
      path: '/welcome/payment',
      element: <PrivateClientRoutes component={Payment} />
    },
    {
      path: '/add-card/payment',
      element: <PrivateClientRoutes component={AddCard} />
    },
    {
      path: '/payment-success',
      element: <PrivateClientRoutes component={PaymentSuccess} />
    },
    {
      path: '/not-yet-shipped',
      element: <PrivateClientRoutes component={NotShipped} />
    },
    {
      path: '/order',
      element: <PrivateClientRoutes component={Order} />
    },
    {
      path: '/order-review',
      element: <PrivateClientRoutes component={OrderReview} />
    },
    {
      path: '/customer-order-review',
      element: <PrivateClientRoutes component={CustomerOrderReview} />
    },
    {
      path: '/clients/referrals',
      element: <PrivateClientRoutes component={Referrals} />
    },
    {
      path: '/account',
      element: <PrivateClientRoutes component={Account} />
    },
    {
      path: '/select-gender',
      element: <PrivateClientRoutes component={SelectFIT} />
    },
    {
      path: '/calendar-sechedule',
      element: <PrivateClientRoutes component={CalendarSchedule} />
    },
    {
      path: '*',
      element: <Page404 />
    }
  ]
};

export default UserRoutes;
