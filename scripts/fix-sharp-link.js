#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'node_modules', '@img', 'sharp-libvips-darwin-arm64');
const linkDir = path.join(__dirname, '..', 'node_modules', 'vite-imagetools', 'node_modules', '@img');
const link = path.join(linkDir, 'sharp-libvips-darwin-arm64');

if (fs.existsSync(target) && !fs.existsSync(link)) {
	try {
		fs.mkdirSync(linkDir, { recursive: true });
		const relativePath = path.relative(linkDir, target);
		fs.symlinkSync(relativePath, link, 'dir');
		console.log('Created symlink for sharp-libvips-darwin-arm64');
	} catch (error) {
		console.warn('Could not create symlink:', error.message);
	}
}

