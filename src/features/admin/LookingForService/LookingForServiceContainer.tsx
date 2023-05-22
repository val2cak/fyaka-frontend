import TitleBar from '../../../components/TitleBar/TitleBar';
import LookingForServiceForm from './LookingForServiceForm';

const LookingForServiceContainer = () => {
  return (
    <main>
      <TitleBar title={'trebam uslugu'} />

      <div className='sm:px-4 px-28 2xl:px-56 sm:py-4 py-10 2xl:py-20'>
        <LookingForServiceForm />
      </div>
    </main>
  );
};

export default LookingForServiceContainer;
