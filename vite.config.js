import { ViteEjsPlugin } from 'vite-plugin-ejs'

export default {
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
