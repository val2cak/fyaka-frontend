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
      fromSources: ['local_file_system', 'webcam', 'url'],
      transformations: {
        crop: {
          aspectRatio: 1,
          force: true,
        },
        rotate: true,
        circle: true,
      },
      customText: {
        Save: 'Spremi',
        Reset: 'Poništi',
        Crop: 'Izreži',
        Circle: 'Zaokruži',
        Rotate: 'Rotiraj',
        Next: 'Dalje',
        Upload: 'Prijenos',
        'Select Files to Upload': 'Odaberite datoteku za prijenos',
        'or Drag and Drop, Copy and Paste Files':
          'ili povucite i ispustite, kopirajte i zalijepite datoteku',
        'Enter a URL': 'Unesite URL',
        'My Device': 'Moje računalo',
        'Take Photo': 'Snimi fotografiju',
        'Webcam Disabled': 'Kamera onemogućena',
        'Please enable your webcam to take a photo.':
          'Omogućite svoju web kameru za snimanje fotografije.',
      },
      allowManualRetry: true,

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
