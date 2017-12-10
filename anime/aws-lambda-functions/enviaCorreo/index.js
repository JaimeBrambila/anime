/**
 * Envia un correo mediante Amazon SES
 * @version 201711141145
 */
const AWS = require('aws-sdk');
const mailcomposer = require('mailcomposer');

exports.handler = function (evento, context, callback) {
    let ses = new AWS.SES();
    console.log('Evento: ', evento);

    const mail = mailcomposer(evento);
    mail.build((err, message) => {
        if (err) {
            console.log('Error al crear el correo RAW: ', err);
            console.log('Mensaje: ', err.message);
            callback(null, {estatus: 'BAD', titulo: 'Error', mensaje: 'Error al enviar el correo.', mensajeError: err.message});
        }
        ses.sendRawEmail({ RawMessage: { Data: message } }).promise().then((response) => {
            console.log('Respuesta: ', response);
            callback(null, {estatus: 'OK', titulo: 'Éxito', mensaje: 'Correo enviado con éxito.'});
        }).catch((err)=>{
            console.log('Error al enviar el correo: ', err);
            console.log('Mensaje: ', err.message);
            callback(null, {estatus: 'BAD', titulo: 'Error', mensaje: 'Error al enviar el correo.', mensajeError: err.message});
        });
    });
}