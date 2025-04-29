import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Debug: Log environment variables
  console.log('Vite config - Environment variables:', {
    mode,
    apiKey: env.VITE_GEMINI_API_KEY ? 'Present' : 'Missing',
    envFile: '.env',
    envLoaded: env.VITE_GEMINI_API_KEY ? 'Yes' : 'No'
  });

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
}); 