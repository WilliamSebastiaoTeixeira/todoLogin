import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig({
    plugins: [
        vue({
            template: { transformAssetUrls }
        }),

        quasar({
            autoImportComponentCase: 'combined',
            sassVariables: 'src/quasar-variables.sass'
        })
    ]
})
