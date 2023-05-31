import { useCallback } from 'react';
import { toast, ToastOptions } from 'react-toastify';

import CloseButton from '../components/Toasts/CloseButton';
import CustomIcon from '../components/Toasts/CustomIcon';
import ToastContent from '../components/Toasts/ToastContent';

export interface NotificationConfig {
  content: any;
  type: ToastOptions['type'];
  autoClose: ToastOptions['autoClose'];
  notificationId?: string;
  closeButton?: any;
  icon?: any;
}

export interface UserActionNotificationConfig {
  message: string;
  type: ToastOptions['type'];
  autoClose: ToastOptions['autoClose'];
  icon?: any;
  closeButton?: any;
}

export interface PromiseNotificationConfig {
  message: string;
  type: ToastOptions['type'];
  autoClose?: ToastOptions['autoClose'];
  icon?: any;
  closeButton?: any;
}

const useNotifications = () => {
  const displayNotification = (config: NotificationConfig): void => {
    toast(ToastContent(config.content as string), {
      type: config.type,
      autoClose: config.autoClose,
      toastId: config.notificationId,
      hideProgressBar: true,
      closeButton: config.closeButton ? config.closeButton : CloseButton,
      icon: config && config.icon ? config.icon : CustomIcon(config.type),
    });
  };

  const handleUserActionNotification = useCallback(
    (config: UserActionNotificationConfig): void => {
      displayNotification({
        content: config && config.message,
        type: config ? config.type : 'default',
        autoClose: config && config.autoClose,
        closeButton: config.closeButton ? config.closeButton : CloseButton,
        icon: config && config.icon ? config.icon : CustomIcon(config.type),
      });
    },
    []
  );

  const displayPromise = async (
    promise: Promise<any>,
    config: {
      pending: {
        message: string;
        type: ToastOptions['type'];
      };
      success: {
        message: string;
        type: ToastOptions['type'];
      };
      error: { message: string; type: ToastOptions['type'] };
    }
  ): Promise<void> => {
    await toast.promise(promise, {
      pending: {
        render: ToastContent(config.pending.message),

        autoClose: 2500,
        type: config.pending.type,
        closeButton: CloseButton,
        icon: CustomIcon(config.pending.type),
      },
      success: {
        render: ToastContent(config.success.message),
        autoClose: 2500,
        type: config.success.type,
        closeButton: CloseButton,
        icon: CustomIcon(config.success.type),
        hideProgressBar: true,
      },
      error: {
        render: ToastContent(config.error.message),
        autoClose: 2500,
        type: config.error.type,
        closeButton: CloseButton,
        icon: CustomIcon(config.error.type),
        hideProgressBar: true,
      },
    });
  };

  const handlePromiseNotification = useCallback(
    (
      promise: Promise<any>,
      config: {
        pending: PromiseNotificationConfig;
        success: PromiseNotificationConfig;
        error: PromiseNotificationConfig;
      }
    ) => {
      displayPromise(promise, {
        pending: {
          message: config.pending.message,
          type: config.pending.type,
        },
        success: {
          message: config.success.message,
          type: config.success.type,
        },
        error: {
          message: config.error.message,
          type: config.error.type,
        },
      });
    },
    []
  );

  return {
    handleUserActionNotification,
    handlePromiseNotification,
  };
};

export default useNotifications;
