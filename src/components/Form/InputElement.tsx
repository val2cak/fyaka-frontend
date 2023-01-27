const InputElement = (props: {
  label: string;
  placeholder: string;
  labelClasses?: string;
  inputClasses?: string;
}) => {
  return (
    <div className='flex flex-col'>
      <label
        className={`font-ubuntu text-base font-bold ${props.labelClasses}`}
      >
        {props.label}
      </label>
      <input
        placeholder={props.placeholder}
        className={`p-3 rounded-lg font-raleway ${props.inputClasses}`}
      />
    </div>
  );
};

export default InputElement;
