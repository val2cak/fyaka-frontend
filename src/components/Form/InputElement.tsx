const InputElement = (props: {
  label: string;
  placeholder: string;
  value?: string | number;
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
        value={props.value}
        className={`p-5 rounded-lg font-raleway ${props.inputClasses}`}
      />
      <text />
    </div>
  );
};

export default InputElement;
