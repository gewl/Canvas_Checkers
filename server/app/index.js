`use strict`

import path from 'path';
import express from 'express';
const app = express();

export default function() {
	require('./middleware')(app);
}
