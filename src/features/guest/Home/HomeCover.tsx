import SearchBar from '../../../components/SearchBar/SearchBar';
import arrow from '../../../assets/shapes/arrow-down.png';

const HomeCover = () => {
  return (
    <main className='ellipse'>
      <div className='bg-homeCover bg-contain bg-no-repeat w-full h-full flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-full h-[400px] p-5 bg-grayColor/50 relative'>
          <>
            <div className='text-lightColor text-3xl font-ubuntu font-bold'>
              budi dio zajednice i zaradi novce
            </div>
            <div className='text-lightColor text-base font-bold font-raleway w-[25vw] text-center leading-4 p-2'>
              bilo da trebaš ili nudiš uslugu, ovdje ćeš pronaći najaktualnije
              jednokratne poslove na jednom mjestu
            </div>
            <div>
              <SearchBar />
            </div>
          </>

          <button className='flex flex-row-reverse items-center pl-28 absolute -right-16 -rotate-90 uppercase text-lightColor text-base font-ubuntu opacity-70'>
            <p>saznaj više</p>
            <img src={arrow} alt='arrow' className='rotate-90 text-4xl pt-32' />
          </button>
        </div>
      </div>
    </main>
  );
};

export default HomeCover;
