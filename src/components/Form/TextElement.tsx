const TextElement = (props: {
  label: string;
  placeholder: string;
  value?: string | number;
  labelClasses?: string;
  textClasses?: string;
}) => {
  return (
    <div className='flex flex-col'>
      <label
        className={`font-ubuntu text-base font-bold ${props.labelClasses}`}
      >
        {props.label}
      </label>
      <textarea
        placeholder={props.placeholder}
        value={props.value}
        className={`p-5 rounded-lg font-raleway ${props.textClasses}`}
      />
      <text />
    </div>
  );
};

export default TextElement;
