import 'react-toastify/dist/ReactToastify.css';
import './styles/globals.css';

import { Routes } from './routes/Routes';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const prepareRoutes = useRoutes(Routes);
  return (
    <div className='h-screen'>
      <ToastContainer />
      {prepareRoutes}
    </div>
  );
};

export default App;
