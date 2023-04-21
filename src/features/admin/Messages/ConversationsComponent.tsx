import { FC, useEffect, useState } from 'react';
import Ably from 'ably';
import { VscAdd as AddIcon } from 'react-icons/vsc';
import { useGetUsersQuery } from '../../auth/authApiSlice';
import { getUserFromStorage } from '../../../services/storage';
import { User } from '../../../types/typeDefinitions';
import placeholder from '../../../assets/vectors/placeholder-transparent.png';

interface Props {
  recipientId: number;
  setRecipientId: (item: number) => void;
}

const ably = new Ably.Realtime(process.env.REACT_APP_ABLY_API_KEY);

const ConversationsComponent: FC<Props> = ({ recipientId, setRecipientId }) => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const [conversations, setConversations] = useState<User[]>([]);

  const { data: usersData, isFetching: isUsersDataLoading } =
    useGetUsersQuery('');

  useEffect(() => {
    if (!isUsersDataLoading && user) {
      const currentUser = user?.id;
      usersData.forEach((recipient) => {
        const recipientId = recipient.id;
        if (recipientId !== currentUser) {
          const channelName = `chat-${currentUser}-${recipientId}`;
          const channel = ably.channels.get(channelName);
          if (channel) {
            channel.setOptions({ params: { history: '100' } });
            channel.presence.get((err, members) => {
              if (err) {
                console.error(err);
                return;
              }
              if (members && members?.length !== 0) {
                const userData = {
                  username: recipient.username,
                  id: recipient.id,
                  imageUrl: recipient.imageUrl,
                };
                if (!conversations.find((item) => item.id === userData.id)) {
                  setConversations((prevConversations) => [
                    ...prevConversations,
                    userData,
                  ]);
                }
              }
            });
          }

          const channelName1 = `chat-${recipientId}-${currentUser}`;
          const channel1 = ably.channels.get(channelName1);
          if (channel1) {
            channel1.setOptions({ params: { history: '100' } });
            channel1.presence.get((err, members) => {
              if (err) {
                console.error(err);
                return;
              }
              if (members && members?.length !== 0) {
                const userData = {
                  username: recipient.username,
                  id: recipient.id,
                  imageUrl: recipient.imageUrl,
                };
                if (!conversations.find((item) => item.id === userData.id)) {
                  setConversations((prevConversations) => [
                    ...prevConversations,
                    userData,
                  ]);
                }
              }
            });
          }
        }
      });
    }
  }, [isUsersDataLoading, usersData, user?.id, recipientId, conversations]);

  return (
    <div className='bg-lightColor h-full rounded-lg p-6 flex flex-col gap-8'>
      <div className='flex justify-between items-center'>
        <h3 className='font-ubuntu text-lg font-medium'>razgovori</h3>
        <button className='rounded-lg border border-primaryColor p-1'>
          <AddIcon className='text-sm text-primaryColor' />
        </button>
      </div>

      <div>search</div>

      <div>
        {conversations?.map((item, index) => (
          <div
            className={`${
              recipientId === item?.id && 'bg-primaryColor text-lightColor'
            } flex items-center gap-4 h-20 rounded-lg p-3 hover:bg-primaryColor hover:text-lightColor hover:cursor-pointer`}
            key={index}
            onClick={() => setRecipientId(item?.id)}
          >
            <div
              className={`w-[50px] h-[50px] rounded-full hover:bg-lightColor ${
                recipientId === item?.id ? 'bg-lightColor' : 'bg-primaryColor'
              }`}
            >
              <img
                src={item?.imageUrl ?? placeholder}
                onError={(event: any) => {
                  event.target.src = placeholder;
                }}
                alt='profile'
              />
            </div>

            <h3 className='font-ubuntu text-base font-medium'>
              {item?.username}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationsComponent;
