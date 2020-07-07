import {notification} from 'antd';


export const openNotification = (message, description) => {
  return notification.info({
    message: message,
    description: description,
  });
};

