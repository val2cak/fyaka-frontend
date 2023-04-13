import { FC, ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
  isOpen: boolean;
}

const Modal: FC<Props> = ({ children, isOpen }) => {
  useEffect(() => {
    if (isOpen) {
      if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <div>
      {/* Backdrop */}
      {isOpen && <div className='fixed inset-0 bg-grayColor opacity-50 z-10' />}

      {/* Modal */}
      <div
        className={`${
          isOpen
            ? 'fixed inset-0 flex justify-center items-center w-full h-full z-20'
            : 'hidden'
        }`}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
