import { FC } from 'react';

interface Props {
  title: string;
}

const TitleBar: FC<Props> = ({ title }) => {
  return (
    <h1 className='font-ubuntu sm:text-lg text-xl text-lightColor font-medium bg-primaryColor w-full sm:pl-4 pl-28 sm:pb-4 pb-8'>
      {title}
    </h1>
  );
};

export default TitleBar;
