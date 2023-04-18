import * as React from 'react';
import { init, Client, PickerOptions } from 'filestack-js';

interface Props {
  onSave: (filename: string) => void;
}

const apiKey = process.env.REACT_APP_FILESTACK_API_KEY;

const UploadImage: React.FC<Props> = ({ onSave }) => {
  const client = React.useMemo(() => {
    return init(apiKey) as Client;
  }, []);

  React.useEffect(() => {
    client.on('uploadStart', (res) => {
      console.log('Upload started:', res);
    });

    client.on('uploadDone', (res) => {
      console.log('Upload done:', res);
      const filename = res.filesUploaded[0].filename;
      onSave(filename);
    });
  }, [client, onSave]);

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
        const filename = res.filesUploaded[0].filename;
        console.log(filename);
        onSave(filename);
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
