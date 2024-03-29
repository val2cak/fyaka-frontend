import Ably from 'ably';
import { FC, useEffect, useRef, useState } from 'react';
import { RiSendPlaneFill as SendIcon } from 'react-icons/ri';
import { getUserFromStorage } from '../../../services/storage';
import { Message, User } from '../../../types/typeDefinitions';
import { useGetSingleUserQuery } from '../../auth/authApiSlice';
import placeholder from '../../../assets/vectors/profile-placeholder.png';
import { format } from 'date-fns';

const ably = new Ably.Realtime(process.env.REACT_APP_ABLY_API_KEY);

interface Props {
  recipientId: number;
}

const MessagesComponent: FC<Props> = ({ recipientId }) => {
  const userJson: string | null = getUserFromStorage();
  const user: User | null = userJson ? JSON.parse(userJson).user : null;

  const inputRef = useRef(null);

  const { data: userData, isFetching: isUserDataLoading } =
    useGetSingleUserQuery(user?.id);

  const { data: recipientData, isFetching: isRecipientDataLoading } =
    useGetSingleUserQuery(recipientId);

  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const channelName = `chat-${user?.id}-${recipientId}`;
  const channel = ably.channels.get(channelName);
  channel?.setOptions({ params: { history: '100' } });

  useEffect(() => {
    setMessages([]);

    const userJson: string | null = getUserFromStorage();
    const user: User | null = userJson ? JSON.parse(userJson).user : null;

    const channelName = `chat-${user?.id}-${recipientId}`;
    const channel = ably.channels.get(channelName);
    channel?.setOptions({ params: { history: '100' } });

    const recipientChannelName = `chat-${recipientId}-${user?.id}`;
    const recipientChannel = ably.channels.get(recipientChannelName);
    recipientChannel?.setOptions({ params: { history: '100' } });

    // Subscribe to the channel to receive messages from yourself
    channel.subscribe('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    });

    // Subscribe to the channel to receive messages from your recipient
    recipientChannel.subscribe('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    });

    // Subscribe to the channel to receive typing events
    recipientChannel.subscribe('typing', () => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 2000); // set isTyping to false after 2 seconds of no typing
    });

    // Retrieve the history of messages for the channel
    channel.history((err, resultPage) => {
      if (err) {
        console.error(err);
        return;
      }

      // Add the retrieved messages to the state
      const messages: Message[] = resultPage.items
        ?.reverse()
        ?.map((message) => message.data)
        ?.filter((item) => item?.hasOwnProperty('text'));
      setMessages((prevMessages) => [...prevMessages, ...messages]);
    });

    recipientChannel.history((err, resultPage) => {
      if (err) {
        console.error(err);
        return;
      }

      // Add the retrieved messages to the state
      const retrievedMessages: Message[] = resultPage.items
        ?.reverse()
        ?.map((message) => message.data)
        ?.filter((item) => item?.hasOwnProperty('text'));
      setMessages((prevMessages) => [...prevMessages, ...retrievedMessages]);
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
        timestamp: new Date(Date.now()),
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
    handleTyping();
  }

  function handleTyping() {
    if (inputRef.current.value !== '') {
      // Publish a typing event to the channel
      channel.publish('typing', null);
    }
  }

  return (
    <div className='bg-lightColor sm:w-full h-full rounded-lg p-6 flex flex-col gap-4 relative'>
      {!isRecipientDataLoading && recipientId && (
        <div className='flex items-center gap-2'>
          <div className='w-[60px] h-[60px] rounded-full'>
            <img
              src={recipientData?.imageUrl ?? placeholder}
              onError={(event: any) => {
                event.target.src = placeholder;
              }}
              alt='profile'
              className='w-[60px] h-[60px] rounded-full'
            />
          </div>
          <h3 className='font-ubuntu text-md font-medium'>
            {recipientData?.username}
          </h3>
          {isTyping && (
            <p className='opacity-30 text-sm font-normal'>tipka...</p>
          )}
        </div>
      )}

      {!isUserDataLoading && !isRecipientDataLoading && (
        <ul className='flex flex-col gap-3 overflow-y-auto mb-20 items-end pr-2'>
          {messages
            ?.sort(
              (a, b) =>
                new Date(a.timestamp).valueOf() -
                new Date(b.timestamp).valueOf()
            )
            ?.map((message, index) => (
              <div className='flex flex-col w-full' key={index}>
                <div
                  className={`flex gap-4 justify-end ${
                    message?.senderId === user?.id ? '' : 'flex-row-reverse'
                  }`}
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
                  <div className='w-[50px] h-[50px] rounded-full'>
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
                      className='w-[50px] h-[50px] rounded-full'
                    />
                  </div>
                </div>

                <p
                  className={`flex justify-end text-sm opacity-30 text-grayColor ${
                    message?.senderId === user?.id ? '' : 'flex-row-reverse'
                  }`}
                >
                  {format(new Date(message?.timestamp), 'dd/MM/yyyy H:mm')}
                </p>
              </div>
            ))}
        </ul>
      )}

      <div className='flex flex-col absolute bottom-4 w-full'>
        <div className='flex flex-row mr-12 bg-lightGrayColor text-darkColor h-16 rounded-lg justify-between items-center relative'>
          <input
            placeholder='napiši poruku...'
            className='bg-transparent font-raleway w-full h-full p-5 pr-16 text-base rounded-lg placeholder-darkColor text-darkColor'
            onChange={handleInputChange}
            value={messageInput}
            ref={inputRef}
            onKeyDown={(event) =>
              event.key === 'Enter' ? handleSendMessage(event) : ''
            }
            disabled={!recipientId ? true : false}
          />
          <button
            onClick={handleSendMessage}
            disabled={!recipientId ? true : false}
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
