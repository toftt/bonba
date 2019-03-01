require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const configureIo = require('./server/configureIo');

const app = express()
const server = http.Server(app);
const io = socketIo(server);
const port = process.env.PORT || 3001;

configureIo(io);

server.listen(port, () => console.log(`listening on port ${port}`));
