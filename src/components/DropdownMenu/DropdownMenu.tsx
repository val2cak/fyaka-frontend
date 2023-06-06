import { FC, useEffect, useRef, useState } from 'react';
import { HiOutlineChevronDown as DropdownIcon } from 'react-icons/hi';

import { Lookup } from '../../types/typeDefinitions';

interface Props {
  onSelect: (item: Lookup | any) => void;
  items: Lookup[];
  placeholder?: string;
  selectedItem?: Lookup | undefined;
  className?: string;
}

const DropdownMenu: FC<Props> = ({
  items,
  onSelect,
  selectedItem,
  placeholder,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (item: Lookup) => {
    onSelect(item);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className={`w-full p-5 rounded-lg font-raleway placeholder-primaryColor bg-lightColor relative ${className}`}
    >
      <div
        onClick={() => setOpen(!open)}
        className='flex items-center justify-between hover:cursor-pointer'
      >
        <p
          className={`${selectedItem ? 'text-darkColor' : 'text-primaryColor'}`}
        >
          {selectedItem ? selectedItem.name : placeholder}
        </p>

        <DropdownIcon
          className={`${open && 'rotate-180'} text-md text-secondaryColor`}
        />
      </div>

      <div
        className={`${
          open ? 'block' : 'hidden'
        } absolute bg-lightColor z-10 hover:cursor-pointer mt-6 left-0 w-full rounded-lg`}
      >
        {items?.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelect(item)}
            className={`${
              selectedItem === item && 'text-primaryColor bg-lightGrayColor'
            } py-1.5 px-5 hover:text-primaryColor hover:bg-lightGrayColor first:rounded-t-lg last:rounded-b-lg`}
          >
            {item.name}
          </div>
        ))}
      </div>

      <div></div>
    </div>
  );
};

export default DropdownMenu;
