import SearchBar from '../../../components/SearchBar/SearchBar';

const HomeCover = () => {
  return (
    <main className='ellipse'>
      <div className='bg-homeCover bg-contain bg-no-repeat w-full h-full flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-full h-[400px] p-5 bg-grayColor/50'>
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
        </div>
      </div>
    </main>
  );
};

export default HomeCover;
