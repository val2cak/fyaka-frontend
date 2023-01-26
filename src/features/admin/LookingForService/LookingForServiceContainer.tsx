import TitleBar from '../../../components/TitleBar/TitleBar';
import LookingForServiceForm from './LookingForServiceForm';

const LookingForServiceContainer = () => {
  return (
    <main>
      <TitleBar title={'trebam uslugu'} />

      <div className='px-28 py-10'>
        <LookingForServiceForm />
      </div>
    </main>
  );
};

export default LookingForServiceContainer;
