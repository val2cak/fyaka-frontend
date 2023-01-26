const TitleBar = (props: { title: string }) => {
  return (
    <h1 className='font-ubuntu text-xl text-lightColor font-bold bg-primaryColor w-full pl-28 pb-8'>
      {props.title}
    </h1>
  );
};

export default TitleBar;
