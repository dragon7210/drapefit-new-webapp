import PropTypes from 'prop-types';

import DFnewLogger from 'utils/DFnewLogger';
import Profile from './Profile';
import Password from './Password';
import ValueSet from './ValueSet';
import EmailTemplate from './EmailTemplate';
import SuperAdminPwd from './SuperAdminPwd';
import PaymentMode from './PaymentMode';

const Total = ({ value }) => {
  let content = null;
  switch (value) {
    case 0:
      content = <Profile />;
      break;
    case 1:
      content = <Password />;
      break;
    case 2:
      content = <ValueSet />;
      break;
    case 3:
      content = <EmailTemplate />;
      break;
    case 4:
      content = <SuperAdminPwd />;
      break;
    case 5:
      content = <PaymentMode />;
      break;
    default:
      content = <Profile />;
      break;
  }
  return <>{content}</>;
};

Total.propTypes = {
  value: PropTypes.number
};

export default Total;
