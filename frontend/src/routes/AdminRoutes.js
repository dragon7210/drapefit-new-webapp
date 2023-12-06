import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import ComponentLoader from 'utils/ComponentLoader';
import AuthAdminRoutes from 'utils/AuthAdminRoutes';
import PrivateAdminRoutes from 'utils/PrivateAdminRoutes';

const AdminLogin = Loadable(
  lazy(() => ComponentLoader(() => import('views/pages/authentication/auth-modes/AdminLogin')))
);
const AdminForgotPwd = Loadable(
  lazy(() => ComponentLoader(() => import('views/pages/authentication/auth-modes/AdminForgotPwd')))
);
const Dashboard = Loadable(lazy(() => ComponentLoader(() => import('views/admin/dashboard'))));
const Influencer = Loadable(lazy(() => ComponentLoader(() => import('views/admin/influencer'))));
const ManageSalesTax = Loadable(lazy(() => ComponentLoader(() => import('views/admin/manage-sales-tax'))));
const CreateEmployee = Loadable(lazy(() => ComponentLoader(() => import('views/admin/employee/CreateEmployee'))));
const ViewEmployee = Loadable(lazy(() => ComponentLoader(() => import('views/admin/employee/ViewEmployee'))));
const SocialMedia = Loadable(lazy(() => ComponentLoader(() => import('views/admin/social-media'))));
const NotPaidList = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer/NotPaidList'))));
const NotPaidEmail = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer/email/NotPaidEmail'))));
const MenView = Loadable(lazy(() => ComponentLoader(() => import('views/admin/view/MenView'))));
const WomenView = Loadable(lazy(() => ComponentLoader(() => import('views/admin/view/WomenView'))));
const GirlView = Loadable(lazy(() => ComponentLoader(() => import('views/admin/view/GirlView'))));
const BoyView = Loadable(lazy(() => ComponentLoader(() => import('views/admin/view/BoyView'))));
const PaidList = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer/PaidList'))));
const PaidEmail = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer/email/PaidEmail'))));
const PaidPrevWork = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer/paid/PrevWork'))));
const PaidPrevOrder = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer/paid/PrevOrder'))));
const PaidBrowseAll = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer/paid/BrowseAll'))));
const PaidMatching = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer/paid/Matching'))));
const PaidCatelog = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer/paid/Catelog'))));
const PaidOrderReceipt = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer/paid/OrderReceipt'))));
const PaidProductList = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer/paid/ProductList'))));
const PaidViewProduct = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer/paid/ViewProduct'))));
const PaidExtraProduct = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer/paid/ExtraProduct'))));
const CMSList = Loadable(lazy(() => ComponentLoader(() => import('views/admin/cms/CMSList'))));
const CMSEdit = Loadable(lazy(() => ComponentLoader(() => import('views/admin/cms/CMSEdit'))));
const ExchangeProducts = Loadable(lazy(() => ComponentLoader(() => import('views/admin/exchange-products'))));
const DeclinedProducts = Loadable(lazy(() => ComponentLoader(() => import('views/admin/declined-products'))));
const PreviousWorkList = Loadable(lazy(() => ComponentLoader(() => import('views/admin/previous-work-list'))));
const ScanProducts = Loadable(lazy(() => ComponentLoader(() => import('views/admin/scan-products'))));
const Setting = Loadable(lazy(() => ComponentLoader(() => import('views/admin/setting'))));
const PromocodeSetting = Loadable(lazy(() => ComponentLoader(() => import('views/admin/promocode-setting'))));
const OfferPromocode = Loadable(lazy(() => ComponentLoader(() => import('views/admin/offer-promocode'))));
const News = Loadable(lazy(() => ComponentLoader(() => import('views/admin/news'))));

const DefaultCustomerList = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/finance-report/DefaulterCustomerList')))
);
const MasterCustomerPaidList = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-support-report/CustomerPaidList')))
);
const MasterPreviousWorkList = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-support-report/PreviousWorkList')))
);
const FinalShippedSmRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/FinalShippedSmRpt')))
);
const FinalShippedDtRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/FinalShippedDtRpt')))
);
const ChangeAutoCheckDate = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/ChangeAutoCheckDate')))
);
const CheckoutDtRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/CheckoutDtRpt')))
);
const CheckoutSmRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/CheckoutSmRpt')))
);
const DeclineDtRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/DeclineDtRpt')))
);
const DeclineSmRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/DeclineSmRpt')))
);
const ExchangeProcessedDtRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/ExchangeProcessedDtRpt')))
);
const ExchangeProcessedSmRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/ExchangeProcessedSmRpt')))
);
const NotCheckoutDtRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/NotCheckoutDtRpt')))
);
const NotCheckoutSmRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/NotCheckoutSmRpt')))
);
const NotReturnDtRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/NotReturnDtRpt')))
);
const NotReturnSmRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/NotReturnSmRpt')))
);
const NotRtExDtRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/NotRtExDtRpt')))
);
const NotRtExSmRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/NotRtExSmRpt')))
);
const ReturnProcessedDtRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/ReturnProcessedDtRpt')))
);
const ReturnProcessedSmRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/ReturnProcessedSmRpt')))
);
const StylingFeeRpt = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/master-summary-report/StylingFeeRpt')))
);
const GiftCardAdmin = Loadable(lazy(() => ComponentLoader(() => import('views/admin/gift-card/admin'))));
const GiftCardEmail = Loadable(lazy(() => ComponentLoader(() => import('views/admin/gift-card/email'))));
const GiftCardMail = Loadable(lazy(() => ComponentLoader(() => import('views/admin/gift-card/mail'))));
const GiftCardPrint = Loadable(lazy(() => ComponentLoader(() => import('views/admin/gift-card/print'))));
const CreateCareer = Loadable(lazy(() => ComponentLoader(() => import('views/admin/career/CreateCareer'))));
const ViewCareer = Loadable(lazy(() => ComponentLoader(() => import('views/admin/career/ViewCareer'))));
const Category = Loadable(lazy(() => ComponentLoader(() => import('views/admin/manage-blog/Category'))));
const Blog = Loadable(lazy(() => ComponentLoader(() => import('views/admin/manage-blog/Blog'))));
const BlogTag = Loadable(lazy(() => ComponentLoader(() => import('views/admin/manage-blog/BlogTag'))));
const SubscriptionCancellation = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/customer-report/SubscriptionCancellation')))
);
const BlockCustomerList = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/customer-report/BlockCustomerList')))
);
const JunkUserList = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer-report/JunkUserList'))));
const PaymentRefund = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer-report/PaymentRefund'))));
const PaymentRefundListing = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/customer-report/PaymentRefundListing')))
);
const ChargeClient = Loadable(lazy(() => ComponentLoader(() => import('views/admin/customer-report/ChargeClient'))));
const AutoCheckoutList = Loadable(lazy(() => ComponentLoader(() => import('views/admin/report/AutoCheckoutList'))));
const AllCustomers = Loadable(lazy(() => ComponentLoader(() => import('views/admin/report/AllCustomers'))));
const CustomerNotPaidList = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/CustomerNotPaidList')))
);
const CustomerPaidList = Loadable(lazy(() => ComponentLoader(() => import('views/admin/report/CustomerPaidList'))));
const PreviousList = Loadable(lazy(() => ComponentLoader(() => import('views/admin/report/PreviousList'))));
const StyleList = Loadable(lazy(() => ComponentLoader(() => import('views/admin/report/StyleList'))));
const State = Loadable(lazy(() => ComponentLoader(() => import('views/admin/report/State'))));
const Subscription = Loadable(lazy(() => ComponentLoader(() => import('views/admin/report/Subscription'))));
const BatchProcessReport = Loadable(lazy(() => ComponentLoader(() => import('views/admin/report/BatchProcessReport'))));
const BatchProcessSubscription = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/BatchProcessSubscription')))
);
const ClientBirthday = Loadable(lazy(() => ComponentLoader(() => import('views/admin/report/ClientBirthday'))));
const CheckedOutNotReturnDetails = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/CheckedOutNotReturnDetails')))
);
const CheckedOutProductDetail = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/CheckedOutProductDetail')))
);
const CheckedOutReturnDetails = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/CheckedOutReturnDetails')))
);
const CheckedOutReturnSummary = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/CheckedOutReturnSummary')))
);
const ClientCheckedOutDetails = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/ClientCheckedOutDetails')))
);
const ClientCheckedOutSummary = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/ClientCheckedOutSummary')))
);
const ListOfProductNotReturned = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/ListOfProductNotReturned')))
);
const MonthlyclientConsumed = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/MonthlyclientConsumed')))
);
const MonthlyLoss = Loadable(lazy(() => ComponentLoader(() => import('views/admin/report/MonthlyLoss'))));
const MonthlyProductDeclined = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/MonthlyProductDeclined')))
);
const MonthlyProductNotReturned = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/MonthlyProductNotReturned')))
);
const MonthlyRevenue = Loadable(lazy(() => ComponentLoader(() => import('views/admin/report/MonthlyRevenue'))));
const MonthlySale = Loadable(lazy(() => ComponentLoader(() => import('views/admin/report/MonthlySale'))));
const NotCheckedOutCustomer = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/NotCheckedOutCustomer')))
);
const NotCheckedOutDetails = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/NotCheckedOutDetails')))
);
const NotCheckedOutSummary = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/NotCheckedOutSummary')))
);
const ProductAssingendButNotFinalized = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/ProductAssingendButNotFinalized')))
);
const ProductDeclinedDetails = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/ProductDeclinedDetails')))
);
const ProductDeclinedSummary = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/ProductDeclinedSummary')))
);
const ProductFinalizeDetails = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/ProductFinalizeDetails')))
);
const ProductFinalizeSummary = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/ProductFinalizeSummary')))
);
const ReturnNotProcessed = Loadable(lazy(() => ComponentLoader(() => import('views/admin/report/ReturnNotProcessed'))));
const TotalProductsInInventory = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/TotalProductsInInventory')))
);
const CheckedOutNotReturnSummary = Loadable(
  lazy(() => ComponentLoader(() => import('views/admin/report/CheckedOutNotReturnSummary')))
);

const AdminRoutes = {
  path: '/dfadmin',
  element: <MainLayout />,
  children: [
    {
      index: true,
      element: <AuthAdminRoutes component={AdminLogin} />
    },
    {
      path: 'login',
      element: <AuthAdminRoutes component={AdminLogin} />
    },
    {
      path: 'forgot-pwd',
      element: <AuthAdminRoutes component={AdminForgotPwd} />
    },
    {
      path: 'dashboard',
      element: <PrivateAdminRoutes component={Dashboard} />
    },
    {
      path: 'influencer',
      element: <PrivateAdminRoutes component={Influencer} />
    },
    {
      path: 'manage-sales-tax',
      element: <PrivateAdminRoutes component={ManageSalesTax} />
    },
    {
      path: 'employee/create-employee',
      element: <PrivateAdminRoutes component={CreateEmployee} />
    },
    {
      path: 'employee/view-employee',
      element: <PrivateAdminRoutes component={ViewEmployee} />
    },
    {
      path: 'customer/paid-list',
      element: <PrivateAdminRoutes component={PaidList} />
    },
    {
      path: 'customer/paid-list/email',
      element: <PrivateAdminRoutes component={PaidEmail} />
    },
    {
      path: 'customer/paid-list/previous-work',
      element: <PrivateAdminRoutes component={PaidPrevWork} />
    },
    {
      path: 'customer/paid-list/previous-order',
      element: <PrivateAdminRoutes component={PaidPrevOrder} />
    },
    {
      path: 'customer/paid-list/browse-all/:id',
      element: <PrivateAdminRoutes component={PaidBrowseAll} />
    },
    {
      path: 'customer/paid-list/matching/:id',
      element: <PrivateAdminRoutes component={PaidMatching} />
    },
    {
      path: 'customer/paid-list/catelog',
      element: <PrivateAdminRoutes component={PaidCatelog} />
    },
    {
      path: 'customer/paid-list/order-receipt',
      element: <PrivateAdminRoutes component={PaidOrderReceipt} />
    },
    {
      path: 'customer/paid-list/product-list',
      element: <PrivateAdminRoutes component={PaidProductList} />
    },
    {
      path: 'customer/paid-list/product-list/view-product',
      element: <PrivateAdminRoutes component={PaidViewProduct} />
    },
    {
      path: 'customer/paid-list/extra-product',
      element: <PrivateAdminRoutes component={PaidExtraProduct} />
    },
    {
      path: 'customer/not-paid-list',
      element: <PrivateAdminRoutes component={NotPaidList} />
    },
    {
      path: 'customer/not-paid-list/email',
      element: <PrivateAdminRoutes component={NotPaidEmail} />
    },
    {
      path: 'men-view/:id',
      element: <PrivateAdminRoutes component={MenView} />
    },
    {
      path: 'women-view/:id',
      element: <PrivateAdminRoutes component={WomenView} />
    },
    {
      path: 'girl-view/:id',
      element: <PrivateAdminRoutes component={GirlView} />
    },
    {
      path: 'boy-view/:id',
      element: <PrivateAdminRoutes component={BoyView} />
    },
    {
      path: 'social-media',
      element: <PrivateAdminRoutes component={SocialMedia} />
    },
    {
      path: 'cms-list',
      element: <PrivateAdminRoutes component={CMSList} />
    },
    {
      path: 'cms-edit/:id',
      element: <PrivateAdminRoutes component={CMSEdit} />
    },
    {
      path: 'exchange-products',
      element: <PrivateAdminRoutes component={ExchangeProducts} />
    },
    {
      path: 'declined-products',
      element: <PrivateAdminRoutes component={DeclinedProducts} />
    },
    {
      path: 'scan-products',
      element: <PrivateAdminRoutes component={ScanProducts} />
    },
    {
      path: 'previous-work-list',
      element: <PrivateAdminRoutes component={PreviousWorkList} />
    },
    {
      path: 'setting',
      element: <PrivateAdminRoutes component={Setting} />
    },
    {
      path: 'promocode-setting',
      element: <PrivateAdminRoutes component={PromocodeSetting} />
    },
    {
      path: 'offer-promocode',
      element: <PrivateAdminRoutes component={OfferPromocode} />
    },
    {
      path: 'news',
      element: <PrivateAdminRoutes component={News} />
    },
    {
      path: 'finance-report/default-customer-list',
      element: <PrivateAdminRoutes component={DefaultCustomerList} />
    },
    {
      path: 'master-support-report/customer-paid-list',
      element: <PrivateAdminRoutes component={MasterCustomerPaidList} />
    },
    {
      path: 'master-support-report/previous-work-list',
      element: <PrivateAdminRoutes component={MasterPreviousWorkList} />
    },
    {
      path: 'master-summary-report/finalized-shipped-summary-report',
      element: <PrivateAdminRoutes component={FinalShippedSmRpt} />
    },
    {
      path: 'master-summary-report/finalized-shipped-details-report',
      element: <PrivateAdminRoutes component={FinalShippedDtRpt} />
    },
    {
      path: 'master-summary-report/change-auto-checkout-date',
      element: <PrivateAdminRoutes component={ChangeAutoCheckDate} />
    },
    {
      path: 'master-summary-report/checkout-details-report',
      element: <PrivateAdminRoutes component={CheckoutDtRpt} />
    },
    {
      path: 'master-summary-report/checkout-summary-report',
      element: <PrivateAdminRoutes component={CheckoutSmRpt} />
    },
    {
      path: 'master-summary-report/decline-details-report',
      element: <PrivateAdminRoutes component={DeclineDtRpt} />
    },
    {
      path: 'master-summary-report/decline-summary-report',
      element: <PrivateAdminRoutes component={DeclineSmRpt} />
    },
    {
      path: 'master-summary-report/exchange-processed-details-report',
      element: <PrivateAdminRoutes component={ExchangeProcessedDtRpt} />
    },
    {
      path: 'master-summary-report/exchange-processed-summary-report',
      element: <PrivateAdminRoutes component={ExchangeProcessedSmRpt} />
    },
    {
      path: 'master-summary-report/not-checkout-details-report',
      element: <PrivateAdminRoutes component={NotCheckoutDtRpt} />
    },
    {
      path: 'master-summary-report/not-checkout-summary-report',
      element: <PrivateAdminRoutes component={NotCheckoutSmRpt} />
    },
    {
      path: 'master-summary-report/not-return-details-report',
      element: <PrivateAdminRoutes component={NotReturnDtRpt} />
    },
    {
      path: 'master-summary-report/not-return-summary-report',
      element: <PrivateAdminRoutes component={NotReturnSmRpt} />
    },
    {
      path: 'master-summary-report/not-return-exchange-details-report',
      element: <PrivateAdminRoutes component={NotRtExDtRpt} />
    },
    {
      path: 'master-summary-report/not-return-exchange-summary-report',
      element: <PrivateAdminRoutes component={NotRtExSmRpt} />
    },
    {
      path: 'master-summary-report/return-processed-details-report',
      element: <PrivateAdminRoutes component={ReturnProcessedDtRpt} />
    },
    {
      path: 'master-summary-report/return-processed-summary-report',
      element: <PrivateAdminRoutes component={ReturnProcessedSmRpt} />
    },
    {
      path: 'master-summary-report/styling-fee-report',
      element: <PrivateAdminRoutes component={StylingFeeRpt} />
    },
    {
      path: 'gift-card/gift-card-from-admin',
      element: <PrivateAdminRoutes component={GiftCardAdmin} />
    },
    {
      path: 'gitf-card/gift-card-email',
      element: <PrivateAdminRoutes component={GiftCardEmail} />
    },
    {
      path: 'gift-card/gift-card-mail',
      element: <PrivateAdminRoutes component={GiftCardMail} />
    },
    {
      path: 'gift-card/gift-card-print',
      element: <PrivateAdminRoutes component={GiftCardPrint} />
    },
    {
      path: 'career/add-career',
      element: <PrivateAdminRoutes component={CreateCareer} />
    },
    {
      path: 'career/view-career',
      element: <PrivateAdminRoutes component={ViewCareer} />
    },
    {
      path: 'manage-blog/category',
      element: <PrivateAdminRoutes component={Category} />
    },
    {
      path: 'manage-blog/blog',
      element: <PrivateAdminRoutes component={Blog} />
    },
    {
      path: 'manage-blog/blog-tag',
      element: <PrivateAdminRoutes component={BlogTag} />
    },
    {
      path: 'customer-report/subscription-cancellation',
      element: <PrivateAdminRoutes component={SubscriptionCancellation} />
    },
    {
      path: 'customer-report/block-customer-list',
      element: <PrivateAdminRoutes component={BlockCustomerList} />
    },
    {
      path: 'customer-report/junk-user-list',
      element: <PrivateAdminRoutes component={JunkUserList} />
    },
    {
      path: 'customer-report/payment-refund',
      element: <PrivateAdminRoutes component={PaymentRefund} />
    },
    {
      path: 'customer-report/payment-refundlist',
      element: <PrivateAdminRoutes component={PaymentRefundListing} />
    },
    {
      path: 'customer-report/charge-client',
      element: <PrivateAdminRoutes component={ChargeClient} />
    },
    {
      path: 'report/auto-checkout-list',
      element: <PrivateAdminRoutes component={AutoCheckoutList} />
    },
    {
      path: 'report/all-customers',
      element: <PrivateAdminRoutes component={AllCustomers} />
    },
    {
      path: 'report/customer-not-paid-list',
      element: <PrivateAdminRoutes component={CustomerNotPaidList} />
    },
    {
      path: 'report/customer-paid-list',
      element: <PrivateAdminRoutes component={CustomerPaidList} />
    },
    {
      path: 'report/previous-list',
      element: <PrivateAdminRoutes component={PreviousList} />
    },
    {
      path: 'report/stylist-wise',
      element: <PrivateAdminRoutes component={StyleList} />
    },
    {
      path: 'report/state-wise',
      element: <PrivateAdminRoutes component={State} />
    },
    {
      path: 'report/subscriptions',
      element: <PrivateAdminRoutes component={Subscription} />
    },
    {
      path: 'report/batch-process-reports',
      element: <PrivateAdminRoutes component={BatchProcessReport} />
    },
    {
      path: 'report/batch-process-subscription',
      element: <PrivateAdminRoutes component={BatchProcessSubscription} />
    },
    {
      path: 'report/clients-birthday',
      element: <PrivateAdminRoutes component={ClientBirthday} />
    },
    {
      path: 'report/not-checked-out-customer',
      element: <PrivateAdminRoutes component={NotCheckedOutCustomer} />
    },
    {
      path: 'report/return-not-processed',
      element: <PrivateAdminRoutes component={ReturnNotProcessed} />
    },
    {
      path: 'report/checked-out-product-detail',
      element: <PrivateAdminRoutes component={CheckedOutProductDetail} />
    },
    {
      path: 'report/product-assigned-but-not-finalized',
      element: <PrivateAdminRoutes component={ProductAssingendButNotFinalized} />
    },
    {
      path: 'report/list-of-products-not-returned',
      element: <PrivateAdminRoutes component={ListOfProductNotReturned} />
    },
    {
      path: 'report/monthly-sales',
      element: <PrivateAdminRoutes component={MonthlySale} />
    },
    {
      path: 'report/monthly-loss',
      element: <PrivateAdminRoutes component={MonthlyLoss} />
    },
    {
      path: 'report/monthly-revenue',
      element: <PrivateAdminRoutes component={MonthlyRevenue} />
    },
    {
      path: 'report/total-products-in-inventory',
      element: <PrivateAdminRoutes component={TotalProductsInInventory} />
    },
    {
      path: 'report/monthly-product-shipped[inventory]',
      element: <PrivateAdminRoutes component={PreviousList} />
    },
    {
      path: 'report/monthly-client-consumed',
      element: <PrivateAdminRoutes component={MonthlyclientConsumed} />
    },
    {
      path: 'report/monthly-product-not-returned',
      element: <PrivateAdminRoutes component={MonthlyProductNotReturned} />
    },
    {
      path: 'report/monthly-product-declined',
      element: <PrivateAdminRoutes component={MonthlyProductDeclined} />
    },
    {
      path: 'report/product-finalize-summary',
      element: <PrivateAdminRoutes component={ProductFinalizeSummary} />
    },
    {
      path: 'report/product-finalize-details',
      element: <PrivateAdminRoutes component={ProductFinalizeDetails} />
    },
    {
      path: 'report/client-checkedout-summary',
      element: <PrivateAdminRoutes component={ClientCheckedOutSummary} />
    },
    {
      path: 'report/client-checkedout-details',
      element: <PrivateAdminRoutes component={ClientCheckedOutDetails} />
    },
    {
      path: 'report/not-checkedout-summary',
      element: <PrivateAdminRoutes component={NotCheckedOutSummary} />
    },
    {
      path: 'report/not-checkedout-details',
      element: <PrivateAdminRoutes component={NotCheckedOutDetails} />
    },
    {
      path: 'report/checkedout-return-summary',
      element: <PrivateAdminRoutes component={CheckedOutReturnSummary} />
    },
    {
      path: 'report/checkedout-return-details',
      element: <PrivateAdminRoutes component={CheckedOutReturnDetails} />
    },
    {
      path: 'report/checkedout-not-return-summary',
      element: <PrivateAdminRoutes component={CheckedOutNotReturnSummary} />
    },
    {
      path: 'report/checkedout-not-return-details',
      element: <PrivateAdminRoutes component={CheckedOutNotReturnDetails} />
    },
    {
      path: 'report/product-declined-summary',
      element: <PrivateAdminRoutes component={ProductDeclinedSummary} />
    },
    {
      path: 'report/product-declined-details',
      element: <PrivateAdminRoutes component={ProductDeclinedDetails} />
    },
    {
      path: '*',
      element: <Navigate to="/dfadmin/login" replace />
    }
  ]
};

export default AdminRoutes;
