import { ToastContentInterface } from '../../types/typeDefinitions';

const ToastContent = (
  toastBody: ToastContentInterface['toastBody']
): JSX.Element => {
  return (
    <div>
      <p>{toastBody}</p>
    </div>
  );
};

export default ToastContent;
