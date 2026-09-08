/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add this line to allow your other device to connect
  allowedDevOrigins: ['192.168.1.2'],
};

export default nextConfig;