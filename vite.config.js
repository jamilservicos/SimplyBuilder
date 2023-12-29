"use strict";

// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    root: './src',
    build: {
        outDir: '../dist',
    },
    css: {
        postcss: {
            config: './postcss.config.js'
        }
    },
    publicDir: '../public',
    resolve: {
        alias: {
            '@stores': path.resolve(__dirname, 'src/stores'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@styles': path.resolve(__dirname, 'src/styles'),
        },
    },
    plugins: []
});