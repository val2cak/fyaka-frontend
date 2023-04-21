import Ably from 'ably';
import { FC, useEffect, useState } from 'react';
import { RiSendPlaneFill as SendIcon } from 'react-icons/ri';
import { getUserFromStorage } from '../../../services/storage';
import { User } from '../../../types/typeDefinitions';
import { useGetSingleUserQuery } from '../../auth/authApiSlice';
import placeholder from '../../../assets/vectors/profile-placeholder.png';

const ably = new Ably.Realtime(process.env.REACT_APP_ABLY_API_KEY);

interface Message {
  text: string;
  senderId: number;
  recipientId: number;
}

interface Props {
  recipientId: number;
}

const MessagesComponent: FC<Props> = ({ recipientId }) => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const { data: userData, isFetching: isUserDataLoading } =
    useGetSingleUserQuery(user?.id);

  const { data: recipientData, isFetching: isRecipientDataLoading } =
    useGetSingleUserQuery(recipientId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const channelName = `chat-${user?.id}-${recipientId}`;

  const channel = ably.channels.get(channelName);

  useEffect(() => {
    const userJson: string | null = getUserFromStorage();
    const user: User | null = userJson ? JSON.parse(userJson).user : null;

    const channelName = `chat-${user?.id}-${recipientId}`;
    const channel = ably.channels.get(channelName, {
      params: { history: '100' },
    });

    const recipientChannelName = `chat-${recipientId}-${user?.id}`;
    const recipientChannel = ably.channels.get(recipientChannelName, {
      params: { history: '100' },
    });

    // Subscribe to the channel to receive messages from yourself
    channel.subscribe('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    });

    // Subscribe to the channel to receive messages from your recipient
    recipientChannel.subscribe('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    });

    // Subscribe to the channel to receive typing events
    channel.subscribe('typing', () => {
      setIsTyping(true);
    });

    // Retrieve the history of messages for the channel
    channel.history((err, resultPage) => {
      if (err) {
        console.error(err);
        return;
      }

      // Add the retrieved messages to the state
      const messages = resultPage.items
        .reverse()
        .map((message) => message.data)
        .filter((item) => item.hasOwnProperty('text'));
      setMessages(messages);
    });

    // Unsubscribe from the channel when the component unmounts
    return () => {
      channel.unsubscribe();
      recipientChannel.unsubscribe();
    };
  }, [user?.id, recipientId]);

  function handleSendMessage(event) {
    event.preventDefault();
    if (messageInput !== '') {
      const message: Message = {
        text: messageInput,
        senderId: user?.id,
        recipientId: recipientId,
      };
      // Publish a message to the channel
      channel.publish('message', message);

      // Save the message to Ably history
      channel.history((err, history) => {
        if (err) {
          console.error('Error saving message to Ably history', err);
          return;
        }

        const lastMessage = history.items[history.items.length - 1];
        channel.publish('chat-history', lastMessage);
      });

      setMessageInput('');
    }
  }

  function handleInputChange(event) {
    setMessageInput(event.target.value);
  }

  function handleTyping(event) {
    if (event.target.value !== '') {
      // Publish a typing event to the channel
      channel.publish('typing', null);
    }
  }

  return (
    <div className='bg-lightColor h-full rounded-lg p-6 flex flex-col gap-4 relative'>
      {!isRecipientDataLoading && (
        <div className='flex items-center gap-2'>
          <div className='w-[60px] h-[60px]'>
            <img
              src={recipientData?.imageUrl ?? placeholder}
              onError={(event: any) => {
                event.target.src = placeholder;
              }}
              alt='profile'
            />
          </div>
          <h3 className='font-ubuntu text-md font-medium'>
            {recipientData?.username}
          </h3>
        </div>
      )}

      {!isUserDataLoading && !isRecipientDataLoading && (
        <ul className='flex flex-col gap-5 overflow-y-auto mb-20 items-end pr-2'>
          {messages?.map((message, index) => (
            <div
              className={`flex gap-4 w-full justify-end ${
                message?.senderId === user?.id ? '' : 'flex-row-reverse'
              }`}
              key={index}
            >
              <li
                className={`rounded-lg h-12 px-5 py-4 text-sm flex items-center w-fit ${
                  message?.senderId === user?.id
                    ? 'bg-grayColor text-lightColor'
                    : 'bg-primaryColor text-lightColor'
                }`}
              >
                {message?.text}
              </li>
              <div className='w-[50px] h-[50px]'>
                <img
                  src={
                    message?.senderId !== user?.id
                      ? recipientData?.imageUrl !== null &&
                        recipientData?.imageUrl
                        ? recipientData?.imageUrl
                        : placeholder
                      : userData?.imageUrl !== null && userData?.imageUrl
                      ? userData?.imageUrl
                      : placeholder
                  }
                  onError={(event: any) => {
                    event.target.src = placeholder;
                  }}
                  alt='profile'
                />
              </div>
            </div>
          ))}
        </ul>
      )}

      <div className='flex flex-col absolute bottom-4 w-full'>
        {isTyping && <p>Tipka...</p>}

        <div className='flex flex-row mr-12 bg-lightGrayColor text-darkColor h-16 rounded-lg justify-between items-center relative'>
          <input
            placeholder='napiši poruku...'
            className='bg-transparent font-raleway w-full h-full p-5 pr-16 text-base rounded-lg placeholder-darkColor text-darkColor'
            onChange={handleInputChange}
            value={messageInput}
            onKeyDown={(event) =>
              event.key === 'Enter' ? handleSendMessage(event) : ''
            }
          />
          <button
            onClick={handleSendMessage}
            className='absolute text-lg right-5'
          >
            <SendIcon className='text-primaryColor' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagesComponent;
