import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';


// Most used notification props

type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'; // Example positions

type InfoNotification = {
    position?: NotificationPosition
    title?: string
    message?: string
}

type AppNotificationType = {
    position?: NotificationPosition
    title?: string
    message?: string,
    type?: "error" | "success",
}

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
    notifications.show({
        withCloseButton: true,
        title: title || '',
        message: message || '',
        position: position || 'top-right',
        color: type == 'error' ? 'red' : 'green',
    })
}

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