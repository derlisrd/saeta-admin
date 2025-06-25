// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyATCoPklXiPG92kV_FM4m-o1FHhbbfhDZk",
    authDomain: "saeta-app.firebaseapp.com",
    projectId: "saeta-app",
    storageBucket: "saeta-app.appspot.com",
    messagingSenderId: "679077405681",
    appId: "1:679077405681:web:f897420d8f1aabcb779a50"
  };

  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();
  
  // Manejar mensajes en segundo plano
  messaging.onBackgroundMessage((payload) => {
    console.log('Mensaje recibido en segundo plano:', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image || '/admin/firebase-logo.png',
      badge: '/admin/firebase-logo.png',
      data: payload.data
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
  
  // Manejar clicks en las notificaciones
  self.addEventListener('notificationclick', (event) => {
    console.log('Click en notificación:', event);
    
    event.notification.close();
    
    // Abrir o enfocar la ventana de la aplicación en la ruta correcta
    event.waitUntil(
      clients.matchAll().then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes('/admin') && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/admin/');
        }
      })
    );
  });