import { FC } from 'react';
import { IconType } from 'react-icons';

interface Props {
  heading: string;
  text: string;
  Icon: IconType;
}

const HomeInfoColumn: FC<Props> = ({ heading, text, Icon }) => {
  return (
    <div className='flex flex-col sm:py-4 py-10 sm:px-2 lg:px-4 px-12 items-center justify-center text-center w-1/3 sm:w-full'>
      <Icon className='text-secondaryColor text-2xl' />
      <h3 className='font-ubuntu text-secondaryColor text-md font-medium'>
        {heading}
      </h3>
      <p className='sm:text-base text-md font-raleway font-medium leading-5'>
        {text}
      </p>
    </div>
  );
};

export default HomeInfoColumn;
