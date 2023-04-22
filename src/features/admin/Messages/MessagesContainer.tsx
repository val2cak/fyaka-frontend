import { useState } from 'react';
import TitleBar from '../../../components/TitleBar/TitleBar';

import ConversationsComponent from './ConversationsComponent';
import MessagesComponent from './MessagesComponent';

const MessagesContainer = () => {
  const [recipientId, setRecipientId] = useState<number>();

  return (
    <main className='bg-secondaryColor'>
      <TitleBar title={'poruke'} />

      <div className='flex flex-row px-40 py-10 w-full gap-4 h-[620px]'>
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
