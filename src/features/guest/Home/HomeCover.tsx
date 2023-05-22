import SearchBar from '../../../components/SearchBar/SearchBar';
import arrow from '../../../assets/shapes/arrow-down.png';

const HomeCover = () => {
  const handleClick = () => {
    const element = document.getElementById('info-section');
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className='ellipse sm:h-[55vh] lg:h-[70vh]'>
      <div className='bg-homeCover sm:bg-cover bg-contain bg-no-repeat w-full h-full flex justify-center items-center'>
        <div className='flex flex-col justify-center items-center w-full sm:h-[450px] h-[400px] 2xl:h-[500px] p-5 bg-grayColor/50 relative'>
          <div className='flex flex-col items-center gap-3'>
            <div className='text-lightColor sm:text-lg text-3xl 2xl:text-4xl font-ubuntu font-medium pt-2 pb-2 sm:text-center'>
              odmori, zaradi, ponovi
            </div>
            <div className='text-lightColor sm:text-base text-md 2xl:text-lg font-medium font-raleway text-center sm:leading-[1.75rem] leading-5 pb-4 sm:w-[80vw] w-[50vw]'>
              <p>
                bilo da trebaš ili nudiš uslugu, ovdje ćeš pronaći najaktualnije
                jednokratne poslove na jednom mjestu.
              </p>
              <p>iskoristi moć zajednice - radi samo kad ti nije fjaka!</p>
            </div>
            <div>
              <SearchBar />
            </div>
          </div>

          <button
            onClick={handleClick}
            className='flex flex-row-reverse items-center pl-28 absolute -right-16 -rotate-90 uppercase text-lightColor text-base font-ubuntu opacity-70 h-1 sm:hidden'
          >
            <p>saznaj više</p>
            <img src={arrow} alt='arrow' className='rotate-90 text-4xl pt-32' />
          </button>
        </div>
      </div>
    </main>
  );
};

export default HomeCover;
