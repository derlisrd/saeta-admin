// components/NotificationManager.tsx
/* import { usePushNotification } from '@/core/hooks/firebase/usePushNotification';
import React, { useEffect } from 'react'; */


interface Props {
    children: React.ReactNode;
}

export const NotificationManager: React.FC<Props> = ({ children }) => {
    //const { notification } = usePushNotification();

    /* useEffect(() => {
        if (notification) {
            console.log('Nueva notificación recibida:', notification);
        }
    }, [notification]); */

    return (
        <>
            {children}
        </>
    );
};