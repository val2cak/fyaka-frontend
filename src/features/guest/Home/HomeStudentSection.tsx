import students from '../../../assets/vectors/home1.png';

const HomeStudentSection = () => {
  return (
    <main className='text-lightColor font-raleway font-regular uppercase flex flex-row lg:p-16 p-5'>
      <div className='flex flex-col w-1/3 items-end justify-center gap-20'>
        <p className='-rotate-[25deg] pr-24'>student si?</p>
        <p className='-rotate-[65deg]'>trebaš džeparac?</p>
        <p className='rotate-[25deg] pr-16'>ne želiš se vezati ugovorom?</p>
      </div>

      <div className='flex justify-center items-center flex-col w-1/3'>
        <p className='-rotate-[15deg] pt-5 pr-16'>otkrij u čemu si dobar!</p>
        <img src={students} alt='students' />
      </div>

      <div className='flex flex-col w-1/3 items-start justify-center gap-20'>
        <p className='rotate-[15deg] pl-16'>pronađi nešto za sebe!</p>
        <p className='rotate-[55deg]'>ne ovisi o nikome!</p>
        <p className='-rotate-[25deg] pl-16'>radi koliko želiš i kad želiš!</p>
      </div>
    </main>
  );
};

export default HomeStudentSection;
