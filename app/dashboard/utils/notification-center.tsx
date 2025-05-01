import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Most used notification props

type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; // Example positions

type InfoNotification = {
    position?: NotificationPosition
    title?: string
    message?: string
}

type AppNotificationType = {
    message: string;
    title?: string;
    position?: ToastOptions['position'];
    type?: 'success' | 'error'; // only supporting 'success' and 'error' like your original
};


export const info_nofication = (title: string, message: string, position?: NotificationPosition) => {
    notifications.show({
        withBorder: true,
        title: title || '',
        message: message || '',
        position: position || 'top-right',
    })
}
export function error_notification(title: string, message: string) { // Add type annotation for the function
    notifications.show({
        withBorder: true,
        position: 'top-right',
        withCloseButton: true,
        title: title,
        message: message,
        color: 'red',
        icon: <IconX />,
        loading: false,
    });
}

export const app_notification = ({ message, position, title, type = 'error' }: AppNotificationType) => {
    const content = (
        <div>
            {title && <strong>{title}</strong>}
            <div>{message}</div>
        </div>
    );

    const options: ToastOptions = {
        position: position || 'top-right',
        closeButton: true,
    };

    if (type === 'success') {
        toast.success(content, options);
    } else {
        toast.error(content, options); // default to 'error'
    }
};

export function success_notification(title: string, message: string) { // Add type annotation for the function
    notifications.show({
        withBorder: true,
        position: 'top-right',
        withCloseButton: true,
        title: title,
        message: message,
        color: 'teal',
        icon: <IconCheck />,
        loading: false,
    });
}