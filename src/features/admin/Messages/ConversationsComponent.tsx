import { VscAdd as AddIcon } from 'react-icons/vsc';

const ConversationsComponent = () => {
  return (
    <div className='bg-lightColor h-full rounded-lg p-6 flex flex-col gap-8'>
      <div className='flex justify-between items-center'>
        <h3 className='font-ubuntu text-lg font-medium'>razgovori</h3>
        <button className='rounded-lg border border-primaryColor p-1'>
          <AddIcon className='text-sm text-primaryColor' />
        </button>
      </div>

      <div>search</div>

      <div>conversations</div>
    </div>
  );
};

export default ConversationsComponent;
