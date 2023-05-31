import { FC } from 'react';
import { Lookup } from '../../../types/typeDefinitions';

interface Props {
  options: Lookup[];
  chosenId: number;
  setChosenId: (item: number) => void;
}

const OptionsListComponent: FC<Props> = ({
  options,
  chosenId,
  setChosenId,
}) => {
  return (
    <div className='bg-secondaryColor sm:w-full h-full rounded-lg p-6 flex flex-col gap-3 text-lightColor'>
      {options.map((option, index) => (
        <div
          className={`${
            chosenId === option?.id && 'bg-primaryColor text-lightColor'
          } flex items-center font-ubuntu text-base font-medium gap-4 h-18 rounded-lg p-3 px-5 hover:bg-primaryColor hover:text-lightColor hover:cursor-pointer`}
          key={index}
          onClick={() => setChosenId(option?.id)}
        >
          {option.name}
        </div>
      ))}
    </div>
  );
};

export default OptionsListComponent;
