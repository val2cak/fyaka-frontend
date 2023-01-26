import { IconType } from 'react-icons';

const HomeInfoColumn = (props: {
  icon: IconType;
  heading: string;
  text: string;
}) => {
  return (
    <div className='flex flex-col p-10 items-center justify-center text-center w-1/3'>
      <props.icon className='text-secondaryColor text-2xl' />
      <h3 className='font-ubuntu text-secondaryColor text-md font-bold'>
        {props.heading}
      </h3>
      <p className='text-base font-raleway'>{props.text}</p>
    </div>
  );
};

export default HomeInfoColumn;
