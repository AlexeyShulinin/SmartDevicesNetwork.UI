import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const port = Number(env.VITE_APP_PORT);
    return {
        base: '/',
        plugins: [react()],
        server: {
            port: port,
            strictPort: true,
            host: true,
            origin: 'http://0.0.0.0:' + port,
        },
    };
});
