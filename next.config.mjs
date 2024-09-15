/**@type {import('next').NextConfig} */
import withPWA from "@ducanh2912/next-pwa";

const nextConfig = {
  images: {
    domains: ['pexels.com','pinterest.com','unsplash.com'], 
  },
};

const pwaConfig = withPWA({
  dest: "public", 
  cacheOnFrontEndNav: true, 
  aggressiveFrontEndNavCaching: true, 
  reloadOnOnline: true, 
  swMinify: true, 
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    disableDevLogs: true, 
  },
});

export default pwaConfig(nextConfig);
