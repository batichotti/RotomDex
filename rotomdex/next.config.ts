/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', // Substitua pelo domínio exato de onde vêm as imagens
      },
    ],
  },
  
  output: 'standalone', // <- ESSENCIAL pro Dockerfile acima funcionar
};

module.exports = nextConfig;
