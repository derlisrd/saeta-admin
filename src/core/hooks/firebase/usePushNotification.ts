// hooks/useNotification.ts
import { useState, useEffect } from 'react';
import { getMessagingToken, onMessageListener } from '@/constants/firebase.config'

interface NotificationPayload {
  notification?: {
    title?: string;
    body?: string;
    image?: string;
  };
  data?: { [key: string]: string };
}

export const usePushNotification = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Solicitar permiso y obtener token
    const requestPermission = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Verificar soporte del navegador
        if (!('serviceWorker' in navigator)) {
          throw new Error('Service Workers no soportados en este navegador');
        }

        if (!('PushManager' in window)) {
          throw new Error('Push Messaging no soportado en este navegador');
        }

        if (!('Notification' in window)) {
          throw new Error('Notificaciones no soportadas en este navegador');
        }

        // Solicitar permisos
        const permission = await Notification.requestPermission();
        console.log('Permiso de notificaciones:', permission);
        
        if (permission === 'granted') {
          const fcmToken = await getMessagingToken();
          
          if (fcmToken) {
            setToken(fcmToken);
            await sendTokenToServer(fcmToken);
          } else {
            setError('No se pudo obtener el token FCM');
          }
        } else {
          setError('Permisos de notificación denegados');
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error en useNotification:', errorMessage);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    requestPermission();

    // Escuchar mensajes en primer plano
    onMessageListener()
      .then((payload: any) => {
        setNotification(payload);
        
        // Mostrar notificación del navegador si la app está en primer plano
        if (payload.notification) {
          showBrowserNotification(
            payload.notification.title || 'Nueva notificación',
            payload.notification.body || '',
            payload.notification.image
          );
        }
      })
      .catch((error) => console.error('Error al escuchar mensajes:', error));
  }, []);

  const sendTokenToServer = async (token: string) => {
    try {
      // Envía el token a tu backend para almacenarlo
      await fetch('/api/save-fcm-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
    } catch (error) {
      console.error('Error al enviar token al servidor:', error);
    }
  };

  const showBrowserNotification = (title: string, body: string, icon?: string) => {
    console.log('=== DEBUG NOTIFICACIÓN ===');
    console.log('Notification in window:', 'Notification' in window);
    console.log('Permission:', Notification.permission);
    console.log('Title:', title);
    console.log('Body:', body);
    
    if (!('Notification' in window)) {
      console.error('❌ Notificaciones no soportadas');
      alert('Tu navegador no soporta notificaciones');
      return;
    }
    
    if (Notification.permission === 'denied') {
      console.error('❌ Permisos denegados');
      alert('Permisos de notificación denegados. Ve a configuración del navegador para habilitarlos.');
      return;
    }
    
    if (Notification.permission === 'default') {
      console.warn('⚠️ Permisos no solicitados');
      Notification.requestPermission().then(permission => {
        console.log('Nuevo permiso:', permission);
        if (permission === 'granted') {
          showBrowserNotification(title, body, icon);
        }
      });
      return;
    }
    
    if (Notification.permission === 'granted') {
      console.log('✅ Creando notificación...');
      
      try {
        const notification = new Notification(title, {
          body,
          icon: icon || '/admin/favicon.svg',
          badge: '/admin/favicon.svg',
          tag: 'test-notification', // Evita duplicados
          requireInteraction: false,
          silent: false,
          data: {
            url: window.location.href
          }
        });
        
        console.log('✅ Notificación creada:', notification);
        
        notification.onclick = (event) => {
          console.log('Click en notificación:', event);
          window.focus();
          notification.close();
        };
        
        notification.onshow = () => {
          console.log('✅ Notificación mostrada');
        };
        
        notification.onerror = (error) => {
          console.error('❌ Error en notificación:', error);
        };
        
        notification.onclose = () => {
          console.log('Notificación cerrada');
        };
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
          notification.close();
        }, 5000);
        
      } catch (error) {
        console.error('❌ Error creando notificación:', error);
        alert(`Error creando notificación: ${error}`);
      }
    }
  };

  // Función para enviar notificación local (solo en el navegador)
  const sendLocalNotification = (title: string, body: string, icon?: string) => {
    showBrowserNotification(title, body, icon);
  };

  return {
    token,
    notification,
    error,
    isLoading,
    sendLocalNotification,
    hasPermission: Notification.permission === 'granted'
  };
};