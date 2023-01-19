import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import pages from '@xyh19/vite-plugin-route-pages'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        pages({
            pagesDir: 'src/pages',
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        host: true,
        watch: {
            usePolling: true
        }
    },
});