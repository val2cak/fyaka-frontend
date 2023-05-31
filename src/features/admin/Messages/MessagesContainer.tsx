import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoArrowUndoCircleSharp as ArrowBackIcon } from 'react-icons/io5';

import TitleBar from '../../../components/TitleBar/TitleBar';
import ConversationsComponent from './ConversationsComponent';
import MessagesComponent from './MessagesComponent';

const MessagesContainer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    alert(
      'Ispričavamo se zbog neugodnosti. Funkcija poruka trenutačno ima tehničke poteškoće. Naš tim marljivo radi na rješavanju problema i vraćanju pune funkcionalnosti što je prije moguće.\n\nTijekom ove faze beta testiranja, povremeni problemi i prekidi mogu se javiti. Zahvaljujemo vam na strpljenju i razumijevanju dok nastojimo pružiti poboljšano iskustvo korištenja poruka.\n\nHvala vam na podršci!\n\nFyaka'
    );
  }, []);

  const location = useLocation();

  const locationRecipientId = location?.state?.recipientId;

  const [recipientId, setRecipientId] = useState<number>(locationRecipientId);

  const handleGoBack = () => {
    setRecipientId(undefined);
  };

  return (
    <main className='bg-secondaryColor'>
      <TitleBar title={'poruke'} />

      {isMobile && recipientId && (
        <button
          onClick={handleGoBack}
          className='text-lightColor text-3xl m-3 absolute transition ease-in-out delay-50 hover:scale-110 duration-300'
        >
          <ArrowBackIcon />
        </button>
      )}

      <div
        className={`${
          recipientId && 'sm:pt-[4.25rem]'
        } flex flex-row sm:px-4 lg:px-32 px-40 sm:py-4 py-10 w-full gap-4 sm:h-[80vh] h-[620px] 2xl:h-[920px]`}
      >
        {isMobile ? (
          !recipientId ? (
            <ConversationsComponent
              recipientId={recipientId}
              setRecipientId={setRecipientId}
            />
          ) : (
            <MessagesComponent recipientId={recipientId} />
          )
        ) : (
          <>
            <div className='w-1/3'>
              <ConversationsComponent
                recipientId={recipientId}
                setRecipientId={setRecipientId}
              />
            </div>
            <div className='w-2/3'>
              <MessagesComponent recipientId={recipientId} />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default MessagesContainer;
