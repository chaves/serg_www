#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'node_modules', '@img', 'sharp-libvips-darwin-arm64');
const viteImagetoolsDir = path.join(__dirname, '..', 'node_modules', 'vite-imagetools');

if (!fs.existsSync(target)) {
	console.warn('Target sharp-libvips-darwin-arm64 not found, skipping symlink creation');
	process.exit(0);
}

// Create symlink at vite-imagetools/node_modules/@img/sharp-libvips-darwin-arm64
const linkDir1 = path.join(viteImagetoolsDir, 'node_modules', '@img');
const link1 = path.join(linkDir1, 'sharp-libvips-darwin-arm64');

if (!fs.existsSync(link1)) {
	try {
		fs.mkdirSync(linkDir1, { recursive: true });
		const relativePath1 = path.relative(linkDir1, target);
		fs.symlinkSync(relativePath1, link1, 'dir');
		console.log('Created symlink at vite-imagetools/node_modules/@img/sharp-libvips-darwin-arm64');
	} catch (error) {
		console.warn('Could not create symlink 1:', error.message);
	}
}

// Create symlink at vite-imagetools/sharp-libvips-darwin-arm64 (for the ../../ path)
const link2 = path.join(viteImagetoolsDir, 'sharp-libvips-darwin-arm64');

if (!fs.existsSync(link2)) {
	try {
		const relativePath2 = path.relative(viteImagetoolsDir, target);
		fs.symlinkSync(relativePath2, link2, 'dir');
		console.log('Created symlink at vite-imagetools/sharp-libvips-darwin-arm64');
	} catch (error) {
		console.warn('Could not create symlink 2:', error.message);
	}
}

