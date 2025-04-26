import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';


// Bare minimum – message is required for all notifications
notifications.show({ message: 'Hello' });

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

export const info_nofication = (position?: NotificationPosition, title: string, message: string) => {
    notifications.show({
        title: title || '',
        message: message || '',
        position: position || 'top-right',
    })
}
export function error_notification(title: string, message: string) { // Add type annotation for the function
    notifications.show({
        position: 'top-right',
        withCloseButton: true,
        title: "You've been compromised",
        message: 'Leave the building immediately',
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