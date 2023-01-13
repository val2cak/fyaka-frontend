// HOOKS
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import useNotifications from '../hooks/useNotifications';
//

// SERVICES
import { getUserFromStorage } from '../services/storage';
//

const ProtectedRoute = ({ children }: any) => {
  const navigateTo = useNavigate();
  const user = getUserFromStorage();
  // const { handleUserActionNotification } = useNotifications();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && !user) {
      navigateTo('/get-started');
    } else if (!user && location.pathname.length > 1) {
      // handleUserActionNotification({
      //   message: 'You need to be logged in to continue!',
      //   type: 'error',
      //   autoClose: 2500,
      // });
      navigateTo('/get-started');
    } else if (
      user &&
      new Date(JSON.parse(user).tokenExpiry).getTime() < new Date().getTime()
    ) {
      // handleUserActionNotification({
      //   message: 'User session has expired!',
      //   type: 'error',
      //   autoClose: 2500,
      // });
      navigateTo('/get-started');
    } else if (location.pathname === '/') {
      navigateTo('/home');
    }
  }, [user, navigateTo, location]);

  if (user) {
    return children;
  }
};

export default ProtectedRoute;
