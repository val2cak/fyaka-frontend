import { init, Client, PickerOptions } from 'filestack-js';
import { FC, useMemo } from 'react';

interface Props {
  onSave: (fileUrl: string) => void;
}

const apiKey = process.env.REACT_APP_FILESTACK_API_KEY;

const UploadImage: FC<Props> = ({ onSave }) => {
  const client = useMemo(() => {
    return init(apiKey) as Client;
  }, []);

  const handleFileUpload = () => {
    const pickerOptions: PickerOptions = {
      accept: ['image/*'],
      fromSources: ['local_file_system', 'url'],
      transformations: {
        crop: {
          aspectRatio: 1,
          force: true,
        },
      },
      onUploadDone: (res) => {
        onSave(res.filesUploaded[0]?.url);
      },
    };

    const pickerInstance = client.picker(pickerOptions);
    pickerInstance.open();
  };

  return (
    <button
      className='button bg-lightColor text-primaryColor !w-auto !text-base'
      onClick={handleFileUpload}
    >
      uredi sliku
    </button>
  );
};

export default UploadImage;
