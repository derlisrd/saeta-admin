// components/NotificationManager.tsx
import { usePushNotification } from '@/core/hooks/firebase/usePushNotification';
import React, { useEffect } from 'react';


interface Props {
    children: React.ReactNode;
}

export const NotificationManager: React.FC<Props> = ({ children }) => {
    const { notification } = usePushNotification();

    useEffect(() => {
        if (notification) {
            console.log('Nueva notificación recibida:', notification);

            // Aquí puedes manejar la notificación como prefieras
            // Por ejemplo, mostrar un toast, actualizar el estado global, etc.
        }
    }, [notification]);

    return (
        <>
            {children}
        </>
    );
};