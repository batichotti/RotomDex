/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // <- ESSENCIAL pro Dockerfile acima funcionar
};

module.exports = nextConfig;