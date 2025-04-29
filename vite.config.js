// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vite.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": "http://localhost:8015",
//     },
//   },
//   plugins: [react()],
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8015',
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-optional-chaining'],
          ['@babel/plugin-transform-nullish-coalescing-operator'],
        ],
      },
      jsx: true,
    }),
  ],
});