"use strict";

// vite.config.js
import { defineConfig } from 'vite';
import path from 'node:path';
export default defineConfig({
    root: './src',
    build: {
        manifest: false,
        outDir: '../dist',
    },
    css: {
        postcss: {
            config: './postcss.config.js'
        }
    },
    publicDir: '../static',
    resolve: {
        alias: {
            '@core-components': path.resolve(__dirname, 'src', 'core', 'components'),
            '@core-stores': path.resolve(__dirname, 'src', 'core', 'stores'),
            '@app-components': path.resolve(__dirname, 'src', 'app', 'components'),
            '@app-stores': path.resolve(__dirname, 'src', 'app', 'stores'),
            '@app-styles': path.resolve(__dirname, 'src', 'app', 'styles'),
            '@styles': path.resolve(__dirname, 'src', 'styles'),
        },
    },
    server: {
        cors: false,
        open: false
    },
    plugins: []
});