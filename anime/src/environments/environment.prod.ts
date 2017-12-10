
//************************************************************************************
// Version de Produccion
//************************************************************************************
let prefijoNombreAplcacion = '3bwave';
export const environment = {
	production: true,
	APP: {
		NOMBRE: '3BWave',
		VERSION: '1711141101',
	},
	AWS: {
		REGION: 'us-west-2',
		COGNITO_USER_POOL_ID: 'us-west-2_NbV6FxTNq',
		COGNITO_APP_CLIENT_ID: '1lkblcvjv7ter87p5aeh3g76j8',
		COGNITO_IDENTITY_POOL_ID: 'us-west-2:2077ec82-2e31-49fe-8277-f73254239531',
		APP_ACCESS_KEY_ID: '', // Solo necesaria cuando habra acceso publico a la aplicacion
		APP_SECRET_ACCESS_KEY: '' // Solo necesaria cuando habra acceso publico a la aplicacion
	},
	TABLAS: {
		ARTICULO: prefijoNombreAplcacion + '_articulo',
		CLIENTE: prefijoNombreAplcacion + '_cliente',
		CONFIGURACION: prefijoNombreAplcacion + '_configuracion',
		COTIZACION: prefijoNombreAplcacion + '_cotizacion',
		PLAN: prefijoNombreAplcacion + '_plan',
		SIM: prefijoNombreAplcacion + '_sim',
		TELEFONO: prefijoNombreAplcacion + '_telefono',
		VENTA: prefijoNombreAplcacion + '_venta'
	},
	LAMBDA: {
		ENVIAR_CORREO: '3bwave-Correo_Enviar'
	},
	CONSTANTES: {
		RFC_PUBLICO_GENERAL: 'XAXX010101000',
		RFC_EXTRANJERO: 'XEXX010101000'
	},
	PATRONES: {
		CORREO: '[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})',
		RFC: '[A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]',
		CURP: '[A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[MH]([ABCMTZ]S|[BCJMOT]C|[CNPST]L|[GNQ]T|[GQS]R|C[MH]|[MY]N|[DH]G|NE|VZ|DF|SP)[BCDFGHJ-NP-TV-Z]{3}[0-9A-Z][0-9]'
	}
};