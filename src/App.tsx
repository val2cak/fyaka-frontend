import 'react-toastify/dist/ReactToastify.css';
import './styles/globals.css';

import { Routes } from './routes/Routes';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const App = () => {
  const prepareRoutes = useRoutes(Routes);
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className='h-screen'>
        <ToastContainer />
        {prepareRoutes}
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
