
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging';

const FB_API_KEY = import.meta.env.VITE_FB_API_KEY;
const FB_AUTH_DOMAIN = import.meta.env.VITE_FB_AUTH_DOMAIN;
const FB_PROJECT_ID = import.meta.env.VITE_FB_PROJECT_ID;
const FB_STORAGE_BUCKET = import.meta.env.VITE_FB_STORAGE_BUCKET;
const FB_MESSAGING_SENDER_ID = import.meta.env.VITE_FB_MESSAGING_SENDER_ID;
const FB_APP_ID = import.meta.env.VITE_FB_APP_ID;

const FB_VAPID_KEY = import.meta.env.VITE_FB_VAPID_KEY;

const firebaseConfig = {
    apiKey: FB_API_KEY,
    authDomain: FB_AUTH_DOMAIN,
    projectId: FB_PROJECT_ID,
    storageBucket: FB_STORAGE_BUCKET ,
    messagingSenderId: FB_MESSAGING_SENDER_ID ,
    appId: FB_APP_ID
  };

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);


// Verificar si Firebase Messaging es compatible
export const checkMessagingSupport = async (): Promise<boolean> => {
  try {
    const supported = await isSupported();
    console.log('Firebase Messaging compatible:', supported);
    return supported;
  } catch (error) {
    console.error('Error verificando compatibilidad:', error);
    return false;
  }
};


// Función mejorada para obtener token con mejor manejo de errores
export const getMessagingToken = async (): Promise<string | null> => {
  try {
    // Verificar compatibilidad primero
    const supported = await checkMessagingSupport();
    if (!supported) {
      throw new Error('Firebase Messaging no es compatible en este navegador');
    }

    // Verificar si estamos en HTTPS o localhost
    const isSecure = window.location.protocol === 'https:' || 
                    window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1';
    
    if (!isSecure) {
      throw new Error('Firebase Messaging requiere HTTPS o localhost');
    }

    // Verificar permisos de notificación
    if (!('Notification' in window)) {
      throw new Error('Este navegador no soporta notificaciones');
    }

    console.log('Estado de permisos actual:', Notification.permission);

    if (Notification.permission === 'denied') {
      throw new Error('Permisos de notificación denegados por el usuario');
    }

    // Solicitar permisos si no están otorgados
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      console.log('Nuevo estado de permisos:', permission);
      
      if (permission !== 'granted') {
        throw new Error('Permisos de notificación no otorgados');
      }
    }

    // Registrar service worker
    const basePath = window.location.pathname.includes('/admin') ? '/admin' : '';
    const swPath = `${basePath}/firebase-messaging-sw.js`;
    
    console.log('Intentando registrar SW en:', swPath);
    
    // Verificar que el service worker existe
    try {
      const swResponse = await fetch(swPath);
      if (!swResponse.ok) {
        throw new Error(`Service worker no encontrado: ${swResponse.status}`);
      }
      console.log('Service worker encontrado');
    } catch (fetchError) {
      console.error('Error al verificar service worker:', fetchError);
      throw new Error(`No se puede acceder al service worker en ${swPath}`);
    }

    const registration = await navigator.serviceWorker.register(swPath, {
      scope: `${basePath}/`
    });

    console.log('Service worker registrado:', registration);

    // Esperar a que esté listo
    await navigator.serviceWorker.ready;
    console.log('Service worker listo');

    // Inicializar messaging después de verificaciones
    const messaging = getMessaging(app);

    // Obtener token
    const token = await getToken(messaging, {
      vapidKey: FB_VAPID_KEY, // IMPORTANTE: Debe ser tu clave VAPID real
      serviceWorkerRegistration: registration
    });
    
    if (token) {
      console.log('Token FCM obtenido exitosamente:', token);
      return token;
    } else {
      throw new Error('No se pudo generar el token FCM');
    }

  } catch (error) {
    console.error('Error detallado al obtener token:', error);
    
    // Diagnóstico adicional
    console.log('Diagnóstico del navegador:');
    console.log('- User Agent:', navigator.userAgent);
    console.log('- Service Worker soportado:', 'serviceWorker' in navigator);
    console.log('- Push Manager soportado:', 'PushManager' in window);
    console.log('- Notificaciones soportadas:', 'Notification' in window);
    console.log('- Protocolo:', window.location.protocol);
    console.log('- Hostname:', window.location.hostname);
    
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    const messaging = getMessaging(app);
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });