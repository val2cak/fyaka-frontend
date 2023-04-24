import { FC, useEffect, useState } from 'react';
import Ably from 'ably';
import { VscAdd as AddIcon } from 'react-icons/vsc';
import { useGetUsersQuery } from '../../auth/authApiSlice';
import { getUserFromStorage } from '../../../services/storage';
import { User } from '../../../types/typeDefinitions';
import placeholder from '../../../assets/vectors/placeholder-transparent.png';
import UsersAutocomplete from '../Reviews/UsersAutocomplete';

interface Props {
  recipientId: number;
  setRecipientId: (item: number) => void;
}

const ably = new Ably.Realtime(process.env.REACT_APP_ABLY_API_KEY);

const ConversationsComponent: FC<Props> = ({ recipientId, setRecipientId }) => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const [conversations, setConversations] = useState<User[]>([]);
  const [addNew, setAddNew] = useState(false);

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
          channel?.setOptions({ params: { history: '100' } });

          if (channel) {
            channel.history((err, resultPage) => {
              if (err) {
                console.error(err);
                return;
              }

              if (resultPage.items && resultPage.items.length !== 0) {
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
          channel1?.setOptions({ params: { history: '100' } });

          if (channel1) {
            channel1.history((err, resultPage) => {
              if (err) {
                console.error(err);
                return;
              }

              if (resultPage.items && resultPage.items.length !== 0) {
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
  }, [isUsersDataLoading, usersData, user, recipientId, conversations]);

  const handleAddNew = (value: User) => {
    setRecipientId(value?.id);
    setAddNew(false);
    if (!conversations.find((item) => item.id === value?.id)) {
      setConversations((prevConversations) => [...prevConversations, value]);
    }
  };

  return (
    <div className='bg-lightColor h-full rounded-lg p-6 flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h3 className='font-ubuntu text-lg font-medium'>razgovori</h3>
        <button
          onClick={() => setAddNew(true)}
          className='rounded-lg border border-primaryColor p-1'
        >
          <AddIcon className='text-sm text-primaryColor' />
        </button>
      </div>

      {addNew && <UsersAutocomplete inputProps={{ onChange: handleAddNew }} />}

      <div className='flex flex-col gap-3 overflow-y-auto'>
        {conversations?.length ? (
          conversations?.map((item, index) => (
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
                  className='w-[50px] h-[50px] rounded-full'
                />
              </div>

              <h3 className='font-ubuntu text-base font-medium'>
                {item?.username}
              </h3>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default ConversationsComponent;
