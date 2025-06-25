// components/NotificationManager.tsx
import { usePushNotification } from '@/core/hooks/firebase/usePushNotification';
import React, { useEffect } from 'react';


interface Props {
    children: React.ReactNode;
}

export const NotificationManager: React.FC<Props> = ({ children }) => {
    const { notification, sendLocalNotification, hasPermission } = usePushNotification();

    useEffect(() => {
        if (notification) {
            console.log('Nueva notificación recibida:', notification);

            // Aquí puedes manejar la notificación como prefieras
            // Por ejemplo, mostrar un toast, actualizar el estado global, etc.
        }
    }, [notification]);

    const testNotification = () => {
        sendLocalNotification(
            'Notificación de prueba',
            'Esta es una notificación local de prueba'
        );
    };

    return (
        <div>
            {!hasPermission && (
                <div style={{
                    padding: '10px',
                    backgroundColor: '#fff3cd',
                    border: '1px solid #ffeaa7',
                    borderRadius: '4px',
                    margin: '10px'
                }}>
                    <p>Para recibir notificaciones, por favor permite los permisos cuando se soliciten.</p>
                </div>
            )}

            <button
                onClick={testNotification}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    margin: '10px'
                }}
            >
                Enviar notificación de prueba
            </button>

            {children}
        </div>
    );
};