import PropTypes from 'prop-types';

import Overview from './Overview';
import Login from './Login';
import Address from './Address';
import Payment from './Payment';
import FIT from './FIT';
import Credit from './Credit';
import Email from './Email';
import Facebook from './Facebook';
import Contact from './Contact';

const Total = ({ value }) => {
  let content = null;
  switch (value) {
    case 0:
      content = <Overview />;
      break;
    case 1:
      content = <Login />;
      break;
    case 2:
      content = <Address />;
      break;
    case 3:
      content = <Payment />;
      break;
    case 4:
      content = <FIT />;
      break;
    case 5:
      content = <Credit />;
      break;
    case 6:
      content = <Email />;
      break;
    case 7:
      content = <Facebook />;
      break;
    case 8:
      content = <Contact />;
      break;
    default:
      content = <Overview />;
      break;
  }

  return <>{content}</>;
};

Total.propTypes = {
  value: PropTypes.number
};

export default Total;
