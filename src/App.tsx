import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

import { Routes } from './routes/Routes';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const prepareRoutes = useRoutes(Routes);
  return (
    <div className='App'>
      <ToastContainer />
      {prepareRoutes}
    </div>
  );
};

export default App;
