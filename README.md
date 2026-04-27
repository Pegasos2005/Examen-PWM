# HACE FALTA PONER EL ENVIROMENT

En la carpeta environments se debe añadir el archivo environments.ts:

Ejemplo:

export const environment = {
    production: false,
    firebaseConfig: {
        projectId: 'XXX',
        appId: 'XXX',
        storageBucket: 'XXXX',
        apiKey: 'XXX',
        authDomain: 'XXXX',
        messagingSenderId: 'XXX',
    }
};

