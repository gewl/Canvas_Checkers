`use strict`

import chalk from 'chalk';
import express from 'express';
const app = express();
const path = require('path');

const port = PROCESS.ENV.PORT || 4040;
const server = app.listen(port);
const io = require('socket.io').listen(server);

io.sockets.on('connection', socket => {
	console.log(socket)
})
