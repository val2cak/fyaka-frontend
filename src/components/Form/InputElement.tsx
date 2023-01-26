const InputElement = (props: { label: string; placeholder: string }) => {
  return (
    <div className='flex flex-col'>
      <label className='font-ubuntu text-primaryColor text-base'>
        {props.label}
      </label>
      <input
        placeholder={props.placeholder}
        className='p-3 rounded-lg placeholder-primaryColor font-raleway'
      />
    </div>
  );
};

export default InputElement;
