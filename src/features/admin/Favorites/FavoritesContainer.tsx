import ServiceCard from '../../../components/Card/ServiceCard';
import SearchBar from '../../../components/SearchBar/SearchBar';
import TitleBar from '../../../components/TitleBar/TitleBar';
import arrow from '../../../assets/shapes/arrow-right-dark.png';

const FavoritesContainer = () => {
  const Cards = [
    {
      author: 'marko5ovic',
      title: 'Prošetat pasa',
      date: '31.04.2022. 18:00 h',
      price: '20 €',
      location: 'Pujanke, Split',
    },
    {
      author: 'ivanaa',
      title: 'Krečenje soba',
      date: '19.04.2022. 09:00 h',
      price: '50 €',
      location: 'Japirko, Solin',
    },
    {
      author: 'tosamjaante',
      title: 'Odvoz šuta',
      date: '11.05.2022. 13:00 h',
      price: '100 €',
      location: 'Kman, Split',
    },
    {
      author: 'marinamatic21',
      title: 'Sastavit namještaj',
      date: '22.04.2022. 12:00 h',
      price: '30 €',
      location: 'Brda, Split',
    },
    {
      author: 'marko5ovic',
      title: 'Prošetat pasa',
      date: '31.04.2022. 18:00 h',
      price: '20 €',
      location: 'Pujanke, Split',
    },
    {
      author: 'ivanaa',
      title: 'Krečenje soba',
      date: '19.04.2022. 09:00 h',
      price: '50 €',
      location: 'Japirko, Solin',
    },
    {
      author: 'marko5ovic',
      title: 'Prošetat pasa',
      date: '31.04.2022. 18:00 h',
      price: '20 €',
      location: 'Pujanke, Split',
    },
    {
      author: 'ivanaa',
      title: 'Krečenje soba',
      date: '19.04.2022. 09:00 h',
      price: '50 €',
      location: 'Japirko, Solin',
    },
  ];
  return (
    <main className='bg-lightColor h-full w-full flex flex-col'>
      <div className='bg-primaryColor w-full relative mb-16'>
        <div className='pb-5'>
          <TitleBar title={'favoriti'} />
        </div>

        <div className='w-full pl-56 absolute -bottom-8'>
          <SearchBar />
        </div>
      </div>

      {/* <div className='flex flex-wrap justify-between items-center flex-row px-56 gap-4 w-full'>
        {Cards.map((item, index) => (
          <ServiceCard
            key={index}
            author={item.author}
            title={item.title}
            date={item.date}
            price={item.price}
            location={item.location}
          />
        ))}
      </div> */}

      <div className='w-full flex justify-center gap-16 py-8'>
        <button className='transition ease-in-out delay-150 hover:-translate-x-4 duration-300'>
          <img
            src={arrow}
            alt='arrow left'
            className='-rotate-180 object-fill h-18 w-36'
          />
        </button>
        <button className='transition ease-in-out delay-150 hover:translate-x-4 duration-300'>
          <img
            src={arrow}
            alt='arrow right'
            className='object-fill h-18 w-36'
          />
        </button>
      </div>
    </main>
  );
};

export default FavoritesContainer;
