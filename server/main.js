`use strict`

import chalk from 'chalk';
import express from 'express';
const app = express();
const path = require('path');

const port = process.env.PORT || 4040;
const server = app.listen(port, () => {
	console.log(chalk.cyan(`Server listening on port ${port}.`))
});
const io = require('socket.io').listen(server);

io.sockets.on('connection', socket => {
	console.log(socket)
})
