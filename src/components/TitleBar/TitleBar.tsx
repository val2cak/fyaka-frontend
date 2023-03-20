import { FC } from 'react';

interface Props {
  title: string;
}

const TitleBar: FC<Props> = ({ title }) => {
  return (
    <h1 className='font-ubuntu text-xl text-lightColor font-medium bg-primaryColor w-full pl-28 pb-8'>
      {title}
    </h1>
  );
};

export default TitleBar;
