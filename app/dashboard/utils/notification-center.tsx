import { notifications } from '@mantine/notifications';
import {IconCheck, IconX} from '@tabler/icons-react';


// Bare minimum – message is required for all notifications
notifications.show({ message: 'Hello' });

// Most used notification props

type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; // Example positions

type InfoNotification = {
    position?: NotificationPosition
    title?: string
    message?: string
}

export const info_nofication = (title: string, message: string, position?: NotificationPosition ) => {
    notifications.show({
        title: title || '',
        message: message || '',
        position: position || 'top-right',
      })
}
export function error_notification( title: string, message: string ) { // Add type annotation for the function
    notifications.show({
        position: 'top-right',
        withCloseButton: true,
        title: title,
        message: message,
        color: 'red',
        icon: <IconX />,
        loading: false,
      });
}

export function success_notification( title: string, message: string ) { // Add type annotation for the function
    notifications.show({
        position: 'top-right',
        withCloseButton: true,
        title: title,
        message: message,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
      });
}