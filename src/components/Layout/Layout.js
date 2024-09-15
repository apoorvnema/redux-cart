import { Fragment } from 'react';
import MainHeader from './MainHeader';
import Notification from '../UI/Notification';
import { useSelector } from 'react-redux';

const Layout = (props) => {
  const notification = useSelector((state) => state.notification)
  return (
    <Fragment>
      {notification.status !== 'idle' ? <Notification {...notification}/> : null}
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
