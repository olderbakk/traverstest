import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        configurator: resolve(__dirname, 'configurator.html'),
        'pakke-ekspedisjonstur': resolve(__dirname, 'pakke-ekspedisjonstur.html'),
        'pakke-fokus-paa-vidda': resolve(__dirname, 'pakke-fokus-paa-vidda.html'),
        'pakke-hotellet-for-dere': resolve(__dirname, 'pakke-hotellet-for-dere.html')
      }
    }
  }
})
