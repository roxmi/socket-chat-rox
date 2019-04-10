var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('nombre') || !searchParams.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesario');
}

var usuario = {
    nombre: searchParams.get('nombre'),
    sala: searchParams.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) {
        renderizarUsuarios(resp);
        //console.log('Usarios conectados', resp)
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

// // Escuchar información
// socket.emit('crearMensaje', {nombre:'Rosa',mensaje:'Hola mundo'}, function(mensaje) {

//     console.log('Servidor:', mensaje);

// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    renderizarMensajes(mensaje, false);
    scrollBottom();
    //console.log('Servidor:', mensaje);
});

// Escuchar cambios de usuarios
//cuando un usaurio entra o sale del chat
socket.on('listaPersonas', function(personas) {
    renderizarUsuarios(personas);
    console.log('Servidor:', personas);

});

//Mensaje privado


socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado: ', mensaje);
});