import { FC } from 'react';
import { IconType } from 'react-icons';

interface Props {
  heading: string;
  text: string;
  Icon: IconType;
}

const HomeInfoColumn: FC<Props> = ({ heading, text, Icon }) => {
  return (
    <div className='flex flex-col py-10 px-12 items-center justify-center text-center w-1/3'>
      <Icon className='text-secondaryColor text-2xl' />
      <h3 className='font-ubuntu text-secondaryColor text-md font-medium'>
        {heading}
      </h3>
      <p className='text-md font-raleway font-medium leading-5'>{text}</p>
    </div>
  );
};

export default HomeInfoColumn;
