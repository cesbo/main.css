import { ViteEjsPlugin } from 'vite-plugin-ejs'

export default {
    server: {
        host: '127.0.0.1',
        port: 2000,
    },
    base: '',
    build: {
        assetsDir: '',
        rollupOptions: {
            output: {
                entryFileNames: 'docs.js',
                assetFileNames: 'main.[ext]',
            },
        },
    },
    plugins: [
        ViteEjsPlugin(),
    ],
}
