import HomeCountSection from './HomeCountSection';
import HomeCover from './HomeCover';
import HomeInfoSection from './HomeInfoSection';
import HomeStudentSection from './HomeStudentSection';

const HomeContainer = () => {
  return (
    <main className='bg-secondaryColor h-full w-full flex flex-col'>
      <HomeCover />
      <HomeInfoSection />
      <HomeStudentSection />
      <HomeCountSection />
    </main>
  );
};

export default HomeContainer;
