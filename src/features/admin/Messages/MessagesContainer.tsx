import TitleBar from '../../../components/TitleBar/TitleBar';
import { getUserFromStorage } from '../../../services/storage';
import { User } from '../../../types/typeDefinitions';
import ConversationsComponent from './ConversationsComponent';
import MessagesComponent from './MessagesComponent';

const MessagesContainer = () => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  return (
    <main className='bg-secondaryColor'>
      <TitleBar title={'poruke'} />

      <div className='flex flex-row px-40 py-10 w-full gap-4 h-[620px]'>
        <div className='w-1/3'>
          <ConversationsComponent />
        </div>
        <div className='w-2/3'>
          <MessagesComponent recipientId={user?.id === 4 ? 2 : 4} />
        </div>
      </div>
    </main>
  );
};

export default MessagesContainer;
