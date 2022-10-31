const udp = require('dgram');
const fs = require('fs');
const path = require('path');

// Constants that you may change
const port = 12345;
const output_file_name = `output_${new Date().getTime()}.json`;

// Create the writing Stream file:
let stream;

// --------------------creating a udp server --------------------

// creating a udp server
const server = udp.createSocket('udp4');

// emits when any error occurs
server.on('error', function (error) {
    console.log('Error: ' + error);
    server.close();
});

// emits on new datagram msg
server.on('message', function (msg, info) {
    // console.log('Data received from client : ' + msg.toString());
    // console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
    stream.write(msg);
});

//emits when socket is ready and listening for datagram msgs
server.on('listening', function () {
    const address = server.address();
    const port = address.port;
    const family = address.family;
    const ipaddr = address.address;
    const file_save_path = path.join(__dirname.toString(),'outputs',output_file_name);
    // Write Stream File:
    stream = fs.createWriteStream(file_save_path);
    console.log('Server is listening at port: ' + port);
    console.log('Server ip: ' + ipaddr);
    console.log('Server is IP4/IP6: ' + family);
    console.log('Server saves the output to: ' + file_save_path);
});

//emits after the socket is closed using socket.close();
server.on('close', function () {
    console.log('Socket is closed !');
});

server.bind(port);