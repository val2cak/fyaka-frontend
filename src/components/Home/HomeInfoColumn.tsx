import { IconType } from 'react-icons';

const HomeInfoColumn = (props: {
  icon: IconType;
  heading: string;
  text: string;
}) => {
  return (
    <div className='flex flex-col py-10 px-12 items-center justify-center text-center w-1/3'>
      <props.icon className='text-secondaryColor text-2xl' />
      <h3 className='font-ubuntu text-secondaryColor text-md font-medium'>
        {props.heading}
      </h3>
      <p className='text-md font-raleway font-medium leading-5'>{props.text}</p>
    </div>
  );
};

export default HomeInfoColumn;
