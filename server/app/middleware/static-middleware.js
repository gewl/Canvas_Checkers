'use strict'

import path from 'path';
import express from 'express';

export default function(app) {

	const root = app.getValue('projectRoo');
	const publicPath = path.join(root, './public');
	const browserPath = path.join(root, './browser');

	app.use(express.static(publicPath));
	app.use(express.static(browserPath));
}
