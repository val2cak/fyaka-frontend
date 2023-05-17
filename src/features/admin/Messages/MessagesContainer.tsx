import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TitleBar from '../../../components/TitleBar/TitleBar';

import ConversationsComponent from './ConversationsComponent';
import MessagesComponent from './MessagesComponent';

const MessagesContainer = () => {
  const location = useLocation();

  const locationRecipientId = location?.state?.recipientId;

  const [recipientId, setRecipientId] = useState<number>(locationRecipientId);

  return (
    <main className='bg-secondaryColor'>
      <TitleBar title={'poruke'} />

      <div className='flex flex-row lg:px-32 px-40 py-10 w-full gap-4 h-[620px] 2xl:h-[920px]'>
        <div className='w-1/3'>
          <ConversationsComponent
            recipientId={recipientId}
            setRecipientId={setRecipientId}
          />
        </div>
        <div className='w-2/3'>
          <MessagesComponent recipientId={recipientId} />
        </div>
      </div>
    </main>
  );
};

export default MessagesContainer;
