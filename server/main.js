`use strict`

import chalk from 'chalk';
import express from 'express';
const path = require('path');

const app = require('./app').default()

const port = process.env.PORT || 4040;
const server = app.listen(port, (err) => {
	if (err) throw err;
	console.log(chalk.cyan(`Server listening on port ${port}.`))
});
const io = require('socket.io').listen(server);

io.sockets.on('connection', socket => {
	console.log(`Socket connected: ${socket.id}`)
	socket.emit('gameStart')
})
