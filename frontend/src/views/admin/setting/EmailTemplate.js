import { Button, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import Table from 'ui-component/Table';
import DFnewLogger from 'utils/DFnewLogger';

const action_btn = (
  <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
    <Tooltip title="Edit" arrow>
      <Button
        className="admin-table-btn edit"
        onClick={() => {
          DFnewLogger('Table/edit_action');
        }}
      >
        <FontAwesomeIcon icon={faEdit} />
      </Button>
    </Tooltip>
  </div>
);
const columns = [
  { accessorKey: 'emailTitle', header: 'Email Title' },
  { accessorKey: 'action', header: 'Action' }
];
const tableData = [
  { emailTitle: 'Drape Fit Employee Created', action: action_btn },
  { emailTitle: 'Welcome to Drape Fit Family', action: action_btn },
  { emailTitle: 'Drape Fit Forgot Password', action: action_btn },
  { emailTitle: 'Drape Fit Order Review', action: action_btn },
  { emailTitle: "Get a $25 Credit to Try Drape Fit! It's so easy and fun", action: action_btn },
  { emailTitle: 'Drape Fit Order Review For Kids - Not Using Currently', action: action_btn },
  { emailTitle: 'Your $[PRICE] is waiting for you', action: action_btn },
  { emailTitle: 'Style Fit - Confirmed', action: action_btn },
  { emailTitle: 'Style Fit for Kid - Confirmed', action: action_btn },
  { emailTitle: 'Drape Fit Stylist Assigned', action: action_btn },
  { emailTitle: 'Style Fit Is On The Way', action: action_btn },
  { emailTitle: 'Drape Fit Payment Processed Successfully', action: action_btn },
  { emailTitle: "Your Kid's Style Fit Profile", action: action_btn },
  { emailTitle: 'Style Kids - Style Fit Profile - Complete', action: action_btn },
  { emailTitle: 'HELP MESSAGE(Support1) - Not Using Currently', action: action_btn },
  { emailTitle: 'Thank you for Connecting with us - Drape Fit(support)', action: action_btn },
  { emailTitle: 'Invite Your Friend And Get $25 Credit', action: action_btn },
  { emailTitle: 'Your Drape Fit Gift Code Details', action: action_btn },
  { emailTitle: 'Drape Fit Payment Refund', action: action_btn },
  { emailTitle: 'Kids Subscription Has Been Activated', action: action_btn },
  { emailTitle: 'Some Problem to your Drape Fit Payment', action: action_btn },
  { emailTitle: 'Drape Fit - Kid Profile Assigned', action: action_btn },
  { emailTitle: 'Drape Fit Subscription Canceled', action: action_btn },
  { emailTitle: "Drape Fit Kids' Subscription Canceled", action: action_btn },
  { emailTitle: 'Thank you for Connecting with us - Drape Fit', action: action_btn },
  { emailTitle: 'Customer Help(client1) - Not Using Currently', action: action_btn },
  { emailTitle: 'Your Subscription has been activated', action: action_btn },
  { emailTitle: 'Drape Fit Career', action: action_btn },
  { emailTitle: 'Drape Fit Gift Card Via Email', action: action_btn },
  { emailTitle: 'Drape Fit Gift Card Via Mail', action: action_btn },
  { emailTitle: 'Drape Fit Gift Card Via Print', action: action_btn },
  { emailTitle: 'Your Drape Fit Profile Is Incomplete', action: action_btn },
  { emailTitle: 'Your Payment Method Is Incomplete', action: action_btn },
  { emailTitle: 'Complete Your Fit Box Shipping Address', action: action_btn },
  { emailTitle: 'Your Support Drape Fit Profile Is Incomplete', action: action_btn },
  { emailTitle: 'Your Support Payment Method Is Incomplete', action: action_btn },
  { emailTitle: 'Your Support Address Is Incomplete', action: action_btn },
  { emailTitle: 'Subscriptions payment failed', action: action_btn },
  { emailTitle: 'Your Support subscription Payment Method Is Incomplete', action: action_btn },
  { emailTitle: 'GIFTCARD EMAIL SUPPORT', action: action_btn },
  { emailTitle: 'Your Kid Drape Fit Profile Is Incomplete', action: action_btn },
  { emailTitle: 'Your Support Drape Fit Kid Profile Is Incomplete', action: action_btn },
  { emailTitle: 'Kids subscription payment failed', action: action_btn },
  { emailTitle: 'support kids subscription payment failed', action: action_btn },
  { emailTitle: 'Some Problem to your Drape Fit Kid Payment', action: action_btn },
  { emailTitle: 'Auto checkout Order Review Kids', action: action_btn },
  { emailTitle: 'Checkout your box', action: action_btn },
  { emailTitle: 'Checkout your kids box', action: action_btn },
  { emailTitle: 'Thank you Investors for Connecting with us - Drape Fit', action: action_btn },
  { emailTitle: 'Welcome to Drape Fit Inventory', action: action_btn },
  { emailTitle: 'Drape Fit Stylist has sent you a message', action: action_btn },
  { emailTitle: 'Birthday mail', action: action_btn },
  { emailTitle: 'Replacement Box Charge', action: action_btn },
  { emailTitle: 'Authenticate your payment', action: action_btn },
  { emailTitle: 'Authenticate your kid payment', action: action_btn },
  { emailTitle: 'Drape Fit Employee Assigned Qa', action: action_btn },
  { emailTitle: 'Drape Fit - Kid Profile Assigned Qa', action: action_btn },
  { emailTitle: 'Drape Fit Employee Assigned Inventory', action: action_btn },
  { emailTitle: 'Drape Fit Employee Assigned Support', action: action_btn },
  { emailTitle: 'Drape Fit - Kid Profile Assigned Inventory', action: action_btn },
  { emailTitle: 'Drape Fit - Kid Profile Assigned Support', action: action_btn }
];

const EmailTemplate = () => {
  return <Table data={tableData} columns={columns} />;
};

export default EmailTemplate;
