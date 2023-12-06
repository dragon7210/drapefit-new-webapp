import { Typography } from '@mui/material';
import { notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faTriangleExclamation, faLightbulb, faBell } from '@fortawesome/free-solid-svg-icons';

import DFnewLogger from 'utils/DFnewLogger';

export const setAlert = (msg, type) => {
  try {
    notification.config({
      placement: 'topRight',
      top: 80,
      duration: 5 //-- seconds
    });
    let faIcon = null;
    switch (type) {
      case 'success':
        faIcon = faCircleCheck;
        break;
      case 'error':
        faIcon = faTriangleExclamation;
        break;
      case 'warning':
        faIcon = faLightbulb;
        break;
      default:
        faIcon = faBell;
        break;
    }
    notification[type]({
      message: <Typography className="notification-message">{msg}</Typography>,
      icon: <FontAwesomeIcon icon={faIcon} style={{ color: '#fff', fontSize: '24px', fontWeight: 600 }} />,
      className: `notification-${type}`
    });
  } catch (err) {
    DFnewLogger(err?.message);
  }
};
