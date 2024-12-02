const path = require('path');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false, // Ocultar el encabezado X-Powered-By de Next.js
  compress: false, // Desactivar compresión para mejorar tiempos de desarrollo
  transpilePackages: ['@mui/material', '@mui/system', '@mui/icons-material'], // Transpilación para dependencias de MUI
  webpack: (config, { dev, isServer }) => {
    // Configuración específica para desarrollo
    if (dev && !isServer) {
      config.watchOptions = {
        ignored: [
          '**/node_modules',
          path.resolve(__dirname, 'node_modules/**'),
          path.resolve(__dirname, '.next/**'),
        ],
        poll: 1000, // Verificar cambios cada segundo
        aggregateTimeout: 300, // Retraso antes de reconstruir
      };
    }

    // Configuración de alias
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'components'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@lib': path.resolve(__dirname, 'lib'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@posts': path.resolve(__dirname, 'posts'),
      '@public': path.resolve(__dirname, 'public'),
      '@styles': path.resolve(__dirname, 'styles'),
    };

    return config;
  },
  images: {
    unoptimized: true, // Desactivar optimización de imágenes para desarrollo local
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
        pathname: '/weather/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' }, // Permitir iframes dentro del mismo origen
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), fullscreen=(self)',
          },
        ],
      },
    ];
  },
};
